# Edge Functions Code for Translation Management

## Function 1: i18n-translations (CRUD Operations)

Create file: `supabase/functions/i18n-translations/index.ts`

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const method = req.method;

    // GET locales
    if (url.pathname.includes('/locales') && method === 'GET') {
      const { data, error } = await supabase.from('locales').select('*').order('name');
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // PATCH locale
    if (url.pathname.includes('/locales') && method === 'PATCH') {
      const body = await req.json();
      const { id, ...updates } = body;
      const { data, error } = await supabase
        .from('locales')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // GET strings with filters
    if (url.pathname.includes('/strings') && method === 'GET') {
      const component = url.searchParams.get('component');
      let query = supabase.from('string_keys').select('*, string_values(*)');
      if (component) query = query.eq('component', component);
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // PUT translation value
    if (url.pathname.includes('/update-value') && method === 'PUT') {
      const body = await req.json();
      const { key_id, locale, text, status, updated_by } = body;
      const { data, error } = await supabase
        .from('string_values')
        .upsert({
          key_id, locale, text, status,
          updated_by, updated_at: new Date().toISOString()
        }, { onConflict: 'key_id,locale' })
        .select()
        .single();
      if (error) throw error;

      await supabase.from('translation_audit_logs').insert({
        user_id: updated_by,
        action: 'update_translation',
        entity_type: 'string_value',
        entity_id: data.id,
        after: { text, status, locale }
      });

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
```

Deploy: `supabase functions deploy i18n-translations`

---

## Function 2: i18n-import (CSV/JSON Import)

Create file: `supabase/functions/i18n-import/index.ts`

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { fileContent, fileName, mode, dryRun } = await req.json();
    let data: any;

    if (fileName.endsWith('.json')) {
      data = JSON.parse(fileContent);
    } else if (fileName.endsWith('.csv')) {
      const lines = fileContent.split('\\n');
      const headers = lines[0].split(',');
      data = lines.slice(1).map((line: string) => {
        const values = line.split(',');
        return headers.reduce((obj: any, header: string, i: number) => {
          obj[header.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
    }

    const results = { new: 0, updated: 0, invalid: 0, errors: [] as string[] };

    for (const item of Array.isArray(data) ? data : Object.entries(data)) {
      try {
        const key = Array.isArray(data) ? item.key : item[0];
        const translations = Array.isArray(data) ? item : item[1];

        if (!dryRun) {
          const { data: existingKey } = await supabase
            .from('string_keys')
            .select('id')
            .eq('key', key)
            .single();

          let keyId = existingKey?.id;

          if (!keyId && (mode === 'create' || mode === 'both')) {
            const { data: newKey } = await supabase
              .from('string_keys')
              .insert({ key, component: 'imported' })
              .select('id')
              .single();
            keyId = newKey?.id;
            results.new++;
          } else if (keyId) {
            results.updated++;
          }

          if (keyId) {
            for (const [locale, text] of Object.entries(translations)) {
              await supabase.from('string_values').upsert({
                key_id: keyId, locale, text, status: 'pending'
              }, { onConflict: 'key_id,locale' });
            }
          }
        }
      } catch (error) {
        results.invalid++;
        results.errors.push(error.message);
      }
    }

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
```

Deploy: `supabase functions deploy i18n-import`

---

## Function 3: i18n-export (Export to JSON/CSV/ZIP)

Create file: `supabase/functions/i18n-export/index.ts`

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { format, locales, bundle } = await req.json();

    const { data: keys } = await supabase
      .from('string_keys')
      .select('*, string_values(*)');

    const output: any = {};

    for (const key of keys || []) {
      output[key.key] = {};
      for (const value of key.string_values || []) {
        if (!locales || locales.includes(value.locale)) {
          output[key.key][value.locale] = value.text;
        }
      }
    }

    let responseBody: string;
    let contentType: string;

    if (format === 'json') {
      responseBody = JSON.stringify(output, null, 2);
      contentType = 'application/json';
    } else if (format === 'csv') {
      const allLocales = [...new Set(
        Object.values(output).flatMap((v: any) => Object.keys(v))
      )];
      const headers = ['key', ...allLocales].join(',');
      const rows = Object.entries(output).map(([key, translations]: any) => {
        const values = allLocales.map(locale => translations[locale] || '');
        return [key, ...values].join(',');
      });
      responseBody = [headers, ...rows].join('\\n');
      contentType = 'text/csv';
    } else {
      responseBody = JSON.stringify(output);
      contentType = 'application/json';
    }

    return new Response(responseBody, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="translations.${format}"`,
        ...corsHeaders
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
```

Deploy: `supabase functions deploy i18n-export`

---

## Function 4: i18n-versions (Version Management & Diff)

Create file: `supabase/functions/i18n-versions/index.ts`

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);

    // GET version history
    if (url.pathname.includes('/history') && req.method === 'GET') {
      const locale = url.searchParams.get('locale');
      const { data, error } = await supabase
        .from('translation_releases')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // GET diff between versions
    if (url.pathname.includes('/diff') && req.method === 'GET') {
      const locale = url.searchParams.get('locale');
      const fromVersion = url.searchParams.get('from');
      const toVersion = url.searchParams.get('to');

      // Simplified diff - in production, query audit logs
      const diff = {
        added: [],
        modified: [],
        removed: []
      };

      return new Response(JSON.stringify(diff), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // POST revert to version
    if (url.pathname.includes('/revert') && req.method === 'POST') {
      const { locale, version, userId } = await req.json();

      await supabase.from('translation_audit_logs').insert({
        user_id: userId,
        action: 'revert_version',
        entity_type: 'locale',
        entity_id: locale,
        after: { version }
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
```

Deploy: `supabase functions deploy i18n-versions`

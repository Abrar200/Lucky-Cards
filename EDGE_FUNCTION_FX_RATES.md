# FX Rates Edge Function

## Function Name: fetch-fx-rates

This edge function fetches real-time exchange rates from OpenExchangeRates API and stores them in the database.

## Code:

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OPENEXCHANGERATES_API_KEY");
    
    if (!apiKey) {
      throw new Error("OpenExchangeRates API key not configured");
    }

    // Fetch latest rates from OpenExchangeRates
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`OpenExchangeRates API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rates = data.rates;
    const timestamp = new Date(data.timestamp * 1000).toISOString();

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const headers = {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    };

    // Store rates in database
    const updates = [];
    const history = [];
    
    for (const [currency, rate] of Object.entries(rates)) {
      updates.push({
        base_currency: 'USD',
        quote_currency: currency,
        rate: rate,
        timestamp: timestamp,
        source: 'OpenExchangeRates'
      });
      
      history.push({
        base_currency: 'USD',
        quote_currency: currency,
        rate: rate,
        timestamp: timestamp,
        source: 'OpenExchangeRates'
      });
    }

    // Upsert current rates
    await fetch(`${supabaseUrl}/rest/v1/fx_rates`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(updates)
    });

    // Insert history
    await fetch(`${supabaseUrl}/rest/v1/fx_rate_history`, {
      method: 'POST',
      headers,
      body: JSON.stringify(history)
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Updated ${Object.keys(rates).length} exchange rates`,
        timestamp: timestamp,
        rates_count: Object.keys(rates).length
      }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
```

## Database Tables Required:

```sql
-- Current FX rates table
CREATE TABLE fx_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency TEXT NOT NULL DEFAULT 'USD',
  quote_currency TEXT NOT NULL,
  rate DECIMAL(20, 8) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT NOT NULL DEFAULT 'OpenExchangeRates',
  is_frozen BOOLEAN DEFAULT FALSE,
  override_rate DECIMAL(20, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(base_currency, quote_currency)
);

-- Historical FX rates for audit trail
CREATE TABLE fx_rate_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency TEXT NOT NULL DEFAULT 'USD',
  quote_currency TEXT NOT NULL,
  rate DECIMAL(20, 8) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Setup:

1. Deploy this function using Supabase CLI or dashboard
2. Set up a cron job to call this function every 5 minutes
3. The OPENEXCHANGERATES_API_KEY environment variable is already configured

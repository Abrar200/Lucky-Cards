import { supabase } from './supabase';
import { SEED_TRANSLATIONS_EN } from '@/data/seedTranslations';


export interface Locale {
  id: string;
  locale_code: string;
  name: string;
  script?: string;
  rtl: boolean;
  font_family: string;
  fallbacks?: string[];
  is_live: boolean;
}

export interface StringKey {
  id: string;
  key: string;
  component: string;
  notes?: string;
  char_limit?: number;
  screenshots?: string[];
}

export interface StringValue {
  id: string;
  key_id: string;
  locale: string;
  text?: string;
  status: 'missing' | 'pending' | 'complete' | 'flagged';
  version?: string;
  updated_by?: string;
  updated_at: string;
  qa_flags?: string[];
}

class I18nService {
  private useLocalStorage = true;

  async getLocales(): Promise<Locale[]> {
    if (this.useLocalStorage) {
      const stored = localStorage.getItem('i18n_locales');
      if (stored) return JSON.parse(stored);
      
      // Initialize with default locales
      const defaultLocales: Locale[] = [
        { id: '1', locale_code: 'en', name: 'English', rtl: false, font_family: 'Roboto', is_live: true },
        { id: '2', locale_code: 'zh-CN', name: 'Chinese Simplified', rtl: false, font_family: 'Noto Sans SC', is_live: true },
        { id: '3', locale_code: 'zh-TW', name: 'Chinese Traditional', rtl: false, font_family: 'Noto Sans TC', is_live: false },
        { id: '4', locale_code: 'ja', name: 'Japanese', rtl: false, font_family: 'Noto Sans JP', is_live: true },
        { id: '5', locale_code: 'ko', name: 'Korean', rtl: false, font_family: 'Noto Sans KR', is_live: false },
        { id: '6', locale_code: 'th', name: 'Thai', rtl: false, font_family: 'Noto Sans Thai', is_live: true },
        { id: '7', locale_code: 'vi', name: 'Vietnamese', rtl: false, font_family: 'Noto Sans', is_live: false },
        { id: '8', locale_code: 'id', name: 'Indonesian', rtl: false, font_family: 'Roboto', is_live: true },
        { id: '9', locale_code: 'ms', name: 'Malay', rtl: false, font_family: 'Roboto', is_live: false },
        { id: '10', locale_code: 'ar', name: 'Arabic', rtl: true, font_family: 'Noto Sans Arabic', is_live: false },
        { id: '11', locale_code: 'es', name: 'Spanish', rtl: false, font_family: 'Roboto', is_live: true },
        { id: '12', locale_code: 'pt', name: 'Portuguese', rtl: false, font_family: 'Roboto', is_live: false }
      ];
      localStorage.setItem('i18n_locales', JSON.stringify(defaultLocales));
      return defaultLocales;
    }

    const { data, error } = await supabase.from('locales').select('*').order('name');
    if (error) throw error;
    return data || [];
  }

  async updateLocale(id: string, updates: Partial<Locale>): Promise<Locale> {
    if (this.useLocalStorage) {
      const locales = await this.getLocales();
      const index = locales.findIndex(l => l.id === id);
      if (index !== -1) {
        locales[index] = { ...locales[index], ...updates };
        localStorage.setItem('i18n_locales', JSON.stringify(locales));
        return locales[index];
      }
      throw new Error('Locale not found');
    }

    const { data, error } = await supabase
      .from('locales')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getStringKeys(filters?: { component?: string; query?: string }): Promise<StringKey[]> {
    if (this.useLocalStorage) {
      const stored = localStorage.getItem('i18n_string_keys');
      if (stored) {
        let keys = JSON.parse(stored);
        if (filters?.component) {
          keys = keys.filter((k: StringKey) => k.component === filters.component);
        }
        return keys;
      }
      return [];
    }

    let query = supabase.from('string_keys').select('*');
    if (filters?.component) query = query.eq('component', filters.component);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async saveTranslation(keyId: string, locale: string, text: string, status: string): Promise<void> {
    if (this.useLocalStorage) {
      const stored = localStorage.getItem('i18n_string_values') || '[]';
      const values = JSON.parse(stored);
      const existing = values.findIndex((v: any) => v.key_id === keyId && v.locale === locale);
      
      const value = {
        id: existing >= 0 ? values[existing].id : Date.now().toString(),
        key_id: keyId,
        locale,
        text,
        status,
        updated_at: new Date().toISOString()
      };

      if (existing >= 0) values[existing] = value;
      else values.push(value);
      
      localStorage.setItem('i18n_string_values', JSON.stringify(values));
      return;
    }

    await supabase.from('string_values').upsert({
      key_id: keyId,
      locale,
      text,
      status,
      updated_at: new Date().toISOString()
    }, { onConflict: 'key_id,locale' });
  }

  // Get all strings for a specific locale (for useTranslation hook)
  async getStrings(locale: string = 'en'): Promise<Record<string, string>> {
    if (this.useLocalStorage) {
      // Return seed data for English
      if (locale === 'en') {
        return SEED_TRANSLATIONS_EN;
      }
      
      // For other locales, return stored translations or empty
      const stored = localStorage.getItem(`i18n_strings_${locale}`);
      if (stored) return JSON.parse(stored);
      return {};
    }

    // Fetch from Supabase
    const { data, error } = await supabase
      .from('string_values')
      .select('key:string_keys(key), text')
      .eq('locale', locale)
      .eq('status', 'complete');
    
    if (error) throw error;
    
    const strings: Record<string, string> = {};
    data?.forEach((item: any) => {
      if (item.key?.key && item.text) {
        strings[item.key.key] = item.text;
      }
    });
    
    return strings;
  }

  // Initialize string keys from seed data
  async initializeStringKeys(): Promise<void> {
    if (this.useLocalStorage) {
      const stored = localStorage.getItem('i18n_string_keys');
      if (stored) return; // Already initialized

      const keys: StringKey[] = Object.keys(SEED_TRANSLATIONS_EN).map((key, index) => ({
        id: (index + 1).toString(),
        key,
        component: key.split('.')[0], // Extract component from key prefix
        notes: '',
        char_limit: undefined,
        screenshots: []
      }));

      localStorage.setItem('i18n_string_keys', JSON.stringify(keys));

      // Initialize English values
      const values: StringValue[] = keys.map((k, index) => ({
        id: (index + 1).toString(),
        key_id: k.id,
        locale: 'en',
        text: SEED_TRANSLATIONS_EN[k.key as keyof typeof SEED_TRANSLATIONS_EN],
        status: 'complete' as const,
        version: '1.0.0',
        updated_at: new Date().toISOString()
      }));

      localStorage.setItem('i18n_string_values', JSON.stringify(values));
    }
  }

}

export const i18nService = new I18nService();

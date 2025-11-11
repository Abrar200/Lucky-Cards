import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://oaxkgoxciiymzhsbkmli.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdHdicm5yZ3FsemZ0dXp0Y2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Nzg0NjIsImV4cCI6MjA3ODQ1NDQ2Mn0.xk7HDCn_ouH1ctMjJDrvPjJuiV6MP6Eakv1xBTXq1iw'; // Get from Supabase Dashboard > Settings > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript support
export type Database = {
  public: {
    Tables: {
      locales: {
        Row: {
          id: string;
          locale_code: string;
          name: string;
          script: string | null;
          rtl: boolean;
          font_family: string | null;
          fallbacks: string[] | null;
          is_live: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      string_keys: {
        Row: {
          id: string;
          key: string;
          component: string;
          notes: string | null;
          char_limit: number | null;
          screenshots: string[] | null;
          created_at: string;
          updated_at: string;
        };
      };
      string_values: {
        Row: {
          id: string;
          key_id: string;
          locale: string;
          text: string | null;
          status: 'missing' | 'pending' | 'complete' | 'flagged';
          version: string | null;
          updated_by: string | null;
          updated_at: string;
          qa_flags: string[] | null;
        };
      };
    };
  };
};
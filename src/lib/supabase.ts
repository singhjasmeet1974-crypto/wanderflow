import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for optional real Supabase connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-supabase')
);

// Graceful client creation: if keys aren't set, provide null and let StorageService handle local persistence
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info(
    '%c[Wanderflow Demo Mode]%c Running in offline evaluation mode with client-side persistence. Supabase credentials not detected in .env.',
    'background: #16382B; color: #E5A43B; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
    'color: inherit;'
  );
}

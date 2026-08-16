import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton: the client is only created on first use, so importing this
// module (e.g. during `next build` page-data collection) never requires env
// vars. Routes must handle a `null` return (Supabase not configured).
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!client) {
    client = createClient(supabaseUrl, supabaseKey);
  }

  return client;
}

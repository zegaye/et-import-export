import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';

export async function load() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    console.error('Supabase environment variables are missing.');
    return { approvedProducts: [], listingsError: true };
  }

  const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from('product_submissions')
    .select('id, product_name, category, origin, quantity, description')
    .eq('status', 'approved')
    .eq('direction', 'export')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not load approved export products:', error);
    return { approvedProducts: [], listingsError: true };
  }

  return { approvedProducts: data ?? [], listingsError: false };
}
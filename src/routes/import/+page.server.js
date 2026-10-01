import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {
  setHeaders({ 'cache-control': 'private, no-store' });

  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    console.error('Supabase environment variables are missing.');
    return { approvedProducts: [], listingsError: true };
  }

  const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  const { data, error } = await supabase
    .from('product_submissions')
    .select(
      'id, product_name, category, origin, quantity, description, image_path'
    )
    .eq('status', 'approved')
    .eq('direction', 'import')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not load import products:', error.message);
    return { approvedProducts: [], listingsError: true };
  }

  const approvedProducts = await Promise.all(
    (data ?? []).map(async (product) => {
      let imageUrl = '';

      if (product.image_path) {
        const { data: photo, error: photoError } =
          await supabase.storage
            .from('product-photos')
            .createSignedUrl(product.image_path, 3600);

        if (photoError) {
          console.error('Could not load photo:', photoError.message);
        } else {
          imageUrl = photo?.signedUrl ?? '';
        }
      }

      return { ...product, imageUrl };
    })
  );

  return { approvedProducts, listingsError: false };
}
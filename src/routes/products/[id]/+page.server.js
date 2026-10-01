import { error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { products } from '$lib/data/products.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, setHeaders }) {
  setHeaders({ 'cache-control': 'private, no-store' });

  const sample = products.find((item) => item.id === params.id);

  if (sample) {
    return {
      product: {
        id: sample.id,
        name: sample.name,
        direction: sample.direction,
        category: sample.category,
        origin: sample.origin,
        description: sample.description || 'No description provided.',
        quantity: 'Confirm with our team',
        isSample: true,
        imageUrl: ''
      }
    };
  }

  const validId =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      params.id
    );

  if (!validId) {
    error(404, 'Product not found');
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    error(500, 'Product database settings are missing.');
  }

  const database = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  // Only approved listings are available publicly.
  const { data: listing, error: databaseError } = await database
    .from('product_submissions')
    .select(
      'id, product_name, direction, category, origin, quantity, description, image_path'
    )
    .eq('id', params.id)
    .eq('status', 'approved')
    .maybeSingle();

  if (databaseError) {
    console.error('Product detail error:', databaseError.message);
    error(500, 'Unable to load this product. Please try again.');
  }

  if (!listing) {
    error(404, 'Product not found');
  }

  let imageUrl = '';

  if (listing.image_path) {
    const { data: photo, error: photoError } = await database.storage
      .from('product-photos')
      .createSignedUrl(listing.image_path, 3600);

    if (photoError) {
      console.error('Product photo error:', photoError.message);
    } else {
      imageUrl = photo?.signedUrl ?? '';
    }
  }

  return {
    product: {
      id: listing.id,
      name: listing.product_name,
      direction: listing.direction,
      category: listing.category,
      origin: listing.origin,
      quantity: listing.quantity || 'Confirm with our team',
      description: listing.description || 'No description provided.',
      isSample: false,
      imageUrl
    }
  };
}
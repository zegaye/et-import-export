
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {
  setHeaders({ 'cache-control': 'private, no-store' });

  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    console.error('Supabase environment variables are missing.');

    return {
      approvedProducts: [],
      listingsError: true
    };
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

  // Load approved export products
  const { data: products, error: productsError } = await supabase
    .from('product_submissions')
    .select(
      'id, exporter_id, product_name, category, origin, quantity, description, image_path'
    )
    .eq('status', 'approved')
    .eq('direction', 'export')
    .order('created_at', { ascending: false });

  if (productsError) {
    console.error(
      'Could not load export products:',
      productsError.message
    );

    return {
      approvedProducts: [],
      listingsError: true
    };
  }

  // Collect exporter IDs from products
  const exporterIds = [
    ...new Set(
      (products ?? [])
        .map((product) => product.exporter_id)
        .filter(Boolean)
    )
  ];

  const verifiedExporterIds = new Set();

  if (exporterIds.length > 0) {
    const { data: profiles, error: profilesError } =
      await supabase
        .from('trade_profiles')
        .select('user_id')
        .in('user_id', exporterIds)
        .eq('account_type', 'exporter')
        .eq('verification_status', 'verified');

    if (profilesError) {
      console.error(
        'Could not verify exporters:',
        profilesError.message
      );
    } else {
      for (const profile of profiles ?? []) {
        verifiedExporterIds.add(profile.user_id);
      }
    }
  }

  // Attach signed images and trusted verification status
  const approvedProducts = await Promise.all(
    (products ?? []).map(async (product) => {
      let imageUrl = '';

      if (product.image_path) {
        const { data: photo, error: photoError } =
          await supabase.storage
            .from('product-photos')
            .createSignedUrl(product.image_path, 3600);

        if (photoError) {
          console.error(
            'Could not load product photo:',
            photoError.message
          );
        } else {
          imageUrl = photo?.signedUrl ?? '';
        }
      }

      return {
        id: product.id,
        product_name: product.product_name,
        category: product.category,
        origin: product.origin,
        quantity: product.quantity,
        description: product.description,
        imageUrl,
        isVerifiedExporter:
          Boolean(product.exporter_id) &&
          verifiedExporterIds.has(product.exporter_id)
      };
    })
  );
console.log(
  approvedProducts
    .filter((product) => product.product_name === 'exporter id test 2')
    .map((product) => ({
      name: product.product_name,
      verified: product.isVerifiedExporter
    }))
);

return {
  approvedProducts,
  listingsError: false
};
}  
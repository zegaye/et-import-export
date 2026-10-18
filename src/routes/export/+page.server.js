import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    throw error(500, 'Product catalog is unavailable.');
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

  const { data: submissions, error: productsError } =
    await supabase
      .from('product_submissions')
      .select(
        'id, exporter_id, product_name, category, origin, quantity, description, image_path, created_at'
      )
      .eq('direction', 'export')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

  if (productsError) {
    console.error('Product loading failed:', productsError.message);
    throw error(500, 'Unable to load export products.');
  }

  const exporterIds = [
    ...new Set(
      (submissions ?? [])
        .map((item) => item.exporter_id)
        .filter(Boolean)
    )
  ];

  /** @type {Set<string>} */
  const verifiedExporters = new Set();

  if (exporterIds.length > 0) {
    const { data: profiles, error: profileError } =
      await supabase
        .from('trade_profiles')
        .select('user_id, verification_status')
        .in('user_id', exporterIds)
        .eq('account_type', 'exporter');

    if (profileError) {
      console.error(
        'Exporter verification lookup failed:',
        profileError.message
      );
    } else {
      for (const profile of profiles ?? []) {
        if (profile.verification_status === 'verified') {
          verifiedExporters.add(profile.user_id);
        }
      }
    }
  }

  const products = await Promise.all(
    (submissions ?? []).map(async (item) => {
      /** @type {string | null} */
      let imageUrl = null;

      if (item.image_path) {
        const { data: imageData, error: imageError } =
          await supabase.storage
            .from('product-photos')
            .createSignedUrl(item.image_path, 3600);

        if (!imageError) {
          imageUrl = imageData?.signedUrl ?? null;
        }
      }

      return {
        id: item.id,
        name: item.product_name,
        category: item.category,
        origin: item.origin,
        quantity: item.quantity,
        description: item.description,
        imageUrl,
        isVerifiedExporter:
          Boolean(item.exporter_id) &&
          verifiedExporters.has(item.exporter_id)
      };
    })
  );

  return { products };
}
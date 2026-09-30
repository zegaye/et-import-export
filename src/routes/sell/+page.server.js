import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
/** @type {Record<string, string>} */
          const submission = {
      seller_name: String(data.get('sellerName') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      product_name: String(data.get('productName') ?? '').trim(),
      direction: String(data.get('direction') ?? '').trim(),
      category: String(data.get('category') ?? '').trim(),
      origin: String(data.get('location') ?? '').trim(),
      quantity: String(data.get('quantity') ?? '').trim(),
      description: String(data.get('description') ?? '').trim()
    };

    const limits = {
      seller_name: 100,
      phone: 30,
      product_name: 100,
      category: 80,
      origin: 100,
      quantity: 80,
      description: 2000
    };

    const invalidField = Object.entries(limits).some(
      ([field, limit]) =>
        !submission[field] || submission[field].length > limit
    );

    if (
      invalidField ||
      !['export', 'import'].includes(submission.direction)
    ) {
      return fail(400, {
        message: 'Please complete every field with valid information.'
      });
    }

    if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
      console.error('Supabase environment variables are missing.');
      return fail(500, {
        message: 'Submissions are temporarily unavailable.'
      });
    }

    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SECRET_KEY,
      { auth: { persistSession: false } }
    );

    const { error } = await supabase
      .from('product_submissions')
      .insert(submission);

    if (error) {
      console.error('Could not save product submission:', error.message);
      return fail(500, {
        message: 'We could not save your submission. Please try again.'
      });
    }

    return {
      success: true,
      message: 'Your product was submitted for review.'
    };
  }
};
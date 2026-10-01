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

    const photo = data.get('photo');

    if (typeof photo === 'string' && photo) {
      return fail(400, {
        message: 'Please choose a valid photo file.'
      });
    }

    // An empty file input is allowed: the photo is optional.
    const hasPhoto = photo !== null &&
      typeof photo !== 'string' &&
      photo.size > 0;

    if (hasPhoto && photo.size > 2 * 1024 * 1024) {
      return fail(400, {
        message: 'The photo must be no larger than 2 MB.'
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
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );

    /** @type {string | null} */
    let imagePath = null;

    if (hasPhoto) {
      const bytes = new Uint8Array(await photo.arrayBuffer());

      // Check the file header as well as its declared type.
      const isJpeg =
        bytes[0] === 0xff &&
        bytes[1] === 0xd8 &&
        bytes[2] === 0xff;

      const pngHeader = [137, 80, 78, 71, 13, 10, 26, 10];
      const isPng = pngHeader.every(
        (value, index) => bytes[index] === value
      );

      const validJpeg = photo.type === 'image/jpeg' && isJpeg;
      const validPng = photo.type === 'image/png' && isPng;

      if (!validJpeg && !validPng) {
        return fail(400, {
          message: 'Please upload a JPG or PNG photo.'
        });
      }

      const extension = validJpeg ? 'jpg' : 'png';
      const contentType = validJpeg ? 'image/jpeg' : 'image/png';

      imagePath = `submissions/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('product-photos')
        .upload(imagePath, bytes, {
          contentType,
          upsert: false
        });

      if (uploadError) {
        console.error('Photo upload failed:', uploadError.message);
        return fail(500, {
          message: 'We could not upload your photo. Please try again.'
        });
      }
    }

    const { error: saveError } = await supabase
      .from('product_submissions')
      .insert({
        ...submission,
        status: 'pending',
        image_path: imagePath
      });

    if (saveError) {
      // Remove the uploaded photo if saving the listing fails.
      if (imagePath) {
        const { error: cleanupError } = await supabase.storage
          .from('product-photos')
          .remove([imagePath]);

        if (cleanupError) {
          console.error('Photo cleanup failed:', cleanupError.message);
        }
      }

      console.error('Could not save submission:', saveError.message);
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
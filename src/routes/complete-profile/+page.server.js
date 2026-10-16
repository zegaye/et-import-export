
import { fail, redirect, error } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const supabase = createAuthClient(event);

  const { data: { user }, error: authError } =
    await supabase.auth.getUser();

  if (authError || !user) {
    redirect(303, '/login');
  }

  const { data: profile, error: profileError } = await supabase
    .from('trade_profiles')
    .select('user_id, account_type')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    error(500, 'Unable to check your business profile.');
  }

  if (profile) {
    redirect(303, '/dashboard');
  }

  return {
    email: user.email ?? '',
    fullName: user.user_metadata?.full_name ?? '',
    companyName: user.user_metadata?.company_name ?? '',
    country: user.user_metadata?.country ?? '',
    phone: user.user_metadata?.phone ?? ''
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const supabase = createAuthClient(event);

    const { data: { user }, error: authError } =
      await supabase.auth.getUser();

    if (authError || !user) {
      redirect(303, '/login');
    }

    const form = await event.request.formData();

    /** @param {string} key */
    const read = (key) =>
      String(form.get(key) ?? '').trim();

    const accountType = read('accountType');
    const fullName = read('fullName');
    const companyName = read('companyName');
    const country = read('country');
    const phone = read('phone');

    const values = {
      accountType,
      fullName,
      companyName,
      country,
      phone
    };

    /** @param {string} message */
    const invalid = (message) =>
      fail(400, { message, values });

    if (!['exporter', 'buyer'].includes(accountType)) {
      return invalid('Select an account type.');
    }

    if (!fullName || fullName.length > 100) {
      return invalid('Enter a valid full name.');
    }

    if (!companyName || companyName.length > 150) {
      return invalid('Enter a valid company name.');
    }

    if (!country || country.length > 100) {
  return invalid('Enter a valid country.');
}

if (
  accountType === 'exporter' &&
  country.toLowerCase() !== 'ethiopia'
) {
  return invalid(
    'Exporter registration is currently available only for businesses based in Ethiopia.'
  );
}

    if (phone.length > 30) {
      return invalid('Phone number is too long.');
    }

    // Check for an existing profile before inserting.
    const { data: existing, error: checkError } =
      await supabase
        .from('trade_profiles')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

    if (checkError) {
      return fail(500, {
        message: 'Unable to check existing profile.',
        values
      });
    }

    if (existing) {
      redirect(303, '/dashboard');
    }

    const { error: insertError } = await supabase
      .from('trade_profiles')
      .insert({
        user_id: user.id,
        account_type: accountType,
        full_name: fullName,
        company_name: companyName,
        country,
        phone: phone || null,
        verification_status: 'pending'
      });

    if (insertError) {
      console.error('Trade profile creation failed:', insertError.code);

      return fail(400, {
        message: 'Unable to save your business profile.',
        values
      });
    }

    redirect(
      303,
      accountType === 'exporter'
        ? '/exporter/assessment'
        : '/dashboard'
    );
  }
};

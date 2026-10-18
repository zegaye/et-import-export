
import { fail, redirect, error } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

const ACCOUNT_TYPES = [
  'exporter',
  'buyer',
  'international_supplier'
];

/**
 * @param {string} accountType
 */
function destinationFor(accountType) {
  if (accountType === 'exporter') {
    return '/exporter/assessment';
  }

  if (accountType === 'international_supplier') {
    return '/international-supplier/assessment';
  }

  return '/dashboard';
}

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({
    'cache-control': 'private, no-store'
  });

  const supabase = createAuthClient(event);

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

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

  const metadata = user.user_metadata ?? {};

  const metadataType =
    typeof metadata.account_type === 'string'
      ? metadata.account_type
      : '';

  return {
    email: user.email ?? '',
    accountType: ACCOUNT_TYPES.includes(metadataType)
      ? metadataType
      : '',
    fullName: metadata.full_name ?? '',
    companyName: metadata.company_name ?? '',
    country: metadata.country ?? '',
    phone: metadata.phone ?? ''
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const supabase = createAuthClient(event);

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect(303, '/login');
    }

    const form = await event.request.formData();

    /** @param {string} key */
    const read = (key) => {
      const value = form.get(key);
      return typeof value === 'string'
        ? value.trim()
        : '';
    };

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

    if (!ACCOUNT_TYPES.includes(accountType)) {
      return invalid('Select a valid account type.');
    }

    // A role chosen at signup cannot be changed
    // through the profile-completion form.
    const registeredType = user.user_metadata?.account_type;

    if (
      typeof registeredType === 'string' &&
      ACCOUNT_TYPES.includes(registeredType) &&
      accountType !== registeredType
    ) {
      return invalid(
        'Your account type must match the role selected during registration.'
      );
    }

    if (!fullName || fullName.length > 100) {
      return invalid(
        'Enter a valid full name (maximum 100 characters).'
      );
    }

    if (!companyName || companyName.length > 150) {
      return invalid(
        'Enter a valid company name (maximum 150 characters).'
      );
    }

    if (!country || country.length > 100) {
      return invalid('Enter a valid country.');
    }

    if (
      accountType === 'exporter' &&
      country.toLowerCase() !== 'ethiopia'
    ) {
      return invalid(
        'Ethiopian Exporters must be based in Ethiopia.'
      );
    }

    if (
      accountType === 'international_supplier' &&
      country.toLowerCase() === 'ethiopia'
    ) {
      return invalid(
        'International Suppliers must be based outside Ethiopia.'
      );
    }

    if (
      phone.length > 30 ||
      (phone && !/^\+?[0-9()\s.-]{7,30}$/.test(phone))
    ) {
      return invalid('Enter a valid phone number.');
    }

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
      console.error(
        'Trade profile creation failed:',
        insertError.code
      );

      return fail(400, {
        message: 'Unable to save your business profile.',
        values
      });
    }

    redirect(303, destinationFor(accountType));
  }
};

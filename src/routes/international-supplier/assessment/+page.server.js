
import { fail, redirect, error } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

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

  const { data: profile, error: profileError } =
    await supabase
      .from('trade_profiles')
      .select('account_type')
      .eq('user_id', user.id)
      .maybeSingle();

  if (profileError) {
    console.error('Supplier profile error:', profileError);
    error(500, 'Unable to load supplier profile.');
  }

  if (!profile) {
    redirect(303, '/complete-profile');
  }

  if (profile.account_type !== 'international_supplier') {
    error(403, 'International suppliers only.');
  }

  const { data: assessments, error: assessmentError } =
    await supabase
      .from('international_supplier_assessments')
      .select('id, score, status, attempt_number, submitted_at')
      .eq('supplier_id', user.id)
      .order('attempt_number', { ascending: false })
      .limit(1);

  if (assessmentError) {
    console.error('Assessment loading error:', assessmentError);
    error(500, 'Unable to load assessment results.');
  }

  return {
    latest: assessments?.[0] ?? null,
    canSubmit: !assessments?.length
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

    const { data: profile, error: profileError } =
      await supabase
        .from('trade_profiles')
        .select('account_type')
        .eq('user_id', user.id)
        .maybeSingle();

    if (profileError) {
      return fail(500, {
        message: 'Unable to verify supplier profile.'
      });
    }

    if (!profile || profile.account_type !== 'international_supplier') {
      return fail(403, {
        message: 'A valid international supplier profile is required.'
      });
    }

    const { data: previous, error: previousError } =
      await supabase
        .from('international_supplier_assessments')
        .select('id')
        .eq('supplier_id', user.id)
        .limit(1);

    if (previousError) {
      console.error('Previous assessment check:', previousError);
      return fail(500, {
        message: 'Unable to check previous assessments.'
      });
    }

    if (previous?.length) {
      return fail(409, {
        message: 'You have already submitted an assessment.'
      });
    }

    const form = await event.request.formData();
    const raw = form.get('answers');

    if (
      typeof raw !== 'string' ||
      raw.length > 5000
    ) {
      return fail(400, {
        message: 'Invalid assessment data.'
      });
    }

    /** @type {Record<string, string>} */
    let answers;

    try {
      const parsed = JSON.parse(raw);

      if (
        !parsed ||
        typeof parsed !== 'object' ||
        Array.isArray(parsed)
      ) {
        throw new Error('Invalid answer format.');
      }

      if (
        Object.keys(parsed).length !== 20 ||
        !Object.values(parsed).every(
          (value) =>
            typeof value === 'string' &&
            ['A', 'B', 'C', 'D'].includes(value)
        )
      ) {
        return fail(400, {
          message: 'Please answer all 20 assessment questions.'
        });
      }

      answers = parsed;
    } catch {
      return fail(400, {
        message: 'Invalid assessment answers.'
      });
    }

    const { data, error: submissionError } =
      await supabase.rpc(
        'submit_international_supplier_assessment',
        {
          p_answers: answers
        }
      );

    if (submissionError) {
      console.error('Supplier assessment RPC error:', {
        code: submissionError.code,
        message: submissionError.message,
        details: submissionError.details,
        hint: submissionError.hint
      });

      return fail(400, {
        message:
          'Assessment submission failed: ' +
          (submissionError.message || 'Unknown database error.')
      });
    }

    if (data == null || (Array.isArray(data) && data.length === 0)) {
      console.error('Assessment RPC returned no result:', data);

      return fail(500, {
        message: 'Assessment submission returned no result.'
      });
    }

    redirect(303, '/international-supplier/assessment');
  }
};

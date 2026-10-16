
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

  const { data: profile, error: profileError } = await supabase
    .from('trade_profiles')
    .select('account_type')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    error(500, 'Unable to load exporter profile.');
  }

  if (!profile) {
    redirect(303, '/complete-profile');
  }

  if (profile.account_type !== 'exporter') {
    error(403, 'This assessment is for exporters only.');
  }

  const { data: assessments, error: assessmentError } =
    await supabase
      .from('exporter_assessments')
      .select('id, score, status, attempt_number, submitted_at')
      .eq('exporter_id', user.id)
      .order('attempt_number', { ascending: false })
      .limit(1);

  if (assessmentError) {
    error(500, 'Unable to check previous assessments.');
  }

  const latest = assessments?.[0] ?? null;

  let canSubmit = !latest;

  if (latest?.status === 'needs_support') {
    const { data: support, error: supportError } = await supabase
      .from('exporter_support_cases')
      .select('status, visit_date, reassessment_authorized_at')
      .eq('assessment_id', latest.id)
      .maybeSingle();

    if (supportError) {
      error(500, 'Unable to check reassessment eligibility.');
    }

    canSubmit =
      support?.status === 'reassessment_authorized' &&
      Boolean(support.visit_date) &&
      new Date(support.visit_date).getTime() <= Date.now() &&
      Boolean(support.reassessment_authorized_at);
  }

  return {
    canSubmit,
    latest
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
    const raw = String(form.get('answers') ?? '');

    if (raw.length > 5000) {
      return fail(400, {
        message: 'Assessment data is too large.'
      });
    }

    /** @type {Record<string, string>} */
    let answers;

    try {
      answers = JSON.parse(raw);

      if (
        !answers ||
        typeof answers !== 'object' ||
        Array.isArray(answers)
      ) {
        throw new Error('Invalid format');
      }
    } catch {
      return fail(400, {
        message: 'Invalid assessment answers.'
      });
    }

    const { data, error: submissionError } = await supabase
      .rpc('submit_exporter_assessment', {
        p_answers: answers
      });

    if (submissionError) {
      console.error(
        'Assessment submission failed:',
        submissionError.code
      );

      return fail(400, {
        message:
          'Unable to submit assessment. Check that all 20 questions are answered and that you are eligible to submit.'
      });
    }

    if (!data?.length) {
      return fail(500, {
        message: 'No assessment result was returned.'
      });
    }

    redirect(303, '/exporter/assessment/result');
  }
};


import { error, redirect } from '@sveltejs/kit';
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
    .select('account_type, company_name, full_name')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    error(500, 'Unable to load business profile.');
  }

  if (!profile) {
    redirect(303, '/complete-profile');
  }

  if (profile.account_type !== 'exporter') {
    error(403, 'This page is available to exporters only.');
  }

  const { data: assessment, error: assessmentError } =
    await supabase
      .from('exporter_assessments')
      .select(
        'id, score, status, attempt_number, submitted_at'
      )
      .eq('exporter_id', user.id)
      .order('attempt_number', { ascending: false })
      .limit(1)
      .maybeSingle();

  if (assessmentError) {
    error(500, 'Unable to load assessment result.');
  }

  if (!assessment) {
    redirect(303, '/exporter/assessment');
  }

  let supportCase = null;

  if (assessment.status === 'needs_support') {
    const { data: support, error: supportError } =
      await supabase
        .from('exporter_support_cases')
        .select('status, visit_date, recommendations')
        .eq('assessment_id', assessment.id)
        .maybeSingle();

    if (supportError) {
      error(500, 'Unable to load facilitation support details.');
    }

    supportCase = support;
  }

  return {
    profile,
    assessment,
    supportCase
  };
}

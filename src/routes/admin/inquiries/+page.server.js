import { error, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '$lib/server/auth.js';

function createDatabaseClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SECRET_KEY) {
    error(500, 'Supabase database settings are missing.');
  }

  return createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}

/** @param {string} id */
function isValidId(id) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

/** @param {string} value */
function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  if (value < '0001-01-01' || value > '9999-12-31') return false;

  const parsed = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  event.setHeaders({ 'cache-control': 'private, no-store' });

  const { user } = await requireAdmin(event);
  const database = createDatabaseClient();

  const { data: inquiries, error: databaseError } = await database
    .from('buyer_inquiries')
    .select(
      'id, full_name, company, email, phone, inquiry_type, product_name, quantity, message, status, created_at, internal_notes, follow_up_date'
    )
    .order('created_at', { ascending: false })
    .limit(100);

  if (databaseError) {
    console.error('Admin inquiries error:', databaseError.message);
    error(500, 'Unable to load inquiries. Please try again.');
  }

  // Supply today's date in Ethiopia for the dashboard.
  const dateParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Addis_Ababa',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const year = dateParts.find((part) => part.type === 'year')?.value;
  const month = dateParts.find((part) => part.type === 'month')?.value;
  const day = dateParts.find((part) => part.type === 'day')?.value;

  return {
    email: user.email,
    inquiries: inquiries ?? [],
    today: `${year}-${month}-${day}`
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  saveFollowUp: async (event) => {
    await requireAdmin(event);

    const form = await event.request.formData();
    const id = String(form.get('id') ?? '').trim();
    const followUpDate = String(form.get('followUpDate') ?? '').trim();
    const previousDate = String(form.get('previousDate') ?? '').trim();

    if (
      !isValidId(id) ||
      (followUpDate !== '' && !isValidDate(followUpDate)) ||
      (previousDate !== '' && !isValidDate(previousDate))
    ) {
      return fail(400, {
        success: false,
        message: 'Choose a valid follow-up date.',
        followUpId: id,
        followUpDate
      });
    }

    const database = createDatabaseClient();

    let query = database
      .from('buyer_inquiries')
      .update({ follow_up_date: followUpDate || null })
      .eq('id', id);

    // Avoid overwriting a date changed since this page was loaded.
    query = previousDate
      ? query.eq('follow_up_date', previousDate)
      : query.is('follow_up_date', null);

    const { data: updated, error: databaseError } = await query.select('id');

    if (databaseError) {
      console.error('Follow-up date error:', databaseError.message);

      return fail(500, {
        success: false,
        message: 'Unable to save the follow-up date. Please try again.',
        followUpId: id,
        followUpDate
      });
    }

    if (!updated?.length) {
      return fail(409, {
        success: false,
        message:
          'The follow-up date changed or the inquiry no longer exists. Refresh and check before saving again.',
        followUpId: id,
        followUpDate
      });
    }

    return {
      success: true,
      message: followUpDate
        ? 'Follow-up date saved.'
        : 'Follow-up date cleared.'
    };
  },

  saveNotes: async (event) => {
    await requireAdmin(event);

    const form = await event.request.formData();
    const id = String(form.get('id') ?? '').trim();
    const notes = String(form.get('notes') ?? '').trim();
    const previousNotes = String(form.get('previousNotes') ?? '');

    if (!isValidId(id) || notes.length > 5000) {
      return fail(400, {
        success: false,
        message: 'Provide a valid inquiry and no more than 5,000 characters.',
        noteId: id,
        notes
      });
    }

    const database = createDatabaseClient();

    const { data: updated, error: databaseError } = await database
      .from('buyer_inquiries')
      .update({ internal_notes: notes })
      .eq('id', id)
      .eq('internal_notes', previousNotes)
      .select('id');

    if (databaseError) {
      console.error('Inquiry notes error:', databaseError.message);

      return fail(500, {
        success: false,
        message: 'Unable to save notes. Please try again.',
        noteId: id,
        notes
      });
    }

    if (!updated?.length) {
      return fail(409, {
        success: false,
        message:
          'These notes changed or the inquiry no longer exists. Copy your draft, refresh, and check the latest notes before saving again.',
        noteId: id,
        notes
      });
    }

    return {
      success: true,
      message: 'Private follow-up notes saved.'
    };
  },

  updateStatus: async (event) => {
    await requireAdmin(event);

    const form = await event.request.formData();
    const id = String(form.get('id') ?? '').trim();
    const status = String(form.get('status') ?? '').trim();
    const previousStatus = String(form.get('previousStatus') ?? '').trim();

    const allowedStatuses = ['new', 'contacted', 'closed'];

    if (
      !isValidId(id) ||
      !allowedStatuses.includes(status) ||
      !allowedStatuses.includes(previousStatus)
    ) {
      return fail(400, {
        success: false,
        message: 'Invalid inquiry update request.'
      });
    }

    const database = createDatabaseClient();

    const { data: updated, error: databaseError } = await database
      .from('buyer_inquiries')
      .update({ status })
      .eq('id', id)
      .eq('status', previousStatus)
      .select('id');

    if (databaseError) {
      console.error('Inquiry status error:', databaseError.message);

      return fail(500, {
        success: false,
        message: 'Unable to update the inquiry. Please try again.'
      });
    }

    if (!updated?.length) {
      return fail(409, {
        success: false,
        message:
          'This inquiry changed or no longer exists. Refresh the page and try again.'
      });
    }

    return {
      success: true,
      message: `Inquiry marked as ${status}.`
    };
  }
};

import { json } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  const supabase = createAuthClient(event);

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return json(
      { error: 'Please sign in to view your conversations.' },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from('ai_conversations')
    .select('id, title, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('AI conversations GET:', error);

    return json(
      { error: 'Unable to load conversations.' },
      { status: 500 }
    );
  }

  return json(
    { conversations: data ?? [] },
    {
      headers: {
        'cache-control': 'private, no-store'
      }
    }
  );
}

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
  const supabase = createAuthClient(event);

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return json(
      { error: 'Please sign in to create a conversation.' },
      { status: 401 }
    );
  }

  let body;

  try {
    body = await event.request.json();
  } catch {
    return json(
      { error: 'Invalid JSON request.' },
      { status: 400 }
    );
  }

  const title =
    typeof body?.title === 'string'
      ? body.title.trim()
      : 'New Conversation';

  if (!title || title.length > 120) {
    return json(
      { error: 'Conversation title must be 1–120 characters.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('ai_conversations')
    .insert({
      user_id: user.id,
      title
    })
    .select('id, title, created_at, updated_at')
    .single();

  if (error) {
    console.error('AI conversations POST:', error);

    return json(
      { error: 'Unable to create conversation.' },
      { status: 500 }
    );
  }

  return json(
    { conversation: data },
    {
      status: 201,
      headers: {
        'cache-control': 'private, no-store'
      }
    }
  );
}

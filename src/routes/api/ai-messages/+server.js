import { json } from '@sveltejs/kit';
import { createAuthClient } from '$lib/server/auth.js';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
  const supabase = createAuthClient(event);
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return json({ error: 'Sign in required.' }, { status: 401 });
  const id = event.url.searchParams.get('conversation_id');
  if (!id || !UUID.test(id)) return json({ error: 'Invalid conversation ID.' }, { status: 400 });
  const { data: conversation, error: lookupError } = await supabase.from('ai_conversations')
    .select('id').eq('id', id).eq('user_id', user.id).maybeSingle();
  if (lookupError) return json({ error: 'Unable to verify conversation.' }, { status: 500 });
  if (!conversation) return json({ error: 'Conversation not found.' }, { status: 404 });
  const { data, error } = await supabase.from('ai_messages')
    .select('id, role, content, created_at')
    .eq('conversation_id', id).eq('user_id', user.id)
    .order('created_at', { ascending: true }).order('id', { ascending: true }).limit(200);
  if (error) return json({ error: 'Unable to load messages.' }, { status: 500 });
  return json({ messages: data ?? [] }, { headers: { 'cache-control': 'private, no-store' } });
}

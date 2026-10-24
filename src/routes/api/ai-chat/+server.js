
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { GoogleGenAI } from '@google/genai';
import { createAuthClient } from '$lib/server/auth.js';

const MODEL = 'gemini-3.5-flash-lite';
const MAX_MESSAGE = 3000;
const MAX_HISTORY = 12;
const MAX_HISTORY_TEXT = 4000;

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const SYSTEM_INSTRUCTIONS = `
You are ET Trade AI, the intelligent trade assistant
for the ET Import–Export platform in Ethiopia.

Help Ethiopian exporters, importers, farmers,
cooperatives, manufacturers and international buyers.

Your expertise includes Ethiopian trade procedures,
export readiness, coffee, oilseeds, pulses, textiles,
export documents, certificates of origin, Incoterms,
customs, logistics and international markets.

Use conversation history to answer follow-up questions.

Support English, Amharic and Afaan Oromoo.
When Afaan Oromoo is selected, respond in natural,
clear Afaan Oromoo suitable for Ethiopian farmers
and agricultural cooperatives.

Explain complicated trade terms simply.

Never invent customs duties, government fees,
legal requirements, exchange rates, market prices
or verified buyers and suppliers.

Never claim live verification unless it occurred.
State when official verification is necessary.
Never request passwords, API keys or banking secrets.

Be clear, professional, friendly and practical.
`;

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
  const supabase = createAuthClient(event);

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return json(
      { error: 'Please sign in to use ET Trade AI.' },
      { status: 401 }
    );
  }

  const userId = user.id;

  if (!env.GEMINI_API_KEY) {
    return json(
      { error: 'Gemini is not configured.' },
      { status: 500 }
    );
  }

  /** @type {any} */
  let body;

  try {
    body = await event.request.json();
  } catch {
    return json(
      { error: 'Invalid JSON request.' },
      { status: 400 }
    );
  }

  const message = body?.message;
  const language = body?.language ?? 'auto';
  const conversationId = body?.conversation_id;

  if (
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > MAX_MESSAGE
  ) {
    return json(
      { error: 'Message must be 1–3000 characters.' },
      { status: 400 }
    );
  }

  if (!['auto', 'en', 'am', 'om'].includes(language)) {
    return json(
      { error: 'Invalid language.' },
      { status: 400 }
    );
  }

  if (
    typeof conversationId !== 'string' ||
    !UUID.test(conversationId)
  ) {
    return json(
      { error: 'Invalid conversation ID.' },
      { status: 400 }
    );
  }

  // Verify conversation ownership.
  const {
    data: conversation,
    error: conversationError
  } = await supabase
    .from('ai_conversations')
    .select('id')
    .eq('id', conversationId)
    .eq('user_id', userId)
    .maybeSingle();

  if (conversationError) {
    console.error(
      'Conversation verification:',
      conversationError
    );

    return json(
      { error: 'Unable to verify conversation.' },
      { status: 500 }
    );
  }

  if (!conversation) {
    return json(
      { error: 'Conversation not found.' },
      { status: 404 }
    );
  }

  // Load permanent conversation history.
  const {
    data: recent,
    error: historyError
  } = await supabase
    .from('ai_messages')
    .select('role, content, created_at, id')
    .eq('conversation_id', conversationId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(MAX_HISTORY);

  if (historyError) {
    console.error('Conversation history:', historyError);

    return json(
      { error: 'Unable to load conversation memory.' },
      { status: 500 }
    );
  }

  // Keep complete user/assistant exchanges.
  const ordered = [...(recent ?? [])].reverse();

  while (
    ordered.length > 0 &&
    ordered[0].role !== 'user'
  ) {
    ordered.shift();
  }

  while (
    ordered.length > 0 &&
    ordered[ordered.length - 1].role !== 'assistant'
  ) {
    ordered.pop();
  }

  /** @type {typeof ordered} */
  const validHistory = [];

  for (let i = 0; i + 1 < ordered.length; i += 2) {
    if (
      ordered[i].role !== 'user' ||
      ordered[i + 1].role !== 'assistant'
    ) {
      break;
    }

    validHistory.push(ordered[i], ordered[i + 1]);
  }

  const contents = [
    ...validHistory.map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [
        {
          text: item.content.slice(0, MAX_HISTORY_TEXT)
        }
      ]
    })),
    {
      role: 'user',
      parts: [{ text: message.trim() }]
    }
  ];

  const languageInstruction =
    language === 'om'
      ? 'Respond in natural Afaan Oromoo suitable for Ethiopian farmers.'
      : language === 'am'
        ? 'Respond in Amharic.'
        : language === 'en'
          ? 'Respond in English.'
          : 'Respond in the language of the latest user question.';

  /** @type {string} */
  let reply;

  try {
    const ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction:
          SYSTEM_INSTRUCTIONS + '\n' + languageInstruction,
        temperature: 0.3,
        maxOutputTokens: 1800
      }
    });

    const generatedText = response.text?.trim();

    if (!generatedText) {
      return json(
        { error: 'Gemini returned an empty response.' },
        { status: 502 }
      );
    }

    reply = generatedText;
  } catch (err) {
    console.error('Gemini request failed:', err);

    let status = 500;

    if (
      err !== null &&
      typeof err === 'object' &&
      'status' in err
    ) {
      const possibleStatus = err.status;

      if (typeof possibleStatus === 'number') {
        status = possibleStatus;
      }
    }

    return json(
      {
        error:
          status === 429
            ? 'AI usage limit reached. Try again later.'
            : 'Unable to contact Gemini AI.'
      },
      { status: status === 429 ? 429 : 502 }
    );
  }

  // Save both messages to Supabase.
  const { error: saveError } = await supabase
    .from('ai_messages')
    .insert([
      {
        conversation_id: conversationId,
        user_id: userId,
        role: 'user',
        content: message.trim()
      },
      {
        conversation_id: conversationId,
        user_id: userId,
        role: 'assistant',
        content: reply
      }
    ]);

  if (saveError) {
    console.error('Save AI exchange:', saveError);

    return json(
      {
        error:
          'AI replied, but saving the conversation failed. Please retry.'
      },
      { status: 500 }
    );
  }

  // Update the conversation timestamp.
  const { error: updateError } = await supabase
    .from('ai_conversations')
    .update({
      updated_at: new Date().toISOString()
    })
    .eq('id', conversationId)
    .eq('user_id', userId);

  if (updateError) {
    console.error('Update AI conversation:', updateError);
  }

  return json({
    reply,
    conversation_id: conversationId
  });
}

<script>
  import { onMount, tick } from 'svelte';

  let input = $state('');
  let loading = $state(false);
  let loadingHistory = $state(true);
  let errorMessage = $state('');
  let language = $state('auto');
  let conversationId = $state('');
  let sidebarOpen = $state(false);
  /** @type {{id:string,title:string,updated_at:string}[]} */
  let conversations = $state([]);
  /** @type {{role:'user'|'assistant',text:string}[]} */
  let messages = $state([]);
  /** @type {HTMLElement | undefined} */
  let chatContainer = $state();

  const welcome = 'Welcome to ET Trade AI! 🇪🇹\nI can help with Ethiopian imports, exports, documents and markets.\nእንኳን ወደ ET Trade AI በደህና መጡ!';
  const suggestions = [
    'How can I export coffee from Ethiopia?',
    'What documents do I need to export?',
    'How can I find international buyers?',
    'ከኢትዮጵያ ቡና ለመላክ ምን ያስፈልጋል?'
  ];

  onMount(() => { void loadConversations(); });

  /** @param {Response} response */
  async function readResponse(response) {
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed.');
    return data;
  }

  async function loadConversations() {
    loadingHistory = true;
    try {
      const result = await readResponse(await fetch('/api/ai-conversations'));
      conversations = result.conversations ?? [];
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to load chats.';
    } finally { loadingHistory = false; }
  }

  /** @param {string} id */
  async function openChat(id) {
    if (loading) return;
    errorMessage = '';
    loadingHistory = true;
    try {
      const result = await readResponse(await fetch('/api/ai-messages?conversation_id=' + encodeURIComponent(id)));
      messages = (result.messages ?? []).map(
  /** @param {{role: 'user' | 'assistant', content: string}} m */
  (m) => ({
    role: m.role,
    text: m.content
  })
);
      conversationId = id;
      sidebarOpen = false;
      await scrollToBottom();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Unable to open chat.';
    } finally { loadingHistory = false; }
  }

  function newChat() {
    if (loading) return;
    conversationId = '';
    messages = [];
    input = '';
    errorMessage = '';
    sidebarOpen = false;
  }

  async function scrollToBottom() {
    await tick();
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  /** @param {string} [text] */
  async function sendMessage(text = input) {
    const message = text.trim();
    if (!message || loading || loadingHistory || message.length > 3000) return;
    loading = true;
    errorMessage = '';
    input = '';
    const originalId = conversationId;
    let createdId = '';
    try {
      if (!conversationId) {
        const title = message.slice(0, 75);
        const result = await readResponse(await fetch('/api/ai-conversations', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title })
        }));
        createdId = result.conversation.id;
        conversationId = createdId;
        conversations = [result.conversation, ...conversations];
      }
      messages = [...messages, { role: 'user', text: message }];
      await scrollToBottom();
      const result = await readResponse(await fetch('/api/ai-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId, message, language })
      }));
      messages = [...messages, { role: 'assistant', text: result.reply }];
      await loadConversations();
      await scrollToBottom();
    } catch (error) {
      if (messages.at(-1)?.role === 'user' && messages.at(-1)?.text === message)
        messages = messages.slice(0, -1);
      input = message;
      errorMessage = error instanceof Error ? error.message : 'Something went wrong.';
      if (!createdId) conversationId = originalId;
    } finally { loading = false; }
  }

  /** @param {KeyboardEvent} event */
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  /** @param {string} id */
  async function renameChat(id) {
    const chat = conversations.find((item) => item.id === id);
    if (!chat || loading) return;
    const title = window.prompt('Rename conversation:', chat.title)?.trim();
    if (!title || title === chat.title) return;
    if (title.length > 120) { errorMessage = 'Title must be 120 characters or fewer.'; return; }
    try {
      await readResponse(await fetch('/api/ai-conversations/' + encodeURIComponent(id), {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      }));
      await loadConversations();
    } catch (error) { errorMessage = error instanceof Error ? error.message : 'Rename failed.'; }
  }

  /** @param {string} id */
  async function deleteChat(id) {
    if (loading || !window.confirm('Delete this conversation permanently?')) return;
    try {
      await readResponse(await fetch('/api/ai-conversations/' + encodeURIComponent(id), { method: 'DELETE' }));
      if (conversationId === id) newChat();
      await loadConversations();
    } catch (error) { errorMessage = error instanceof Error ? error.message : 'Delete failed.'; }
  }
</script>

<svelte:head>
  <title>ET Trade AI | ET Import–Export</title>
  <meta name="description" content="AI trade assistant for Ethiopian exporters and importers." />
</svelte:head>

<div class="page">
  <div class="layout">
    <aside class:open={sidebarOpen} class="sidebar">
      <div class="sidebar-top">
        <strong>Conversation History</strong>
        <button class="close-sidebar" onclick={() => (sidebarOpen = false)} aria-label="Close history">✕</button>
      </div>
      <button class="sidebar-new" onclick={newChat} disabled={loading}>＋ New Chat</button>
      {#if loadingHistory}<p class="muted">Loading chats...</p>{/if}
      {#each conversations as chat (chat.id)}
        <div class:active={conversationId === chat.id} class="history-item">
          <button class="history-title" onclick={() => openChat(chat.id)} disabled={loading || loadingHistory} title={chat.title}>{chat.title}</button>
          <div class="history-actions">
            <button onclick={() => renameChat(chat.id)} disabled={loading} aria-label="Rename conversation" title="Rename">✎</button>
            <button onclick={() => deleteChat(chat.id)} disabled={loading} aria-label="Delete conversation" title="Delete">✕</button>
          </div>
        </div>
      {/each}
      {#if !loadingHistory && conversations.length === 0}<p class="muted">No saved chats yet.</p>{/if}
      <p class="sidebar-note">Your conversations are private to your signed-in account.</p>
    </aside>

    <main class="chat-shell">
      <header class="header">
        <div class="identity">
          <button class="menu" onclick={() => (sidebarOpen = !sidebarOpen)} aria-label="Toggle history">☰</button>
          <div class="logo">✦</div>
          <div><h1>ET Trade AI</h1><p>Ethiopian Import & Export Assistant</p></div>
        </div>
        <button class="new-chat" onclick={newChat} disabled={loading}>+ New Chat</button>
      </header>
      <div class="toolbar">
        <div class="language-picker"><label for="language">Language</label>
          <select id="language" bind:value={language} disabled={loading}>
            <option value="auto">Auto Detect</option><option value="en">English</option><option value="am">አማርኛ</option>
          </select>
        </div>
        <div class="memory-status"><span class="status-dot"></span> Supabase History Enabled</div>
      </div>
      <section class="intro"><span class="eyebrow">YOUR AI TRADE PARTNER</span>
        <h2>Trade Smarter. Reach Further.</h2>
        <p>Your AI-powered assistant for Ethiopian trade, export readiness, and global markets.</p>
      </section>
      <section class="messages" aria-label="Chat conversation" aria-live="polite" bind:this={chatContainer}>
        <div class="message-row assistant"><div class="avatar ai-avatar">✦</div><div class="bubble welcome">{welcome}</div></div>
        {#each messages as item, index (index)}
          <div class:user={item.role === 'user'} class:assistant={item.role === 'assistant'} class="message-row">
            <div class="avatar">{item.role === 'assistant' ? '✦' : 'U'}</div>
            <div class="bubble">{item.text}</div>
          </div>
        {/each}
        {#if loading}<div class="message-row assistant"><div class="avatar ai-avatar">✦</div><div class="bubble thinking">ET Trade AI is thinking...</div></div>{/if}
      </section>
      {#if messages.length === 0}
        <section class="suggestions"><p>Try asking:</p><div class="suggestion-grid">
          {#each suggestions as suggestion}<button onclick={() => sendMessage(suggestion)} disabled={loading || loadingHistory}>{suggestion} ↗</button>{/each}
        </div></section>
      {/if}
      {#if errorMessage}<div class="error" role="alert">{errorMessage}</div>{/if}
      <form class="composer" onsubmit={(event) => { event.preventDefault(); void sendMessage(); }}>
        <textarea bind:value={input} onkeydown={handleKeydown} placeholder="Ask ET Trade AI... / ጥያቄዎን ይጻፉ..." rows="2" maxlength="3000" disabled={loading || loadingHistory} aria-label="Your trade question"></textarea>
        <button class="send" type="submit" disabled={loading || loadingHistory || !input.trim()}>{loading ? 'Wait...' : 'Send ➤'}</button>
      </form>
      <footer>Conversations are saved to your account. Verify official trade requirements before making business decisions.</footer>
    </main>
  </div>
</div>

<style>
  .page { min-height:100vh; padding:25px 14px; background:#edf3f6; color:#173247; font-family:Arial,sans-serif; }
  .layout { max-width:1250px; margin:auto; display:grid; grid-template-columns:285px minmax(0,1fr); gap:16px; align-items:start; }
  .sidebar,.chat-shell { background:white; border:1px solid #e0e9ef; border-radius:18px; overflow:hidden; box-shadow:0 15px 40px rgba(12,39,60,.07); }
  .sidebar { padding:17px 12px; min-height:650px; }
  .sidebar-top { display:flex; justify-content:space-between; align-items:center; padding:6px 8px 18px; }
  .sidebar-new { width:100%; padding:12px; border:0; border-radius:10px; background:#087e68; color:white; font-weight:bold; margin-bottom:14px; }
  .history-item { border-radius:10px; padding:7px; margin-bottom:6px; border:1px solid transparent; }
  .history-item:hover,.history-item.active { background:#eaf6f1; border-color:#cce7db; }
  .history-title { width:100%; text-align:left; background:none; border:0; color:#173247; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:6px 4px; }
  .history-actions { display:flex; justify-content:flex-end; gap:10px; }
  .history-actions button { border:0; background:none; color:#536b7a; padding:3px 7px; }
  .history-actions button:hover { color:#087e68; }
  .muted,.sidebar-note { color:#8395a3; font-size:12px; padding:8px; line-height:1.6; }
  .sidebar-note { margin-top:25px; }
  .header { background:#102f46; color:white; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .identity { display:flex; align-items:center; gap:12px; min-width:0; }
  .logo { width:43px; height:43px; display:grid; place-items:center; background:#0e967d; border-radius:13px; font-size:26px; flex-shrink:0; }
  h1 { font-size:21px; margin:0; } .identity p { font-size:12px; color:#cbd5e1; margin:5px 0 0; }
  button { cursor:pointer; font:inherit; } button:disabled { opacity:.5; cursor:not-allowed; }
  .new-chat { background:transparent; color:white; border:1px solid #7994a6; padding:10px 13px; border-radius:9px; white-space:nowrap; }
  .menu { display:none; border:0; background:transparent; color:white; font-size:24px; }
  .close-sidebar { display:none; border:0; background:transparent; font-size:18px; }
  .toolbar { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding:14px 24px; border-bottom:1px solid #e5edf2; background:#f8fbfc; }
  .language-picker { display:flex; align-items:center; gap:10px; } .language-picker label { font-size:13px; color:#536b7a; }
  select { padding:9px; border:1px solid #ccd9e1; border-radius:8px; background:white; color:#173247; }
  .memory-status { display:flex; align-items:center; gap:7px; color:#087e68; font-size:12px; font-weight:bold; }
  .status-dot { width:8px; height:8px; background:#16a085; border-radius:50%; }
  .intro { padding:26px 20px 12px; text-align:center; } .eyebrow { font-size:11px; color:#087e68; font-weight:bold; letter-spacing:1.5px; }
  h2 { margin:12px 0; font-size:clamp(22px,4vw,29px); } .intro p { font-size:14px; color:#65798a; line-height:1.6; }
  .messages { height:380px; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:17px; }
  .message-row { display:flex; align-items:flex-start; gap:10px; } .message-row.user { flex-direction:row-reverse; }
  .avatar { flex-shrink:0; width:34px; height:34px; border-radius:50%; display:grid; place-items:center; background:#dce9ff; color:#1d4ed8; font-weight:bold; }
  .ai-avatar,.assistant .avatar { background:#dcf6eb; color:#087e68; }
  .bubble { max-width:80%; background:#f0f5f8; border-radius:15px; padding:14px 17px; line-height:1.75; font-size:14px; white-space:pre-wrap; overflow-wrap:anywhere; }
  .user .bubble { background:#087e68; color:white; } .thinking { color:#64748b; font-style:italic; }
  .suggestions { padding:12px 20px; } .suggestions p { font-size:12px; color:#64748b; }
  .suggestion-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; }
  .suggestion-grid button { background:#f8fbfc; border:1px solid #dce6eb; border-radius:9px; padding:13px; text-align:left; font-size:12px; color:#173247; }
  .suggestion-grid button:hover { background:#e3f5ed; }
  .error { margin:10px 20px; padding:12px; border-radius:9px; background:#fef2f2; color:#b91c1c; font-size:13px; }
  .composer { border-top:1px solid #e5edf2; padding:17px 20px; display:flex; gap:10px; }
  textarea { flex:1; min-width:0; padding:13px; border:1px solid #cbd5e1; border-radius:10px; resize:vertical; font:inherit; font-size:14px; }
  textarea:focus { outline:2px solid #0e967d; border-color:transparent; }
  .send { background:#087e68; color:white; border:0; border-radius:10px; padding:0 20px; font-weight:bold; }
  footer { padding:0 18px 18px; color:#8395a3; font-size:11px; text-align:center; line-height:1.6; }
  @media(max-width:850px) { .layout { display:block; } .sidebar { display:none; position:fixed; z-index:20; top:10px; left:10px; bottom:10px; width:min(320px,calc(100vw - 20px)); overflow-y:auto; min-height:0; box-shadow:0 10px 45px #102f4655; } .sidebar.open { display:block; } .menu,.close-sidebar { display:block; } }
  @media(max-width:600px) { .page { padding:8px; } .header,.toolbar { padding:14px; } .identity p { font-size:10px; } .messages { padding:12px; height:370px; } .bubble { max-width:85%; } .suggestion-grid { grid-template-columns:1fr; } .composer { padding:12px; } .send { padding:0 14px; } }
</style>

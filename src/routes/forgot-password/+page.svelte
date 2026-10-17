
<script>
  let { form } = $props();
</script>

<svelte:head>
  <title>Forgot Password | ET Import Export</title>
</svelte:head>

<main>
  <section>
    <a class="brand" href="/">ET Import Export</a>
    <h1>Reset your password</h1>
    <p>
      Enter your registered email address. We'll send
      password recovery instructions if the account
      is eligible.
    </p>

    {#if form?.message}
      <p class:success={form?.success} class="message"
        role="status">
        {form.message}
      </p>
    {/if}

    <form method="POST">
      <label for="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        value={form?.email ?? ''}
        required
      />

      <button type="submit">Send reset link</button>
    </form>

    <a class="back" href="/login">← Back to sign in</a>
  </section>
</main>

<style>
  main {
    min-height: 90vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: #f3f7f3;
    font-family: Arial, sans-serif;
    color: #173d32;
  }
  section {
    width: 100%;
    max-width: 440px;
    padding: 32px;
    background: white;
    border: 1px solid #dce7df;
    border-radius: 16px;
    box-sizing: border-box;
  }
  .brand, .back {
    color: #146b4c;
    font-weight: 700;
  }
  .brand { text-decoration: none; }
  p { color: #65766c; line-height: 1.6; }
  form { display: grid; gap: 12px; margin-top: 24px; }
  label { font-weight: 700; }
  input {
    padding: 13px;
    border: 1px solid #bccfc3;
    border-radius: 8px;
    font: inherit;
    min-width: 0;
  }
  button {
    padding: 14px;
    border: 0;
    border-radius: 8px;
    background: #146b4c;
    color: white;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }
  .message {
    padding: 12px;
    border-radius: 8px;
    background: #fff0ee;
    color: #a32c24;
  }
  .message.success {
    background: #e5f6eb;
    color: #146b4c;
  }
  .back { display: inline-block; margin-top: 24px; }
</style>

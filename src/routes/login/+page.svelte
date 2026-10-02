<script>
  let { form } = $props();
</script>

<svelte:head>
  <title>Sign In | ET Import Export</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <section>
    <a class="brand" href="/">ET Import Export</a>

    <h1>Sign in</h1>
    <p>Access your supplier account or admin dashboard.</p>

    {#if form?.message}
      <div class="error" role="alert">{form.message}</div>
    {/if}

    <form method="POST">
      <label for="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="username"
        value={form?.email ?? ''}
        required
      />

      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        required
      />

      <button type="submit">Sign in</button>
    </form>

    <a class="back" href="/">← Back to home</a>
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
    max-width: 420px;
    padding: 32px;
    border: 1px solid #dce7df;
    border-radius: 16px;
    background: white;
    box-sizing: border-box;
  }

  .brand {
    color: #146b4c;
    font-weight: 800;
    text-decoration: none;
  }

  h1 {
    margin-bottom: 10px;
  }

  p {
    color: #65766c;
    line-height: 1.5;
  }

  form {
    display: grid;
    gap: 12px;
    margin-top: 24px;
  }

  label {
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 13px;
    border: 1px solid #bccfc3;
    border-radius: 8px;
    box-sizing: border-box;
    font: inherit;
  }

  button {
    margin-top: 10px;
    padding: 14px;
    border: 0;
    border-radius: 8px;
    background: #146b4c;
    color: white;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .error {
    padding: 12px;
    background: #fff0ee;
    color: #a32c24;
    border-radius: 8px;
  }

  .back {
    display: inline-block;
    margin-top: 24px;
    color: #146b4c;
  }
</style>
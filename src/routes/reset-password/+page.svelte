
<script>
  let { form } = $props();
</script>

<svelte:head>
  <title>Set New Password | ET Import Export</title>
</svelte:head>

<main>
  <section>
    <a class="brand" href="/">ET Import Export</a>
    <h1>Choose a new password</h1>
    <p>Enter a new password for your trade account.</p>

    {#if form?.message}
      <p class="error" role="alert">{form.message}</p>
    {/if}

    <form method="POST">
      <label for="password">New password</label>
      <input
        id="password"
        name="password"
        type="password"
        autocomplete="new-password"
        minlength="12"
        required
      />

      <label for="confirm">Confirm new password</label>
      <input
        id="confirm"
        name="confirm"
        type="password"
        autocomplete="new-password"
        minlength="12"
        required
      />

      <button type="submit">Update password</button>
    </form>
  </section>
</main>

<style>
  main {
    min-height: 90vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: #f3f7f3;
    color: #173d32;
    font-family: Arial, sans-serif;
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
  .brand {
    color: #146b4c;
    font-weight: 800;
    text-decoration: none;
  }
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
  .error {
    padding: 12px;
    border-radius: 8px;
    background: #fff0ee;
    color: #a32c24;
  }
</style>

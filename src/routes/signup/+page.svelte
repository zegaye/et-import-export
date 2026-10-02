<script>
  let { form } = $props();
</script>

<svelte:head>
  <title>Supplier Sign Up | ET Import Export</title>
  <meta
    name="description"
    content="Create a supplier account on ET Import Export."
  />
</svelte:head>

<main>
  <section>
    <a class="brand" href="/">ET Import Export</a>

    <h1>Create your account</h1>
    <p>Register as a supplier to get started.</p>

    {#if form?.success}
      <div class="success" role="status">
        <h2>Check your email</h2>
        <p>{form.message}</p>
      </div>

      <a class="button" href="/login">Go to sign in</a>
    {:else}
      {#if form?.message}
        <div class="error" role="alert">
          {form.message}
        </div>
      {/if}

      <form method="POST">
        <label for="fullName">Your full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autocomplete="name"
          maxlength="100"
          value={form?.values?.fullName ?? ''}
          required
        />

        <label for="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          maxlength="254"
          value={form?.values?.email ?? ''}
          required
        />

        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="new-password"
          minlength="12"
          maxlength="128"
          aria-describedby="password-help"
          required
        />
        <small id="password-help">
          Use 12–128 characters. A long, unique passphrase works well.
        </small>

        <label for="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autocomplete="new-password"
          minlength="12"
          maxlength="128"
          required
        />

        <button type="submit">Create supplier account</button>
      </form>

      <p class="notice">
        Creating an account does not mean your business is verified.
        Product listings require approval before appearing publicly.
      </p>
    {/if}

    <p class="login-link">
      Already have an account? <a href="/login">Sign in</a>
    </p>

    <a class="back" href="/">← Back to home</a>
  </section>
</main>

<style>
  main {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 32px 20px;
    box-sizing: border-box;
    background: #f3f7f3;
    color: #173d32;
    font-family: Arial, sans-serif;
  }

  section {
    width: 100%;
    max-width: 480px;
    padding: 32px;
    box-sizing: border-box;
    border: 1px solid #dce7df;
    border-radius: 16px;
    background: white;
  }

  .brand {
    color: #146b4c;
    font-size: 20px;
    font-weight: 800;
    text-decoration: none;
  }

  h1 {
    margin: 24px 0 12px;
    font-size: clamp(28px, 5vw, 36px);
  }

  h2 {
    margin-top: 0;
    font-size: 22px;
  }

  p {
    color: #52645a;
    line-height: 1.6;
  }

  form {
    display: grid;
    gap: 12px;
    margin-top: 24px;
  }

  label {
    margin-top: 6px;
    font-weight: 700;
  }

  input {
    width: 100%;
    padding: 13px;
    box-sizing: border-box;
    border: 1px solid #bccfc3;
    border-radius: 8px;
    background: white;
    color: #173d32;
    font: inherit;
  }

  small {
    color: #52645a;
    line-height: 1.5;
  }

  button,
  .button {
    display: block;
    margin-top: 16px;
    padding: 14px;
    border: 0;
    border-radius: 8px;
    background: #146b4c;
    color: white;
    font: inherit;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }

  .error,
  .success {
    margin-top: 20px;
    padding: 16px;
    border-radius: 8px;
  }

  .error {
    background: #fff0ee;
    color: #a32c24;
  }

  .success {
    background: #e8f5eb;
    color: #175c35;
  }

  .success p {
    margin-bottom: 0;
    color: inherit;
  }

  .notice {
    padding: 14px;
    border-left: 4px solid #b48b35;
    background: #fff8e8;
    font-size: 14px;
  }

  .login-link {
    margin-top: 24px;
  }

  .login-link a,
  .back {
    color: #146b4c;
    font-weight: 700;
  }

  .back {
    display: inline-block;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    section {
      padding: 24px;
    }
  }
</style>
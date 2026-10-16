
<script>
  let { form } = $props();

  let accountType = $state('exporter');
</script>

<svelte:head>
  <title>Register | ET Import Export</title>
  <meta
    name="description"
    content="Register as an Ethiopian exporter or international buyer."
  />
</svelte:head>

<main>
  <section>
    <a class="brand" href="/">ET Import Export</a>

    <h1>Create your trade account</h1>
    <p>Connect Ethiopian products with international markets.</p>

    {#if form?.success}
      <div class="success" role="status">
        <h2>Registration received!</h2>
        <p>{form.message}</p>
      </div>

      <a class="button" href="/login">Go to sign in</a>
    {:else}
      {#if form?.message}
        <div class="error" role="alert">{form.message}</div>
      {/if}

      <form method="POST">
        <label for="accountType">Register as</label>
        <select
          id="accountType"
          name="accountType"
          bind:value={accountType}
          required
        >
          <option value="exporter">Ethiopian Exporter</option>
          <option value="buyer">International Buyer</option>
        </select>

        <label for="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autocomplete="name"
          maxlength="100"
          value={form?.values?.fullName ?? ''}
          required
        />

        <label for="companyName">
          {accountType === 'exporter'
            ? 'Export business name'
            : 'Buying company name'}
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          maxlength="150"
          value={form?.values?.companyName ?? ''}
          required
        />

        <label for="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          maxlength="100"
          value={form?.values?.country ?? (accountType === 'exporter' ? 'Ethiopia' : '')}
          required
        />

        <label for="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autocomplete="tel"
          maxlength="30"
          placeholder="+251..."
          value={form?.values?.phone ?? ''}
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
          required
        />
        <small>Use a unique password with at least 12 characters.</small>

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

        <button type="submit">
          Create {accountType === 'exporter' ? 'Exporter' : 'Buyer'} Account
        </button>
      </form>

      <p class="notice">
        Registration does not mean your business is verified.
        Business verification and product approval are separate processes.
      </p>
    {/if}

    <p class="login-link">
      Already registered? <a href="/login">Sign in</a>
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
    max-width: 520px;
    padding: 32px;
    box-sizing: border-box;
    border: 1px solid #dce7df;
    border-radius: 16px;
    background: white;
    box-shadow: 0 12px 35px rgba(0,0,0,0.05);
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

  input,
  select {
    width: 100%;
    padding: 13px;
    box-sizing: border-box;
    border: 1px solid #bccfc3;
    border-radius: 8px;
    background: white;
    color: #173d32;
    font: inherit;
  }

  input:focus,
  select:focus {
    outline: 2px solid #146b4c;
    outline-offset: 1px;
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

  button:hover,
  .button:hover {
    background: #0d5038;
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

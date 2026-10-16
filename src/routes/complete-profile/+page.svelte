
<script>
  let { data, form } = $props();

  let accountType = $state('exporter');
  let fullName = $state('');
  let companyName = $state('');
  let country = $state('Ethiopia');
  let phone = $state('');

  $effect(() => {
    accountType = form?.values?.accountType ?? 'exporter';
    fullName = form?.values?.fullName ?? data.fullName ?? '';
    companyName = form?.values?.companyName ?? data.companyName ?? '';
country = form?.values?.country || data.country || 'Ethiopia';
    phone = form?.values?.phone ?? data.phone ?? '';
  });
</script>

<svelte:head>
  <title>Complete Business Profile | ET Import Export</title>
</svelte:head>

<main class="page">
  <section class="card">
    <a href="/dashboard" class="back">← Dashboard</a>

    <div class="heading">
      <span class="eyebrow">ET IMPORT EXPORT</span>
      <h1>Complete Your Business Profile</h1>
      <p>
        Provide your business details to access the appropriate
        international trade services.
      </p>
    </div>

    {#if form?.message}
      <div class="error" role="alert">{form.message}</div>
    {/if}

    <form method="POST">
      <label for="accountType">Account Type</label>
      <select id="accountType" name="accountType" bind:value={accountType} required>
        <option value="exporter">Ethiopian Exporter</option>
        <option value="buyer">International Buyer</option>
      </select>

      <label for="fullName">Full Name</label>
      <input
        id="fullName"
        name="fullName"
        bind:value={fullName}
        maxlength="100"
        required
      />

      <label for="companyName">Company / Business Name</label>
      <input
        id="companyName"
        name="companyName"
        bind:value={companyName}
        maxlength="150"
        required
      />

      <label for="country">Country</label>
      <input
        id="country"
        name="country"
        bind:value={country}
        maxlength="100"
        required
      />

      <label for="phone">Phone Number</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        bind:value={phone}
        maxlength="30"
      />

      <div class="email">
        <strong>Registered email</strong>
        <span>{data.email}</span>
      </div>

      <button type="submit">
        {accountType === 'exporter'
          ? 'Save Profile & Start Assessment →'
          : 'Save Buyer Profile →'}
      </button>
    </form>

    <p class="notice">
      Exporter verification requires an assessment followed by
      review of the applicable business documents.
    </p>
  </section>
</main>

<style>
  .page {
    min-height: 100vh;
    background: #f4f7fb;
    padding: 45px 18px;
    color: #172b4d;
  }

  .card {
    max-width: 620px;
    margin: auto;
    padding: 36px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 8px 35px rgba(0,0,0,.06);
  }

  .back {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
  }

  .heading {
    margin: 30px 0;
  }

  .eyebrow {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    font-size: clamp(26px, 5vw, 36px);
    margin: 12px 0;
  }

  .heading p,
  .notice {
    color: #64748b;
    line-height: 1.7;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  label {
    font-weight: 700;
    font-size: 14px;
    margin-top: 8px;
  }

  input,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 13px;
    border: 1px solid #dbe3ee;
    border-radius: 10px;
    font: inherit;
    background: white;
    color: #172b4d;
  }

  input:focus,
  select:focus {
    outline: 2px solid #2563eb;
    outline-offset: 1px;
  }

  .email {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 15px;
    background: #f4f7fb;
    border-radius: 10px;
    margin-top: 12px;
    overflow-wrap: anywhere;
  }

  .email span {
    color: #64748b;
  }

  button {
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 10px;
    padding: 15px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 12px;
  }

  button:hover {
    background: #1d4ed8;
  }

  .error {
    background: #fef2f2;
    color: #b91c1c;
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 18px;
  }

  .notice {
    text-align: center;
    font-size: 13px;
    margin-top: 25px;
  }

  @media (max-width: 600px) {
    .card {
      padding: 22px;
    }
  }
</style>

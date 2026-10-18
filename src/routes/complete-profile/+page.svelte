
<script>
  let { data, form } = $props();

  const accountTypes = [
    {
      value: 'exporter',
      label: 'Ethiopian Exporter'
    },
    {
      value: 'buyer',
      label: 'International Buyer'
    },
    {
      value: 'international_supplier',
      label: 'International Supplier'
    }
  ];

  let accountType = $state('');
  let fullName = $state('');
  let companyName = $state('');
  let country = $state('');
  let phone = $state('');
  let submitting = $state(false);

  const registeredAccountType = $derived(
    data.accountType ?? ''
  );

  const accountTypeLocked = $derived(
    accountTypes.some(
      (type) => type.value === registeredAccountType
    )
  );

  const isExporter = $derived(
    accountType === 'exporter'
  );

  const isSupplier = $derived(
    accountType === 'international_supplier'
  );

  const buttonText = $derived(
    isExporter
      ? 'Save Profile & Start Exporter Assessment →'
      : isSupplier
        ? 'Save Profile & Start Supplier Assessment →'
        : 'Save Buyer Profile →'
  );

  $effect(() => {
    accountType =
      form?.values?.accountType ??
      data.accountType ??
      '';

    fullName =
      form?.values?.fullName ??
      data.fullName ??
      '';

    companyName =
      form?.values?.companyName ??
      data.companyName ??
      '';

    country =
      form?.values?.country ??
      data.country ??
      '';

    phone =
      form?.values?.phone ??
      data.phone ??
      '';

    submitting = false;
  });

  function handleAccountTypeChange() {
    if (accountType === 'exporter' && !country) {
      country = 'Ethiopia';
    }

    if (
      accountType === 'international_supplier' &&
      country.trim().toLowerCase() === 'ethiopia'
    ) {
      country = '';
    }
  }
</script>

<svelte:head>
  <title>Complete Business Profile | ET Import Export</title>
  <meta
    name="description"
    content="Complete your business profile to access ET Import Export trade services."
  />
</svelte:head>

<main class="page">
  <section class="card">
    <a href="/dashboard" class="back">
      ← Dashboard
    </a>

    <div class="heading">
      <span class="eyebrow">ET IMPORT EXPORT</span>

      <h1>Complete Your Business Profile</h1>

      <p>
        Provide your business information to access the
        appropriate international trade services.
      </p>
    </div>

    {#if form?.message}
      <div class="error" role="alert">
        {form.message}
      </div>
    {/if}

    <form
      method="POST"
      onsubmit={() => {
        submitting = true;
      }}
    >
      <label for="accountType">
        Account Type
      </label>

      <select
        id="accountType"
        name="accountType"
        bind:value={accountType}
        onchange={handleAccountTypeChange}
        required
      >
        <option value="" disabled>
          Select your account type
        </option>

        {#each accountTypes as type}
          <option
            value={type.value}
            disabled={accountTypeLocked &&
              type.value !== registeredAccountType}
          >
            {type.label}
          </option>
        {/each}
      </select>

      {#if accountTypeLocked}
        <p class="field-help">
          Your account type was selected during registration
          and cannot be changed here.
        </p>
      {/if}

      {#if isSupplier}
        <div class="info">
          <strong>International Supplier Account</strong>
          <p>
            Register your company based outside Ethiopia.
            After completing your profile, you will take
            the International Supplier Readiness Assessment.
          </p>
        </div>
      {:else if isExporter}
        <div class="info">
          <strong>Ethiopian Exporter Account</strong>
          <p>
            After completing your profile, you will take
            the Ethiopian Exporter Readiness Assessment.
          </p>
        </div>
      {/if}

      <label for="fullName">
        Full Name
      </label>

      <input
        id="fullName"
        name="fullName"
        type="text"
        bind:value={fullName}
        maxlength="100"
        autocomplete="name"
        placeholder="Enter your full name"
        required
      />

      <label for="companyName">
        Company / Business Name
      </label>

      <input
        id="companyName"
        name="companyName"
        type="text"
        bind:value={companyName}
        maxlength="150"
        autocomplete="organization"
        placeholder="Enter your registered business name"
        required
      />

      <label for="country">
        Country
      </label>

      <input
        id="country"
        name="country"
        type="text"
        bind:value={country}
        maxlength="100"
        autocomplete="country-name"
        placeholder={isSupplier
          ? 'Example: China, India, UAE, Turkey'
          : 'Enter your country'}
        required
      />

      {#if isSupplier}
        <p class="field-help">
          Enter the country where your supplier business
          is legally based.
        </p>
      {:else if isExporter}
        <p class="field-help">
          Ethiopian Exporters must be based in Ethiopia.
        </p>
      {/if}

      <label for="phone">
        Phone Number
      </label>

      <input
        id="phone"
        name="phone"
        type="tel"
        bind:value={phone}
        maxlength="30"
        autocomplete="tel"
        placeholder={isSupplier
          ? 'Include international country code'
          : 'Enter your phone number'}
      />

      <div class="email">
        <strong>Registered Email</strong>
        <span>{data.email}</span>
      </div>

      <button
        type="submit"
        disabled={submitting || !accountType}
      >
        {submitting
          ? 'Saving Your Profile...'
          : buttonText}
      </button>
    </form>

    <p class="notice">
      {#if isSupplier}
        International Suppliers must complete a readiness
        assessment and undergo business document verification
        before receiving verified supplier status.
      {:else if isExporter}
        Ethiopian Exporter verification requires an assessment
        followed by review of applicable business documents.
      {:else}
        Your business information helps us provide appropriate
        international trade services.
      {/if}
    </p>
  </section>
</main>

<style>
  .page {
    min-height: 100vh;
    background: #f4f7fb;
    padding: 45px 18px;
    color: #172b4d;
    font-family: Arial, sans-serif;
  }

  .card {
    max-width: 620px;
    margin: auto;
    padding: 36px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 8px 35px rgba(0, 0, 0, 0.06);
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
    line-height: 1.2;
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

  select:disabled,
  input:disabled {
    background: #f1f5f9;
    color: #64748b;
  }

  .field-help {
    color: #64748b;
    font-size: 12px;
    margin: -4px 0 4px;
    line-height: 1.5;
  }

  .info {
    padding: 16px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 12px;
    color: #1e40af;
    margin: 8px 0;
  }

  .info strong {
    display: block;
    margin-bottom: 6px;
  }

  .info p {
    margin: 0;
    line-height: 1.6;
    font-size: 13px;
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
    font: inherit;
  }

  button:hover:not(:disabled) {
    background: #1d4ed8;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
    .page {
      padding: 20px 12px 50px;
    }

    .card {
      padding: 22px;
    }
  }
</style>




<script>
  /**
   * @typedef {{
   *   assessmentScore: number | null;
   *   exportReady: boolean;
   * }} SellPageData
   */

  /**
   * @typedef {{
   *   success?: boolean;
   *   message?: string;
   * }} SellFormData
   */

  /** @type {{ data: SellPageData; form: SellFormData | null }} */
  let { data, form } = $props();
</script>


<svelte:head>
  <title>Register Export Product | ET Import Export</title>
  <meta
    name="description"
    content="Register Ethiopian export products for marketplace review."
  />
</svelte:head>

<main>
  <a class="back" href="/dashboard">← Back to dashboard</a>

  <div class="panel">
    <div class="intro">
      <span>ETHIOPIAN EXPORTER</span>
      <h1>Register an Export Product</h1>
      <p>
        Register your Ethiopian export products and connect
        with international buyers.
      </p>
    </div>

    {#if !data.exportReady}
      <div class="message warning">
        <h2>Export Readiness Assessment Required</h2>

        <p>
          Your assessment score:
          <strong>
            {data.assessmentScore === null
              ? 'Not assessed'
              : `${data.assessmentScore}%`}
          </strong>
        </p>

        <p>
          You must achieve at least 60% and receive
          a passing assessment result before registering
          export products.
        </p>

        <a class="assessment-link" href="/exporter/assessment">
          Go to Export Readiness Assessment →
        </a>
      </div>
    {:else if form?.success}
      <div class="message success" role="status">
        <h2>Product Submitted Successfully!</h2>
        <p>{form.message}</p>

        <p>
          Your product is awaiting administrator approval.
        </p>

        <a href="/sell">Register another product →</a>
      </div>
    {:else}
      <div class="ready-banner">
        <strong>✓ Export Readiness Passed</strong>
        <span>
          Assessment score: {data.assessmentScore}%
        </span>
      </div>

      {#if form?.message}
        <div class="message error" role="alert">
          <strong>Submission unsuccessful</strong>
          <p>{form.message}</p>
        </div>
      {/if}

      <form method="POST" enctype="multipart/form-data">
        <section class="form-section">
          <div class="section-heading">
            <span class="number">01</span>
            <div>
              <h2>Exporter Information</h2>
              <p>Provide your business contact details.</p>
            </div>
          </div>

          <div class="fields">
            <label>
              <span>Your name or business name *</span>
              <input
                name="sellerName"
                required
                maxlength="100"
                autocomplete="organization"
                placeholder="Example: Ethiopian Coffee Export PLC"
              />
            </label>

            <label>
              <span>Phone number *</span>
              <input
                name="phone"
                type="tel"
                required
                maxlength="30"
                autocomplete="tel"
                placeholder="+251 9..."
              />
              <small>Include your country code.</small>
            </label>
          </div>
        </section>

        <section class="form-section">
          <div class="section-heading">
            <span class="number">02</span>
            <div>
              <h2>Product Information</h2>
              <p>Describe the product you want to export.</p>
            </div>
          </div>

          <div class="fields">
            <label>
              <span>Product name *</span>
              <input
                name="productName"
                required
                maxlength="100"
                placeholder="Example: Ethiopian Arabica Coffee"
              />
            </label>

            <label>
              <span>Trade direction</span>
              <input
                value="Export from Ethiopia"
                disabled
              />
              <input
                type="hidden"
                name="direction"
                value="export"
              />
            </label>

            <label>
              <span>Category *</span>
              <input
                name="category"
                required
                maxlength="80"
                placeholder="Coffee, Sesame, Textiles..."
              />
            </label>

            <label>
              <span>Product origin *</span>
              <input
                name="location"
                required
                maxlength="100"
                placeholder="Example: Jimma, Ethiopia"
              />
            </label>

            <label>
              <span>Available quantity *</span>
              <input
                name="quantity"
                required
                maxlength="80"
                placeholder="Example: 5 tons"
              />
            </label>

            <label class="full">
              <span>Product description *</span>
              <textarea
                name="description"
                required
                maxlength="2000"
                rows="6"
                placeholder="Describe quality, specifications, packaging, quantity and other relevant details."
              ></textarea>
              <small>Maximum 2,000 characters.</small>
            </label>
          </div>
        </section>

        <section class="form-section">
          <div class="section-heading">
            <span class="number">03</span>
            <div>
              <h2>Product Photo</h2>
              <p>Upload a clear product image.</p>
            </div>
          </div>

          <label class="upload">
            <span>Product photo (optional)</span>

            <input
              name="photo"
              type="file"
              accept="image/jpeg,image/png"
            />

            <small>
              JPG or PNG only. Maximum 2 MB.
            </small>
          </label>
        </section>

        <div class="review-note">
          <strong>What happens next?</strong>
          <p>
            Your product will be submitted to the
            ET Import Export administrator for review.
            It will only appear on the public marketplace
            after approval.
          </p>
        </div>

        <button type="submit">
          Submit Export Product for Review →
        </button>
      </form>
    {/if}
  </div>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    background: #f6f8f3;
    color: #173326;
    font-family: Arial, Helvetica, sans-serif;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px 90px;
  }

  .back {
    display: inline-block;
    color: #236b45;
    font-weight: 700;
    text-decoration: none;
  }

  .back:hover {
    text-decoration: underline;
  }

  .panel {
    margin-top: 28px;
    overflow: hidden;
    border: 1px solid #e1e9df;
    border-radius: 20px;
    background: white;
  }

  .intro {
    padding: 42px;
    border-bottom: 1px solid #e8eee7;
    background: linear-gradient(
      135deg,
      #f8fbf6,
      #ffffff
    );
  }

  .intro > span {
    color: #16825e;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.8px;
  }

  h1 {
    margin: 12px 0;
    font-size: clamp(32px, 5vw, 46px);
    line-height: 1.1;
  }

  .intro p {
    max-width: 650px;
    color: #5c6c63;
    line-height: 1.7;
  }

  form {
    padding: 10px 42px 42px;
  }

  .ready-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 30px 42px 0;
    padding: 16px 20px;
    border-radius: 10px;
    background: #e8f7ed;
    color: #17633a;
  }

  .ready-banner strong {
    font-weight: 800;
  }

  .form-section {
    padding: 32px 0;
    border-bottom: 1px solid #e8eee7;
  }

  .section-heading {
    display: flex;
    gap: 15px;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .number {
    display: grid;
    flex: 0 0 42px;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 50%;
    background: #e8f3ec;
    color: #236b45;
    font-size: 13px;
    font-weight: 800;
  }

  h2 {
    margin: 0 0 5px;
    font-size: 21px;
  }

  .section-heading p {
    margin: 0;
    color: #718078;
    font-size: 14px;
    line-height: 1.5;
  }

  .fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }

  label {
    display: grid;
    gap: 8px;
    color: #274438;
    font-size: 14px;
    font-weight: 700;
  }

  label.full {
    grid-column: 1 / -1;
  }

  input,
  textarea {
    width: 100%;
    padding: 14px;
    border: 1px solid #b8c9bb;
    border-radius: 9px;
    background: white;
    color: #173326;
    font: inherit;
    font-weight: 400;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #2c7b53;
    box-shadow: 0 0 0 3px rgba(44, 123, 83, 0.12);
  }

  input:disabled {
    background: #edf3ee;
    color: #60766a;
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }

  small {
    color: #78857e;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
  }

  .upload {
    padding: 20px;
    border: 1px dashed #9db5a2;
    border-radius: 12px;
    background: #fafcf9;
  }

  .review-note {
    margin: 30px 0 22px;
    padding: 18px 20px;
    border-left: 4px solid #b48b35;
    border-radius: 5px;
    background: #fff8e8;
  }

  .review-note strong {
    color: #624a17;
  }

  .review-note p {
    margin: 7px 0 0;
    color: #6b6046;
    font-size: 14px;
    line-height: 1.6;
  }

  button {
    width: 100%;
    padding: 16px 22px;
    border: 0;
    border-radius: 10px;
    background: #236b45;
    color: white;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
  }

  button:hover {
    background: #195d3a;
  }

  .message {
    margin: 35px 42px;
    padding: 22px;
    border-radius: 10px;
  }

  .message p {
    line-height: 1.6;
  }

  .message.warning {
    border: 1px solid #e7cf92;
    background: #fff8e7;
    color: #70521a;
  }

  .message.success {
    border: 1px solid #b9ddc4;
    background: #eef9f1;
    color: #205d37;
  }

  .message.error {
    border: 1px solid #ebc6bd;
    background: #fff3f0;
    color: #8a3828;
  }

  .message a {
    display: inline-block;
    margin-top: 14px;
    color: inherit;
    font-weight: 800;
  }

  .assessment-link {
    display: inline-block;
    padding: 12px 18px;
    border-radius: 8px;
    background: #236b45;
    color: white !important;
    text-decoration: none;
  }

  @media (max-width: 650px) {
    main {
      padding: 25px 14px 60px;
    }

    .intro {
      padding: 30px 24px;
    }

    form {
      padding: 5px 24px 30px;
    }

    .fields {
      grid-template-columns: 1fr;
    }

    label.full {
      grid-column: auto;
    }

    .ready-banner,
    .message {
      margin: 25px 24px;
    }
  }
</style>

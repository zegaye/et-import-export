
<script>
  let { data, form } = $props();

  const documentTypes = [
    {
      value: 'business_registration',
      label: 'Business Registration Certificate'
    },
    {
      value: 'export_license',
      label: 'Export License / Authorization'
    },
    {
      value: 'tax_registration',
      label: 'Tax Registration Certificate'
    },
    {
      value: 'product_certificate',
      label: 'Product Quality / Compliance Certificate'
    },
    {
      value: 'company_profile',
      label: 'Company Profile'
    }
  ];

  let documentType = $state('business_registration');
  let selectedFile = $state(/** @type {File | null} */ (null));
  let submitting = $state(false);

  const verified = $derived(
    data.verificationStatus === 'verified'
  );

  /**
   * @param {string} value
   */
  function getDocumentLabel(value) {
    return documentTypes.find(
      (type) => type.value === value
    )?.label ?? value;
  }

  /**
   * @param {Event} event
   */
  function handleFileChange(event) {
    const target = /** @type {HTMLInputElement} */ (
      event.currentTarget
    );

    selectedFile = target.files?.[0] ?? null;
  }
</script>

<svelte:head>
  <title>Supplier Documents | ET Import Export</title>
  <meta
    name="description"
    content="Submit international supplier business verification documents."
  />
</svelte:head>

<main class="page">
  <div class="container">
    <a href="/dashboard" class="back">
      ← Back to Dashboard
    </a>

    <header>
      <span class="eyebrow">ET IMPORT EXPORT</span>
      <h1>International Supplier Verification</h1>
      <p>
        Upload your company documents for verification
        by the ET Import Export administration team.
      </p>
    </header>

    <section class="card">
      <div class="status-row">
        <div>
          <h2>{data.companyName}</h2>
          <p>Business Verification Status</p>
        </div>

        <span
          class:verified
          class:pending={!verified}
          class="status"
        >
          {verified
            ? 'Verified'
            : data.verificationStatus === 'rejected'
              ? 'Rejected'
              : 'Pending Verification'}
        </span>
      </div>

      {#if verified}
        <div class="success">
          Your company has been verified.
          Contact the administration team if
          you need to update your documents.
        </div>
      {:else}
        <h2>Upload Business Document</h2>

        <p class="description">
          Accepted formats: PDF, JPG, PNG.
          Maximum file size: 5 MB per document.
        </p>

        {#if form?.message}
          <div class="error" role="alert">
            {form.message}
          </div>
        {/if}

        <form
          method="POST"
          action="?/upload"
          enctype="multipart/form-data"
          onsubmit={() => {
            submitting = true;
          }}
        >
          <label for="documentType">
            Document Type
          </label>

          <select
            id="documentType"
            name="documentType"
            bind:value={documentType}
            required
          >
            {#each documentTypes as type}
              <option value={type.value}>
                {type.label}
              </option>
            {/each}
          </select>

          <label for="documentFile">
            Select Document
          </label>

          <input
            id="documentFile"
            name="documentFile"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onchange={handleFileChange}
            required
          />

          {#if selectedFile}
            <p class="selected">
              Selected: {selectedFile.name}
              ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          {/if}

          <button
            type="submit"
            disabled={submitting || !selectedFile}
          >
            {submitting
              ? 'Uploading Document...'
              : 'Submit Document for Review'}
          </button>
        </form>
      {/if}
    </section>

    <section class="card">
      <h2>Submitted Documents</h2>

      {#if data.documents.length === 0}
        <p class="description">
          No documents have been submitted yet.
        </p>
      {:else}
        <div class="document-list">
          {#each data.documents as document (document.id)}
            <div class="document-item">
              <div>
                <strong>
                  {getDocumentLabel(document.document_type)}
                </strong>

                <p>
                  Submitted:
                  {new Date(document.created_at).toLocaleDateString()}
                </p>

                {#if document.review_notes}
                  <p>
                    Review notes: {document.review_notes}
                  </p>
                {/if}
              </div>

              <span
                class="review-status"
                class:approved={document.review_status === 'approved'}
                class:rejected={document.review_status === 'rejected'}
              >
                {document.review_status}
              </span>
            </div>
          {/each}
        </div>
      {/if}
    </section>

    <p class="notice">
      Passing the readiness assessment does not
      automatically verify your company.
      Verification requires administrator review.
    </p>
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    padding: 45px 18px 80px;
    background: #f4f7fb;
    color: #172b4d;
    font-family: Arial, sans-serif;
  }

  .container {
    max-width: 850px;
    margin: auto;
  }

  .back {
    color: #2563eb;
    text-decoration: none;
    font-weight: 700;
  }

  header {
    margin: 32px 0;
  }

  .eyebrow {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    font-size: clamp(28px, 5vw, 42px);
    margin: 12px 0;
  }

  header p,
  .description,
  .notice {
    color: #64748b;
    line-height: 1.7;
  }

  .card {
    background: white;
    padding: 28px;
    border-radius: 18px;
    margin-bottom: 22px;
    box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
  }

  h2 {
    margin-top: 0;
    font-size: 22px;
  }

  .status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }

  .status-row p {
    color: #64748b;
  }

  .status,
  .review-status {
    display: inline-block;
    padding: 8px 13px;
    border-radius: 20px;
    background: #fef3c7;
    color: #92400e;
    font-weight: 700;
    font-size: 12px;
    text-transform: capitalize;
  }

  .status.verified,
  .review-status.approved {
    background: #dcfce7;
    color: #166534;
  }

  .review-status.rejected {
    background: #fee2e2;
    color: #991b1b;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  label {
    font-weight: 700;
    margin-top: 10px;
  }

  input,
  select {
    padding: 14px;
    border: 1px solid #dbe3ee;
    border-radius: 10px;
    font: inherit;
    background: white;
    color: #172b4d;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    margin-top: 15px;
    padding: 15px;
    border: 0;
    border-radius: 10px;
    background: #2563eb;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .selected {
    font-size: 13px;
    color: #475569;
  }

  .success {
    padding: 15px;
    background: #dcfce7;
    color: #166534;
    border-radius: 10px;
  }

  .error {
    padding: 15px;
    background: #fef2f2;
    color: #b91c1c;
    border-radius: 10px;
  }

  .document-list {
    display: grid;
    gap: 12px;
  }

  .document-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 18px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
  }

  .document-item p {
    font-size: 13px;
    color: #64748b;
  }

  .notice {
    text-align: center;
    font-size: 13px;
  }

  @media (max-width: 600px) {
    .page {
      padding: 20px 12px 50px;
    }

    .card {
      padding: 20px;
    }

    .document-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>

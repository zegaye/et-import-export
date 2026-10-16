
<script>
  let { data, form } = $props();

  let documentType = $state('business_license');
  let selectedFile = $state('');
  let submitting = $state(false);

  const documentTypes = [
    { value: 'business_license', label: 'Business License' },
    { value: 'export_license', label: 'Export License' },
    { value: 'company_profile', label: 'Company Profile' },
    { value: 'quality_certificate', label: 'Quality Certificate' }
  ];

  /** @param {string} type */
  function documentLabel(type) {
    return documentTypes.find((item) => item.value === type)?.label ?? type;
  }

  /** @param {Event} event */
  function handleFileChange(event) {
    const input = /** @type {HTMLInputElement} */ (event.currentTarget);
    selectedFile = input.files?.[0]?.name ?? '';
  }

  function handleSubmit() {
    submitting = true;
  }
</script>

<svelte:head>
  <title>Exporter Documents | ET Import Export</title>
</svelte:head>

<main class="page">
  <div class="container">
    <a href="/dashboard" class="back">← Dashboard</a>

    <header class="heading">
      <span class="eyebrow">EXPORTER VERIFICATION</span>
      <h1>Business Document Submission</h1>
      <p>
        Upload your business documents for review by the
        ET Import Export verification team.
      </p>
      <strong>{data.companyName}</strong>
    </header>

    {#if form?.message}
      <div class="error" role="alert">{form.message}</div>
    {/if}

    <section class="card">
      <h2>Upload a document</h2>
      <p class="description">
        Select the document category and upload a PDF, JPG, or PNG
        file. Maximum file size: 5 MB.
      </p>

      <form method="POST" enctype="multipart/form-data" onsubmit={handleSubmit}>
        <label for="documentType">Document category</label>
        <select id="documentType" name="documentType" bind:value={documentType}>
          {#each documentTypes as type}
            <option value={type.value}>{type.label}</option>
          {/each}
        </select>

        <label for="document">Choose document</label>
        <input
          id="document"
          name="document"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onchange={handleFileChange}
          required
        />

        {#if selectedFile}
          <p class="selected">Selected: {selectedFile}</p>
        {/if}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Uploading...' : 'Upload Document →'}
        </button>
      </form>
    </section>

    <section class="card">
      <h2>Submitted Documents</h2>

      {#if data.documents.length === 0}
        <p class="description">
          No documents submitted yet. Your uploaded documents
          will appear here with their review status.
        </p>
      {:else}
        <div class="documents">
          {#each data.documents as document (document.id)}
            <div class="document-row">
              <div>
                <strong>{documentLabel(document.document_type)}</strong>
                <p>
                  Submitted:
                  {new Date(document.created_at).toLocaleDateString()}
                </p>
                {#if document.review_notes}
                  <p>Reviewer note: {document.review_notes}</p>
                {/if}
              </div>

              <span
                class="status"
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
      Document submission does not automatically verify your business.
      Approval requires review by the authorized verification team.
    </p>
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    background: #f4f7fb;
    padding: 40px 20px 80px;
    color: #172b4d;
  }

  .container {
    max-width: 820px;
    margin: auto;
  }

  .back {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
  }

  .heading {
    margin: 35px 0;
  }

  .eyebrow {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    font-size: clamp(28px, 5vw, 40px);
    margin: 12px 0;
  }

  .heading p,
  .description,
  .notice {
    color: #64748b;
    line-height: 1.7;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 22px;
    box-shadow: 0 4px 20px rgba(0,0,0,.04);
  }

  .card h2 {
    margin-top: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 25px;
  }

  label {
    font-weight: 700;
  }

  select,
  input[type="file"] {
    padding: 13px;
    border: 1px solid #dbe3ee;
    border-radius: 10px;
    background: white;
    color: #172b4d;
    width: 100%;
    box-sizing: border-box;
    font: inherit;
  }

  button {
    padding: 15px;
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 10px;
  }

  button:disabled {
    opacity: .6;
    cursor: not-allowed;
  }

  .selected {
    color: #2563eb;
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .documents {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .document-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
  }

  .document-row p {
    margin: 7px 0 0;
    color: #64748b;
    font-size: 13px;
  }

  .status {
    padding: 7px 12px;
    border-radius: 20px;
    background: #fef3c7;
    color: #92400e;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;
  }

  .status.approved {
    background: #dcfce7;
    color: #166534;
  }

  .status.rejected {
    background: #fee2e2;
    color: #991b1b;
  }

  .error {
    background: #fef2f2;
    color: #b91c1c;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .notice {
    text-align: center;
    font-size: 13px;
    margin-top: 30px;
  }

  @media (max-width: 600px) {
    .card {
      padding: 20px;
    }

    .document-row {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>

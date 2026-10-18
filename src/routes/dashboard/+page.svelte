<script>
  /** @type {import('./$types').PageProps} */
  let { data, form } = $props();

  const exporterLinks = [
    {
      title: 'Explore Export Products',
      description: 'Browse products available for export.',
      href: '/export'
    },
    {
      title: 'Submit a Product',
      description: 'Submit a product for administrator review.',
      href: '/sell'
    },
    {
      title: 'Import Marketplace',
      description: 'Explore international sourcing opportunities.',
      href: '/import'
    }
  ];

  const buyerLinks = [
    {
      title: 'Find Ethiopian Suppliers',
      description: 'Explore Ethiopian export products.',
      href: '/export'
    },
    {
      title: 'Explore Import Opportunities',
      description: 'Browse available marketplace listings.',
      href: '/import'
    },
    {
      title: 'Contact Trade Support',
      description: 'Ask for help with sourcing.',
      href: '/contact'
    }
  ];

  const supplierLinks = [
    {
      title: 'Explore Ethiopian Import Demand',
      description: 'Browse the import marketplace for sourcing opportunities.',
      href: '/import'
    },
    {
      title: 'Submit a Supply Offer',
      description: 'Submit your products for administrator review.',
      href: '/sell'
    },
    {
      title: 'Contact Trade Support',
      description: 'Ask for help supplying products to Ethiopia.',
      href: '/contact'
    }
  ];

  const documentNames = {
    business_license: 'Business License',
    export_license: 'Export License',
    company_profile: 'Company Profile'
  };

  let isExporter = $derived(data.accountType === 'exporter');
  let isBuyer = $derived(data.accountType === 'buyer');
  let isSupplier = $derived(data.accountType === 'international_supplier');
  let supplierAssessment = $derived(data.supplierAssessment ?? null);
  let supplierPassed = $derived(supplierAssessment?.status === 'passed');
  let hasTradeRole = $derived(isExporter || isBuyer || isSupplier);

  let links = $derived(
    isExporter ? exporterLinks : isBuyer ? buyerLinks : isSupplier ? supplierLinks : []
  );

  let verificationStatus = $derived(
    data.verificationStatus ?? 'pending'
  );

  let documentProgress = $derived(
    data.documentProgress ?? []
  );

  let approvedCount = $derived(data.approvedCount ?? 0);
  let requiredCount = $derived(data.requiredCount ?? 3);

  let progressPercentage = $derived(
    requiredCount > 0
      ? Math.round((approvedCount / requiredCount) * 100)
      : 0
  );

  /** @param {string} type */
  function getDocumentName(type) {
    return documentNames[
      /** @type {keyof typeof documentNames} */ (type)
    ] ?? type;
  }

  /** @param {string} status */
  function getStatusLabel(status) {
    if (status === 'approved') return 'Approved';
    if (status === 'pending') return 'Under Review';
    if (status === 'rejected') return 'Rejected';
    if (status === 'verified') return 'Verified';
    return 'Not Uploaded';
  }
</script>

<svelte:head>
  <title>Trade Dashboard | ET Import Export</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <header>
    <a class="brand" href="/">ET Import Export</a>

    <form method="POST" action="?/logout">
      <button class="logout" type="submit">
        Sign out
      </button>
    </form>
  </header>

  {#if form?.message}
    <p class="error" role="alert">{form.message}</p>
  {/if}

  <section>
    <span class="eyebrow">
      {isExporter
        ? 'EXPORTER ACCOUNT'
        : isBuyer
          ? 'INTERNATIONAL BUYER ACCOUNT'
          : isSupplier
            ? 'INTERNATIONAL SUPPLIER ACCOUNT'
            : 'ACCOUNT SETUP REQUIRED'}
    </span>

    <h1>
      Welcome{data.fullName ? `, ${data.fullName}` : ''}!
    </h1>

    <p>
      Signed in as <strong>{data.email}</strong>
    </p>

    {#if hasTradeRole}
      <div class="profile">
        <div>
          <small>Business</small>
          <strong>{data.companyName || 'Not provided'}</strong>
        </div>

        <div>
          <small>Country</small>
          <strong>{data.country || 'Not provided'}</strong>
        </div>

        <div>
          <small>Account type</small>
          <strong>
            {isExporter ? 'Exporter' : isBuyer ? 'International Buyer' : 'International Supplier'}
          </strong>
        </div>
      </div>

      {#if isExporter}
        <div class="verification-card">
          <div class="verification-header">
            <div>
              <span class="eyebrow">EXPORTER VERIFICATION</span>
              <h2>Company Verification</h2>
              <p>
                Complete the required documents to verify
                your exporter account.
              </p>
            </div>

            <span
              class:verified={verificationStatus === 'verified'}
              class="verification-badge"
            >
              {verificationStatus === 'verified'
                ? '✓ Verified Exporter'
                : verificationStatus === 'rejected'
                  ? 'Verification Rejected'
                  : 'Verification Pending'}
            </span>
          </div>

          <div class="progress-heading">
            <strong>Document Approval Progress</strong>
            <strong>{approvedCount} of {requiredCount}</strong>
          </div>

          <div
            class="progress-track"
            role="progressbar"
            aria-label="Document approval progress"
            aria-valuemin="0"
            aria-valuemax={requiredCount}
            aria-valuenow={approvedCount}
          >
            <div
              class="progress-fill"
              style:width={`${progressPercentage}%`}
            ></div>
          </div>

          <p class="progress-caption">
            {progressPercentage}% of required documents approved
          </p>

          <div class="document-list">
            {#each documentProgress as doc}
              <div class="document-row">
                <div class="document-info">
                  <span
                    class:done={doc.status === 'approved'}
                    class="document-icon"
                  >
                    {doc.status === 'approved' ? '✓' : '○'}
                  </span>

                  <strong>{getDocumentName(doc.type)}</strong>
                </div>

                <span class={`document-status ${doc.status}`}>
                  {getStatusLabel(doc.status)}
                </span>
              </div>
            {/each}
          </div>

          {#if verificationStatus === 'verified'}
            <p class="verified-message">
              ✓ Your required exporter documents have been
              approved by the platform administrator.
            </p>
          {:else}
            <p class="verification-help">
              Upload missing documents or replace rejected
              documents to continue verification.
            </p>
          {/if}

          <a class="upload-button" href="/exporter/documents">
            Manage Export Documents →
          </a>
        </div>
      {/if}

      {#if isSupplier}
        <div class="verification-card">
          <div class="verification-header">
            <div>
              <span class="eyebrow">INTERNATIONAL SUPPLIER READINESS</span>
              <h2>Assessment and Business Verification</h2>
              <p>Complete your readiness assessment and submit business documents for administrator review.</p>
            </div>
            <span class="verification-badge" class:verified={verificationStatus === 'verified'}>
              {verificationStatus === 'verified' ? '✓ Business Verified' : 'Business Verification Pending'}
            </span>
          </div>

          <div class="supplier-status-grid">
            <div class="supplier-status-box">
              <small>Assessment score</small>
              <strong class="supplier-score">{supplierAssessment ? `${supplierAssessment.score}/100` : 'Not taken'}</strong>
              <span class:status-good={supplierPassed} class="supplier-status-text">
                {supplierPassed ? '✓ Passed' : supplierAssessment ? 'Needs Support' : 'Assessment Required'}
              </span>
            </div>
            <div class="supplier-status-box">
              <small>Business verification</small>
              <strong>{verificationStatus === 'verified' ? 'Verified' : verificationStatus === 'rejected' ? 'Rejected' : 'Pending'}</strong>
              <span class="supplier-status-text">Administrator review is separate from assessment scoring.</span>
            </div>
          </div>

          {#if !supplierAssessment}
            <p class="verification-help">Start the readiness assessment before uploading supplier documents.</p>
            <a class="upload-button" href="/international-supplier/assessment">Take Supplier Assessment →</a>
          {:else if supplierPassed}
            <p class="verification-help">
              Your assessment is complete. {verificationStatus === 'verified'
                ? 'Your business is marked verified.'
                : 'You must still submit business documents and receive final administrator approval.'}
            </p>
            <a class="upload-button" href="/international-supplier/documents">Manage Supplier Documents →</a>
          {:else}
            <p class="verification-help">
              Your assessment indicates that additional readiness support is needed. Contact our trade support team about the next steps.
            </p>
            <a class="upload-button" href="/contact">Contact Trade Support →</a>
          {/if}
        </div>
      {/if}

      <h2>
        {isExporter ? 'Exporter Services' : isBuyer ? 'Buyer Services' : 'International Supplier Services'}
      </h2>

      <div class="cards">
        {#each links as link}
          <a class="card" href={link.href}>
            <h3>{link.title} →</h3>
            <p>{link.description}</p>
          </a>
        {/each}
      </div>

      <div class="notice">
        <h2>Coming next</h2>

        {#if isExporter}
          <p>
            Personal product management, buyer inquiries
            and quotations will be added in the next
            development phases.
          </p>
        {:else if isBuyer}
          <p>
            Your personal RFQs, supplier quotations and
            transaction tracking will be added in the
            next development phases.
          </p>
        {:else}
          <p>
            Personal supply-offer management and inquiry tracking are planned for future phases.
            Product submissions remain subject to administrator review.
          </p>
        {/if}
      </div>
    {:else}
      <div class="notice">
        <h2>Account setup required</h2>
        <p>
          Your account does not yet have a recognized trade
          account type. Please contact platform support to complete
          your account setup.
        </p>
        <a href="/contact">Contact support →</a>
      </div>
    {/if}

    <nav aria-label="Marketplace navigation">
      <a href="/">Back to home →</a>
    </nav>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #f3f7f3;
    color: #173d32;
    font-family: Arial, sans-serif;
  }

  main {
    max-width: 1100px;
    margin: auto;
    padding: 24px 20px 60px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;
  }

  .brand {
    color: #146b4c;
    font-size: 22px;
    font-weight: 800;
    text-decoration: none;
  }

  button {
    padding: 12px 18px;
    border: 0;
    border-radius: 8px;
    background: #146b4c;
    color: white;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  section {
    padding: 32px;
    border: 1px solid #dce7df;
    border-radius: 16px;
    background: white;
  }

  .eyebrow {
    color: #146b4c;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
  }

  h1 {
    font-size: clamp(28px, 5vw, 40px);
    margin-bottom: 10px;
  }

  h2 {
    margin-top: 30px;
  }

  p {
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  .profile {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 28px 0;
  }

  .profile > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 18px;
    border-radius: 12px;
    background: #f3f7f3;
  }

  small {
    color: #52645a;
  }

  .verification-card {
    margin: 30px 0;
    padding: 28px;
    border: 1px solid #cde5d5;
    border-radius: 16px;
    background: #f9fdfa;
  }

  .verification-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 15px;
  }

  .verification-header h2 {
    margin: 10px 0;
  }

  .verification-header p {
    color: #52645a;
    margin-top: 0;
  }

  .verification-badge {
    display: inline-block;
    padding: 10px 14px;
    border-radius: 20px;
    background: #fff3d4;
    color: #936200;
    font-size: 13px;
    font-weight: 800;
  }

  .verification-badge.verified {
    background: #d9f5e4;
    color: #146b4c;
  }

  .progress-heading {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 26px;
    margin-bottom: 12px;
  }

  .progress-track {
    height: 12px;
    background: #dce9df;
    border-radius: 20px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #169c65;
    border-radius: 20px;
    transition: width 0.3s ease;
  }

  .progress-caption {
    font-size: 13px;
    color: #52645a;
  }

  .document-list {
    margin: 24px 0;
    border: 1px solid #dce7df;
    border-radius: 12px;
    overflow: hidden;
    background: white;
  }

  .document-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 17px;
    border-bottom: 1px solid #e8efea;
  }

  .document-row:last-child {
    border-bottom: none;
  }

  .document-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .document-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #edf2ef;
    color: #64746a;
    font-weight: 800;
  }

  .document-icon.done {
    background: #d9f5e4;
    color: #146b4c;
  }

  .document-status {
    padding: 7px 11px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    background: #edf2ef;
    color: #64746a;
  }

  .document-status.approved {
    background: #d9f5e4;
    color: #146b4c;
  }

  .document-status.pending {
    background: #fff3d4;
    color: #936200;
  }

  .document-status.rejected {
    background: #ffe1df;
    color: #a32c24;
  }

  .verification-help {
    color: #52645a;
    font-size: 14px;
  }

  .verified-message {
    color: #146b4c;
    font-weight: 700;
  }

  .upload-button {
    display: inline-block;
    margin-top: 10px;
    padding: 13px 18px;
    border-radius: 9px;
    background: #146b4c;
    color: white;
    text-decoration: none;
    font-weight: 700;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 20px;
  }

  .card {
    display: block;
    padding: 22px;
    border: 1px solid #dce7df;
    border-radius: 12px;
    color: inherit;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  .card h3 {
    margin-top: 0;
    color: #146b4c;
  }

  .card p {
    color: #52645a;
  }

  .notice {
    margin: 28px 0;
    padding: 20px;
    border-radius: 12px;
    background: #f3f7f3;
  }

  .notice h2 {
    margin-top: 0;
  }

  .notice a,
  nav a {
    color: #146b4c;
    font-weight: 700;
  }

  .error {
    padding: 14px;
    border-radius: 8px;
    background: #fff0ee;
    color: #a32c24;
  }


  .supplier-status-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin: 24px 0 12px;
  }

  .supplier-status-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 1px solid #dce7df;
    border-radius: 12px;
    background: white;
  }

  .supplier-status-box strong {
    font-size: 22px;
  }

  .supplier-status-box .supplier-score {
    font-size: 32px;
    color: #146b4c;
  }

  .supplier-status-text {
    font-size: 13px;
    color: #64746a;
    line-height: 1.5;
  }

  .supplier-status-text.status-good {
    color: #146b4c;
    font-weight: 700;
  }

  @media (max-width: 750px) {
    .profile,
    .cards,
    .supplier-status-grid {
      grid-template-columns: 1fr;
    }

    section {
      padding: 22px;
    }

    .verification-card {
      padding: 18px;
    }

    .document-row {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>

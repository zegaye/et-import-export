

<script>
  /**
   * @typedef {{
   *   id: string;
   *   supplier_id: string;
   *   document_type: string;
   *   review_status: string;
   *   review_notes: string | null;
   *   created_at: string;
   *   reviewed_at: string | null;
   *   company_name: string;
   *   full_name: string;
   * }} DocumentRow
   */

  /**
   * @typedef {{
   *   requirement_type: string;
   *   applicability: string;
   *   justification: string;
   *   reviewed_at: string | null;
   *   reviewed_by: string | null;
   * }} ComplianceRow
   */

  /**
   * @typedef {{
   *   supplier_id: string;
   *   company_name: string | null;
   *   full_name: string | null;
   *   country: string | null;
   *   verification_status: string | null;
   *   assessment_score: number | null;
   *   assessment_status: string;
   *   assessment_attempt: number | null;
   *   total_documents: number;
   *   approved_documents: number;
   *   pending_documents: number;
   *   rejected_documents: number;
   *   compliance: ComplianceRow[];
   * }} SupplierRow
   */

  /**
   * @type {{
   *   data: {
   *     documents: DocumentRow[];
   *     suppliers: SupplierRow[];
   *   };
   *   form?: {
   *     success: boolean;
   *     message: string;
   *   } | null;
   * }}
   */
  let { data, form } = $props();


  let search = $state('');
  let statusFilter = $state('all');
  let supplierSearch = $state('');

  const labels = {
    business_registration: 'Business Registration',
    export_license: 'Export License',
    tax_registration: 'Tax Registration',
    product_certificate: 'Product Certificate',
    company_profile: 'Company Profile'
  };

  const requiredTypes = [
    'business_registration',
    'tax_registration',
    'company_profile'
  ];

  /** @param {string} type */
  function labelFor(type) {
    return /** @type {Record<string, string>} */ (labels)[type] ?? type;
  }

  /** @param {string | null | undefined} value */
  function display(value) {
    return value?.trim() || 'Not provided';
  }

  /** @param {string | null | undefined} value */
  function formatStatus(value) {
    return (value ?? 'pending')
      .replaceAll('_', ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  /** @param {string} value */
  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? 'Unknown'
      : date.toLocaleDateString();
  }

  let documents = $derived(data.documents ?? []);
  let suppliers = $derived(data.suppliers ?? []);

  let filtered = $derived(
    documents.filter((doc) => {
      const q = search.toLowerCase().trim();

      const matchesSearch =
        doc.company_name.toLowerCase().includes(q) ||
        doc.full_name.toLowerCase().includes(q) ||
        labelFor(doc.document_type).toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'all' ||
        doc.review_status === statusFilter;

      return matchesSearch && matchesStatus;
    })
  );

  let filteredSuppliers = $derived(
    suppliers.filter((supplier) => {
      const q = supplierSearch.toLowerCase().trim();

      return (
        (supplier.company_name ?? '').toLowerCase().includes(q) ||
        (supplier.full_name ?? '').toLowerCase().includes(q) ||
        (supplier.country ?? '').toLowerCase().includes(q)
      );
    })
  );

  let pending = $derived(
    documents.filter((d) => d.review_status === 'pending').length
  );

  let approved = $derived(
    documents.filter((d) => d.review_status === 'approved').length
  );

  let rejected = $derived(
    documents.filter((d) => d.review_status === 'rejected').length
  );

  let verifiedSuppliers = $derived(
    suppliers.filter((s) => s.verification_status === 'verified').length
  );

  /**
   * @param {string} supplierId
   * @param {string} type
   */
  function hasApprovedDocument(supplierId, type) {
    return documents.some(
      (doc) =>
        doc.supplier_id === supplierId &&
        doc.document_type === type &&
        doc.review_status === 'approved'
    );
  }

  /** @param {SupplierRow} supplier */
  function mandatoryDocumentsComplete(supplier) {
    return requiredTypes.every((type) =>
      hasApprovedDocument(supplier.supplier_id, type)
    );
  }
</script>

<svelte:head>
  <title>International Supplier Verification | ET Import Export</title>
</svelte:head>

<main class="page">
  <div class="container">
    <a href="/admin" class="back">← Admin Dashboard</a>

    <header>
      <span class="eyebrow">ET IMPORT EXPORT ADMINISTRATION</span>
      <h1>International Supplier Verification</h1>
      <p>
        Assess international suppliers, review business documents,
        and manage verification decisions.
      </p>
    </header>

    <section class="stats">
      <div class="stat">
        <span>Total Suppliers</span>
        <strong>{suppliers.length}</strong>
      </div>

      <div class="stat">
        <span>Verified Suppliers</span>
        <strong>{verifiedSuppliers}</strong>
      </div>

      <div class="stat">
        <span>Pending Documents</span>
        <strong>{pending}</strong>
      </div>

      <div class="stat">
        <span>Approved Documents</span>
        <strong>{approved}</strong>
      </div>
    </section>

    {#if form?.message}
      <p class:success={form.success} class="message" role="status">
        {form.message}
      </p>
    {/if}

    <section class="card">
      <div class="section-heading">
        <div>
          <h2>Supplier Readiness & Verification</h2>
          <p>
            Review assessment results and mandatory business documents
            before making a final verification decision.
          </p>
        </div>
      </div>

      <input
        class="supplier-search"
        type="search"
        bind:value={supplierSearch}
        placeholder="Search suppliers by company, name or country..."
        aria-label="Search international suppliers"
      />

      <div class="supplier-grid">
        {#each filteredSuppliers as supplier (supplier.supplier_id)}
          {@const assessmentPassed = supplier.assessment_status === 'passed'}
          {@const documentsComplete = mandatoryDocumentsComplete(supplier)}

          <article class="supplier-card">
            <div class="supplier-top">
              <div>
                <h3>{display(supplier.company_name)}</h3>
                <p>{display(supplier.full_name)}</p>
                <small>{display(supplier.country)}</small>
              </div>

              <span class={`status ${supplier.verification_status ?? 'pending'}`}>
                {formatStatus(supplier.verification_status)}
              </span>
            </div>

            <div class="assessment-box">
              <div>
                <span>Supplier Assessment</span>
                <strong>
                  {supplier.assessment_score === null
                    ? 'Not taken'
                    : `${supplier.assessment_score}/100`}
                </strong>
              </div>

              <span class:good={assessmentPassed} class="assessment-result">
                {formatStatus(supplier.assessment_status)}
              </span>
            </div>

            <div class="document-checklist">
              <h4>Mandatory Documents</h4>

              {#each requiredTypes as type}
                {@const complete = hasApprovedDocument(supplier.supplier_id, type)}

                <div class="check-row">
                  <span>{labelFor(type)}</span>
                  <span class:complete class="check-status">
                    {complete ? '✓ Approved' : '○ Not approved'}
                  </span>
                </div>
              {/each}
            </div>

            <div class="document-summary">
              <span>Submitted: {supplier.total_documents}</span>
              <span>Approved: {supplier.approved_documents}</span>
              <span>Pending: {supplier.pending_documents}</span>
              <span>Rejected: {supplier.rejected_documents}</span>
            </div>

            <div class="readiness">
              {#if supplier.verification_status === 'verified'}
                <p class="ready">
                  This supplier is currently verified.
                </p>
              {:else if assessmentPassed && documentsComplete}
                <p class="review-needed">
                  Basic requirements met. Country-specific licenses,
                  product certificates and final authorization still
                  require administrator review.
                </p>
              {:else}
                <p class="not-ready">
                  Verification prerequisites are incomplete.
                </p>
              {/if}
              </div>
            <div class="compliance-review">
       <h4>Conditional Compliance Review</h4>

  <p class="compliance-description">
    Determine whether an Export License or Product
    Certificate is required for this supplier.
  </p>

  {#each supplier.compliance as requirement (requirement.requirement_type)}
    <form
      method="POST"
      action="?/compliance"
      class="compliance-form"
    >
      <input
        type="hidden"
        name="supplier_id"
        value={supplier.supplier_id}
      />

      <input
        type="hidden"
        name="requirement_type"
        value={requirement.requirement_type}
      />

      <label>
        <strong>{labelFor(requirement.requirement_type)}</strong>

        <select
          name="applicability"
          value={requirement.applicability}
        >
          <option value="not_determined">Not Determined</option>
          <option value="required">Required</option>
          <option value="not_applicable">Not Applicable</option>
        </select>
      </label>

      <label>
        <span>Justification / Regulatory Basis</span>

        <textarea
          name="justification"
          rows="3"
          maxlength="1000"
          placeholder="Explain the regulatory requirement..."
        >{requirement.justification}</textarea>
      </label>

      {#if requirement.reviewed_at}
        <small>
          Last reviewed: {formatDate(requirement.reviewed_at)}
        </small>
      {:else}
        <small>Not yet reviewed</small>
      {/if}

      <button type="submit" class="save-compliance">
        Save Compliance Decision
      </button>
    </form>
  {/each}
</div>
<div class="final-review">
              <h4>Final Verification</h4>
              <p>
                Final approval will be enabled after the additional
                compliance checks are enforced on the server.
              </p>

              <button
                type="button"
                class="finalize-disabled"
                disabled
              >
                Final Approval — Not Yet Enabled
              </button>
              </div>
          </article>
        {:else}
          <p class="empty">No international suppliers found.</p>
        {/each}
      </div>
    </section>

    <section class="card documents-card">
      <div class="section-heading">
        <div>
          <h2>Supplier Document Review</h2>
          <p>
            Inspect each uploaded document before approving or rejecting it.
          </p>
        </div>
      </div>

      <div class="document-stats">
        <span>Total: {documents.length}</span>
        <span>Pending: {pending}</span>
        <span>Approved: {approved}</span>
        <span>Rejected: {rejected}</span>
      </div>

      <div class="filters">
        <input
          type="search"
          bind:value={search}
          placeholder="Search company, supplier or document..."
          aria-label="Search supplier documents"
        />

        <select
          bind:value={statusFilter}
          aria-label="Filter by review status"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Company / Supplier</th>
              <th>Document</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Review</th>
            </tr>
          </thead>

          <tbody>
            {#each filtered as doc (doc.id)}
              <tr>
                <td>
                  <strong>{doc.company_name}</strong>
                  <small>{doc.full_name}</small>
                </td>

                <td>{labelFor(doc.document_type)}</td>

                <td>{formatDate(doc.created_at)}</td>

                <td>
                  <span class={`status ${doc.review_status}`}>
                    {formatStatus(doc.review_status)}
                  </span>
                </td>

                <td>
                  <div class="review-actions">
                    <a
                      href={`/admin/international-suppliers/view/${doc.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="view-link"
                    >
                      View Document ↗
                    </a>

                    {#if doc.review_status === 'pending'}
                      <form method="POST" action="?/review">
                        <input
                          type="hidden"
                          name="id"
                          value={doc.id}
                        />

                        <textarea
                          name="notes"
                          rows="2"
                          maxlength="1000"
                          placeholder="Review notes / rejection reason"
                          aria-label="Review notes"
                        ></textarea>

                        <div class="buttons">
                          <button
                            type="submit"
                            name="status"
                            value="approved"
                            class="approve"
                          >
                            Approve
                          </button>

                          <button
                            type="submit"
                            name="status"
                            value="rejected"
                            class="reject"
                          >
                            Reject
                          </button>
                        </div>
                      </form>
                    {:else}
                      <small>
                        Review completed
                        {#if doc.review_notes}
                          — {doc.review_notes}
                        {/if}
                      </small>
                    {/if}
                  </div>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="5" class="empty">
                  No supplier documents found.
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f6fb;
    color: #172b4d;
  }

  .page {
    min-height: 100vh;
    padding: 38px 20px;
  }

  .container {
    max-width: 1150px;
    margin: auto;
  }

  .back,
  .view-link {
    color: #3b4dff;
    text-decoration: none;
    font-weight: 700;
  }

  header {
    margin: 35px 0;
  }

  .eyebrow {
    color: #4255ff;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    margin: 12px 0;
    font-size: clamp(28px, 4vw, 38px);
  }

  header p,
  .section-heading p {
    color: #64748b;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }

  .stat,
  .card {
    background: white;
    padding: 22px;
    border-radius: 14px;
  }

  .card {
    margin-bottom: 24px;
  }

  .stat span,
  td small {
    display: block;
    color: #64748b;
    font-size: 12px;
  }

  .stat strong {
    display: block;
    font-size: 30px;
    margin-top: 10px;
  }

  .section-heading {
    margin-bottom: 22px;
  }

  .section-heading h2 {
    margin: 0 0 8px;
    font-size: 22px;
  }

  .section-heading p {
    margin: 0;
    line-height: 1.5;
  }

  .supplier-search,
  .filters input,
  .filters select,
  textarea {
    padding: 12px;
    border: 1px solid #d9e0ee;
    border-radius: 9px;
    font: inherit;
    box-sizing: border-box;
  }

  .supplier-search {
    width: 100%;
    margin-bottom: 20px;
  }

  .supplier-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .supplier-card {
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 20px;
    min-width: 0;
  }

  .supplier-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .supplier-top h3 {
    margin: 0 0 6px;
    font-size: 19px;
  }

  .supplier-top p {
    margin: 0 0 5px;
  }

  .supplier-top small {
    color: #64748b;
  }

  .assessment-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    border-radius: 10px;
    padding: 15px;
    margin-top: 18px;
    gap: 10px;
  }

  .assessment-box span {
    display: block;
    font-size: 12px;
    color: #64748b;
  }

  .assessment-box strong {
    display: block;
    font-size: 23px;
    margin-top: 5px;
  }

  .assessment-result {
    color: #991b1b;
    font-weight: 700;
    text-align: right;
  }

  .assessment-result.good {
    color: #166534;
  }

  .document-checklist {
    margin-top: 20px;
  }

  h4 {
    margin: 0 0 12px;
    font-size: 15px;
  }

  .check-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 9px 0;
    border-bottom: 1px solid #edf2f7;
    font-size: 13px;
  }

  .check-status {
    color: #92400e;
    font-weight: 700;
    text-align: right;
  }

  .check-status.complete {
    color: #166534;
  }

  .document-summary,
  .document-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 18px;
    font-size: 12px;
    color: #475569;
  }

  .readiness {
    margin-top: 18px;
  }

  .readiness p {
    border-radius: 9px;
    padding: 12px;
    font-size: 13px;
    line-height: 1.5;
  }

  .ready {
    background: #dcfce7;
    color: #166534;
  }

  .review-needed {
    background: #eff6ff;
    color: #1e40af;
  }

  .not-ready {
    background: #fff7ed;
    color: #9a3412;
  }

  .final-review {
    border-top: 1px solid #e2e8f0;
    margin-top: 18px;
    padding-top: 18px;
  }

  .final-review p {
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
  }

  .finalize-disabled {
    width: 100%;
    background: #cbd5e1;
    color: #475569;
    cursor: not-allowed;
  }

  .filters {
    display: flex;
    gap: 12px;
    margin: 22px 0;
  }

  .filters input {
    flex: 1;
    min-width: 0;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 15px 10px;
    border-bottom: 1px solid #e6eaf2;
    text-align: left;
    vertical-align: top;
  }

  th {
    font-size: 12px;
    color: #64748b;
  }

  td strong {
    display: block;
  }

  .status {
    display: inline-block;
    padding: 7px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;
  }

  .pending {
    background: #fff4bf;
    color: #92400e;
  }

  .approved,
  .verified {
    background: #dcfce7;
    color: #166534;
  }

  .rejected {
    background: #fee2e2;
    color: #991b1b;
  }

  .review-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  textarea {
    width: 100%;
    resize: vertical;
  }

  .buttons {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  button {
    border: 0;
    border-radius: 8px;
    padding: 10px 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .approve {
    background: #166534;
    color: white;
  }

  .reject {
    background: #fee2e2;
    color: #991b1b;
  }

  .message {
    padding: 14px;
    border-radius: 10px;
    background: #fee2e2;
    color: #991b1b;
    margin-bottom: 18px;
  }

  .message.success {
    background: #dcfce7;
    color: #166534;
  }

  .empty {
    text-align: center;
    padding: 35px;
    color: #64748b;
  }

  @media (max-width: 800px) {
    .supplier-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters {
      flex-direction: column;
    }

    .supplier-top {
      flex-direction: column;
    }
  }
  
.compliance-review {
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.compliance-description {
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

.compliance-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  margin-top: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.compliance-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
}

.compliance-form select,
.compliance-form textarea {
  width: 100%;
  padding: 11px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
  font: inherit;
  box-sizing: border-box;
}

.compliance-form small {
  color: #64748b;
}

.save-compliance {
  background: #1d4ed8;
  color: white;
  padding: 12px;
  border-radius: 8px;
}

.save-compliance:hover {
  background: #1e40af;
}

</style>

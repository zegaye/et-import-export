
<script>
  /**
   * @typedef {{
   *   id: string;
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
   * @type {{
   *   data: { documents: DocumentRow[] };
   *   form?: { success: boolean; message: string } | null;
   * }}
   */
  let { data, form } = $props();

  let documents = $derived(data?.documents ?? []);

  /** @type {Record<string, string>} */
  const documentLabels = {
    business_license: 'Business License',
    export_license: 'Export License',
    company_profile: 'Company Profile',
    quality_certificate: 'Quality Certificate'
  };

  /** @param {string} type */
  function getDocumentLabel(type) {
    return documentLabels[type] ?? type;
  }

  let search = $state('');
  let statusFilter = $state('all');

  let filteredDocuments = $derived(
    documents.filter((doc) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        doc.company_name.toLowerCase().includes(query) ||
        doc.full_name.toLowerCase().includes(query) ||
        getDocumentLabel(doc.document_type)
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === 'all' ||
        doc.review_status === statusFilter;

      return matchesSearch && matchesStatus;
    })
  );

  let pendingCount = $derived(
    documents.filter((doc) => doc.review_status === 'pending').length
  );

  let approvedCount = $derived(
    documents.filter((doc) => doc.review_status === 'approved').length
  );

  let rejectedCount = $derived(
    documents.filter((doc) => doc.review_status === 'rejected').length
  );
</script>

<svelte:head>
  <title>Exporter Document Verification | ET Import Export</title>
</svelte:head>

<div class="page">
  <main class="container">
    <a href="/admin" class="back">← Admin Dashboard</a>

    <p class="eyebrow">ET IMPORT EXPORT ADMINISTRATION</p>

    <h1>Exporter Document Verification</h1>

    <p class="subtitle">
      Review documents submitted by registered exporters.
    </p>

    <div class="stats">
      <div class="stat">
        <span>Total Documents</span>
        <strong>{documents.length}</strong>
      </div>

      <div class="stat">
        <span>Pending Review</span>
        <strong>{pendingCount}</strong>
      </div>

      <div class="stat">
        <span>Approved</span>
        <strong>{approvedCount}</strong>
      </div>

      <div class="stat">
        <span>Rejected</span>
        <strong>{rejectedCount}</strong>
      </div>
    </div>

    {#if form?.message}
      <p
        class="message"
        class:success={form.success}
        role="status"
      >
        {form.message}
      </p>
    {/if}

    <section class="card">
      <div class="filters">
        <input
          type="search"
          bind:value={search}
          placeholder="Search company, exporter or document..."
          aria-label="Search documents"
        />

        <select
          bind:value={statusFilter}
          aria-label="Filter documents by status"
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
              <th>Company / Exporter</th>
              <th>Document</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {#each filteredDocuments as doc (doc.id)}
              <tr>
                <td>
                  <strong>{doc.company_name}</strong>
                  <small>{doc.full_name}</small>
                </td>

                <td>{getDocumentLabel(doc.document_type)}</td>

                <td>
                  {new Date(doc.created_at).toLocaleDateString()}
                </td>

                <td>
                  <span class={`status ${doc.review_status}`}>
                    {doc.review_status}
                  </span>
                </td>

                <td>
                  <div class="review-actions">
                    <a
                      href={`/admin/documents/view/${doc.id}`}
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
                        <small>Document ID: {doc.id}</small>
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
                      <small class="completed">
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
                  No documents found.
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f4f6fb;
    font-family: Arial, sans-serif;
    color: #172b4d;
  }

  .page {
    min-height: 100vh;
    padding: 38px 20px;
  }

  .container {
    max-width: 1100px;
    margin: auto;
  }

  .back {
    color: #3b4dff;
    text-decoration: none;
    font-weight: 700;
  }

  .eyebrow {
    margin-top: 40px;
    color: #4255ff;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    margin: 12px 0;
    font-size: clamp(28px, 4vw, 38px);
  }

  .subtitle {
    color: #64748b;
    margin-bottom: 35px;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }

  .stat {
    background: white;
    padding: 22px;
    border-radius: 14px;
  }

  .stat span {
    display: block;
    color: #64748b;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .stat strong {
    font-size: 30px;
  }

  .card {
    background: white;
    padding: 22px;
    border-radius: 16px;
    overflow: hidden;
  }

  .filters {
    display: flex;
    gap: 12px;
    margin-bottom: 22px;
  }

  .filters input,
  .filters select {
    padding: 13px;
    border: 1px solid #d9e0ee;
    border-radius: 9px;
    font: inherit;
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
    border-collapse: collapse;
    min-width: 760px;
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

  td strong,
  td small {
    display: block;
  }

  td small {
    margin-top: 5px;
    color: #64748b;
  }

  .status {
    display: inline-block;
    padding: 7px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .pending {
    background: #fff4bf;
    color: #92400e;
  }

  .approved {
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
    min-width: 190px;
  }

  .view-link {
    color: #3b4dff;
    font-weight: 700;
    text-decoration: none;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 9px;
    border: 1px solid #d9e0ee;
    border-radius: 8px;
    font: inherit;
    resize: vertical;
  }

  .buttons {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  button {
    border: none;
    padding: 10px 14px;
    border-radius: 8px;
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

  .completed {
    color: #64748b;
  }

  .empty {
    text-align: center;
    color: #64748b;
    padding: 35px;
  }

  @media (max-width: 700px) {
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters {
      flex-direction: column;
    }
  }
</style>

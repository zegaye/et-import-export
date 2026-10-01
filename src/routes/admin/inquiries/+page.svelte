<script>
  let { data, form } = $props();

  let search = $state('');
  let selectedStatus = $state('all');

  let results = $derived(
    data.inquiries.filter((inquiry) => {
      const matchesStatus =
        selectedStatus === 'all' || inquiry.status === selectedStatus;

      const matchesSearch = [
        inquiry.full_name,
        inquiry.company,
        inquiry.email,
        inquiry.product_name,
        inquiry.inquiry_type,
        inquiry.message
      ]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesStatus && matchesSearch;
    })
  );

  let newCount = $derived(
    data.inquiries.filter((inquiry) => inquiry.status === 'new').length
  );

  let contactedCount = $derived(
    data.inquiries.filter((inquiry) => inquiry.status === 'contacted').length
  );

  let closedCount = $derived(
    data.inquiries.filter((inquiry) => inquiry.status === 'closed').length
  );

  /** @param {string} value */
  function formatDate(value) {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Addis_Ababa'
    }).format(new Date(value));
  }
</script>

<svelte:head>
  <title>Buyer Inquiries | ET Import Export Admin</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<header>
  <a class="brand" href="/">ET Import Export</a>

  <nav aria-label="Admin navigation">
    <a href="/admin">Product dashboard</a>
    <a href="/admin/inquiries" aria-current="page">Buyer inquiries</a>
  </nav>
</header>

<main>
  <section class="intro">
    <span class="eyebrow">ADMIN DASHBOARD</span>
    <h1> Buyer inquiries</h1>
    <p>Signed in as {data.email}</p>
    <p>Review requests and track your team's follow-up.</p>
  </section>

  <div class="stats">
    <div>
      <strong>{newCount}</strong>
      <span>New</span>
    </div>
    <div>
      <strong>{contactedCount}</strong>
      <span>Contacted</span>
    </div>
    <div>
      <strong>{closedCount}</strong>
      <span>Closed</span>
    </div>
  </div>

  {#if form?.message}
    <p
      class="feedback"
      class:success={form.success}
      role={form.success ? 'status' : 'alert'}
    >
      {form.message}
    </p>
  {/if}

  <section aria-labelledby="inquiries-heading">
    <div class="section-heading">
      <div>
        <h2 id="inquiries-heading">Received inquiries</h2>
        <p>Showing the latest 100 inquiries. Counts refer to this list.</p>
      </div>

      <a class="refresh" href="/admin/inquiries">Refresh list</a>
    </div>

    <div class="filters">
      <label>
        Status
        <select bind:value={selectedStatus}>
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </label>

      <label>
        Search
        <input
          type="search"
          bind:value={search}
          placeholder="Search name, company, product, or message..."
        />
      </label>
    </div>

    <div class="inquiries">
      {#each results as inquiry (inquiry.id)}
        <article>
          <div class="inquiry-heading">
            <div>
              <span class="eyebrow">{inquiry.inquiry_type}</span>
              <h3>{inquiry.product_name || 'General inquiry'}</h3>
              <p class="date">{formatDate(inquiry.created_at)} · Ethiopia time</p>
            </div>

            <span
              class="badge"
              class:contacted={inquiry.status === 'contacted'}
              class:closed={inquiry.status === 'closed'}
            >
              {inquiry.status}
            </span>
          </div>

          <dl>
            <div>
              <dt>Name</dt>
              <dd>{inquiry.full_name}</dd>
            </div>

            <div>
              <dt>Company</dt>
              <dd>{inquiry.company || 'Not provided'}</dd>
            </div>

            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${encodeURIComponent(inquiry.email)}`}>
                  {inquiry.email}
                </a>
              </dd>
            </div>

            <div>
              <dt>Phone</dt>
              <dd>{inquiry.phone}</dd>
            </div>

            <div>
              <dt>Quantity</dt>
              <dd>{inquiry.quantity || 'Not specified'}</dd>
            </div>
          </dl>

          <div class="message">
            <h4>Requirements</h4>
            <p>{inquiry.message}</p>
          </div>
<form method="POST" action="?/saveNotes" class="notes-form">
  <input type="hidden" name="id" value={inquiry.id} />

  <input
    type="hidden"
    name="previousNotes"
    value={inquiry.internal_notes ?? ''}
  />

  <label>
    Private follow-up notes
    <textarea
      name="notes"
      rows="5"
      maxlength="5000"
      placeholder="Record conversations, agreed requirements, and the next action..."
      value={form?.noteId === inquiry.id
        ? form?.notes ?? inquiry.internal_notes ?? ''
        : inquiry.internal_notes ?? ''}
    ></textarea>
  </label>

  <p>For your admin team. These notes are not shown on public pages.</p>

  <button type="submit">Save notes</button>
</form>
          <form method="POST" action="?/updateStatus" class="status-form">
                 <input type="hidden" name="id" value={inquiry.id} />
            <input
              type="hidden"
              name="previousStatus"
              value={inquiry.status}
            />

            <label>
              Update status
              <select name="status" value={inquiry.status}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </label>

            <button type="submit">Save status</button>
          </form>
        </article>
      {:else}
        <p class="empty">No inquiries match your selected filters.</p>
      {/each}
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #f5f8f5;
    color: #173d32;
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 24px max(5%, calc((100% - 1100px) / 2));
    border-bottom: 1px solid #dfe8e1;
    background: white;
  }

  .brand {
    color: #176347;
    font-size: 21px;
    font-weight: 800;
    text-decoration: none;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  nav a,
  .refresh {
    color: #176347;
    font-weight: 700;
  }

  main {
    max-width: 1100px;
    margin: auto;
    padding: 40px 20px 80px;
  }

  .eyebrow {
    color: #16815d;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.2px;
  }

  h1 {
    margin: 12px 0;
    font-size: clamp(32px, 5vw, 46px);
  }

  .intro p,
  .section-heading p,
  .date {
    color: #68786e;
    line-height: 1.6;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin: 28px 0;
  }

  .stats div {
    display: grid;
    gap: 8px;
    padding: 22px;
    border: 1px solid #dde7df;
    border-radius: 12px;
    background: white;
  }

  .stats strong {
    font-size: 30px;
  }

  .stats span {
    color: #68786e;
  }

  .feedback {
    padding: 16px;
    border-radius: 9px;
    background: #fff3dc;
    color: #725721;
    line-height: 1.6;
  }

  .feedback.success {
    background: #e4f4e8;
    color: #176347;
  }

  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-top: 35px;
  }

  h2 {
    margin-bottom: 8px;
    font-size: 28px;
  }

  .filters {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 16px;
    margin: 24px 0;
  }

  label {
    display: grid;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
  }

  input,
  select {
    width: 100%;
    min-width: 0;
    padding: 12px;
    border: 1px solid #cbd9cf;
    border-radius: 8px;
    background: white;
    color: #173d32;
    font: inherit;
  }

  input:focus,
  select:focus,
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid #55a87c;
    outline-offset: 3px;
  }

  .inquiries {
    display: grid;
    gap: 20px;
  }

  article {
    min-width: 0;
    padding: 26px;
    border: 1px solid #dde7df;
    border-radius: 14px;
    background: white;
    overflow-wrap: anywhere;
  }

  .inquiry-heading {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 16px;
  }

  h3 {
    margin: 10px 0;
    font-size: 24px;
  }

  .date {
    margin: 0;
    font-size: 13px;
  }

  .badge {
    padding: 8px 13px;
    border-radius: 999px;
    background: #fff3dc;
    color: #725721;
    font-size: 13px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .badge.contacted {
    background: #e4f4e8;
    color: #176347;
  }

  .badge.closed {
    background: #edf0f2;
    color: #53616b;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
    margin: 28px 0;
  }

  dt {
    margin-bottom: 7px;
    color: #68786e;
    font-size: 13px;
  }

  dd {
    margin: 0;
    font-weight: 700;
  }

  dd a {
    color: #176347;
  }

  .message {
    padding: 18px;
    border-radius: 10px;
    background: #f5f8f5;
  }

  h4 {
    margin: 0 0 10px;
    font-size: 14px;
  }

  .message p {
    margin: 0;
    color: #40584d;
    line-height: 1.7;
    white-space: pre-wrap;
  }

  .status-form {
    display: flex;
    align-items: end;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 22px;
  }

  .status-form label {
    width: 190px;
    max-width: 100%;
  }

  button {
    padding: 13px 20px;
    border: 0;
    border-radius: 8px;
    background: #176347;
    color: white;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    background: #104a36;
  }

  .empty {
    padding: 28px;
    border: 1px dashed #cbd9cf;
    border-radius: 12px;
    color: #68786e;
    text-align: center;
  }

  @media (max-width: 700px) {
    header,
    .section-heading {
      flex-wrap: wrap;
    }

    dl {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .filters,
    dl {
      grid-template-columns: 1fr;
    }

    .stats {
      gap: 8px;
    }

    .stats div {
      padding: 14px;
    }

    article {
      padding: 20px;
    }

    .inquiry-heading {
      flex-wrap: wrap;
    }
  }.notes-form {
  display: grid;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  border: 1px solid #dde7df;
  border-radius: 10px;
  background: #f5f8f5;
}

.notes-form textarea {
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid #cbd9cf;
  border-radius: 8px;
  background: white;
  color: #173d32;
  font: inherit;
  font-weight: 400;
  line-height: 1.6;
  resize: vertical;
}

.notes-form textarea:focus {
  outline: 2px solid #55a87c;
  outline-offset: 3px;
}

.notes-form p {
  margin: 0;
  color: #68786e;
  font-size: 13px;
  line-height: 1.6;
}

.notes-form button {
  justify-self: start;
}
</style>
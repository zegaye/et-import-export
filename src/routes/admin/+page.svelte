<script>
  let { data, form } = $props();

  let selectedStatus = $state('pending');
  let search = $state('');

  let results = $derived(
    data.submissions.filter((product) => {
      const matchesStatus =
        selectedStatus === 'all' || product.status === selectedStatus;

      const matchesSearch =
        `${product.product_name ?? ''} ${product.seller_name ?? ''} ${product.category ?? ''}`
          .toLowerCase()
          .includes(search.toLowerCase().trim());

      return matchesStatus && matchesSearch;
    })
  );

  let pendingCount = $derived(
    data.submissions.filter((product) => product.status === 'pending').length
  );

  let approvedCount = $derived(
    data.submissions.filter((product) => product.status === 'approved').length
  );

  let rejectedCount = $derived(
    data.submissions.filter((product) => product.status === 'rejected').length
  );
</script>

<svelte:head>
  <title>Admin Dashboard | ET Import Export</title>
</svelte:head>

<div class="page">
  <header>
    <div>
      <a class="logo" href="/">ET Import Export</a>
      <p>Administration</p>
    </div>

    <form method="POST" action="?/logout">
      <button class="logout" type="submit">Sign out</button>
    </form>
  </header>

  <main>
    <section class="intro">
      <span>PRODUCT MANAGEMENT</span>
      <h1>Admin dashboard</h1>
      <p>Review supplier submissions before publishing them.</p>
      <p class="account">Signed in as {data.email}</p>
    </section>

    <div class="stats">
      <div>
        <strong>{pendingCount}</strong>
        <span>Pending review</span>
      </div>

      <div>
        <strong>{approvedCount}</strong>
        <span>Approved</span>
      </div>

      <div>
        <strong>{rejectedCount}</strong>
        <span>Rejected</span>
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

    <section class="submissions">
      <div class="section-heading">
        <div>
          <h2>Product submissions</h2>
          <p>Showing the latest 100 submissions.</p>
        </div>

        <a class="refresh" href="/admin">Refresh list</a>
      </div>

      <div class="filters">
        <label>
          <span>Status</span>
          <select bind:value={selectedStatus}>
            <option value="pending">Pending review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All submissions</option>
          </select>
        </label>

        <label class="search">
          <span>Search</span>
          <input
            type="search"
            placeholder="Product, supplier, or category..."
            bind:value={search}
          />
        </label>
      </div>

      <div class="products">
        {#each results as product (product.id)}
          <article>
            <div class="product-heading">
              <div>
                <span class="direction">
                  {product.direction === 'export'
                    ? 'EXPORT FROM ETHIOPIA'
                    : 'IMPORT INTO ETHIOPIA'}
                </span>

                <h3>{product.product_name}</h3>
              </div>

              <span
                class="badge"
                class:approved={product.status === 'approved'}
                class:rejected={product.status === 'rejected'}
              >
                {product.status}
              </span>
            </div>

            <dl>
              <div>
                <dt>Supplier</dt>
                <dd>{product.seller_name}</dd>
              </div>

              <div>
                <dt>Phone</dt>
                <dd>{product.phone}</dd>
              </div>

              <div>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>

              <div>
                <dt>Origin</dt>
                <dd>{product.origin}</dd>
              </div>

              <div>
                <dt>Quantity</dt>
                <dd>{product.quantity || 'Not specified'}</dd>
              </div>
            </dl>

            <p class="description">
              {product.description || 'No description provided.'}
            </p>

            {#if product.status === 'pending'}
              <form class="actions" method="POST" action="?/review">
                <input type="hidden" name="id" value={product.id} />

                <button
                  class="approve-button"
                  type="submit"
                  name="status"
                  value="approved"
                >
                  Approve
                </button>

                <button
                  class="reject-button"
                  type="submit"
                  name="status"
                  value="rejected"
                >
                  Reject
                </button>
              </form>
            {:else}
              <p class="reviewed">
                {product.status === 'approved'
                  ? 'Approved for public listing.'
                  : 'Hidden from public listings.'}
              </p>
            {/if}
          </article>
        {:else}
          <div class="empty">
            <h3>No matching submissions</h3>
            <p>Try another status or search term.</p>
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f5f7f5;
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
    padding: 22px 5%;
    background: white;
    border-bottom: 1px solid #dde6df;
  }

  .logo {
    color: #146b4c;
    font-size: 22px;
    font-weight: 800;
    text-decoration: none;
  }

  header p {
    margin: 6px 0 0;
    color: #68786e;
    font-size: 13px;
  }

  main {
    max-width: 1100px;
    margin: auto;
    padding: 40px 24px 70px;
  }

  .intro > span,
  .direction {
    color: #146b4c;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
  }

  h1 {
    margin: 12px 0;
    font-size: clamp(30px, 5vw, 44px);
  }

  .intro p,
  .section-heading p {
    color: #68786e;
    line-height: 1.6;
  }

  .account {
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 28px 0;
  }

  .stats > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    background: white;
    border: 1px solid #dde6df;
    border-radius: 12px;
  }

  .stats strong {
    font-size: 32px;
  }

  .stats span {
    color: #68786e;
    font-size: 14px;
  }

  .message {
    padding: 16px;
    border-radius: 8px;
    background: #fff0ef;
    color: #9d302a;
  }

  .message.success {
    background: #e2f4e9;
    color: #145c3c;
  }

  .section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  h2 {
    margin-bottom: 6px;
  }

  .refresh {
    color: #146b4c;
    font-weight: 700;
    white-space: nowrap;
  }

  .filters {
    display: flex;
    gap: 16px;
    margin: 20px 0;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
  }

  .search {
    flex: 1;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border: 1px solid #cbd8ce;
    border-radius: 8px;
    background: white;
    color: #173d32;
    font: inherit;
  }

  .products {
    display: grid;
    gap: 18px;
  }

  article,
  .empty {
    padding: 24px;
    border: 1px solid #dde6df;
    border-radius: 12px;
    background: white;
  }

  .product-heading {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 16px;
  }

  h3 {
    margin: 10px 0;
    font-size: 23px;
    overflow-wrap: anywhere;
  }

  .badge {
    padding: 7px 12px;
    border-radius: 20px;
    background: #fff2cf;
    color: #865d08;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .badge.approved {
    background: #e2f4e9;
    color: #145c3c;
  }

  .badge.rejected {
    background: #fff0ef;
    color: #9d302a;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin: 22px 0;
  }

  dt {
    margin-bottom: 6px;
    color: #68786e;
    font-size: 13px;
  }

  dd {
    margin: 0;
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .description {
    color: #53675a;
    line-height: 1.7;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .actions {
    display: flex;
    gap: 12px;
    margin-top: 22px;
  }

  button {
    padding: 12px 22px;
    border: 0;
    border-radius: 8px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .approve-button,
  .logout {
    background: #146b4c;
    color: white;
  }

  .reject-button {
    background: #fff0ef;
    color: #9d302a;
  }

  .reviewed {
    margin-bottom: 0;
    color: #68786e;
    font-size: 14px;
  }

  .empty {
    text-align: center;
    color: #68786e;
  }

  @media (max-width: 650px) {
    main {
      padding: 28px 16px;
    }

    .stats {
      gap: 8px;
    }

    .stats > div {
      padding: 15px 10px;
    }

    .stats strong {
      font-size: 26px;
    }

    .stats span {
      font-size: 12px;
    }

    .filters {
      flex-direction: column;
    }

    dl {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    article {
      padding: 18px;
    }
  }
</style>
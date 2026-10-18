
<script>
  let { data } = $props();

  let search = $state('');
  let category = $state('All');

  let products = $derived(data.products ?? []);

  let categories = $derived([
    'All',
    ...new Set(products.map((p) => p.category).filter(Boolean))
  ]);

  let filtered = $derived(
    products.filter((p) => {
      const matchesCategory =
        category === 'All' || p.category === category;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        `${p.name} ${p.category} ${p.origin} ${p.description}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    })
  );
</script>

<svelte:head>
  <title>Export Products | ET Import Export</title>
  <meta
    name="description"
    content="Discover approved Ethiopian export products from international trade suppliers."
  />
</svelte:head>

<main>
  <nav class="navigation">
    <a href="/">← Home</a>
    <a href="/import">Import Products</a>
    <a href="/dashboard">Dashboard</a>
  </nav>

  <section class="hero">
    <span class="eyebrow">ETHIOPIA TO THE WORLD</span>
    <h1>Discover Ethiopian Export Products</h1>
    <p>
      Explore approved Ethiopian products and connect with
      potential international trading partners.
    </p>
    <a class="primary-button" href="/sell">
      Register an Export Product →
    </a>
  </section>

  <section class="catalog">
    <div class="catalog-heading">
      <div>
        <h2>Export Marketplace</h2>
        <p>{filtered.length} products found</p>
      </div>
    </div>

    <div class="filters">
      <input
        type="search"
        placeholder="Search products, categories, or origin..."
        bind:value={search}
        aria-label="Search export products"
      />

      <select bind:value={category} aria-label="Filter by category">
        {#each categories as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </div>

    {#if filtered.length === 0}
      <div class="empty">
        <h3>No export products found</h3>
        <p>Try another search or category.</p>
      </div>
    {:else}
      <div class="grid">
        {#each filtered as product (product.id)}
          <article class="product-card">
            {#if product.imageUrl}
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
              />
            {:else}
              <div class="placeholder">ET ↗</div>
            {/if}

            <div class="content">
              <div class="badges">
                <span class="badge approved">
                  Approved Listing
                </span>

                {#if product.isVerifiedExporter}
                  <span class="badge verified">
                    ✓ Verified Exporter
                  </span>
                {/if}
              </div>

              <h3>{product.name}</h3>

              <p class="description">
                {product.description ||
                  'Product details available on request.'}
              </p>

              <div class="details">
                <span>
                  <strong>Category:</strong>
                  {product.category || '—'}
                </span>
                <span>
                  <strong>Origin:</strong>
                  {product.origin || 'Ethiopia'}
                </span>
                <span>
                  <strong>Quantity:</strong>
                  {product.quantity || 'On request'}
                </span>
              </div>

              <a
                class="view-button"
                href={`/products/${product.id}`}
              >
                View Product →
              </a>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f5f8f5;
    color: #163d2b;
  }

  main {
    max-width: 1250px;
    margin: auto;
    padding: 24px;
  }

  .navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 28px;
  }

  a {
    color: #246c46;
    text-decoration: none;
    font-weight: 700;
  }

  .hero {
    padding: 55px 40px;
    background: linear-gradient(120deg, #123e2c, #28724a);
    border-radius: 20px;
    color: white;
  }

  .eyebrow {
    color: #b9e4c2;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  h1 {
    font-size: clamp(30px, 5vw, 50px);
    margin: 20px 0;
  }

  .hero p {
    max-width: 650px;
    line-height: 1.7;
  }

  .primary-button {
    display: inline-block;
    margin-top: 20px;
    padding: 14px 22px;
    background: white;
    color: #18583a;
    border-radius: 10px;
  }

  .catalog {
    padding: 40px 0;
  }

  .catalog-heading h2 {
    margin-bottom: 8px;
  }

  .catalog-heading p {
    color: #687b70;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 25px 0;
  }

  input,
  select {
    padding: 14px;
    border: 1px solid #d7e4d8;
    border-radius: 10px;
    background: white;
    font: inherit;
  }

  input {
    flex: 1;
    min-width: 220px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }

  .product-card {
    background: white;
    border: 1px solid #e0e9e1;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 5px 20px #1733260b;
  }

  .product-card img,
  .placeholder {
    width: 100%;
    height: 220px;
    object-fit: contain;
    background: #edf3ee;
  }

  .placeholder {
    display: grid;
    place-items: center;
    color: #2c7851;
    font-size: 40px;
    font-weight: bold;
  }

  .content {
    padding: 22px;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .badge {
    display: inline-block;
    padding: 7px 11px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: bold;
  }

  .approved {
    background: #e3f4e7;
    color: #267348;
  }

  .verified {
    background: #e5efff;
    color: #1d55a2;
  }

  h3 {
    margin: 16px 0;
    font-size: 22px;
  }

  .description {
    color: #617267;
    line-height: 1.6;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
    margin: 20px 0;
  }

  .view-button {
    display: block;
    text-align: center;
    background: #226c45;
    color: white;
    padding: 13px;
    border-radius: 9px;
  }

  .empty {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: 16px;
  }

  @media (max-width: 600px) {
    main {
      padding: 14px;
    }

    .hero {
      padding: 35px 22px;
    }
  }
</style>

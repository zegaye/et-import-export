<script>
  /** @type {{ data: { products?: Array<{ id: string | number; name?: string; category?: string; origin?: string; description?: string; quantity?: string; imageUrl?: string | null; isVerifiedExporter?: boolean }> } }} */
  let { data } = $props();

  /**
   * Category illustrations are displayed ONLY when a listing has no real photo.
   * They must never be presented as photos of the actual product.
   * Place the ten WebP files in static/images/products/.
 * @param {{id?: string | number; name?: string; category?: string; description?: string}} product   */
 
function categoryIllustration(product) {
  const text = `${product.category ?? ''} ${product.name ?? ''}`.toLowerCase();

  // Different illustrative images for coffee listings.
  if (/coffee|arabica|robusta|ቡና/.test(text)) {
    const coffeeImages = [
      '/images/products/coffee.webp',
      '/images/products/coffee-green.webp',
      '/images/products/coffee-processing.webp'
    ];

    // Use a stable product identifier to select an image.
    const key = String(product.id ?? product.name ?? '');
    let hash = 0;

    for (const char of key) {
      hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }

    return coffeeImages[hash % coffeeImages.length];
  }
/** @type {[RegExp, string][]} */

  const rules = [
    [/sesame|ሰሊጥ/, 'sesame'],
    [/pulse|lentil|chickpea|bean|fava|haricot/, 'pulses'],
    [/spice|turmeric|ginger|pepper|chili|chilli|cardamom|korarima/, 'spices'],
    [/flower|rose|floriculture/, 'flowers'],
    [/textile|fabric|garment|cotton|apparel|clothing|woven/, 'textiles'],
    [/leather|hide|skin|shoe|footwear|handbag/, 'leather'],
    [/oilseed|oil seed|niger|groundnut|peanut|castor|sunflower|nut/, 'oilseeds'],
    [/mineral|metal|gold|ore|tantalum|lithium|gemstone|marble/, 'minerals'],
    [/fruit|vegetable|avocado|mango|banana|tomato|produce|horticultur/, 'produce']
     // Keep the remaining rules unchanged
  ];

  for (const [pattern, filename] of rules) {
    if (pattern.test(text)) {
      return `/images/products/${filename}.webp`;
    }
  }

  return '/images/products/produce.webp';
}


  let search = $state('');
  let category = $state('All');

  let products = $derived(data.products ?? []);
  let categories = $derived([
    'All',
    ...new Set(products.map((p) => p.category).filter((value) => Boolean(value)))
  ]);

  let filtered = $derived(
    products.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${p.name ?? ''} ${p.category ?? ''} ${p.origin ?? ''} ${p.description ?? ''} ${p.quantity ?? ''}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    })
  );
</script>

<svelte:head>
  <title>Export Products | ET Import Export</title>
  <meta name="description" content="Discover approved Ethiopian export products from international trade suppliers." />
</svelte:head>

<main>
  <nav class="navigation" aria-label="Marketplace navigation">
    <a href="/">← Home</a>
    <a href="/import">Import Products</a>
    <a href="/dashboard">Dashboard</a>
  </nav>

  <section class="hero">
    <div class="hero-copy">
      <span class="eyebrow">ETHIOPIA TO THE WORLD</span>
      <h1>Discover Ethiopian Export Products</h1>
      <p>Explore approved Ethiopian products, compare key specifications, and discover international trading opportunities.</p>
      <a class="primary-button" href="/sell">Register an Export Product <span aria-hidden="true">↗</span></a>
    </div>
    <div class="hero-decoration" aria-hidden="true">
      <span>ET</span>
      <small>GLOBAL TRADE</small>
    </div>
  </section>

  <section class="catalog" aria-label="Export marketplace">
    <div class="catalog-heading">
      <div>
        <span class="section-eyebrow">EXPLORE OUR CATALOG</span>
        <h2>Export Marketplace</h2>
        <p>Browse approved products from Ethiopian exporters.</p>
      </div>
      <div class="result-count" aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'} found</div>
    </div>

    <div class="filter-panel">
      <label class="search-field">
        <span>Search products</span>
        <input type="search" placeholder="Search name, category, origin..." bind:value={search} />
      </label>
      <label class="category-field">
        <span>Category</span>
        <select bind:value={category}>
          {#each categories as item}
            <option value={item}>{item}</option>
          {/each}
        </select>
      </label>
    </div>

    {#if filtered.length === 0}
      <div class="empty">
        <div class="empty-icon" aria-hidden="true">⌕</div>
        <h3>No export products found</h3>
        <p>Try a different search term or choose another category.</p>
        <button type="button" onclick={() => { search = ''; category = 'All'; }}>Clear filters</button>
      </div>
    {:else}
      <div class="product-grid">
        {#each filtered as product (product.id)}
          <article class="product-card">
            <a class="image-link" href={`/products/${product.id}`} aria-label={`View ${product.name ?? 'export product'}`}>
              <div class="image-frame">
                {#if product.imageUrl}
                  <img src={product.imageUrl} alt={product.name ?? 'Ethiopian export product'} loading="lazy" decoding="async" />
                {:else}
                  <img
                    src={categoryIllustration(product)}
                    alt={`Illustrative image for ${product.category || product.name || 'Ethiopian export products'}; not the actual listed product`}
                    loading="lazy"
                    decoding="async"
                  />
                {/if}
                <span class="image-label">{product.imageUrl ? 'ETHIOPIAN EXPORT' : 'ILLUSTRATIVE IMAGE'}</span>
              </div>
            </a>

            <div class="card-content">
              <div class="badges">
                <span class="badge approved">✓ Approved Listing</span>
                {#if product.isVerifiedExporter}
                  <span class="badge verified">✓ Verified Exporter</span>
                {/if}
              </div>

              <div class="product-heading">
                <span class="category-name">{product.category || 'Export Product'}</span>
                <h3><a href={`/products/${product.id}`}>{product.name || 'Ethiopian Export Product'}</a></h3>
              </div>

              <p class="description">{product.description || 'Product details available on request.'}</p>

              <div class="specifications">
                <div class="spec-item"><span class="spec-label">Origin</span><strong title={product.origin || 'Ethiopia'}>{product.origin || 'Ethiopia'}</strong></div>
                <div class="spec-item"><span class="spec-label">Available quantity</span><strong title={product.quantity || 'On request'}>{product.quantity || 'On request'}</strong></div>
              </div>

              <a class="view-button" href={`/products/${product.id}`}>View Product Details <span aria-hidden="true">→</span></a>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(body) { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #f5f8f5; color: #183b2c; }
  main { max-width: 1280px; margin: 0 auto; padding: 24px 28px 90px; }
  a { color: inherit; text-decoration: none; }
  .navigation { display: flex; flex-wrap: wrap; gap: 22px; margin: 2px 0 24px; }
  .navigation a { color: #246c46; font-size: 14px; font-weight: 700; }
  .navigation a:hover, .product-heading a:hover { text-decoration: underline; }
  .hero { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 25px; min-height: 305px; padding: 48px 52px; overflow: hidden; border-radius: 22px; background: linear-gradient(115deg, #103b2b 0%, #1b5c3d 70%, #287b51 100%); color: #fff; }
  .hero-copy { position: relative; z-index: 1; max-width: 720px; }
  .eyebrow, .section-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 2px; }
  .eyebrow { color: #bde7cb; }
  h1 { margin: 15px 0; font-size: clamp(30px, 4.6vw, 48px); line-height: 1.13; letter-spacing: -.8px; }
  .hero p { max-width: 610px; margin: 0; color: #e1efe6; line-height: 1.7; }
  .primary-button { display: inline-flex; align-items: center; justify-content: center; gap: 14px; margin-top: 24px; padding: 14px 20px; border-radius: 10px; background: #fff; color: #145437; font-size: 14px; font-weight: 800; }
  .primary-button:hover { background: #e9f5ec; }
  .hero-decoration { display: flex; flex: 0 0 205px; flex-direction: column; align-items: center; justify-content: center; width: 205px; height: 205px; border: 1px solid #ffffff50; border-radius: 50%; background: #ffffff0a; box-shadow: 0 0 0 28px #ffffff08, 0 0 0 58px #ffffff05; }
  .hero-decoration span { font-size: 75px; font-weight: 900; letter-spacing: -8px; }
  .hero-decoration small { font-size: 10px; font-weight: 700; letter-spacing: 2px; }
  .catalog { padding-top: 46px; }
  .catalog-heading { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 22px; }
  .section-eyebrow { color: #25865c; }
  .catalog-heading h2 { margin: 9px 0 7px; font-size: clamp(26px, 3vw, 34px); letter-spacing: -.5px; }
  .catalog-heading p { margin: 0; color: #718176; font-size: 14px; }
  .result-count { padding: 10px 15px; border: 1px solid #dce8df; border-radius: 50px; background: white; color: #536f5e; font-size: 13px; white-space: nowrap; }
  .result-count strong { color: #18583b; }
  .filter-panel { display: grid; grid-template-columns: minmax(0, 1fr) minmax(190px, 250px); gap: 16px; margin-bottom: 28px; padding: 20px; border: 1px solid #e1eae2; border-radius: 15px; background: #fff; }
  .filter-panel label { display: flex; flex-direction: column; gap: 8px; min-width: 0; color: #2c4c38; font-size: 13px; font-weight: 700; }
  input, select { width: 100%; min-width: 0; padding: 13px 14px; border: 1px solid #d1dfd4; border-radius: 9px; background: #fbfdfb; color: #183b2c; font: inherit; font-size: 14px; }
  input:focus, select:focus, a:focus-visible, button:focus-visible { outline: 3px solid #9bcfb0; outline-offset: 2px; }
  .product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
  .product-card { display: flex; min-width: 0; flex-direction: column; overflow: hidden; border: 1px solid #e0e9e1; border-radius: 17px; background: #fff; box-shadow: 0 5px 20px #1733260b; transition: transform .18s ease, box-shadow .18s ease; }
  .product-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px #17332618; }
  .image-link { display: block; }
  .image-frame { position: relative; display: grid; width: 100%; aspect-ratio: 4 / 3; overflow: hidden; place-items: center; background: #edf3ee; }
  .image-frame img { display: block; width: 100%; height: 100%; object-fit: contain; padding: 12px; transition: transform .22s ease; }
  .product-card:hover .image-frame img { transform: scale(1.035); }
  .image-label { position: absolute; top: 14px; left: 14px; padding: 7px 9px; border: 1px solid #e4eee5; border-radius: 6px; background: #fffffff0; color: #296446; font-size: 10px; font-weight: 800; letter-spacing: .8px; }
  .card-content { display: flex; flex: 1; flex-direction: column; min-width: 0; padding: 21px; }
  .badges { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; min-height: 27px; }
  .badge { display: inline-flex; align-items: center; padding: 6px 9px; border-radius: 50px; font-size: 10px; font-weight: 800; line-height: 1.2; }
  .approved { background: #e4f4e8; color: #237147; }
  .verified { background: #e7f0ff; color: #24599e; }
  .product-heading { margin-top: 16px; }
  .category-name { color: #39845a; font-size: 11px; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; }
  h3 { display: -webkit-box; overflow: hidden; min-height: 54px; margin: 7px 0 0; font-size: 21px; line-height: 1.3; letter-spacing: -.3px; line-clamp: 2; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .description { display: -webkit-box; overflow: hidden; min-height: 65px; margin: 12px 0 18px; color: #64766b; font-size: 13px; line-height: 1.65; line-clamp: 3; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
  .specifications { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: auto; padding: 16px 0; border-top: 1px solid #edf0eb; }
  .spec-item { display: flex; flex-direction: column; min-width: 0; gap: 6px; }
  .spec-label { color: #7b8b7f; font-size: 11px; }
  .spec-item strong { overflow: hidden; color: #264636; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
  .view-button { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 45px; padding: 12px 15px; border-radius: 9px; background: #216b45; color: #fff; font-size: 13px; font-weight: 800; }
  .view-button:hover { background: #155b37; }
  .view-button span { font-size: 20px; line-height: 1; }
  .empty { padding: 55px 20px; border: 1px solid #e0e9e1; border-radius: 16px; background: white; text-align: center; }
  .empty-icon { color: #6b977a; font-size: 48px; }
  .empty h3 { min-height: 0; margin: 8px 0; }
  .empty p { color: #708075; }
  .empty button { margin-top: 8px; padding: 12px 18px; border: 0; border-radius: 9px; background: #216b45; color: white; font: inherit; font-weight: 700; cursor: pointer; }
  @media (max-width: 1000px) { .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .hero-decoration { flex-basis: 160px; width: 160px; height: 160px; } }
  @media (max-width: 650px) { main { padding: 16px 14px 60px; } .navigation { gap: 15px; } .hero { min-height: 0; padding: 35px 24px; } .hero-decoration { display: none; } .catalog { padding-top: 32px; } .catalog-heading { align-items: start; flex-direction: column; } .filter-panel { grid-template-columns: 1fr; padding: 15px; } .product-grid { grid-template-columns: 1fr; gap: 18px; } .image-frame { aspect-ratio: 4 / 3; } .card-content { padding: 18px; } h3, .description { min-height: 0; } }
  @media (prefers-reduced-motion: reduce) { .product-card, .image-frame img { transition: none; } .product-card:hover, .product-card:hover .image-frame img { transform: none; } }
</style>

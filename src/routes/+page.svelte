<script>
  let search = $state('');

  const products = [
    {
      name: 'Ethiopian Coffee',
      category: 'Agriculture',
      direction: 'Export',
      origin: 'Ethiopia',
      description: 'Green coffee sourcing for international buyers.'
    },
    {
      name: 'Sesame Seeds',
      category: 'Oilseeds',
      direction: 'Export',
      origin: 'Ethiopia',
      description: 'Bulk sesame sourcing from Ethiopian suppliers.'
    },
    {
      name: 'Kidney Beans',
      category: 'Pulses',
      direction: 'Export',
      origin: 'Ethiopia',
      description: 'Pulses available for buyer inquiries.'
    },
    {
      name: 'Agricultural Machinery',
      category: 'Equipment',
      direction: 'Import',
      origin: 'International',
      description: 'Connect with suppliers of farming equipment.'
    },
    {
      name: 'Industrial Equipment',
      category: 'Equipment',
      direction: 'Import',
      origin: 'International',
      description: 'Find equipment for Ethiopian businesses.'
    },
    {
      name: 'Ethiopian Spices',
      category: 'Agriculture',
      direction: 'Export',
      origin: 'Ethiopia',
      description: 'Explore Ethiopian spice sourcing opportunities.'
    }
  ];

  let filteredProducts = $derived(
    products.filter((product) => {
      const query = search.trim().toLowerCase();

      return (
        query === '' ||
        `${product.name} ${product.category} ${product.direction}`
          .toLowerCase()
          .includes(query)
      );
    })
  );
</script>

<svelte:head>
  <title>ET Import Export | Connect Ethiopian Trade</title>
  <meta
    name="description"
    content="Discover Ethiopian export products and international import opportunities through ET Import Export."
  />
</svelte:head>

<div class="site">
  <header class="header">
    <a class="brand" href="/" aria-label="ET Import Export home">
      <span class="brand-mark">ET</span>
      <span>Import <strong>Export</strong></span>
    </a>

    <nav aria-label="Main navigation">
      <a href="#opportunities">Opportunities</a>
      <a href="#how-it-works">How it works</a>
      <a href="/about">About</a>
      <a class="nav-contact" href="/contact">Contact us</a><a href="/sell">Submit a product</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">ETHIOPIA • GLOBAL TRADE</span>
        <h1>Connect Ethiopian products with the world.</h1>
        <p>
          Explore export opportunities, discover import solutions, and connect
          with potential trading partners through one marketplace.
        </p>

        <div class="hero-actions">
          <a class="button primary" href="#opportunities">Explore opportunities</a>
          <a class="button secondary" href="/contact">Request sourcing help</a>
        </div>
      </div>

      <div class="hero-panel">
        <span class="panel-label">A simpler way to discover trade</span>
        <div class="panel-row">
          <span class="panel-icon">↗</span>
          <div>
            <strong>Export from Ethiopia</strong>
            <p>Find products and make a sourcing inquiry.</p>
          </div>
        </div>
        <div class="panel-row">
          <span class="panel-icon">↙</span>
          <div>
            <strong>Import into Ethiopia</strong>
            <p>Explore equipment and business supply needs.</p>
          </div>
        </div>
        <div class="panel-note">
          Listings below are examples while the platform is being developed.
        </div>
      </div>
    </section>

    <section class="pathways" aria-label="Choose a trade direction">
      <a class="pathway" href="/export">
        <span>01 / EXPORT</span>
        <h2>Sell Ethiopian products</h2>
        <p>Showcase products and connect with interested buyers.</p>
        <strong>Explore exports →</strong>
      </a>

      <a class="pathway" href="/import">
        <span>02 / IMPORT</span>
        <h2>Source what your business needs</h2>
        <p>Discover international supply opportunities for Ethiopia.</p>
        <strong>Explore imports →</strong>
      </a>
    </section>

    <section id="opportunities" class="opportunities">
      <div class="section-heading">
        <div>
          <span class="eyebrow dark">MARKETPLACE PREVIEW</span>
          <h2>Explore trade opportunities</h2>
          <p>Search example products while we build verified listings.</p>
        </div>

        <label class="search">
          <span class="sr-only">Search products</span>
          <input
            type="search"
            placeholder="Search coffee, equipment, spices..."
            bind:value={search}
          />
        </label>
      </div>

      <div class="product-grid">
        {#each filteredProducts as product}
          <article class="product-card">
            <div
              class:import={product.direction === 'Import'}
              class="product-visual"
            >
              <span>{product.category}</span>
              <strong>{product.name.slice(0, 1)}</strong>
            </div>

            <div class="product-body">
              <span class="direction">{product.direction} opportunity</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div class="product-bottom">
                <span>{product.origin}</span>
                <a
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  aria-label={`Inquire about ${product.name}`}
                >
                  Inquire →
                </a>
              </div>
            </div>
          </article>
        {:else}
          <p class="empty">No example products match “{search}”. Try another search.</p>
        {/each}
      </div>
    </section>

    <section id="how-it-works" class="how">
      <div class="section-heading">
        <div>
          <span class="eyebrow dark">HOW IT WORKS</span>
          <h2>From discovery to conversation</h2>
        </div>
      </div>

      <div class="steps">
        <div>
          <span>01</span>
          <h3>Discover</h3>
          <p>Browse products and trade opportunities relevant to your business.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Inquire</h3>
          <p>Tell us the product, quantity, destination, and timing you need.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Connect</h3>
          <p>Our team reviews the inquiry and helps start a business conversation.</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <div>
        <span class="eyebrow">GROW WITH ET IMPORT EXPORT</span>
        <h2>Have a product to sell or a sourcing request?</h2>
        <p>Tell us what you need and our team can review your inquiry.</p>
      </div>
      <a class="button light" href="/contact">Contact our team →</a>
    </section>
  </main>

  <footer class="footer">
    <span>© {new Date().getFullYear()} ET Import Export</span>
    <span>A project by Ethioz Business Solutions PLC</span>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f7f8f5;
    color: #172b28;
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  .site {
    min-height: 100vh;
  }

  .header,
  .hero,
  .pathways,
  .opportunities,
  .how,
  .cta,
  .footer {
    padding-left: max(5%, calc((100% - 1200px) / 2));
    padding-right: max(5%, calc((100% - 1200px) / 2));
  }

  .header {
    min-height: 82px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    background: #fff;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 11px;
    color: #173d32;
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }

  .brand-mark {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 11px;
    background: #15644e;
    color: white;
    font-size: 17px;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 27px;
  }

  nav a {
    color: #28423b;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
  }

  nav a:hover,
  .product-bottom a:hover {
    color: #14845d;
  }

  nav .nav-contact {
    padding: 11px 18px;
    border-radius: 8px;
    background: #e6f3ed;
    color: #176347;
  }

  .hero {
    min-height: 570px;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    gap: 72px;
    background:
      radial-gradient(circle at 88% 15%, #386f56 0, transparent 30%),
      linear-gradient(115deg, #0b342b, #15543d);
    color: white;
  }

  .hero-content {
    padding: 70px 0;
  }

  .eyebrow {
    color: #a9e5bf;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .eyebrow.dark {
    color: #15875e;
  }

  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }

  h1 {
    max-width: 700px;
    margin: 18px 0 22px;
    font-size: clamp(42px, 5.4vw, 72px);
    line-height: 1.04;
    letter-spacing: -2.5px;
  }

  .hero-content > p {
    max-width: 540px;
    color: #d4e8dc;
    font-size: 17px;
    line-height: 1.7;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 12px 22px;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
  }

  .primary,
  .light {
    background: #d4ef9d;
    color: #173d32;
  }

  .secondary {
    border: 1px solid #a0bdb0;
    color: white;
  }

  .hero-panel {
    padding: 30px;
    border: 1px solid #709789;
    border-radius: 18px;
    background: #ffffff12;
    box-shadow: 0 24px 60px #001b1640;
    backdrop-filter: blur(8px);
  }

  .panel-label {
    display: block;
    margin-bottom: 20px;
    color: #c2e6d1;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .panel-row {
    display: flex;
    gap: 15px;
    padding: 22px 0;
    border-top: 1px solid #ffffff35;
  }

  .panel-row strong {
    display: block;
    margin-bottom: 7px;
    font-size: 17px;
  }

  .panel-row p {
    margin: 0;
    color: #d1e2d8;
    font-size: 13px;
    line-height: 1.5;
  }

  .panel-icon {
    display: grid;
    flex: 0 0 38px;
    place-items: center;
    height: 38px;
    border-radius: 10px;
    background: #d4ef9d;
    color: #144533;
    font-size: 22px;
  }

  .panel-note {
    padding-top: 16px;
    border-top: 1px solid #ffffff35;
    color: #d1e2d8;
    font-size: 12px;
    line-height: 1.5;
  }

  .pathways {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    padding-top: 38px;
    padding-bottom: 38px;
  }

  .pathway {
    display: block;
    padding: 32px;
    border: 1px solid #d8e4d9;
    border-radius: 16px;
    background: white;
    color: #173d32;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .pathway:hover,
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 35px #173d3215;
  }

  .pathway > span {
    color: #16815d;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.4px;
  }

  .pathway h2 {
    margin: 15px 0 10px;
    font-size: 25px;
  }

  .pathway p {
    color: #66756e;
    line-height: 1.6;
  }

  .pathway strong {
    color: #157853;
    font-size: 14px;
  }

  .opportunities,
  .how {
    padding-top: 72px;
    padding-bottom: 78px;
  }

  .opportunities {
    background: white;
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 25px;
    margin-bottom: 32px;
  }

  .section-heading h2 {
    margin: 10px 0 8px;
    font-size: clamp(29px, 3vw, 40px);
    letter-spacing: -1px;
  }

  .section-heading p {
    margin-bottom: 0;
    color: #687a71;
  }

  .search input {
    width: min(340px, 100%);
    padding: 14px 17px;
    border: 1px solid #cad9d0;
    border-radius: 9px;
    outline-color: #18845e;
    font: inherit;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
  }

  .product-card {
    overflow: hidden;
    border: 1px solid #e1e9e3;
    border-radius: 14px;
    background: white;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .product-visual {
    display: flex;
    min-height: 170px;
    align-items: flex-start;
    justify-content: space-between;
    padding: 22px;
    background: linear-gradient(135deg, #dfe9d8, #91b99e);
  }

  .product-visual.import {
    background: linear-gradient(135deg, #dbe8ec, #91b8c7);
  }

  .product-visual span {
    padding: 7px 10px;
    border-radius: 6px;
    background: #ffffffd9;
    font-size: 12px;
    font-weight: 700;
  }

  .product-visual strong {
    align-self: center;
    margin-right: 25%;
    color: #ffffff9c;
    font-size: 105px;
    line-height: 1;
  }

  .product-body {
    padding: 22px;
  }

  .direction {
    color: #16815d;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .product-body h3 {
    margin: 10px 0;
    font-size: 20px;
  }

  .product-body p {
    min-height: 48px;
    color: #6a776e;
    font-size: 14px;
    line-height: 1.6;
  }

  .product-bottom {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-top: 17px;
    border-top: 1px solid #e7ede8;
    font-size: 13px;
  }

  .product-bottom a {
    color: #176d4e;
    font-weight: 700;
    text-decoration: none;
  }

  .empty {
    grid-column: 1 / -1;
    padding: 26px;
    color: #60726a;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }

  .steps > div {
    padding: 25px 0;
    border-top: 2px solid #a8c9b1;
  }

  .steps span {
    color: #15875e;
    font-size: 14px;
    font-weight: 800;
  }

  .steps h3 {
    margin: 16px 0 10px;
    font-size: 21px;
  }

  .steps p {
    color: #687a71;
    line-height: 1.6;
  }

  .cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding-top: 60px;
    padding-bottom: 60px;
    background: #164f3b;
    color: white;
  }

  .cta h2 {
    max-width: 620px;
    margin: 12px 0;
    font-size: clamp(28px, 3vw, 40px);
  }

  .cta p {
    margin: 0;
    color: #d3e5d9;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-top: 25px;
    padding-bottom: 25px;
    background: #0e3027;
    color: #cbded2;
    font-size: 13px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  @media (max-width: 850px) {
    .header {
      flex-wrap: wrap;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    nav {
      flex-wrap: wrap;
      gap: 14px;
    }

    .hero {
      grid-template-columns: 1fr;
      gap: 0;
      padding-bottom: 45px;
    }

    .hero-content {
      padding-bottom: 35px;
    }

    .product-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .pathways,
    .product-grid,
    .steps {
      grid-template-columns: 1fr;
    }

    .hero {
      min-height: auto;
    }

    .section-heading,
    .cta,
    .footer {
      align-items: stretch;
      flex-direction: column;
    }

    .search input {
      width: 100%;
    }

    .opportunities,
    .how {
      padding-top: 55px;
      padding-bottom: 55px;
    }

    .product-body p {
      min-height: auto;
    }
  }
</style>
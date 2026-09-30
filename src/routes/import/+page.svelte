<script>
  import { products as allProducts } from '$lib/data/products.js';

  let { data } = $props();
  let search = $state('');

  const products = allProducts.filter(
    (product) => product.direction === 'import'
  );

  let approvedResults = $derived(
    data.approvedProducts.filter((product) =>
      `${product.product_name} ${product.category} ${product.origin}`
        .toLowerCase()
        .includes(search.toLowerCase().trim())
    )
  );

  let results = $derived(
    products.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase().trim())
    )
  );
</script>

<svelte:head>
  <title>Import Products | ET Import Export</title>
  <meta
    name="description"
    content="Explore products to import into Ethiopia and send a sourcing inquiry."
  />
</svelte:head>

<div class="page">
  <header>
    <a class="logo" href="/">ET <span>Import Export</span></a>
    <nav>
      <a href="/">Home</a>
      <a href="/contact">Contact us</a>
    </nav>
  </header>

  <section class="intro">
    <span>IMPORT INTO ETHIOPIA</span>
    <h1>Explore import opportunities</h1>
    <p>
      Explore example products and contact our team with your sourcing requirements.
    </p>
  </section>

  <main>
    <div class="heading">
      <div>
        <h2>Import products</h2>
        <p>These are sample products while supplier listings are being developed.</p>
      </div>

      <label>
        <span class="sr-only">Search import products</span>
        <input
          type="search"
          placeholder="Search import products..."
          bind:value={search}
        />
      </label>
    </div>
<h2>Approved import listings</h2>

{#if data.listingsError}
  <p>Import listings are temporarily unavailable.</p>
{:else if approvedResults.length === 0}
  <p>No approved import listings match your search yet.</p>
{:else}
  <div class="grid">
    {#each approvedResults as product (product.id)}
      <article>
        <div class="visual">{product.product_name.slice(0, 1)}</div>
        <div class="details">
          <span>{product.category.toUpperCase()}</span>
          <h3>{product.product_name}</h3>
          <p>Origin: {product.origin}</p>
          <p>Quantity: {product.quantity}</p>
          <p>{product.description}</p>
          <a href={`/products/${product.id}`}>View details →</a>

          <a href={`/contact?product=${encodeURIComponent(product.product_name)}`}>

            Request information →

          </a>
        </div>
      </article>
    {/each}
  </div>
{/if}

<h2>Example import products</h2>
    <div class="grid">
      {#each results as product}
        <article>
          <div class="visual">{product.name.slice(0, 1)}</div>
          <div class="details">
            <span>{product.category.toUpperCase()}</span>
            <h3>{product.name}</h3>
            <p>Origin: {product.origin}</p>
            <a href={`/products/${product.id}`}>View details →</a>

<a href={`/contact?product=${encodeURIComponent(product.name)}`}>
  Request information →
</a>
          </div>
        </article>
      {:else}
        <p>No products match your search.</p>
      {/each}
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f7f8f5;
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
    padding: 22px max(5%, calc((100% - 1200px) / 2));
    background: white;
  }

  .logo {
    color: #155c43;
    font-size: 21px;
    font-weight: 800;
    text-decoration: none;
  }

  .logo span {
    margin-left: 7px;
  }

  nav {
    display: flex;
    gap: 22px;
  }

  nav a {
    color: #173d32;
    text-decoration: none;
    font-weight: 600;
  }

  .intro {
    padding: 90px max(5%, calc((100% - 1200px) / 2));
    background: linear-gradient(120deg, #0c382c, #21684a);
    color: white;
  }

  .intro span,
  .details span {
    color: #bbec95;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;
  }

  .intro h1 {
    max-width: 650px;
    margin: 16px 0;
    font-size: clamp(38px, 5vw, 65px);
    line-height: 1.1;
  }

  .intro p {
    max-width: 630px;
    line-height: 1.7;
    color: #d7eadc;
  }

  main {
    max-width: 1200px;
    margin: auto;
    padding: 65px 5%;
  }

  .heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 25px;
    margin-bottom: 28px;
  }

  h2 {
    margin-bottom: 8px;
    font-size: 35px;
  }

  .heading p,
  .details p {
    color: #6b7870;
  }

  input {
    width: min(320px, 100%);
    padding: 14px;
    border: 1px solid #cbd9ce;
    border-radius: 8px;
    font: inherit;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }

  article {
    display: flex;
    overflow: hidden;
    border: 1px solid #dfe9e1;
    border-radius: 14px;
    background: white;
  }

  .visual {
    display: grid;
    flex: 0 0 30%;
    place-items: center;
    min-height: 200px;
    background: linear-gradient(135deg, #b8d4a5, #3c8969);
    color: #ffffffb0;
    font-size: 95px;
    font-weight: 800;
  }

  .details {
    padding: 24px;
  }

  .details span {
    color: #16825e;
  }

  h3 {
    margin: 10px 0;
    font-size: 21px;
  }

  .details a {
  display: block;
  margin-top: 12px;
  color: #146b4c;
  font-weight: 700;
  text-decoration: none;
}

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  @media (max-width: 700px) {
    .heading {
      align-items: stretch;
      flex-direction: column;
    }

    input {
      width: 100%;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
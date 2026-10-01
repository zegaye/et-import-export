<script>
  let { data } = $props();
  let product = $derived(data.product);
</script>

<svelte:head>
  <title>{product.name} | ET Import Export</title>
  <meta name="description" content={product.description} />
</svelte:head>

<main>
  <a
    class="back"
    href={product.direction === 'export' ? '/export' : '/import'}
  >
    ← Back to {product.direction} products
  </a>

  <article class="product">
    <span class="badge">{product.direction}</span>
<h1>{product.name}</h1>
{#if product.imageUrl}
  <img
    class="product-photo"
    src={product.imageUrl}
    alt={product.name}
  />
{/if}

    <p class="description">{product.description}</p>

    <div class="facts">
      <div>
        <strong>Category</strong>
        <span>{product.category}</span>
      </div>

      <div>
        <strong>Origin</strong>
        <span>{product.origin}</span>
      </div>

      <div>
        <strong>Quantity</strong>
        <span>{product.quantity}</span>
      </div>

      <div>
        <strong>Listing type</strong>
        <span>
          {product.isSample
            ? 'Sample product'
            : 'Supplier submission'}
        </span>
      </div>
    </div>

    <p class="notice">
      {#if product.isSample}
        This is a sample listing.
      {:else}
        This supplier submission has been approved for publication.
      {/if}
      Availability, specifications, and prices must be confirmed before
      an order.
    </p>

    <a
      class="button"
      href={`/contact?product=${encodeURIComponent(product.name)}`}
    >
      Request information about this product
    </a>
  </article>
</main>
<style>
  :global(body) {
    margin: 0;
    background: #f6f8f3;
    color: #173326;
    font-family: Arial, sans-serif;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 20px 80px;
  }

  .back {
    color: #236b45;
    text-decoration: none;
    font-weight: 700;
  }

  .product {
    margin-top: 28px;
    padding: 40px;
    background: white;
    border: 1px solid #e1e9df;
    border-radius: 18px;
    box-shadow: 0 10px 30px #1733260d;
  }

  .badge {
    display: inline-block;
    padding: 8px 14px;
    border-radius: 999px;
    background: #e0f0e4;
    color: #236b45;
    font-size: 14px;
    font-weight: 700;
    text-transform: capitalize;
  }

  h1 {
    margin: 20px 0;
    font-size: clamp(32px, 5vw, 52px);
  }

  .description {
    color: #52645a;
    font-size: 18px;
    line-height: 1.7;
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    margin: 32px 0;
  }

  .facts div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
    border-radius: 12px;
    background: #f6f8f3;
  }

  .facts strong {
    color: #52645a;
    font-size: 14px;
  }

  .notice {
    padding: 16px;
    border-left: 4px solid #b48b35;
    background: #fff8e8;
    line-height: 1.5;
  }

  .button {
    display: inline-block;
    margin-top: 22px;
    padding: 14px 22px;
    border-radius: 10px;
    background: #236b45;
    color: white;
    font-weight: 700;
    text-decoration: none;
  }

  @media (max-width: 600px) {
    .product {
      padding: 24px;
    }

    .facts {
      grid-template-columns: 1fr;
    }
  }.product-photo {
  display: block;
  width: 100%;
  height: auto;
  max-height: 420px;
  object-fit: contain;
  margin: 24px 0;
  border-radius: 12px;
  background: #f6f8f3;
}
</style>
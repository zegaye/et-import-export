<script>
  let { data, form } = $props();
</script>

<svelte:head>
  <title>Supplier Dashboard | ET Import Export</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <header>
    <a class="brand" href="/">ET Import Export</a>

    <form method="POST" action="?/logout">
      <button type="submit">Sign out</button>
    </form>
  </header>

  {#if form?.message}
    <p class="error" role="alert">{form.message}</p>
  {/if}

  <section>
    <span class="eyebrow">SUPPLIER ACCOUNT</span>
    <h1>Welcome to your dashboard</h1>
    <p>Signed in as <strong>{data.email}</strong></p>

    <div class="notice">
      <h2>My products</h2>
      <p>
        Product management is being set up. Your personal product list
        is not available yet.
      </p>
    </div>

    <nav aria-label="Marketplace navigation">
      <a href="/export">Explore export products →</a>
      <a href="/import">Explore import products →</a>
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
    max-width: 1000px;
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
  }

  p {
    line-height: 1.6;
    overflow-wrap: anywhere;
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

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

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

  @media (max-width: 600px) {
    section {
      padding: 22px;
    }
  }
</style>
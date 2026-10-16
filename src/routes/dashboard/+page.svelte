
<script>
  let { data, form } = $props();

  const exporterLinks = [
    {
      title: 'Explore Export Products',
      description: 'Browse products available for export.',
      href: '/export'
    },
    {
      title: 'Submit a Product',
      description: 'Submit a product for administrator review.',
      href: '/sell'
    },
    {
      title: 'Import Marketplace',
      description: 'Explore international sourcing opportunities.',
      href: '/import'
    }
  ];

  const buyerLinks = [
    {
      title: 'Find Ethiopian Suppliers',
      description: 'Explore Ethiopian export products.',
      href: '/export'
    },
    {
      title: 'Explore Import Opportunities',
      description: 'Browse available marketplace listings.',
      href: '/import'
    },
    {
      title: 'Contact Trade Support',
      description: 'Ask for help with sourcing.',
      href: '/contact'
    }
  ];

  let isExporter = $derived(data.accountType === 'exporter');
  let isBuyer = $derived(data.accountType === 'buyer');

  let links = $derived(
    isExporter ? exporterLinks : isBuyer ? buyerLinks : []
  );
</script>

<svelte:head>
  <title>Trade Dashboard | ET Import Export</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
  <header>
    <a class="brand" href="/">ET Import Export</a>

    <form method="POST" action="?/logout">
      <button class="logout" type="submit">
        Sign out
      </button>
    </form>
  </header>

  {#if form?.message}
    <p class="error" role="alert">{form.message}</p>
  {/if}

  <section>
    <span class="eyebrow">
      {isExporter
        ? 'EXPORTER ACCOUNT'
        : isBuyer
          ? 'INTERNATIONAL BUYER ACCOUNT'
          : 'ACCOUNT SETUP REQUIRED'}
    </span>

    <h1>
      Welcome{data.fullName ? `, ${data.fullName}` : ''}!
    </h1>

    <p>
      Signed in as <strong>{data.email}</strong>
    </p>

    {#if isExporter || isBuyer}
      <div class="profile">
        <div>
          <small>Business</small>
          <strong>{data.companyName || 'Not provided'}</strong>
        </div>

        <div>
          <small>Country</small>
          <strong>{data.country || 'Not provided'}</strong>
        </div>

        <div>
          <small>Account type</small>
          <strong>
            {isExporter ? 'Exporter' : 'International Buyer'}
          </strong>
        </div>
      </div>

      <h2>
        {isExporter ? 'Exporter Services' : 'Buyer Services'}
      </h2>

      <div class="cards">
        {#each links as link}
          <a class="card" href={link.href}>
            <h3>{link.title} →</h3>
            <p>{link.description}</p>
          </a>
        {/each}
      </div>

      <div class="notice">
        <h2>Coming next</h2>

        {#if isExporter}
          <p>
            Your personal product management, buyer inquiries,
            export documents and quotations will be added
            in the next development phases.
          </p>
        {:else}
          <p>
            Your personal RFQs, supplier quotations and
            transaction tracking will be added in the
            next development phases.
          </p>
        {/if}
      </div>
    {:else}
      <div class="notice">
        <h2>Account setup required</h2>
        <p>
          Your account does not yet have an exporter or buyer
          profile. Please contact platform support to complete
          your account setup.
        </p>
        <a href="/contact">Contact support →</a>
      </div>
    {/if}

    <nav aria-label="Marketplace navigation">
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
    max-width: 1100px;
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
    margin-bottom: 10px;
  }

  h2 {
    margin-top: 30px;
  }

  p {
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  .profile {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 28px 0;
  }

  .profile > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 18px;
    border-radius: 12px;
    background: #f3f7f3;
  }

  small {
    color: #52645a;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 20px;
  }

  .card {
    display: block;
    padding: 22px;
    border: 1px solid #dce7df;
    border-radius: 12px;
    color: inherit;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  .card h3 {
    margin-top: 0;
    color: #146b4c;
  }

  .card p {
    color: #52645a;
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

  .notice a,
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

  @media (max-width: 750px) {
    .profile,
    .cards {
      grid-template-columns: 1fr;
    }

    section {
      padding: 22px;
    }
  }
</style>

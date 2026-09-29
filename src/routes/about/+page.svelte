<svelte:head>
  <title>About Us | ET Import Export</title>
  <meta
    name="description"
    content="Learn about ET Import Export, a trade platform project by Ethioz Business Solutions PLC."
  />
</svelte:head>

<header>
  <a class="brand" href="/"><span>ET</span> Import Export</a>
  <nav>
    <a href="/">Home</a>
    <a href="/export">Export</a>
    <a href="/import">Import</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

<main>
  <section class="hero">
    <div class="container">
      <span class="eyebrow">ABOUT THE PLATFORM</span>
      <h1>Connecting Ethiopian trade opportunities</h1>
      <p>
        ET Import Export is a platform project by Ethioz Business Solutions PLC.
        We are building a place where businesses can discover products, express
        sourcing needs, and begin conversations with potential trade partners.
      </p>
    </div>
  </section>

  <section class="content container">
    <div>
      <span class="eyebrow green">OUR PURPOSE</span>
      <h2>Make trade discovery easier</h2>
      <p>
        Buyers need clear product information. Suppliers need a way to present
        what they can offer. Our platform brings these starting points together
        through product pages and structured inquiries.
      </p>
      <p>
        The current listings are examples while we develop supplier onboarding,
        verification, and a fuller request-for-quote process.
      </p>
    </div>

    <div class="cards">
      <article>
        <span>01</span>
        <h3>Explore exports</h3>
        <p>Discover example Ethiopian products and request sourcing information.</p>
        <a href="/export">View export products →</a>
      </article>

      <article>
        <span>02</span>
        <h3>Explore imports</h3>
        <p>See example equipment and materials businesses may source internationally.</p>
        <a href="/import">View import products →</a>
      </article>

      <article>
        <span>03</span>
        <h3>Start an inquiry</h3>
        <p>Tell our team the product, quantity, destination, and timing you need.</p>
        <a href="/contact">Contact our team →</a>
      </article>
    </div>
  </section>
</main>

<footer>
  <span>© {new Date().getFullYear()} ET Import Export</span>
  <span>A project by Ethioz Business Solutions PLC</span>
</footer>

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

  .container {
    max-width: 1200px;
    margin: auto;
    padding-left: 5%;
    padding-right: 5%;
  }

  header,
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 24px 5%;
  }

  header {
    background: white;
  }

  .brand {
    color: #173d32;
    font-size: 20px;
    font-weight: 800;
    text-decoration: none;
  }

  .brand span {
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 9px;
    background: #176347;
    color: white;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
  }

  nav a,
  article a {
    color: #176347;
    font-weight: 700;
    text-decoration: none;
  }

  .hero {
    padding: 90px 0;
    background: linear-gradient(115deg, #0b342b, #176347);
    color: white;
  }

  .eyebrow {
    color: #b9e99c;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .eyebrow.green {
    color: #16815d;
  }

  h1 {
    max-width: 780px;
    margin: 17px 0;
    font-size: clamp(40px, 5vw, 66px);
    line-height: 1.1;
  }

  .hero p {
    max-width: 750px;
    color: #d7eadc;
    font-size: 17px;
    line-height: 1.7;
  }

  .content {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 65px;
    padding-top: 85px;
    padding-bottom: 90px;
  }

  h2 {
    margin: 14px 0;
    font-size: 36px;
  }

  .content > div > p,
  article p {
    color: #61746a;
    line-height: 1.7;
  }

  .cards {
    display: grid;
    gap: 16px;
  }

  article {
    padding: 23px;
    border: 1px solid #dce8dd;
    border-radius: 13px;
    background: white;
  }

  article span {
    color: #16815d;
    font-weight: 800;
  }

  article h3 {
    margin: 10px 0;
    font-size: 20px;
  }

  footer {
    background: #0e3027;
    color: #d5e8dc;
    font-size: 13px;
  }

  @media (max-width: 750px) {
    .content {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    header,
    footer {
      flex-wrap: wrap;
    }

    .hero {
      padding: 65px 0;
    }
  }
</style>
<script>
  import { onMount } from 'svelte';

  let product = $state('');
  let name = $state('');
  let company = $state('');
  let email = $state('');
  let phone = $state('');
  let inquiryType = $state('Buying / sourcing');
  let quantity = $state('');
  let message = $state('');

  onMount(() => {
    product = new URLSearchParams(window.location.search).get('product') ?? '';
  });
/** @param {SubmitEvent} event */
function prepareWhatsApp(event) {
    event.preventDefault();

    const text = [
      'ET Import Export inquiry',
      '',
      `Inquiry type: ${inquiryType}`,
      `Product: ${product || 'General inquiry'}`,
      `Name: ${name}`,
      `Company: ${company || 'Not provided'}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Quantity: ${quantity || 'Not specified'}`,
      '',
      `Message: ${message}`
    ].join('\n');

    window.location.href =
      `https://wa.me/251911377969?text=${encodeURIComponent(text)}`;
  }
</script>

<svelte:head>
  <title>Contact and Sourcing Inquiry | ET Import Export</title>
  <meta
    name="description"
    content="Contact ET Import Export about Ethiopian exports, imports, and product sourcing."
  />
</svelte:head>

<div class="page">
  <header>
    <a class="brand" href="/">
      <span class="brand-mark">ET</span>
      <span>Import <strong>Export</strong></span>
    </a>

    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/export">Export</a>
      <a href="/import">Import</a>
    </nav>
  </header>

  <main>
    <section class="intro">
      <span class="eyebrow">LET'S TALK TRADE</span>
      <h1>Tell us what you need</h1>
      <p>
        Ask about an export product, an import requirement, or a sourcing
        opportunity. Share the details and continue to WhatsApp to send
        your inquiry to the Ethioz team.
      </p>
    </section>

    <section class="contact-grid">
      <div class="form-card">
        <div class="card-heading">
          <span class="eyebrow">TRADE INQUIRY</span>
          <h2>Send your requirements</h2>
          <p>Fields marked * are required.</p>
        </div>

        <form onsubmit={prepareWhatsApp}>
          <div class="fields">
            <label>
              Full name *
              <input
                type="text"
                bind:value={name}
                maxlength="100"
                autocomplete="name"
                required
                placeholder="Your full name"
              />
            </label>

            <label>
              Company
              <input
                type="text"
                bind:value={company}
                maxlength="120"
                autocomplete="organization"
                placeholder="Your company or organization"
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                bind:value={email}
                maxlength="150"
                autocomplete="email"
                required
                placeholder="you@example.com"
              />
            </label>

            <label>
              Phone number *
              <input
                type="tel"
                bind:value={phone}
                maxlength="30"
                autocomplete="tel"
                required
                placeholder="+251..."
              />
            </label>

            <label>
              Inquiry type *
              <select bind:value={inquiryType} required>
                <option value="Buying / sourcing">Buying / sourcing</option>
                <option value="Selling / supplier">Selling / supplier</option>
                <option value="Import inquiry">Import inquiry</option>
                <option value="Export inquiry">Export inquiry</option>
                <option value="General question">General question</option>
              </select>
            </label>

            <label>
              Product or service
              <input
                type="text"
                bind:value={product}
                maxlength="120"
                placeholder="For example, Ethiopian coffee"
              />
            </label>

            <label class="wide">
              Quantity needed or available
              <input
                type="text"
                bind:value={quantity}
                maxlength="80"
                placeholder="For example, 10 tonnes or 100 units"
              />
            </label>

            <label class="wide">
              Tell us more *
              <textarea
                bind:value={message}
                maxlength="2000"
                rows="6"
                required
                placeholder="Include specifications, destination, timing, and any questions."
              ></textarea>
            </label>
          </div>

          <button type="submit">Continue to WhatsApp →</button>

          <p class="form-note">
            This button prepares a WhatsApp message. Your inquiry is sent
            only after you press Send in WhatsApp.
          </p>
        </form>
      </div>

      <aside class="info-card">
        <span class="eyebrow">CONTACT INFORMATION</span>
        <h2>Speak with our team</h2>
        <p>
          You can also call us directly about a product or a business
          sourcing request.
        </p>

        <a href="tel:+251911377969">
          <span>Primary phone</span>
          <strong>+251 911 377 969</strong>
        </a>

        <a href="tel:+251939910448">
          <span>Alternative phone</span>
          <strong>+251 939 910 448</strong>
        </a>

        <div class="location">
          <span>Location</span>
          <strong>Addis Ababa, Ethiopia</strong>
        </div>
      </aside>
    </section>
  </main>

  <footer>
    <span>© {new Date().getFullYear()} ET Import Export</span>
    <span>A project by Ethioz Business Solutions PLC</span>
  </footer>
</div>

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

  header,
  .intro,
  .contact-grid,
  footer {
    padding-left: max(5%, calc((100% - 1200px) / 2));
    padding-right: max(5%, calc((100% - 1200px) / 2));
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 82px;
    background: white;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 11px;
    color: #173d32;
    font-size: 20px;
    font-weight: 700;
    text-decoration: none;
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
    gap: 22px;
  }

  nav a {
    color: #28423b;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
  }

  .intro {
    padding-top: 80px;
    padding-bottom: 90px;
    background: linear-gradient(115deg, #0b342b, #176347);
    color: white;
  }

  .eyebrow {
    color: #a9e5bf;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.8px;
  }

  h1,
  h2,
  p {
    margin-top: 0;
  }

  h1 {
    max-width: 750px;
    margin: 17px 0;
    font-size: clamp(39px, 5vw, 65px);
    line-height: 1.08;
  }

  .intro p {
    max-width: 720px;
    color: #d5e8dc;
    line-height: 1.7;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.5fr 0.8fr;
    align-items: start;
    gap: 24px;
    margin-top: -38px;
    padding-bottom: 85px;
  }

  .form-card,
  .info-card {
    padding: 32px;
    border: 1px solid #d9e7dd;
    border-radius: 16px;
    background: white;
    box-shadow: 0 14px 35px #102e1c12;
  }

  .card-heading .eyebrow,
  .info-card .eyebrow {
    color: #16815d;
  }

  h2 {
    margin: 12px 0 8px;
    color: #173d32;
    font-size: 28px;
  }

  .card-heading p,
  .info-card p {
    color: #61746a;
    line-height: 1.6;
  }

  .fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 19px;
    margin-top: 26px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #28443a;
    font-size: 13px;
    font-weight: 700;
  }

  label.wide {
    grid-column: 1 / -1;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 13px 14px;
    border: 1px solid #cbd9cf;
    border-radius: 8px;
    background: white;
    color: #173d32;
    font: inherit;
    font-size: 14px;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid #55a87c;
    outline-offset: 1px;
  }

  textarea {
    resize: vertical;
  }

  button {
    width: 100%;
    margin-top: 25px;
    padding: 16px;
    border: 0;
    border-radius: 9px;
    background: #176347;
    color: white;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    background: #104a36;
  }

  .form-note {
    margin: 14px 0 0;
    color: #66776d;
    font-size: 12px;
    line-height: 1.5;
  }

  .info-card a,
  .location {
    display: block;
    margin-top: 14px;
    padding: 17px;
    border: 1px solid #e0e9e2;
    border-radius: 9px;
    background: #f7faf7;
    color: #173d32;
    text-decoration: none;
  }

  .info-card a span,
  .location span {
    display: block;
    margin-bottom: 6px;
    color: #65786c;
    font-size: 12px;
  }

  .info-card a strong,
  .location strong {
    display: block;
    font-size: 16px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-top: 26px;
    padding-bottom: 26px;
    background: #0e3027;
    color: #d5e8dc;
    font-size: 13px;
  }

  @media (max-width: 800px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    header,
    footer {
      flex-wrap: wrap;
      padding-top: 18px;
      padding-bottom: 18px;
    }

    nav {
      flex-wrap: wrap;
    }

    .fields {
      grid-template-columns: 1fr;
    }

    .form-card,
    .info-card {
      padding: 22px;
    }

    .intro {
      padding-top: 55px;
      padding-bottom: 75px;
    }
  }
</style>
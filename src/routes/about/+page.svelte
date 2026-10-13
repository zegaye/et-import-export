<script>
  import { onMount } from 'svelte';

  let activeService = $state(0);
  let menuOpen = $state(false);
  const services = [
    { icon: '↗', title: 'Export discovery', stage: 'Available marketplace feature', description: 'Showcase Ethiopian coffee, sesame, pulses, spices and other products to international buyers.', href: '/export' },
    { icon: '↙', title: 'Import sourcing', stage: 'Available marketplace feature', description: 'Help Ethiopian businesses explore machinery, equipment and other international sourcing opportunities.', href: '/import' },
    { icon: '◎', title: 'Buyer–supplier connections', stage: 'Available inquiry feature', description: 'Make it easier to discover products, submit inquiries and begin commercial conversations.', href: '/contact' },
    { icon: '✓', title: 'Supplier product submissions', stage: 'Available submission feature', description: 'Allow suppliers to submit product details for administrative review before publication.', href: '/sell' },
    { icon: '▤', title: 'Trade readiness & compliance', stage: 'Planned capability', description: 'Develop tools for company verification, export-readiness assessments and guidance on documentation.', href: '/contact' },
    { icon: '⇄', title: 'Trade facilitation & logistics', stage: 'Planned capability', description: 'Build quotation workflows, shipment coordination and transaction progress tracking.', href: '/contact' }
  ];
  const stories = [
    { number: '01', label: 'ETHIOPIAN EXPORTS', title: 'Bring Ethiopian products to the world.', body: 'Coffee, oilseeds, pulses and spices deserve a clear path to international discovery. Our marketplace gives suppliers a place to present their products and buyers a way to inquire.', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85', alt: 'Coffee beans representing Ethiopian export opportunities', href: '/export', action: 'Discover exports' },
    { number: '02', label: 'INTERNATIONAL SOURCING', title: 'Help Ethiopian businesses source globally.', body: 'From machinery to business supplies, we create a starting point for finding import opportunities and connecting with potential suppliers.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85', alt: 'Warehouse and logistics operations', href: '/import', action: 'Discover imports' },
    { number: '03', label: 'BETTER CONNECTIONS', title: 'Turn product discovery into conversation.', body: 'Buyers can send inquiries and suppliers can submit products for review. We are building toward more structured trade workflows, document support and logistics coordination.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', alt: 'Professional business workspace', href: '/contact', action: 'Contact our team' }
  ];
  onMount(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>About Us | ET Import Export</title>
  <meta name="description" content="Learn how ET Import Export connects Ethiopian suppliers with global buyers, supports import sourcing and develops digital trade facilitation services." />
</svelte:head>

<div class="page">
  <header class="header">
    <a class="brand" href="/"><span class="logo">ET<span>↗</span></span><span>IMPORT <em>EXPORT</em><small>ETHIOPIA · GLOBAL TRADE</small></span></a>
    <button class="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onclick={() => menuOpen = !menuOpen}>☰ Menu</button>
    <nav class:open={menuOpen} aria-label="Main navigation">
      <a href="/">Home</a><a href="/export">Export</a><a href="/import">Import</a><a href="/about" aria-current="page">About</a><a href="/contact">Contact</a><a href="/login">Login</a><a class="nav-cta" href="/sell">List a product ↗</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <span class="eyebrow">● ETHIOPIA · GLOBAL OPPORTUNITY</span>
          <h1>From <span>Ethiopia</span><br />to the world.</h1>
          <p>We connect Ethiopian export opportunities with global buyers and help local businesses explore international sourcing—one conversation at a time.</p>
          <div class="actions"><a class="btn primary" href="/export">Explore exports ↗</a><a class="btn outline" href="/contact">Connect with us →</a></div>
          <p class="micro">A digital trade initiative by Ethioz Business Solutions PLC</p>
        </div>
        <div class="map-scene" aria-label="Accurate geographic outline of Ethiopia with illustrative animated international trade connections">
          <div class="map-glow"></div>
          <svg class="trade-map" viewBox="0 0 700 470" role="img" aria-label="Ethiopia country outline and animated trade connections">
            <defs>
              <linearGradient id="countryGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2f4ae"/><stop offset="1" stop-color="#74b77d"/></linearGradient>
              <filter id="countryShadow"><feDropShadow dx="0" dy="13" stdDeviation="13" flood-color="#001b13" flood-opacity=".55"/></filter>
            </defs>
            <circle cx="350" cy="225" r="205" class="ring ring-one"/><circle cx="350" cy="225" r="165" class="ring ring-two"/>
            <path d="M350 218 Q240 15 72 75" class="route"/><path d="M350 218 Q465 22 625 84" class="route route-b"/><path d="M350 218 Q500 410 625 373" class="route route-c"/><path d="M350 218 Q210 405 65 363" class="route route-d"/>
            <path d="M490.0,283.5 L436.7,340.2 L412.1,341.0 L395.3,354.3 L383.2,354.7 L378.0,360.6 L365.1,360.6 L357.5,354.2 L340.2,362.1 L334.7,370.0 L322.1,368.5 L317.9,366.3 L313.5,366.9 L307.5,366.7 L283.6,350.6 L270.5,350.6 L264.0,344.4 L264.0,333.8 L254.2,330.7 L243.1,310.1 L234.5,305.8 L231.2,298.2 L221.6,289.0 L210.0,287.7 L216.4,276.9 L226.4,276.4 L229.3,270.7 L229.0,253.7 L234.6,234.0 L243.5,228.7 L245.4,221.0 L253.5,206.5 L264.9,197.2 L272.6,178.6 L275.6,162.4 L297.6,166.3 L303.5,152.2 L314.9,160.8 L326.0,156.4 L330.5,160.3 L343.5,160.5 L359.9,168.1 L364.8,174.6 L373.2,180.7 L380.9,191.8 L387.4,197.9 L380.7,206.2 L374.3,215.1 L375.8,220.3 L376.1,226.0 L386.7,226.3 L391.2,225.0 L395.4,228.4 L391.3,235.0 L398.2,245.4 L405.2,254.5 L412.4,261.3 L474.1,283.7 L490.0,283.5 Z" class="country" filter="url(#countryShadow)" />
            <circle cx="350" cy="218" r="27" class="origin-halo"/><circle cx="350" cy="218" r="7" fill="#fffbd1"/>
            <g class="points"><circle cx="72" cy="75" r="6"/><circle cx="625" cy="84" r="6"/><circle cx="625" cy="373" r="6"/><circle cx="65" cy="363" r="6"/></g>
            <g class="labels"><text x="20" y="57">GLOBAL BUYERS</text><text x="532" y="65">EXPORT MARKETS</text><text x="527" y="400">IMPORT SOURCING</text><text x="20" y="389">TRADE PARTNERS</text></g>
          </svg>
          <div class="floating floating-export"><b>↗ EXPORT</b><small>Ethiopia → World</small></div>
          <div class="floating floating-import"><b>↙ IMPORT</b><small>World → Ethiopia</small></div>
          <div class="map-bottom">ETHIOPIA <span>•</span> A BRIDGE TO GLOBAL MARKETS</div>
        </div>
      </div>
    </section>

    <section class="mission reveal"><div class="section-tag">01 / OUR PURPOSE</div><div><h2>Trade should be <em>easier to discover.</em></h2><p>ET Import Export is a digital marketplace initiative by Ethioz Business Solutions PLC. We are building a practical starting point for Ethiopian exporters, international buyers and businesses looking for imports.</p><p>Our goal is to make opportunities more visible, inquiries more straightforward and future trade services more connected.</p></div></section>

    <section class="stories">
      <div class="stories-heading reveal"><span class="section-tag">02 / WHAT WE DO</span><h2>Real products. <em>Real opportunities.</em></h2><p>See the trade journeys our platform is designed to support.</p></div>
      {#each stories as story, i}
        <article class="story reveal" class:reverse={i % 2 === 1}>
          <div class="story-image"><img src={story.image} alt={story.alt} loading="lazy" /><span class="image-index">{story.number} / 03</span></div>
          <div class="story-copy"><span class="section-tag">{story.label}</span><h3>{story.title}</h3><p>{story.body}</p><a href={story.href}>{story.action} <span>↗</span></a></div>
        </article>
      {/each}
    </section>

    <section class="services"><div class="services-inner"><div class="services-title reveal"><span class="section-tag">03 / OUR SERVICES</span><h2>One platform.<br/><em>Six ways forward.</em></h2><p>Our existing marketplace capabilities and the additional trade tools we're developing.</p></div><div class="service-grid">
      {#each services as service, i}
        <button class="service-card reveal" class:active={activeService === i} type="button" onclick={() => activeService = i} aria-pressed={activeService === i}>
          <span class="service-top"><span class="service-icon">{service.icon}</span><span class="service-number">0{i + 1}</span></span>
          <h3>{service.title}</h3><span class:planned={i > 3} class="stage">{service.stage}</span><p>{service.description}</p><span class="service-bottom">Learn about this service ↗</span>
        </button>
      {/each}
      </div><div class="service-detail"><div><strong>{services[activeService].title}</strong><p>{services[activeService].description}</p></div><a href={services[activeService].href}>Continue ↗</a></div></div></section>

    <section class="journey"><div class="journey-inner"><div class="reveal"><span class="section-tag">04 / HOW IT WORKS</span><h2>From discovery<br/>to <em>connection.</em></h2><p>We start with what the platform supports today and build toward more complete trade facilitation.</p></div><div class="journey-list">{#each [{n:'01',t:'Discover',d:'Explore Ethiopian export products or import opportunities.'},{n:'02',t:'Submit or inquire',d:'Suppliers submit listings; buyers send product and sourcing inquiries.'},{n:'03',t:'Review and connect',d:'Submitted listings undergo administrative review; inquiries help start business conversations.'},{n:'04',t:'Grow trade services',d:'Future tools will support readiness, documents, quotations and shipment workflows.'}] as step}<div class="journey-step reveal"><b>{step.n}</b><div><h3>{step.t}</h3><p>{step.d}</p></div></div>{/each}</div></div></section>
    <section class="closing reveal"><div><span class="section-tag">LET'S BUILD CONNECTIONS</span><h2>Your next opportunity<br/>starts with <em>a conversation.</em></h2><p>Are you an Ethiopian supplier or a buyer looking for a sourcing opportunity?</p></div><div class="actions"><a class="btn primary" href="/sell">List a product ↗</a><a class="btn dark-outline" href="/contact">Contact our team →</a></div></section>
  </main>
  <footer><span>© {new Date().getFullYear()} ET Import Export</span><span>A project by Ethioz Business Solutions PLC</span><a href="/">Back to homepage ↑</a></footer>
</div>

<style>
  :global(*){box-sizing:border-box} :global(body){margin:0;background:#f7f8f3;color:#183c30;font-family:Arial,Helvetica,sans-serif} :global(html){scroll-behavior:smooth}
  .page{overflow:hidden}.header{min-height:85px;padding:15px max(5%,calc((100% - 1280px)/2));display:flex;justify-content:space-between;align-items:center;gap:22px;background:white}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#173f30;font-weight:900;letter-spacing:.04em}.brand em{font-style:normal;color:#388653}.brand small{display:block;color:#829589;font-size:9px;letter-spacing:.19em;margin-top:5px}.logo{background:#225b42;color:#fff;border-radius:5px;padding:14px 11px;position:relative;font-size:19px}.logo span{position:absolute;right:3px;top:2px;font-size:10px}.header nav{display:flex;align-items:center;gap:20px;flex-wrap:wrap}.header nav a{color:#284c3a;text-decoration:none;font-weight:700;font-size:13px}.header nav a:hover,.header nav a[aria-current]{color:#399966}.header nav .nav-cta{background:#205b43;color:white;padding:13px 16px;border-radius:5px}.menu-button{display:none}
  .hero{background:radial-gradient(circle at 75% 40%,#30694b,transparent 43%),linear-gradient(125deg,#0c291f,#143d2d 65%,#0e2b22);color:white}.hero-inner{max-width:1440px;min-height:670px;margin:auto;padding:65px 5%;display:grid;grid-template-columns:1fr 1.1fr;align-items:center;gap:20px}.hero-copy{position:relative;z-index:2;animation:rise .9s ease both}.eyebrow,.section-tag{font-size:11px;letter-spacing:.17em;font-weight:900;color:#bce794}.hero h1{font-size:clamp(54px,6vw,90px);line-height:1.04;letter-spacing:-.06em;margin:25px 0}.hero h1 span,.journey h2 em{color:#d9f3a8}.hero-copy>p:not(.micro){color:#d4e7da;font-size:17px;line-height:1.8;max-width:540px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.btn{min-height:52px;padding:15px 22px;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-size:14px;font-weight:800;border-radius:5px;transition:transform .25s,background .25s}.btn:hover{transform:translateY(-4px)}.primary{background:#d7f0a2;color:#173c2b}.primary:hover{background:#efffc7}.outline{border:1px solid #91b09a;color:#fff}.outline:hover{background:#ffffff18}.micro{color:#aacbb4;font-size:11px;margin-top:50px;letter-spacing:.06em}
  .map-scene{position:relative;min-height:490px;display:grid;place-items:center}.trade-map{width:100%;max-width:700px;position:relative;z-index:1;overflow:visible}.map-glow{position:absolute;inset:15%;background:#91c88d45;filter:blur(75px);border-radius:50%}.country{fill:url(#countryGradient);stroke:#e7ffc5;stroke-width:2.5;stroke-linejoin:round;animation:mapFloat 5s ease-in-out infinite;transform-origin:350px 220px}.ring{fill:none;stroke:#c2e9b4;stroke-opacity:.22;stroke-width:1;stroke-dasharray:5 12;transform-origin:350px 225px}.ring-one{animation:spin 50s linear infinite}.ring-two{animation:spin 37s linear infinite reverse}.route{fill:none;stroke:#d4f1a6;stroke-width:2;stroke-dasharray:7 12;animation:flow 3s linear infinite}.route-b{animation-duration:2.3s}.route-c{animation-duration:2.7s}.route-d{animation-duration:3.4s}.points circle{fill:#d6f2a6}.origin-halo{fill:#e7ffc4;opacity:.45;transform-origin:350px 218px;animation:pulse 2.5s ease-in-out infinite}.labels{font-size:10px;fill:#d3e6d4;font-weight:800;letter-spacing:1px}.floating{position:absolute;z-index:2;background:white;color:#204a35;padding:14px 19px;border-radius:8px;box-shadow:0 18px 50px #001b1345;animation:mapFloat 4s ease-in-out infinite}.floating b{font-size:12px;letter-spacing:.08em}.floating small{display:block;color:#708b79;margin-top:5px;font-size:10px}.floating-export{right:1%;top:19%}.floating-import{left:1%;bottom:16%;animation-delay:-2s}.map-bottom{position:absolute;bottom:0;font-size:10px;font-weight:800;letter-spacing:.16em;color:#d6efc8}.map-bottom span{color:#b3e88b}
  .mission,.stories,.services-inner,.journey-inner,.closing{padding:100px max(5%,calc((100% - 1240px)/2))}.mission{display:grid;grid-template-columns:1fr 2fr;gap:50px}.mission .section-tag,.stories .section-tag,.services .section-tag,.closing .section-tag{color:#36835b}h2,h3,p{margin-top:0}.mission h2,.stories-heading h2,.services-title h2,.journey h2,.closing h2{font-size:clamp(35px,4.4vw,62px);letter-spacing:-.055em;line-height:1.12;margin:10px 0 25px}.mission em,.stories em,.services em,.closing em{font-style:normal;color:#4d9a68}.mission p{color:#63796a;font-size:17px;line-height:1.85}.stories{background:#fff}.stories-heading{max-width:760px;margin-bottom:55px}.stories-heading p{color:#64796b}.story{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:7%;margin:0 0 95px}.story:last-child{margin-bottom:0}.story.reverse .story-image{order:2}.story-image{position:relative;overflow:hidden;border-radius:14px;background:#cdddcf;min-height:380px}.story-image img{width:100%;height:100%;min-height:380px;object-fit:cover;display:block;transition:transform .8s}.story:hover img{transform:scale(1.05)}.image-index{position:absolute;top:20px;left:20px;background:#fff;padding:10px 14px;border-radius:5px;color:#20503a;font-size:11px;font-weight:900}.story-copy h3{font-size:clamp(29px,3.4vw,47px);line-height:1.15;letter-spacing:-.04em;margin:15px 0 20px}.story-copy p{color:#66796d;line-height:1.85;font-size:16px}.story-copy a{display:inline-flex;gap:25px;margin-top:16px;color:#236e4a;font-weight:800;text-decoration:none}.story-copy a:hover{color:#42a56b}
  .services{background:#eaf0e7}.services-title{max-width:750px}.services-title>p{color:#667c6d;line-height:1.8}.service-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:45px}.service-card{text-align:left;cursor:pointer;display:flex;flex-direction:column;min-height:290px;padding:25px;border:1px solid #d9e4d8;background:white;border-radius:12px;color:#183c30;transition:transform .25s,box-shadow .25s,border-color .25s}.service-card:hover,.service-card.active{transform:translateY(-6px);border-color:#7bb38a;box-shadow:0 20px 45px #183f301b}.service-top{display:flex;align-items:center;justify-content:space-between}.service-icon{background:#e4f1d5;color:#236b48;display:grid;place-items:center;width:47px;height:47px;border-radius:9px;font-size:25px}.service-number{color:#8ca393;font-size:12px;font-weight:800}.service-card h3{font-size:21px;margin:24px 0 10px}.stage{font-size:11px;color:#267a4f;font-weight:800}.stage.planned{color:#8a6c36}.service-card p{color:#6a7e70;font-size:14px;line-height:1.7;margin:14px 0;flex:1}.service-bottom{font-size:12px;font-weight:800;color:#2b8757}.service-detail{margin-top:20px;background:#153c2d;color:white;padding:23px 26px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;gap:20px}.service-detail p{color:#c8ddcc;font-size:13px;line-height:1.6;margin:7px 0 0}.service-detail a{white-space:nowrap;color:#d7f0a2;text-decoration:none;font-weight:800}
  .journey{background:#103427;color:white}.journey-inner{display:grid;grid-template-columns:1fr 1fr;gap:65px}.journey .section-tag{color:#b8e38d}.journey p{color:#c1d6c8;line-height:1.75}.journey h2 em{font-style:normal}.journey-step{display:flex;gap:25px;padding:23px 0;border-bottom:1px solid #ffffff2d}.journey-step b{color:#b8e38d;font-size:13px}.journey-step h3{font-size:21px;margin:0 0 8px}.journey-step p{font-size:14px;margin:0}.closing{display:flex;align-items:end;justify-content:space-between;gap:35px}.closing p{color:#66796e;line-height:1.7}.dark-outline{border:1px solid #89aa95;color:#20533b}.dark-outline:hover{background:#e7efe4}footer{background:#0b291f;color:#c9ddce;display:flex;justify-content:space-between;gap:20px;padding:28px 5%;font-size:12px;flex-wrap:wrap}footer a{color:#d7f0a2;text-decoration:none}
  .reveal{opacity:1;transform:none}@media(prefers-reduced-motion:no-preference){:global(.reveal.shown){animation:revealRise .7s ease both}}@keyframes revealRise{from{opacity:.65;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}@keyframes mapFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes flow{to{stroke-dashoffset:-76}}@keyframes pulse{0%,100%{opacity:.25;transform:scale(.9)}50%{opacity:.55;transform:scale(1.25)}}
  @media(max-width:1050px){.header{flex-wrap:wrap}.hero-inner{grid-template-columns:1fr}.map-scene{min-height:450px}.service-grid{grid-template-columns:repeat(2,1fr)}.mission,.journey-inner{grid-template-columns:1fr}.story{gap:4%}}
  @media(max-width:650px){.header{align-items:flex-start}.menu-button{display:block;background:#205b43;color:white;border:0;border-radius:6px;padding:11px;cursor:pointer}.header nav{display:none;width:100%;flex-direction:column;align-items:stretch;gap:14px}.header nav.open{display:flex}.hero-inner{padding:65px 5% 35px}.hero h1{font-size:clamp(45px,12vw,67px)}.map-scene{min-height:330px}.floating{padding:8px}.floating b{font-size:10px}.floating small{font-size:8px}.map-bottom{font-size:8px}.mission,.stories,.services-inner,.journey-inner,.closing{padding:70px 6%}.story{grid-template-columns:1fr;margin-bottom:65px}.story.reverse .story-image{order:0}.story-image,.story-image img{min-height:250px}.story-copy{padding-top:22px}.service-grid{grid-template-columns:1fr}.service-card{min-height:245px}.service-detail{flex-direction:column;align-items:flex-start}.closing{flex-direction:column;align-items:flex-start}.mission h2,.stories-heading h2,.services-title h2,.journey h2,.closing h2{font-size:38px}}
  @media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}.hero-copy,.country,.ring,.route,.floating,.origin-halo{animation:none!important}.reveal{opacity:1!important;transform:none!important;transition:none!important}}
</style>

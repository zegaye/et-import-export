<svelte:head>
  <title>Training & Trade Resources | ET Import Export</title>
  <meta name="description" content="Training and trade information for Ethiopian exporters, international buyers and international suppliers." />
</svelte:head>

<script>
  const programs = [
    { icon: '🌱', title: 'Ethiopian Exporters & Producers', audience: 'LOCAL BUSINESSES', description: 'Prepare your business and products for international markets.', topics: ['Export readiness and business registration', 'Product quality, standards and packaging', 'Export documentation and logistics', 'Pricing, payments and buyer communication'], href: '/dashboard', action: 'Open exporter dashboard' },
    { icon: '🌍', title: 'International Buyers', audience: 'GLOBAL SOURCING', description: 'Understand how to source products responsibly from Ethiopia.', topics: ['Finding and evaluating suppliers', 'Quality checks and product specifications', 'Contracts and international payments', 'Shipping, customs and due diligence'], href: '/export', action: 'Explore Ethiopian exports' },
    { icon: '🚢', title: 'International Suppliers', audience: 'IMPORT TO ETHIOPIA', description: 'Learn the essentials of supplying products to Ethiopian businesses.', topics: ['Supplier onboarding and assessment', 'Import documentation and conformity', 'Trade terms, shipping and delivery', 'Ethiopian buyer requirements'], href: '/dashboard', action: 'Open supplier dashboard' }
  ];
</script>

<div class="page">
  <header class="top"><a class="brand" href="/">ET IMPORT <span>EXPORT</span></a><a class="back" href="/">← Home</a></header>
  <main>
    <section class="hero"><p class="eyebrow">ET IMPORT EXPORT · KNOWLEDGE CENTER</p><h1>Training for confident <em>global trade.</em></h1><p>Practical learning pathways for Ethiopian producers and exporters, international buyers and international suppliers.</p></section>
    <section class="programs" aria-label="Training pathways">
      {#each programs as program}
        <article class="card"><span class="icon">{program.icon}</span><p class="eyebrow">{program.audience}</p><h2>{program.title}</h2><p>{program.description}</p><ul>{#each program.topics as topic}<li>{topic}</li>{/each}</ul><a href={program.href}>{program.action} →</a></article>
      {/each}
    </section>
    <section class="laws"><div><p class="eyebrow">REGULATORY INFORMATION</p><h2>Ethiopian Trade Laws & Proclamations</h2><p>We are preparing a reference library for trade legislation, customs procedures, licensing and relevant regulatory notices. Always consult the current official legal text and competent authority before making compliance decisions.</p></div><div class="resources"><a href="https://www.motri.gov.et/" target="_blank" rel="noopener noreferrer">Ministry of Trade and Regional Integration ↗</a><a href="https://www.ecc.gov.et/" target="_blank" rel="noopener noreferrer">Ethiopian Customs Commission ↗</a></div></section>
    <section class="notice"><h2>Learning resources are being developed</h2><p>Detailed courses, verified legal references, downloadable checklists and guided learning modules will be added in future updates.</p><a href="/contact">Contact our team →</a></section>
  </main>
</div>

<style>
  :global(body){margin:0;background:#f5f8f4;color:#173c2d;font-family:Arial,Helvetica,sans-serif}
  :global(*){box-sizing:border-box}
  .top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:24px 6%;background:#fff;border-bottom:1px solid #dce8dd}
  .brand{font-weight:900;font-size:20px;color:#174a35;text-decoration:none}.brand span{color:#3d9560}.back{color:#246849;font-weight:700;text-decoration:none}
  main{max-width:1220px;margin:auto;padding:0 24px 72px}.hero{text-align:center;padding:84px 0 60px}.eyebrow{font-size:11px;letter-spacing:.16em;font-weight:900;color:#408358}
  h1{font-size:clamp(38px,6vw,70px);letter-spacing:-.045em;line-height:1.08;margin:20px auto;max-width:850px}h1 em{font-style:normal;color:#318356}.hero>p:last-child{color:#617366;max-width:650px;margin:auto;line-height:1.8;font-size:17px}
  .programs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.card{padding:30px;background:white;border:1px solid #dce8dd;border-radius:22px;box-shadow:0 10px 35px #173c2d09}.icon{font-size:35px}.card h2{font-size:23px;line-height:1.25;min-height:60px}.card>p:not(.eyebrow){color:#647567;line-height:1.65;min-height:80px}.card ul{padding-left:19px;line-height:1.9;color:#355544;min-height:160px}.card a,.notice a{display:inline-block;text-decoration:none;color:white;background:#1d6946;border-radius:10px;padding:13px 16px;font-weight:800}
  .laws{margin-top:30px;padding:35px;border-radius:22px;background:#e5efe6;display:grid;grid-template-columns:1.5fr 1fr;gap:30px}.laws h2,.notice h2{font-size:27px;margin:8px 0 15px}.laws p:not(.eyebrow),.notice p{line-height:1.8;color:#4f6b59}.resources{display:flex;flex-direction:column;gap:12px;justify-content:center}.resources a{padding:16px;background:#fff;border-radius:12px;color:#1b6944;text-decoration:none;font-weight:800}
  .notice{text-align:center;padding:60px 20px}.notice p{max-width:620px;margin:0 auto 25px}
  @media(max-width:850px){.programs{grid-template-columns:1fr}.card h2,.card>p:not(.eyebrow),.card ul{min-height:0}.laws{grid-template-columns:1fr}.hero{padding:55px 0 40px}}
</style>

<script>
  let search = $state('');
  let selectedCategory = $state('ሁሉም');
/** @type {number | null} */
let expandedCourse = $state(null);
  const categories = ['ሁሉም', 'የገበያ መዳረሻ', 'ድርድርና ፋይናንስ', 'የጥራት ደረጃዎች', 'ልዩ የንግድ ዘርፎች'];

  const courses = [
    {
      id: 1, icon: '🌍', category: 'የገበያ መዳረሻ', title: 'በAfCFTA ስምምነት ወደ ውጭ እንዴት መላክ ይቻላል?',
      english: 'How to Export with the AfCFTA',
      summary: 'የአፍሪካ አህጉራዊ ነፃ ንግድ ቀጣናን፣ የገበያ ዕድሎችንና የንግድ ሂደቶችን ይተዋወቁ።',
      lessons: ['የAfCFTA ዓላማና የስምምነቱ መሠረታዊ አሠራር', 'የምርት መነሻ ደንቦች (Rules of Origin)', 'የታሪፍ ሁኔታዎችና የገበያ መዳረሻ', 'የጉምሩክ ሰነዶችና ተግባራዊ ዝግጅት']
    },
    {
      id: 2, icon: '🤝', category: 'ድርድርና ፋይናንስ', title: 'የወጪ ንግድ ሽያጭ ድርድር',
      english: 'Export Sales Negotiation',
      summary: 'ከዓለም አቀፍ ገዢዎች ጋር በዋጋ፣ በጥራት፣ በማድረስና በክፍያ ላይ ውጤታማ ድርድር ማድረግ።',
      lessons: ['ከድርድር በፊት የሚደረግ ዝግጅት', 'የዋጋ አቀራረብና የገዢ ፍላጎት', 'Incoterms እና የማድረስ ኃላፊነት', 'የሽያጭ ውልና የክፍያ ሁኔታዎች']
    },
    {
      id: 3, icon: '🧭', category: 'የገበያ መዳረሻ', title: 'ወደ ዓለም አቀፍ ገበያ እንዴት መግባት ይቻላል?',
      english: 'How to Access International Markets',
      summary: 'የውጭ ገበያ ጥናት፣ ተስማሚ ገዢዎችን መፈለግና የገበያ መግቢያ እቅድ ማዘጋጀት።',
      lessons: ['የገበያ መረጃ ምንጮችና ፍላጎት ጥናት', 'ገዢዎችን መለየትና ታማኝነትን ማረጋገጥ', 'የምርት አቀራረብና የገበያ ማስተዋወቅ', 'የገበያ መግቢያ እቅድ ማዘጋጀት']
    },
    {
      id: 4, icon: '🌾', category: 'የጥራት ደረጃዎች', title: 'በግብርናና ምግብ ዘርፍ የጥራትና ደህንነት ደረጃዎች',
      english: 'Standards in the Agri-Food Sector',
      summary: 'የምግብ ደህንነት፣ የጥራት ቁጥጥር፣ የማሸጊያና የገዢ አገር መስፈርቶችን ይረዱ።',
      lessons: ['የምግብ ደህንነት አስፈላጊነት', 'HACCP እና ISO 22000 መግቢያ', 'የምርት ምርመራ፣ ክትትልና መለያ መረጃ', 'የመዳረሻ ገበያ የምግብ ደንቦችን መፈተሽ']
    },
    {
      id: 5, icon: '👜', category: 'የጥራት ደረጃዎች', title: 'የቆዳና የቆዳ ውጤቶች የጥራት ደረጃዎች',
      english: 'Leather Standards',
      summary: 'የቆዳ ጥራት፣ የምርት ፈተናዎች፣ የኬሚካል ደህንነትና የገበያ መስፈርቶች።',
      lessons: ['የቆዳ ዓይነቶችና የጥራት መለኪያዎች', 'የጥንካሬ፣ የቀለምና የማጠናቀቂያ ፈተናዎች', 'የኬሚካል ገደቦችና የገዢ መስፈርቶች', 'የምርት ሰነዶችና የጥራት ማረጋገጫ']
    },
    {
      id: 6, icon: '💳', category: 'ድርድርና ፋይናንስ', title: 'የወጪ ንግድ ፋይናንስና የክፍያ ሥርዓቶች',
      english: 'Export Finance and Payments',
      summary: 'የንግድ ፋይናንስ፣ የዓለም አቀፍ ክፍያ ዘዴዎችና የክፍያ አደጋ መቆጣጠሪያዎች።',
      lessons: ['የወጪ ንግድ የሥራ ካፒታል ፍላጎት', 'Letter of Credit (L/C) መግቢያ', 'Documentary Collection እና የቅድሚያ ክፍያ', 'የምንዛሬና የክፍያ አደጋ አስተዳደር']
    },
    {
      id: 7, icon: '📊', category: 'የገበያ መዳረሻ', title: 'ተስማሚ የወጪ ንግድ ገበያዎችን መምረጥ',
      english: 'Considering Export Markets',
      summary: 'የገበያ መጠን፣ ውድድር፣ የመጓጓዣ ወጪና የንግድ አደጋን በማነጻጸር ተገቢ ገበያ መምረጥ።',
      lessons: ['የገበያ ምርጫ መለኪያዎች', 'የውድድርና የዋጋ ትንተና', 'ታሪፍ፣ የመጓጓዣ ወጪና የመግቢያ እንቅፋቶች', 'የገበያ ንጽጽር ሰንጠረዥ ማዘጋጀት']
    },
    {
      id: 8, icon: '☕', category: 'ልዩ የንግድ ዘርፎች', title: 'የኢትዮጵያ ቡናን ወደ ውጭ ለመላክ መግቢያ',
      english: 'Introduction to Exporting Coffee',
      summary: 'የቡና ጥራትና ደረጃ ምደባ፣ የገዢ ፍላጎት፣ የወጪ ንግድ ሰነዶችና ሎጂስቲክስ።',
      lessons: ['የኢትዮጵያ ቡና ዓይነቶችና ገበያዎች', 'የቡና ጥራት፣ ደረጃ ምደባና ናሙና', 'የሕጋዊ የወጪ ንግድ ሂደትና ሰነዶች', 'ማሸግ፣ ማጓጓዝና ከገዢ ጋር መግባባት']
    },
    {
      id: 9, icon: '🇨🇳', category: 'ልዩ የንግድ ዘርፎች', title: 'ከቻይና የንግድ አጋሮች ጋር እንዴት መሥራት ይቻላል?',
      english: 'Doing Business With Chinese People',
      summary: 'የባህል ልዩነቶችን በአክብሮት መረዳት፣ አጋሮችን ማረጋገጥና ግልጽ የንግድ ስምምነት ማድረግ።',
      lessons: ['በባህል መካከል የንግድ ግንኙነት', 'የአቅራቢና የገዢ ታማኝነት ማረጋገጥ', 'የውል፣ የናሙናና የጥራት ስምምነቶች', 'የክፍያ፣ የመላኪያና የክርክር መፍትሔ ጥንቃቄዎች']
    }
  ];

  const programs = [
    { icon: '🌱', title: 'የኢትዮጵያ ላኪዎችና አምራቾች', description: 'ለዓለም አቀፍ ገበያ የንግድና የምርት ዝግጅት።', href: '/dashboard', action: 'የላኪዎች ዳሽቦርድ' },
    { icon: '🌐', title: 'ዓለም አቀፍ ገዢዎች', description: 'የኢትዮጵያ ምርቶችን ለመግዛት የአቅራቢ ምርጫና የጥራት ግምገማ።', href: '/export', action: 'የወጪ ንግድ ምርቶች' },
    { icon: '🚢', title: 'ዓለም አቀፍ አቅራቢዎች', description: 'ወደ ኢትዮጵያ ምርት ለማቅረብ የሚያስፈልጉ የንግድ መሠረታዊ ነጥቦች።', href: '/dashboard', action: 'የአቅራቢዎች ዳሽቦርድ' }
  ];

  let filteredCourses = $derived(courses.filter((course) => {
    const matchesCategory = selectedCategory === 'ሁሉም' || course.category === selectedCategory;
    const term = search.trim().toLocaleLowerCase();
    return matchesCategory && (!term || `${course.title} ${course.english} ${course.summary} ${course.category}`.toLocaleLowerCase().includes(term));
  }));
</script>

<svelte:head>
  <title>የወጪ ንግድ ስልጠና | ET Import Export</title>
  <meta name="description" content="በአማርኛ የተዘጋጁ የወጪ ንግድ ስልጠና ርዕሶች፣ የገበያ መዳረሻ፣ የጥራት ደረጃዎች፣ ፋይናንስና የንግድ ህጎች።" />
</svelte:head>

<div class="page">
  <header class="top">
    <a class="brand" href="/">ET IMPORT <span>EXPORT</span></a>
    <nav aria-label="የገጽ አሰሳ"><a href="/">← መነሻ</a><a href="/export">ምርቶች</a><a href="/dashboard">ዳሽቦርድ</a></nav>
  </header>

  <main>
    <section class="hero">
      <span class="eyebrow light">ET IMPORT EXPORT · TRAINING CENTER</span>
      <h1>የወጪ ንግድ <span>ስልጠና ማዕከል</span></h1>
      <p>የኢትዮጵያ ላኪዎች፣ አምራቾችና የዓለም አቀፍ ንግድ አጋሮች ለገበያ ዝግጁ እንዲሆኑ የተዘጋጁ የአማርኛ የመማሪያ ርዕሶች።</p>
      <a class="hero-link" href="#courses">9 የስልጠና ርዕሶችን ይመልከቱ ↓</a>
    </section>

    <section id="courses" class="catalog" aria-labelledby="course-heading">
      <div class="section-heading"><div><span class="eyebrow">የስልጠና ዝርዝር</span><h2 id="course-heading">የአማርኛ የንግድ ትምህርቶች</h2><p>ርዕስ ይምረጡ፤ የትምህርት ክፍሎቹን ለማየት «የትምህርት ዝርዝር» ይጫኑ።</p></div><span class="count">{filteredCourses.length} / 9 ርዕሶች</span></div>
      <div class="filters">
        <label class="search-field"><span>ስልጠና ይፈልጉ</span><input type="search" bind:value={search} placeholder="ለምሳሌ፦ ቡና፣ AfCFTA፣ ፋይናንስ" /></label>
        <label class="category-field"><span>ዘርፍ</span><select bind:value={selectedCategory}>{#each categories as item}<option value={item}>{item}</option>{/each}</select></label>
      </div>
      {#if filteredCourses.length === 0}
        <div class="empty"><h3>የሚዛመድ ስልጠና አልተገኘም</h3><p>ሌላ ቃል ይፈልጉ ወይም ዘርፉን ይቀይሩ።</p></div>
      {:else}
        <div class="course-grid">
          {#each filteredCourses as course (course.id)}
            <article class="course-card">
              <div class="card-top"><span class="course-icon" aria-hidden="true">{course.icon}</span><span class="course-number">ስልጠና {String(course.id).padStart(2, '0')}</span></div>
              <span class="category-tag">{course.category}</span>
              <h3>{course.title}</h3>
              <p class="english">{course.english}</p>
              <p class="summary">{course.summary}</p>
              <div class="card-bottom"><span class="lesson-count">📚 {course.id === 1 ? 6 : course.lessons.length} የትምህርት ክፍሎች</span><button type="button" class="lesson-button" aria-expanded={expandedCourse === course.id} onclick={() => expandedCourse = expandedCourse === course.id ? null : course.id}>{expandedCourse === course.id ? 'ዝርዝሩን ዝጋ ↑' : 'የትምህርት ዝርዝር →'}</button>{#if course.id === 1}<a class="start-course" href="/training/afcfta">ስልጠናውን ጀምር →</a>{/if}</div>
              {#if expandedCourse === course.id}
                <div class="lesson-panel"><h4>የሚሸፈኑ ርዕሶች</h4><ol>{#each course.lessons as lesson}<li>{lesson}</li>{/each}</ol>{#if course.id === 1}<p class="lesson-note">ሙሉ ስድስት ትምህርቶችና የመጨረሻ ፈተና ዝግጁ ናቸው።</p>{:else}<p class="lesson-note">ይህ የትምህርት ዕቅድ ነው። ሙሉ የትምህርት ይዘትና ፈተና ገና አልተጨመሩም።</p>{/if}</div>
              {/if}
            </article>
          {/each}
        </div>
      {/if}
    </section>

    <section class="pathways" aria-labelledby="pathways-heading">
      <div class="section-heading"><div><span class="eyebrow">የተጠቃሚዎች መንገዶች</span><h2 id="pathways-heading">ለማን የተዘጋጀ ነው?</h2></div></div>
      <div class="path-grid">{#each programs as program}<article class="path-card"><span class="path-icon" aria-hidden="true">{program.icon}</span><h3>{program.title}</h3><p>{program.description}</p><a href={program.href}>{program.action} →</a></article>{/each}</div>
    </section>

    <section class="laws"><div><span class="eyebrow">የሕግና የቁጥጥር መረጃ</span><h2>የኢትዮጵያ የንግድ ሕጎችና አዋጆች</h2><p>የወጪ ንግድ ፈቃድ፣ የጉምሩክ ሂደትና የምርት መስፈርቶች ሊለወጡ ይችላሉ። ሕጋዊ ውሳኔ ከማድረግዎ በፊት ወቅታዊ ኦፊሴላዊ ሰነዶችን እና ተገቢውን ባለሥልጣን ያረጋግጡ።</p></div><div class="resources"><a href="https://www.motri.gov.et/" target="_blank" rel="noopener noreferrer">የንግድና ቀጣናዊ ትስስር ሚኒስቴር ↗</a><a href="https://www.ecc.gov.et/" target="_blank" rel="noopener noreferrer">የኢትዮጵያ ጉምሩክ ኮሚሽን ↗</a></div></section>
    <section class="notice"><h2>ተጨማሪ የመማሪያ ይዘቶች በዝግጅት ላይ ናቸው</h2><p>የእያንዳንዱ ርዕስ ዝርዝር ትምህርት፣ ተግባራዊ ምሳሌዎች፣ የሚወርዱ የሥራ ዝርዝሮችና የእውቀት መፈተሻዎች በቀጣይ ይጨመራሉ።</p><a href="/contact">ያግኙን →</a></section>
  </main>
</div>

<style>
  :global(*){box-sizing:border-box}
  :global(body){margin:0;background:#f5f8f4;color:#173c2d;font-family:Arial,Helvetica,sans-serif}
  .page{min-height:100vh}
  a{text-decoration:none}
  .top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px max(24px,calc((100vw - 1220px)/2));background:#fff;border-bottom:1px solid #dce8dd}
  .brand{font-weight:900;font-size:20px;color:#174a35;white-space:nowrap}.brand span{color:#3d9560}
  .top nav{display:flex;flex-wrap:wrap;gap:22px}.top nav a{color:#246849;font-weight:700;font-size:14px}
  main{max-width:1268px;margin:auto;padding:24px 24px 75px}
  .hero{position:relative;overflow:hidden;padding:76px 58px;border-radius:25px;background:linear-gradient(120deg,#123b2a,#246943 75%,#39875a);color:#fff}
  .hero::after{content:'';position:absolute;right:-90px;top:-115px;width:390px;height:390px;border:1px solid #ffffff30;border-radius:50%;box-shadow:0 0 0 50px #ffffff08,0 0 0 100px #ffffff08;pointer-events:none}
  .eyebrow{font-size:11px;font-weight:900;letter-spacing:.13em;color:#2e8654}.eyebrow.light{color:#b8ebcb}
  h1{font-size:clamp(36px,5.6vw,65px);line-height:1.18;letter-spacing:-.035em;max-width:850px;margin:18px 0}h1 span{color:#b5e5c3}
  .hero p{font-size:17px;line-height:1.85;max-width:740px;color:#e2f2e6}
  .hero-link{display:inline-flex;align-items:center;margin-top:18px;padding:14px 20px;background:#fff;color:#185b3b;border-radius:10px;font-weight:800}
  .catalog,.pathways{padding-top:56px;scroll-margin-top:25px}
  .section-heading{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:22px}.section-heading h2{font-size:clamp(26px,3vw,35px);letter-spacing:-.025em;margin:10px 0}.section-heading p{color:#68796d;line-height:1.7;margin:0}
  .count{white-space:nowrap;padding:10px 16px;border:1px solid #dce8dd;border-radius:100px;background:#fff;color:#316c4b;font-size:13px;font-weight:800}
  .filters{display:grid;grid-template-columns:minmax(0,2fr) minmax(210px,1fr);gap:16px;padding:18px;margin-bottom:24px;border:1px solid #e1eae2;border-radius:17px;background:#fff}
  .filters label{display:flex;flex-direction:column;gap:8px;font-size:13px;font-weight:800;color:#29523a;min-width:0}
  .filters input,.filters select{width:100%;min-width:0;padding:14px;border:1px solid #d5e2d7;border-radius:10px;background:#fafdFA;color:#173c2d;font:inherit;font-weight:400}
  .filters input:focus-visible,.filters select:focus-visible,.lesson-button:focus-visible,a:focus-visible{outline:3px solid #83c49a;outline-offset:3px}
  .course-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;align-items:stretch}
  .course-card{display:flex;flex-direction:column;min-width:0;padding:24px;border:1px solid #dce8dd;border-radius:19px;background:#fff;box-shadow:0 8px 28px #173c2d0a}
  .card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:17px}.course-icon{display:grid;place-items:center;width:60px;height:60px;border-radius:15px;background:#e9f4eb;font-size:31px}.course-number{font-size:12px;font-weight:900;color:#789081}
  .category-tag{align-self:start;padding:6px 10px;border-radius:30px;background:#eaf5eb;color:#27734a;font-size:11px;font-weight:800}
  .course-card h3{font-size:21px;line-height:1.5;margin:15px 0 6px;color:#173c2d}.english{margin:0;font-size:12px;font-weight:700;color:#7b8c80}.summary{line-height:1.85;font-size:14px;color:#586d5e;margin:16px 0 22px}
  .card-bottom{margin-top:auto;border-top:1px solid #e7eee8;padding-top:17px;display:flex;flex-direction:column;gap:13px}.lesson-count{font-size:12px;font-weight:800;color:#55735e}.lesson-button{border:0;border-radius:10px;background:#216a46;color:#fff;font:inherit;font-size:14px;font-weight:800;padding:13px 14px;text-align:center;cursor:pointer}.lesson-button:hover{background:#164e33}
  .start-course{display:block;border-radius:10px;background:#dff2e5;color:#145a36;font-size:14px;font-weight:900;padding:13px 14px;text-align:center}.start-course:hover{background:#c9e8d3}
  .lesson-panel{margin-top:16px;padding:17px;background:#f0f7f0;border-radius:12px;border:1px solid #dbe9dd}.lesson-panel h4{margin:0 0 12px;font-size:15px}.lesson-panel ol{margin:0;padding-left:23px;color:#385a43;line-height:1.9;font-size:13px}.lesson-note{font-size:12px;color:#6a7d6f;line-height:1.7;margin:14px 0 0}
  .empty{padding:50px 20px;text-align:center;border-radius:16px;background:#fff;border:1px solid #dce8dd}.empty p{color:#68796d}
  .path-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.path-card{display:flex;flex-direction:column;gap:12px;padding:25px;border:1px solid #dce8dd;border-radius:18px;background:#fff}.path-icon{font-size:32px}.path-card h3{margin:0;font-size:20px}.path-card p{line-height:1.75;color:#607364;margin:0 0 8px;flex:1}.path-card a{color:#1c7048;font-weight:800}
  .laws{display:grid;grid-template-columns:1.5fr 1fr;gap:28px;margin-top:52px;padding:32px;border-radius:20px;background:#e4efe5}.laws h2{font-size:27px;line-height:1.45;margin:10px 0}.laws p{color:#4e6b58;line-height:1.9}.resources{display:flex;flex-direction:column;gap:12px;justify-content:center}.resources a{padding:16px;border-radius:11px;background:#fff;color:#1c6945;font-weight:800;line-height:1.6}
  .notice{text-align:center;padding:60px 20px 10px}.notice h2{font-size:25px}.notice p{max-width:730px;margin:12px auto 24px;color:#647567;line-height:1.9}.notice a{display:inline-block;background:#216a46;color:#fff;padding:13px 20px;border-radius:10px;font-weight:800}
  @media(max-width:1000px){.course-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:750px){.top{padding:17px 20px}.hero{padding:52px 26px}.path-grid,.laws{grid-template-columns:1fr}.section-heading{align-items:start;flex-direction:column}.course-grid{grid-template-columns:1fr}.filters{grid-template-columns:1fr}.catalog,.pathways{padding-top:42px}}
  @media(max-width:440px){main{padding:15px 14px 50px}.top{align-items:flex-start;flex-direction:column;gap:13px}.top nav{gap:16px}.hero{padding:42px 22px}.hero p{font-size:15px}.course-card{padding:19px}.laws{padding:23px}}
</style>

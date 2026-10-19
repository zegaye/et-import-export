<script>
  const lessons = [
    { title: 'AfCFTA ምንድን ነው?', body: ['AfCFTA (African Continental Free Trade Area) በአፍሪካ አገሮች መካከል ንግድን ለማቀላጠፍ፣ የታሪፍና ሌሎች የንግድ እንቅፋቶችን በደረጃ ለመቀነስ የተቋቋመ ስምምነት ነው።', 'ስምምነቱ ብቻውን ለሁሉም ምርቶች የቀረጥ ነፃነት አይሰጥም። የምርቱ የመነሻ መስፈርት፣ የሁለቱ አገሮች የታሪፍ መርሃ ግብርና የአፈጻጸም ሁኔታ መረጋገጥ አለበት።'], task: 'ለንግድዎ ተስማሚ የሆኑ ሁለት የአፍሪካ ገበያዎችን ይጻፉ።' },
    { title: 'የአፍሪካ ገበያ ዕድሎች', body: ['የመጀመሪያው እርምጃ የሚሸጠውን ምርት በግልጽ መለየት ነው። ከዚያ በተመረጠው አገር ያለውን ፍላጎት፣ ተወዳዳሪዎችን፣ ዋጋንና የመጓጓዣ ወጪን ያጥኑ።', 'ምሳሌ፦ የኢትዮጵያ ቡና ላኪ ከመጀመሪያ ገዢ ጋር ከመዋዋሉ በፊት የገቢ አገሩን የምግብ ደህንነትና የምርት መለያ መስፈርቶች መመርመር አለበት።'], task: 'ለአንድ ምርት ሁለት ሊሆኑ የሚችሉ ገዢ አገሮችን ይምረጡ።' },
    { title: 'የምርት መነሻ ደንቦች', body: ['Rules of Origin ማለት ምርት በስምምነቱ ሥር ከአባል አገር የመጣ መሆኑን ለመወሰን የሚጠቅሙ መስፈርቶች ናቸው።', 'አንዳንድ ምርቶች ሙሉ በሙሉ በአንድ አገር ሊመረቱ ይችላሉ፤ ሌሎች ደግሞ የተወሰነ የማምረት ሂደት ወይም የእሴት ጭማሪ መስፈርት ሊያሟሉ ይገባል። ለእያንዳንዱ ምርት የሚመለከተውን ልዩ ደንብ ያረጋግጡ።'], task: 'የምርትዎን የምርት ሂደትና የግብዓት ምንጮች ይዘርዝሩ።' },
    { title: 'የወጪ ንግድ ሰነዶች', body: ['የተለመዱ ሰነዶች Commercial Invoice፣ Packing List፣ የመጓጓዣ ሰነድ እና በሚመለከተው ጊዜ የምርት መነሻ ማረጋገጫ (Certificate of Origin) ያካትታሉ።', 'የምርቱ አይነትና የገቢ አገር ሕግ መሠረት ተጨማሪ ፈቃዶች፣ የጤና ማረጋገጫዎች ወይም የጥራት ምርመራዎች ሊፈለጉ ይችላሉ።'], task: 'ለምርትዎ የሚያስፈልጉ ሰነዶችን የማረጋገጫ ዝርዝር ያዘጋጁ።' },
    { title: 'ጉምሩክና ሎጂስቲክስ', body: ['የምርት ምደባ (HS Code)፣ የማጓጓዣ መንገድ፣ የኢንሹራንስ ሁኔታና የገቢ አገር የጉምሩክ ሂደት የጠቅላላ ወጪውን ይወስናሉ።', 'ከገዢው ጋር በIncoterms® 2020 መሠረት ማን ለማጓጓዣ፣ ለኢንሹራንስና ለጉምሩክ ወጪ እንደሚከፍል በውል ውስጥ በግልጽ ይግለጹ።'], task: 'የመጓጓዣ፣ የማሸጊያና የሰነድ ወጪዎችን ይገምቱ።' },
    { title: 'የመጀመሪያ የወጪ ንግድ እቅድ', body: ['የእርስዎ እቅድ ምርት፣ የዒላማ አገር፣ የገዢ መረጃ፣ የጥራት መስፈርት፣ የዋጋ ስሌት፣ የክፍያ ዘዴና የማጓጓዣ መርሃ ግብር ሊያካትት ይገባል።', 'ገዢውን ያረጋግጡ፤ ከክፍያ በፊት የውል ሁኔታዎችን ይመርምሩ፤ በኢትዮጵያና በገቢ አገር ያሉ የወቅቱን ሕጋዊ መስፈርቶች ያረጋግጡ።'], task: 'በአንድ ገጽ የምርት፣ የገበያና የወጪ እቅድ ይጻፉ።' }
  ];

  const questions = [
    { q: 'የAfCFTA ዋና ዓላማ ምንድን ነው?', options: ['የአፍሪካን ንግድ ማቆም', 'በአፍሪካ ውስጥ ንግድን ማቀላጠፍ', 'ሁሉንም ሰነዶች ማስወገድ'], correct: 1 },
    { q: 'Rules of Origin ምንን ይመለከታል?', options: ['የምርት መነሻን', 'የማጓጓዣ ቀንን', 'የባንክ ስምን'], correct: 0 },
    { q: 'የገቢ አገር የምርት መስፈርት መቼ መፈተሽ አለበት?', options: ['ከመላኩ በኋላ', 'ከገዢ ጋር ከመዋዋሉና ከመላኩ በፊት', 'አያስፈልግም'], correct: 1 },
    { q: 'Commercial Invoice ምንድን ነው?', options: ['የንግድ ደረሰኝ', 'የመኪና ፈቃድ', 'የግል መታወቂያ'], correct: 0 },
    { q: 'በወጪ ንግድ ውል ውስጥ ምን መገለጽ አለበት?', options: ['የክፍያና የማድረስ ሁኔታ', 'የሻጩ የትውልድ ቀን', 'የገዢው የቤት ቀለም'], correct: 0 }
  ];

  let current = $state(0);

/** @type {number[]} */
let completed = $state([]);

/** @type {Record<number, number>} */
let answers = $state({});

let submitted = $state(false);
let showQuiz = $state(false);
let learnerName = $state('');
let certificateOpen = $state(false);
let certificateDate = $state('');

let score = $derived(
  questions.filter((q, i) => answers[i] === q.correct).length
);

let progress = $derived(
  Math.round((completed.length / lessons.length) * 100)
);

let passed = $derived(
  submitted && score >= 4 && completed.length === lessons.length
);

function createCertificate() {
  if (!passed || learnerName.trim().length < 2) return;

  certificateDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  certificateOpen = true;
}

function printCertificate() {
  if (certificateOpen && passed) {
    window.print();
  }
}

  function completeLesson() {
    if (!completed.includes(current)) completed = [...completed, current];
    if (current < lessons.length - 1) current += 1;
    else showQuiz = true;
  }
</script>

<svelte:head>
  <title>AfCFTA ስልጠና | ET Import Export</title>
  <meta name="description" content="በአማርኛ የAfCFTA ወጪ ንግድ ስልጠና፤ ስድስት ትምህርቶችና አጭር ፈተና።" />
</svelte:head>

<div class="page">
  <header class="top"><a class="brand" href="/">ET IMPORT <span>EXPORT</span></a><a href="/training" class="back">← ወደ ስልጠናዎች</a></header>
  <main>
    <section class="hero"><span class="eyebrow">የወጪ ንግድ ስልጠና · ኮርስ 01</span><h1>በAfCFTA ሥር እንዴት ወደ ውጭ መላክ ይቻላል?</h1><p>ለኢትዮጵያ ላኪዎች የተዘጋጀ መሠረታዊ ተግባራዊ ስልጠና</p><div class="progress-label"><span>የትምህርት እድገት</span><strong>{progress}%</strong></div><div class="progress-track"><div class="progress-fill" style={`width: ${progress}%`}></div></div></section>
    <div class="layout">
      <aside class="sidebar"><h2>የትምህርት ዝርዝር</h2>{#each lessons as lesson, i}<button class:active={!showQuiz && current === i} type="button" onclick={() => { current = i; showQuiz = false; }}>{completed.includes(i) ? '✓' : `${i + 1}.`} {lesson.title}</button>{/each}<button class:active={showQuiz} type="button" disabled={completed.length !== lessons.length} onclick={() => showQuiz = true}>📝 የመጨረሻ ፈተና</button></aside>
      <section class="content">
        {#if !showQuiz}
          <span class="eyebrow">ትምህርት {current + 1} / {lessons.length}</span><h2>{lessons[current].title}</h2>
          {#each lessons[current].body as paragraph}<p>{paragraph}</p>{/each}
          <div class="exercise"><strong>✍️ ተግባራዊ ልምምድ</strong><p>{lessons[current].task}</p></div>
          <div class="actions"><button class="secondary" disabled={current === 0} onclick={() => current -= 1}>← ቀዳሚ</button><button class="primary" onclick={completeLesson}>{current === lessons.length - 1 ? 'ትምህርቱን ጨርስና ፈተናውን ጀምር →' : 'ትምህርቱን ጨርሻለሁ · ቀጣይ →'}</button></div>
        {:else}
          <span class="eyebrow">የእውቀት ማረጋገጫ</span><h2>የመጨረሻ ፈተና</h2><p>ከሚከተሉት አምስት ጥያቄዎች ትክክለኛውን መልስ ይምረጡ።</p>
          {#each questions as question, i}<fieldset><legend>{i + 1}. {question.q}</legend>{#each question.options as option, j}<label class:correct={submitted && j === question.correct} class:incorrect={submitted && answers[i] === j && j !== question.correct}><input type="radio" name={`question-${i}`} checked={answers[i] === j} disabled={submitted} onchange={() => answers = { ...answers, [i]: j }} />{option}</label>{/each}</fieldset>{/each}
          {#if submitted}<div class="result"><strong>ውጤት፦ {score} / {questions.length}</strong><p>{score >= 4 ? 'ጥሩ ሥራ! የመሠረታዊ ፈተናውን የማለፊያ መጠን አሟልተዋል።' : 'ትምህርቶቹን ደግመው ያንብቡና እንደገና ይሞክሩ።'}</p></div><button class="secondary" onclick={() => { submitted = false; answers = {}; }}>እንደገና ሞክር</button>{#if passed}
            <div class="certificate-form">
              <h3>🎓 የስልጠና ማጠናቀቂያ ሰርተፊኬት</h3>
              <p>በሰርተፊኬቱ ላይ እንዲታይ ሙሉ ስምዎን ያስገቡ።</p>
              <label for="learner-name">ሙሉ ስም</label>
              <input id="learner-name" type="text" maxlength="100" autocomplete="name" bind:value={learnerName} placeholder="ሙሉ ስምዎ" />
              <button class="primary" disabled={learnerName.trim().length < 2} onclick={createCertificate}>ሰርተፊኬት አዘጋጅ →</button>
            </div>
          {/if}
          {:else}<button class="primary" disabled={Object.keys(answers).length !== questions.length} onclick={() => submitted = true}>መልሶቼን አረጋግጥ</button>{/if}
        {/if}
      </section>
    </div>
    {#if certificateOpen && passed}
      <div class="certificate-actions"><button class="primary" onclick={printCertificate}>⬇ ሰርተፊኬቱን በPDF አስቀምጥ / Print</button><button class="secondary" onclick={() => certificateOpen = false}>ዝጋ</button></div>
      <section class="certificate" aria-label="Certificate of course completion">
        <div class="cert-top">ET <span>IMPORT EXPORT</span></div>
        <div class="cert-decoration">✦</div>
        <div class="cert-overline">CERTIFICATE OF COMPLETION</div>
        <h2>የስልጠና ማጠናቀቂያ ሰርተፊኬት</h2>
        <p>This certifies that</p>
        <div class="cert-name">{learnerName.trim()}</div>
        <p>has completed all six lessons and passed the final assessment for</p>
        <h3>How to Export with the AfCFTA</h3>
        <p class="cert-amharic">በAfCFTA ሥር እንዴት ወደ ውጭ መላክ ይቻላል?</p>
        <div class="cert-details"><span><strong>Assessment</strong>{score} / {questions.length} ({Math.round(score / questions.length * 100)}%)</span><span><strong>Completed</strong>{certificateDate}</span><span><strong>Issued by</strong>ET Import Export</span></div>
        <p class="cert-fineprint">Platform-issued course completion certificate. Not an official AfCFTA, government, or accredited professional qualification. This version is not independently verifiable.</p>
      </section>
    {/if}
    <p class="disclaimer">ማሳሰቢያ፦ ይህ ስልጠና አጠቃላይ የትምህርት መረጃ ነው። የታሪፍ ቅናሾችን፣ የAfCFTA አፈጻጸምን፣ የኢትዮጵያን የወጪ ንግድ ፈቃዶችና የገቢ አገር መስፈርቶችን ከሚመለከታቸው ባለሥልጣናት ያረጋግጡ። ይህ ገጽ የሕግ ምክር ወይም እውቅና ያለው ሰርተፊኬት አይደለም።</p>
  </main>
</div>

<style>
  :global(body){margin:0;background:#f4f8f4;color:#173c2d;font-family:Arial,Helvetica,sans-serif}:global(*){box-sizing:border-box}
  .top{display:flex;justify-content:space-between;align-items:center;gap:16px;background:#fff;border-bottom:1px solid #dbe8de;padding:22px 6%}.brand{font-weight:900;color:#174a35;text-decoration:none;font-size:19px}.brand span{color:#32935a}.back{color:#256e4c;text-decoration:none;font-weight:700}
  main{max-width:1200px;margin:auto;padding:30px 20px 70px}.hero{background:linear-gradient(120deg,#133d2d,#237a4e);border-radius:22px;color:#fff;padding:44px 40px;margin-bottom:25px}.eyebrow{font-size:12px;font-weight:800;letter-spacing:.07em;color:#3c9761}.hero .eyebrow{color:#b9e9c7}.hero h1{font-size:clamp(26px,4vw,42px);line-height:1.4;max-width:850px;margin:15px 0}.hero p{color:#e0f3e5}.progress-label{display:flex;justify-content:space-between;max-width:540px;margin-top:28px;font-size:13px}.progress-track{max-width:540px;background:#ffffff40;height:10px;border-radius:30px;overflow:hidden;margin-top:9px}.progress-fill{background:#b9efc3;height:100%;transition:width .25s}
  .layout{display:grid;grid-template-columns:290px minmax(0,1fr);gap:22px;align-items:start}.sidebar,.content{background:#fff;border:1px solid #dce9df;border-radius:20px;padding:26px;box-shadow:0 10px 28px #123a2508}.sidebar h2{font-size:18px;margin:0 0 18px}.sidebar button{display:block;width:100%;text-align:left;border:0;background:transparent;padding:14px;border-radius:10px;color:#315a42;cursor:pointer;line-height:1.6;font-weight:600}.sidebar button:hover,.sidebar button.active{background:#e6f4e9;color:#155a37}.content{min-height:480px;padding:38px}.content h2{font-size:clamp(24px,3vw,33px);line-height:1.4}.content p{line-height:2;color:#466050;font-size:16px}.exercise{background:#edf7ee;border-left:4px solid #2a8955;padding:18px 22px;border-radius:12px;margin:30px 0}.exercise p{margin-bottom:0}.actions{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:32px}button.primary,button.secondary{border:0;border-radius:10px;padding:14px 19px;font-weight:800;cursor:pointer}button.primary{background:#1b7447;color:white}button.secondary{background:#e6f0e8;color:#245e3c}button:disabled{opacity:.5;cursor:not-allowed}fieldset{border:1px solid #dce8df;border-radius:13px;padding:17px;margin:22px 0}legend{font-weight:800;line-height:1.6;padding:0 6px}fieldset label{display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;cursor:pointer;line-height:1.6}fieldset label.correct{background:#e0f4e6}fieldset label.incorrect{background:#fff0ec}.result{background:#e7f4e8;padding:18px;border-radius:12px;margin:20px 0}.disclaimer{color:#617768;font-size:13px;line-height:1.9;margin-top:28px}
  .certificate-form{margin-top:22px;padding:22px;border:1px solid #b8dcc3;border-radius:14px;background:#f0f8f1}.certificate-form h3{margin:0 0 8px}.certificate-form label{display:block;font-weight:700;margin:15px 0 8px}.certificate-form input{display:block;width:100%;max-width:440px;padding:13px;border:1px solid #b7cdbc;border-radius:8px;font:inherit;margin-bottom:16px}.certificate-actions{display:flex;gap:12px;flex-wrap:wrap;margin:28px 0 16px}.certificate{background:#fff;border:11px double #b6a16b;padding:55px 35px;text-align:center;color:#1d4230;max-width:1000px;margin:0 auto;box-shadow:0 14px 35px #173c2d14}.cert-top{font-size:22px;font-weight:900;letter-spacing:.15em}.cert-top span{color:#288454}.cert-decoration{font-size:38px;color:#c7a758;margin:18px 0}.cert-overline{font-size:13px;letter-spacing:.23em;font-weight:800;color:#957b3e}.certificate h2{font-size:clamp(23px,4vw,34px);margin:15px 0 26px}.certificate p{line-height:1.8;color:#4b6354}.cert-name{font-size:clamp(28px,5vw,46px);font-weight:800;border-bottom:1px solid #cbb782;display:inline-block;min-width:min(100%,480px);padding:12px 10px;overflow-wrap:anywhere}.certificate h3{font-size:clamp(20px,3vw,29px);margin:14px 0}.cert-amharic{font-weight:700}.cert-details{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin:40px 0 24px}.cert-details span{display:flex;flex-direction:column;gap:7px}.cert-details strong{font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#8c7442}.certificate .cert-fineprint{font-size:11px;max-width:650px;margin:30px auto 0;color:#7d857d}
  @media print{@page{size:A4 landscape;margin:12mm}:global(body){background:#fff!important}.page>.top,.page main>.hero,.page main>.layout,.page main>.disclaimer,.certificate-actions{display:none!important}.page main{padding:0!important;max-width:none!important}.certificate{display:block!important;box-shadow:none!important;margin:0!important;max-width:none!important;min-height:170mm;padding:24mm 16mm!important;break-inside:avoid;print-color-adjust:exact;-webkit-print-color-adjust:exact}}
  @media(max-width:820px){.layout{grid-template-columns:1fr}.hero{padding:30px 22px}.content{padding:25px 20px}.top{padding:18px 20px}.sidebar{padding:20px}.sidebar button{padding:11px}}
</style>

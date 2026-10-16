
<script>
  let { data } = $props();

  let passed = $derived(
    data.assessment.status === 'passed'
  );

  let score = $derived(data.assessment.score ?? 0);
</script>

<svelte:head>
  <title>Assessment Result | ET Import Export</title>
</svelte:head>

<main class="page">
  <div class="container">
    <a class="back" href="/dashboard">← Dashboard</a>

    <header class="heading">
      <span class="eyebrow">ET IMPORT EXPORT</span>
      <h1>Export Readiness Assessment Result</h1>
      <p>{data.profile.company_name}</p>
    </header>

    <section class="result-card">
      <div class:passed class:needs-support={!passed} class="score-circle">
        <strong>{score}</strong>
        <span>out of 100</span>
      </div>

      <h2>
        {passed
          ? 'Initial Assessment Passed'
          : 'Export Facilitation Support Required'}
      </h2>

      <p class="status">
        {passed
          ? 'Your business has met the initial assessment criteria.'
          : 'Your business needs additional preparation before proceeding.'}
      </p>

      <div class="details">
        <div>
          <span>Assessment attempt</span>
          <strong>#{data.assessment.attempt_number}</strong>
        </div>

        <div>
          <span>Assessment status</span>
          <strong>
            {passed ? 'Passed' : 'Needs Support'}
          </strong>
        </div>
      </div>
    </section>

    {#if passed}
      <section class="next-steps">
        <h2>Next Step: Business Document Verification</h2>

        <p>
          Congratulations on completing the initial assessment.
          Your next step is to provide the required business
          documents for review by our verification team.
        </p>

        <ul>
          <li>Valid business license</li>
          <li>Relevant export license or authorization</li>
          <li>Company profile</li>
          <li>Relevant product or quality certificates</li>
        </ul>

        <p class="note">
          Passing this questionnaire does not mean your
          business is verified or approved for export.
          Document verification is still required.
        </p>

        <div class="pending-action">
          Document upload and verification will be available
          after we complete the next development step.
        </div>
      </section>
    {:else}
      <section class="next-steps">
        <h2>Next Step: Export Facilitation Team Visit</h2>

        <p>
          Our facilitation team will need to assess your
          business's export preparation needs and recommend
          improvements.
        </p>

        <div class="support-status">
          <span>Support case status</span>
          <strong>
            {data.supportCase?.status === 'visit_required'
              ? 'Business visit required'
              : data.supportCase?.status ?? 'Pending'}
          </strong>
        </div>

        {#if data.supportCase?.visit_date}
          <p>
            Recorded visit date:
            {new Date(data.supportCase.visit_date).toLocaleDateString()}
          </p>
        {/if}

        {#if data.supportCase?.recommendations}
          <h3>Facilitation Recommendations</h3>
          <p>{data.supportCase.recommendations}</p>
        {/if}

        <p class="note">
          Reassessment is available only after a recorded
          business visit and authorization from the
          facilitation team.
        </p>

        <div class="pending-action">
          Team visit scheduling and follow-up tools
          will be implemented next.
        </div>
      </section>
    {/if}

    <div class="footer-link">
      <a href="/dashboard">Return to Dashboard →</a>
    </div>
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    padding: 40px 20px 80px;
    background: #f4f7fb;
    color: #172b4d;
  }

  .container {
    max-width: 760px;
    margin: auto;
  }

  .back,
  .footer-link a {
    color: #2563eb;
    font-weight: 700;
    text-decoration: none;
  }

  .heading {
    text-align: center;
    margin: 35px 0;
  }

  .eyebrow {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    font-size: clamp(26px, 5vw, 38px);
    margin: 12px 0;
  }

  .heading p {
    color: #64748b;
  }

  .result-card,
  .next-steps {
    background: white;
    border-radius: 18px;
    padding: 35px;
    margin-bottom: 22px;
    box-shadow: 0 6px 25px rgba(0,0,0,.05);
  }

  .result-card {
    text-align: center;
  }

  .score-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: 0 auto 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fef2f2;
    color: #b91c1c;
    border: 7px solid #fecaca;
  }

  .score-circle.passed {
    background: #ecfdf5;
    color: #047857;
    border-color: #a7f3d0;
  }

  .score-circle strong {
    font-size: 56px;
    line-height: 1;
  }

  .score-circle span {
    margin-top: 8px;
    font-size: 14px;
  }

  .result-card h2 {
    font-size: 25px;
  }

  .status {
    color: #64748b;
    line-height: 1.7;
  }

  .details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 30px;
  }

  .details > div,
  .support-status {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 18px;
    border-radius: 12px;
    background: #f4f7fb;
  }

  .details span,
  .support-status span {
    color: #64748b;
    font-size: 13px;
  }

  .next-steps h2 {
    margin-top: 0;
  }

  .next-steps p,
  .next-steps li {
    color: #475569;
    line-height: 1.8;
  }

  .next-steps li {
    margin-bottom: 8px;
  }

  .note {
    padding: 16px;
    border-left: 4px solid #2563eb;
    background: #eff6ff;
    border-radius: 6px;
  }

  .pending-action {
    padding: 16px;
    margin-top: 20px;
    background: #f1f5f9;
    color: #475569;
    border-radius: 10px;
    font-weight: 600;
  }

  .footer-link {
    text-align: center;
    margin-top: 30px;
  }

  @media (max-width: 600px) {
    .result-card,
    .next-steps {
      padding: 22px;
    }

    .details {
      grid-template-columns: 1fr;
    }
  }
</style>

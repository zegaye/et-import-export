
<script>
  import {
    assessmentQuestions,
    assessmentOptions
  } from '$lib/exportAssessment.js';

  let { data, form } = $props();

  /** @type {Record<string, string>} */
  let answers = $state({});

  let currentPage = $state(0);
  let submitting = $state(false);

  const questionsPerPage = 4;
  const totalPages = Math.ceil(
    assessmentQuestions.length / questionsPerPage
  );

  let currentQuestions = $derived(
    assessmentQuestions.slice(
      currentPage * questionsPerPage,
      (currentPage + 1) * questionsPerPage
    )
  );

  let answeredCount = $derived(
    assessmentQuestions.filter(
      (question) => Boolean(answers[question.id])
    ).length
  );

  let progress = $derived(
    Math.round(
      (answeredCount / assessmentQuestions.length) * 100
    )
  );

  let pageComplete = $derived(
    currentQuestions.every(
      (question) => Boolean(answers[question.id])
    )
  );

  let allComplete = $derived(
    answeredCount === assessmentQuestions.length
  );

  function nextPage() {
    if (pageComplete && currentPage < totalPages - 1) {
      currentPage += 1;
    }
  }

  function previousPage() {
    if (currentPage > 0) {
      currentPage -= 1;
    }
  }

  /** @param {SubmitEvent} event */
  function handleSubmit(event) {
    if (!data.canSubmit || !allComplete || submitting) {
      event.preventDefault();
      return;
    }

    submitting = true;
  }
</script>

<svelte:head>
  <title>Export Readiness Assessment | ET Import Export</title>
</svelte:head>

<main class="assessment">
  <div class="container">
    <a href="/dashboard" class="back">← Dashboard</a>

    <div class="heading">
      <span class="eyebrow">EXPORTER QUALIFICATION</span>
      <h1>Export Readiness Assessment</h1>
      <p>
        Complete this assessment to evaluate your business's
        readiness for international trade.
      </p>
    </div>

    {#if form?.message}
      <div class="error-message" role="alert">
        {form.message}
      </div>
    {/if}

    {#if !data.canSubmit}
      <div class="status-card">
        <h2>Assessment already submitted</h2>

        {#if data.latest}
          <p>
            Your latest assessment score:
            <strong>{data.latest.score}/100</strong>
          </p>

          {#if data.latest.status === 'passed'}
            <p>
              You passed the initial readiness assessment.
              The next step is document verification.
            </p>
          {:else}
            <p>
              Your business requires additional export
              facilitation support. Reassessment is available
              only after a team visit and authorization.
            </p>
          {/if}

          <a href="/exporter/assessment/result">
            View assessment result →
          </a>
        {/if}
      </div>
    {:else}
      <div class="progress-card">
        <div class="progress-info">
          <strong>Assessment progress</strong>
          <span>{answeredCount} of 20 answered</span>
        </div>

        <div
          class="progress-track"
          role="progressbar"
          aria-label="Assessment completion"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="progress-fill"
            style:width={`${progress}%`}
          ></div>
        </div>
      </div>

      <form method="POST" onsubmit={handleSubmit}>
        <!-- Send every answer, including previous sections -->
        <input
          type="hidden"
          name="answers"
          value={JSON.stringify(answers)}
        />

        <div class="section-heading">
          <h2>Section {currentPage + 1} of {totalPages}</h2>
          <span>{currentQuestions[0].category}</span>
        </div>

        {#each currentQuestions as question (question.id)}
          <div class="question-card">
            <h3>
              {assessmentQuestions.indexOf(question) + 1}.
              {question.question}
            </h3>

            <div class="options">
              {#each assessmentOptions as option (option.value)}
                <label
                  class:selected={
                    answers[question.id] === option.value
                  }
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={
                      answers[question.id] === option.value
                    }
                    onchange={() => {
                      answers[question.id] = option.value;
                    }}
                  />
                  {option.label}
                </label>
              {/each}
            </div>
          </div>
        {/each}

        <div class="navigation">
          <button
            type="button"
            class="secondary"
            onclick={previousPage}
            disabled={currentPage === 0 || submitting}
          >
            ← Previous
          </button>

          {#if currentPage < totalPages - 1}
            <button
              type="button"
              onclick={nextPage}
              disabled={!pageComplete || submitting}
            >
              Next →
            </button>
          {:else}
            <button
              type="submit"
              disabled={!allComplete || submitting}
            >
              {submitting
                ? 'Submitting...'
                : 'Submit Assessment →'}
            </button>
          {/if}
        </div>
      </form>
    {/if}

    <p class="notice">
      Assessment results will be reviewed under the
      ET Import Export verification process.
    </p>
  </div>
</main>

<style>
  .assessment {
    min-height: 100vh;
    background: #f4f7fb;
    padding: 40px 20px 80px;
    color: #172b4d;
  }

  .container {
    max-width: 850px;
    margin: auto;
  }

  .back {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
  }

  .heading {
    margin: 35px 0;
  }

  .eyebrow {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    font-size: clamp(28px, 5vw, 42px);
    margin: 12px 0;
  }

  .heading p {
    color: #64748b;
    line-height: 1.7;
  }

  .progress-card,
  .question-card,
  .status-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,.04);
  }

  .progress-info,
  .section-heading,
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  .progress-info span,
  .section-heading span {
    color: #64748b;
    font-size: 14px;
  }

  .progress-track {
    height: 10px;
    background: #e2e8f0;
    border-radius: 20px;
    margin-top: 18px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #2563eb;
    border-radius: 20px;
    transition: width .25s ease;
  }

  .section-heading {
    margin: 35px 0 20px;
  }

  .section-heading h2 {
    font-size: 20px;
  }

  .question-card h3 {
    font-size: 17px;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .options {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .options label {
    border: 1px solid #dbe3ee;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
    flex: 1;
    min-width: 110px;
    text-align: center;
  }

  .options label.selected {
    border-color: #2563eb;
    background: #eff6ff;
    color: #1d4ed8;
  }

  .options input {
    margin-right: 8px;
  }

  button {
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 10px;
    padding: 14px 24px;
    font-weight: 700;
    cursor: pointer;
  }

  button.secondary {
    background: #e2e8f0;
    color: #334155;
  }

  button:disabled {
    opacity: .45;
    cursor: not-allowed;
  }

  .navigation {
    margin-top: 30px;
  }

  .notice {
    color: #64748b;
    text-align: center;
    margin-top: 30px;
    font-size: 13px;
  }

  .error-message {
    padding: 16px;
    margin: 20px 0;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 10px;
    color: #b91c1c;
  }

  .status-card h2 {
    margin-top: 0;
  }

  .status-card p {
    line-height: 1.7;
    color: #475569;
  }

  .status-card a {
    color: #2563eb;
    font-weight: 700;
  }

  @media (max-width: 600px) {
    .progress-info,
    .section-heading {
      align-items: flex-start;
      flex-direction: column;
    }

    .navigation {
      flex-wrap: wrap;
    }

    .options {
      flex-direction: column;
    }

    .options label {
      min-width: 0;
    }
  }
</style>

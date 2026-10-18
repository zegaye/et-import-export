
<script>
  import {
    supplierAssessmentQuestions,
    supplierAssessmentSections
  } from '$lib/supplierAssessment.js';

  let { data, form } = $props();

  const pageSize = 4;

  let currentPage = $state(0);

  /** @type {Record<string, string>} */
  let answers = $state({});

  let submitting = $state(false);

  const totalPages = Math.ceil(
    supplierAssessmentQuestions.length / pageSize
  );

  const currentQuestions = $derived(
    supplierAssessmentQuestions.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    )
  );

  const answeredCount = $derived(
    supplierAssessmentQuestions.filter(
      (question) => Boolean(answers[question.id])
    ).length
  );

  const progress = $derived(
    Math.round(
      (answeredCount / supplierAssessmentQuestions.length) * 100
    )
  );

  const pageComplete = $derived(
    currentQuestions.every(
      (question) => Boolean(answers[question.id])
    )
  );

  const sectionTitle = $derived(
    supplierAssessmentSections.find(
      (section) => section.id === currentQuestions[0]?.section
    )?.title ?? 'Supplier Assessment'
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
</script>

<svelte:head>
  <title>International Supplier Assessment | ET Import Export</title>
  <meta
    name="description"
    content="International Supplier Readiness Assessment"
  />
</svelte:head>

<div class="assessment">
  <div class="container">
    <a href="/dashboard" class="back-link">
      ← Back to Dashboard
    </a>

    <header>
      <p class="eyebrow">ET IMPORT EXPORT</p>
      <h1>International Supplier Assessment</h1>
      <p>
        Evaluate your readiness to supply products to Ethiopian
        importers through our trade platform.
      </p>
    </header>

    {#if data.latest}
      <div class="result-card">
        <h2>Assessment Completed</h2>

        <div class="score">
          {data.latest.score}/100
        </div>

        <p>
          Status:
          <strong>
            {data.latest.status === 'passed'
              ? 'Passed'
              : 'Needs Support'}
          </strong>
        </p>

        {#if data.latest.status === 'passed'}
          <p>
            Congratulations! You passed the supplier readiness
            assessment. Business verification is a separate
            process and is still required.
          </p>
        {:else}
          <p>
            Your supplier readiness assessment indicates that
            additional guidance is needed. Our team can assist
            with the next steps.
          </p>
        {/if}

        <a href="/dashboard" class="primary-link">
          Return to Dashboard
        </a>
      </div>
    {:else}
      <div class="progress-card">
        <div class="progress-heading">
          <span>Assessment Progress</span>
          <strong>{answeredCount}/20 answered</strong>
        </div>

        <div
          class="progress-track"
          role="progressbar"
          aria-label="Assessment progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div
            class="progress-fill"
            style:width={`${progress}%`}
          ></div>
        </div>

        <p>{progress}% complete</p>
      </div>

      <div class="question-card">
        <div class="section-header">
          <span>
            Section {currentPage + 1} of {totalPages}
          </span>
          <h2>{sectionTitle}</h2>
        </div>

        {#each currentQuestions as question, index}
          <fieldset class="question">
            <legend>
              {currentPage * pageSize + index + 1}.
              {question.question}
            </legend>

            <div class="options">
              {#each question.options as option}
                <label
                  class:selected={answers[question.id] === option.value}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onchange={() => {
                      answers[question.id] = option.value;
                    }}
                  />

                  <span class="option-letter">
                    {option.value}
                  </span>

                  <span>{option.label}</span>
                </label>
              {/each}
            </div>
          </fieldset>
        {/each}

        {#if form?.message}
          <p class="error" role="alert">{form.message}</p>
        {/if}

        <div class="navigation">
          <button
            type="button"
            class="secondary"
            disabled={currentPage === 0}
            onclick={previousPage}
          >
            Previous
          </button>

          {#if currentPage < totalPages - 1}
            <button
              type="button"
              class="primary"
              disabled={!pageComplete}
              onclick={nextPage}
            >
              Next Section →
            </button>
          {:else}
            <form method="POST" onsubmit={() => {
              submitting = true;
            }}>
              <input
                type="hidden"
                name="answers"
                value={JSON.stringify(answers)}
              />

              <button
                type="submit"
                class="primary"
                disabled={answeredCount !== 20 || submitting}
              >
                {submitting
                  ? 'Submitting...'
                  : 'Submit Assessment'}
              </button>
            </form>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .assessment {
    min-height: 100vh;
    padding: 40px 20px 80px;
    background: #f4f7fb;
    color: #17233b;
    font-family: Arial, sans-serif;
  }

  .container {
    max-width: 850px;
    margin: auto;
  }

  .back-link {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
  }

  header {
    margin: 30px 0;
  }

  .eyebrow {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  h1 {
    font-size: clamp(28px, 5vw, 42px);
    margin: 10px 0;
  }

  header p {
    color: #64748b;
    line-height: 1.7;
  }

  .progress-card,
  .question-card,
  .result-card {
    background: white;
    border-radius: 18px;
    padding: 28px;
    margin-bottom: 22px;
    box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
  }

  .progress-heading {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    font-size: 14px;
  }

  .progress-track {
    height: 12px;
    background: #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #2563eb;
    transition: width 0.2s ease;
  }

  .progress-card p {
    color: #64748b;
    font-size: 13px;
  }

  .section-header {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 20px;
  }

  .section-header span {
    color: #2563eb;
    font-size: 13px;
    font-weight: 700;
  }

  .section-header h2 {
    margin: 10px 0 0;
    font-size: 23px;
  }

  .question {
    border: 0;
    padding: 24px 0;
    margin: 0;
    border-bottom: 1px solid #edf2f7;
  }

  legend {
    font-weight: 700;
    line-height: 1.6;
    padding: 0;
  }

  .options {
    display: grid;
    gap: 10px;
    margin-top: 15px;
  }

  .options label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    line-height: 1.5;
  }

  .options label.selected {
    border-color: #2563eb;
    background: #eff6ff;
  }

  .option-letter {
    font-weight: 800;
    color: #2563eb;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 25px;
  }

  button,
  .primary-link {
    border: 0;
    padding: 13px 20px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    font-size: 14px;
  }

  .primary,
  .primary-link {
    background: #2563eb;
    color: white;
    text-decoration: none;
    display: inline-block;
  }

  .secondary {
    background: #e2e8f0;
    color: #17233b;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .result-card {
    text-align: center;
  }

  .score {
    font-size: 54px;
    font-weight: 800;
    color: #2563eb;
    margin: 25px 0;
  }

  .error {
    color: #b91c1c;
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    .assessment {
      padding: 20px 12px 50px;
    }

    .progress-card,
    .question-card,
    .result-card {
      padding: 18px;
    }

    .navigation {
      flex-wrap: wrap;
    }
  }
</style>

<script>
  let { form } = $props();
</script>

<svelte:head>
  <title>Submit a Product | ET Import Export</title>
  <meta
    name="description"
    content="Submit a product listing for review by ET Import Export."
  />
</svelte:head>

<main>
  <a class="back" href="/">← Back to home</a>

  <div class="panel">
    <h1>Submit a product</h1>
    <p>
      Tell us about your product. We will review the details before discussing
      whether it can be listed on the marketplace.
    </p>

    {#if form?.success}
      <p class="note" role="status">{form.message}</p>
    {:else}
      {#if form?.message}
        <p class="note" role="alert">{form.message}</p>
      {/if}

      <form method="POST" enctype="multipart/form-data">
        <label>
          Your name or business name
          <input name="sellerName" required maxlength="100" />
        </label>

        <label>
          Phone number
          <input name="phone" type="tel" required maxlength="30" placeholder="+251..." />
        </label>

        <label>
          Product name
          <input name="productName" required maxlength="100" />
        </label>

        <label>
          Trade direction
          <select name="direction">
            <option value="export">Export from Ethiopia</option>
            <option value="import">Import into Ethiopia</option>
          </select>
        </label>

        <label>
          Category
          <input
            name="category"
            required
            maxlength="80"
            placeholder="For example: Coffee or Machinery"
          />
        </label>

        <label>
          Location or origin
          <input name="location" required maxlength="100" />
        </label>

        <label>
          Available quantity
          <input
            name="quantity"
            required
            maxlength="80"
            placeholder="For example: 5 tons or 10 units"
          />
        </label>

        <label>
          Product description
          <textarea
            name="description"
            required
            maxlength="2000"
            rows="5"
            placeholder="Describe the product, specifications, and any relevant details"
          ></textarea>
        </label>

        <button type="submit">Submit for review →</button>
        <label>
  Product photo (optional)
  <input
    name="photo"
    type="file"
    accept="image/jpeg,image/png"
  />
  <small>Choose a JPG or PNG image no larger than 2 MB.</small>
</label>
      </form>

      <p class="note">
        Your submission will be saved for review. It will not appear publicly
        until it has been approved.
      </p>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #f6f8f3;
    color: #173326;
    font-family: Arial, sans-serif;
  }

  main {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 20px 80px;
  }

  .back {
    color: #236b45;
    font-weight: 700;
    text-decoration: none;
  }

  .panel {
    margin-top: 28px;
    padding: 36px;
    background: white;
    border: 1px solid #e1e9df;
    border-radius: 18px;
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(32px, 5vw, 46px);
  }

  p {
    line-height: 1.6;
    color: #52645a;
  }

  form {
    display: grid;
    gap: 20px;
    margin-top: 30px;
  }

  label {
    display: grid;
    gap: 8px;
    font-weight: 700;
  }

  input,
  select,
  textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 13px;
    border: 1px solid #b8c9bb;
    border-radius: 9px;
    background: white;
    color: #173326;
    font: inherit;
    font-weight: 400;
  }

  textarea {
    resize: vertical;
  }

  button {
    padding: 15px 22px;
    border: 0;
    border-radius: 10px;
    background: #236b45;
    color: white;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .note {
    margin-top: 22px;
    padding: 14px;
    border-left: 4px solid #b48b35;
    background: #fff8e8;
  }

  @media (max-width: 600px) {
    .panel {
      padding: 24px;
    }
  }
</style>
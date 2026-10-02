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
		<div class="intro">
			<span>SUPPLIER SUBMISSION</span>
			<h1>Submit a product</h1>
			<p>
				Tell us about your product and business. Our team will review your
				submission before it can appear on the marketplace.
			</p>
		</div>

		{#if form?.success}
			<div class="message success" role="status">
				<strong>Submission received ✓</strong>
				<p>{form.message}</p>
				<a href="/sell">Submit another product</a>
			</div>
		{:else}
			{#if form?.message}
				<div class="message error" role="alert">
					<strong>We couldn't submit the product</strong>
					<p>{form.message}</p>
				</div>
			{/if}

			<form method="POST" enctype="multipart/form-data">
				<section class="form-section">
					<div class="section-heading">
						<span class="number">01</span>
						<div>
							<h2>Supplier information</h2>
							<p>Tell us who is submitting this product.</p>
						</div>
					</div>

					<div class="fields">
						<label>
							<span>Your name or business name *</span>
							<input
								name="sellerName"
								required
								maxlength="100"
								autocomplete="name"
								placeholder="Example: Abebe Coffee Export PLC"
							/>
						</label>

						<label>
							<span>Phone number *</span>
							<input
								name="phone"
								type="tel"
								required
								maxlength="30"
								autocomplete="tel"
								placeholder="+251 9..."
							/>
							<small>Include your country code when possible.</small>
						</label>
					</div>
				</section>

				<section class="form-section">
					<div class="section-heading">
						<span class="number">02</span>
						<div>
							<h2>Product information</h2>
							<p>Provide the main details buyers need to understand your offer.</p>
						</div>
					</div>

					<div class="fields">
						<label>
							<span>Product name *</span>
							<input
								name="productName"
								required
								maxlength="100"
								placeholder="Example: Ethiopian Arabica Coffee"
							/>
						</label>

						<label>
							<span>Trade direction *</span>
							<select name="direction" required>
								<option value="export">Export from Ethiopia</option>
								<option value="import">Import into Ethiopia</option>
							</select>
						</label>

						<label>
							<span>Category *</span>
							<input
								name="category"
								required
								maxlength="80"
								placeholder="Example: Coffee, Machinery, Textiles"
							/>
						</label>

						<label>
							<span>Location or origin *</span>
							<input
								name="location"
								required
								maxlength="100"
								placeholder="Example: Jimma, Ethiopia"
							/>
						</label>

						<label>
							<span>Available quantity *</span>
							<input
								name="quantity"
								required
								maxlength="80"
								placeholder="Example: 5 tons or 100 units"
							/>
						</label>

						<label class="full">
							<span>Product description *</span>
							<textarea
								name="description"
								required
								maxlength="2000"
								rows="6"
								placeholder="Describe the product, specifications, quality, packaging, available quantity and other useful information."
							></textarea>
							<small>Maximum 2,000 characters.</small>
						</label>
					</div>
				</section>

				<section class="form-section">
					<div class="section-heading">
						<span class="number">03</span>
						<div>
							<h2>Product photo</h2>
							<p>Add a clear image to help us review your product.</p>
						</div>
					</div>

					<label class="upload">
						<span>Product photo <em>Optional</em></span>

						<input
							name="photo"
							type="file"
							accept="image/jpeg,image/png"
						/>

						<small>JPG or PNG only. Maximum file size: 2 MB.</small>
					</label>
				</section>

				<div class="review-note">
					<strong>What happens next?</strong>
					<p>
						Your submission will be sent to our team for review. It will
						not appear publicly on the marketplace until it has been approved.
					</p>
				</div>

				<button type="submit">
					Submit product for review →
				</button>
			</form>
		{/if}
	</div>
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		background: #f6f8f3;
		color: #173326;
		font-family: Arial, Helvetica, sans-serif;
	}

	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 40px 20px 90px;
	}

	.back {
		display: inline-block;
		color: #236b45;
		font-weight: 700;
		text-decoration: none;
	}

	.back:hover {
		text-decoration: underline;
	}

	.panel {
		margin-top: 28px;
		overflow: hidden;
		border: 1px solid #e1e9df;
		border-radius: 20px;
		background: white;
	}

	.intro {
		padding: 42px 42px 36px;
		border-bottom: 1px solid #e8eee7;
		background: linear-gradient(135deg, #f8fbf6, #ffffff);
	}

	.intro > span {
		color: #16825e;
		font-size: 12px;
		font-weight: 800;
		letter-spacing: 1.8px;
	}

	h1 {
		margin: 12px 0;
		font-size: clamp(34px, 5vw, 48px);
		line-height: 1.1;
	}

	.intro p {
		max-width: 650px;
		margin: 0;
		color: #5c6c63;
		line-height: 1.7;
	}

	form {
		padding: 10px 42px 42px;
	}

	.form-section {
		padding: 32px 0;
		border-bottom: 1px solid #e8eee7;
	}

	.section-heading {
		display: flex;
		gap: 15px;
		align-items: flex-start;
		margin-bottom: 24px;
	}

	.number {
		display: grid;
		flex: 0 0 42px;
		width: 42px;
		height: 42px;
		place-items: center;
		border-radius: 50%;
		background: #e8f3ec;
		color: #236b45;
		font-size: 13px;
		font-weight: 800;
	}

	h2 {
		margin: 0 0 5px;
		font-size: 21px;
	}

	.section-heading p {
		margin: 0;
		color: #718078;
		font-size: 14px;
		line-height: 1.5;
	}

	.fields {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px;
	}

	label {
		display: grid;
		gap: 8px;
		color: #274438;
		font-size: 14px;
		font-weight: 700;
	}

	label.full {
		grid-column: 1 / -1;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 14px;
		border: 1px solid #b8c9bb;
		border-radius: 9px;
		outline: none;
		background: white;
		color: #173326;
		font: inherit;
		font-weight: 400;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	input:focus,
	select:focus,
	textarea:focus {
		border-color: #2c7b53;
		box-shadow: 0 0 0 3px rgba(44, 123, 83, 0.12);
	}

	textarea {
		min-height: 140px;
		resize: vertical;
	}

	small {
		color: #78857e;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
	}

	.upload {
		padding: 20px;
		border: 1px dashed #9db5a2;
		border-radius: 12px;
		background: #fafcf9;
	}

	.upload em {
		margin-left: 6px;
		color: #7a897f;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
	}

	.upload input {
		padding: 11px;
		background: white;
	}

	.review-note {
		margin: 30px 0 22px;
		padding: 18px 20px;
		border-left: 4px solid #b48b35;
		border-radius: 5px;
		background: #fff8e8;
	}

	.review-note strong {
		color: #624a17;
	}

	.review-note p {
		margin: 7px 0 0;
		color: #6b6046;
		font-size: 14px;
		line-height: 1.6;
	}

	button {
		width: 100%;
		padding: 16px 22px;
		border: 0;
		border-radius: 10px;
		background: #236b45;
		color: white;
		font: inherit;
		font-weight: 800;
		cursor: pointer;
		transition:
			transform 0.15s ease,
			background 0.15s ease;
	}

	button:hover {
		background: #195d3a;
	}

	button:active {
		transform: translateY(1px);
	}

	.message {
		margin: 35px 42px;
		padding: 20px;
		border-radius: 10px;
	}

	.message strong {
		display: block;
		margin-bottom: 6px;
	}

	.message p {
		margin: 0;
		line-height: 1.6;
	}

	.message.success {
		border: 1px solid #b9ddc4;
		background: #eef9f1;
		color: #205d37;
	}

	.message.error {
		border: 1px solid #ebc6bd;
		background: #fff3f0;
		color: #8a3828;
	}

	.message.success a {
		display: inline-block;
		margin-top: 14px;
		color: #205d37;
		font-weight: 800;
	}

	@media (max-width: 650px) {
		main {
			padding: 25px 14px 60px;
		}

		.intro {
			padding: 30px 24px;
		}

		form {
			padding: 5px 24px 30px;
		}

		.fields {
			grid-template-columns: 1fr;
		}

		label.full {
			grid-column: auto;
		}

		.message {
			margin: 25px 24px;
		}
	}
</style>
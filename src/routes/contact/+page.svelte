<svelte:head>
	<title>Contact Us | 4KAZ Marketplace</title>
	<meta
		name="description"
		content="Contact 4KAZ Marketplace for buying, selling and marketplace support."
	/>
</svelte:head>

<div class="page">

	<!-- HEADER -->
	<section class="intro">
		<div class="badge">SUPPORT CENTER</div>

		<h1>Get in Touch</h1>

		<p>
			We'd love to hear from you! Have a question about buying,
			selling or using 4KAZ Marketplace? Contact our team today.
		</p>
	</section>


	<!-- MAIN CONTACT AREA -->
	<section class="contact-container">

		<!-- LEFT: FORM -->
		<div class="form-card">

			<h2>Send a Message</h2>

			<p class="subtitle">
				Send us your question and our team will get back to you.
			</p>

			<form>

				<div class="form-grid">

					<div class="field">
						<label for="name">Full Name</label>

						<input
							id="name"
							type="text"
							placeholder="Your name"
						/>
					</div>


					<div class="field">
						<label for="email">Email Address</label>

						<input
							id="email"
							type="email"
							placeholder="your@email.com"
						/>
					</div>


					<div class="field">
						<label for="phone">Phone Number</label>

						<input
							id="phone"
							type="tel"
							placeholder="+251..."
						/>
					</div>


					<div class="field">
						<label for="subject">Subject</label>

						<select id="subject">
							<option value="">
								Select a subject
							</option>

							<option value="buy">
								Buying Inquiry
							</option>

							<option value="sell">
								Selling Inquiry
							</option>

							<option value="listing">
								Listing Support
							</option>

							<option value="account">
								Account Support
							</option>

							<option value="other">
								Other
							</option>
						</select>
					</div>

				</div>


				<div class="field message-field">

					<label for="message">Message</label>

					<textarea
						id="message"
						rows="6"
						placeholder="Tell us how we can help..."
					></textarea>

				</div>


				<button type="submit">
					<span>✈</span>
					Submit Inquiry
				</button>

			</form>

		</div>


		<!-- RIGHT SIDE -->
		<div class="right-column">

			<!-- CONTACT INFORMATION -->
			<div class="info-card">

				<h2>Contact Information</h2>

				<a
					class="contact-box"
					href="tel:+251911377969"
				>
					<div class="icon-box">
						☎
					</div>

					<div>
						<span>Direct Call</span>

						<strong>
							+251 911 377 969
						</strong>
					</div>
				</a>


				<a
					class="contact-box"
					href="tel:+251939910448"
				>
					<div class="icon-box">
						☎
					</div>

					<div>
						<span>Alternative Number</span>

						<strong>
							+251 939 910 448
						</strong>
					</div>
				</a>


				<div class="contact-box">

					<div class="icon-box">
						⌖
					</div>

					<div>
						<span>Location</span>

						<strong>
							Addis Ababa, Ethiopia
						</strong>
					</div>

				</div>

			</div>


			<!-- FOLLOW US -->
			<div class="social-card">

				<h2>Follow Us</h2>

				<p>
					Stay updated with the latest listings,
					new products and marketplace updates.
				</p>


				<div class="social-grid">

					<a href="tel:+251911377969">
						<span>☎</span>
						<strong>Phone</strong>
					</a>


					<a href="/">
						<span>◎</span>
						<strong>Instagram</strong>
					</a>


					<a href="/">
						<span>f</span>
						<strong>Facebook</strong>
					</a>


					<a href="/">
						<span>▶</span>
						<strong>Telegram</strong>
					</a>

				</div>

			</div>

		</div>

	</section>


	<!-- HELP SECTION -->
	<section class="help">

		<div>
			<span class="small">NEED HELP?</span>

			<h2>
				We're here when
				<span>you need us.</span>
			</h2>
		</div>


		<a href="tel:+251911377969">
			Call Support
			<span>→</span>
		</a>

	</section>


	<footer>

		<div class="footer-logo">
			<span>4</span>KAZ
		</div>

		<p>
			Your marketplace. Your choice.
		</p>

		<a href="/">
			Back to Marketplace →
		</a>

	</footer>

</div>


<style>

	/* ===============================
	   GLOBAL
	================================ */

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;

		font-family:
			Arial,
			Helvetica,
			sans-serif;

		background: #07101f;

		color: #f8fafc;
	}

	.page {
		min-height: 100vh;

		background:
			radial-gradient(
				circle at 50% 0%,
				rgba(140, 198, 63, 0.06),
				transparent 30%
			),
			#07101f;
	}


	/* ===============================
	   INTRO
	================================ */

	.intro {

		max-width: 900px;

		margin: auto;

		padding:
			90px
			25px
			65px;

		text-align: center;
	}


	.badge {

		display: inline-block;

		padding: 8px 17px;

		margin-bottom: 20px;

		border:
			1px solid rgba(140, 198, 63, 0.3);

		border-radius: 30px;

		background:
			rgba(140, 198, 63, 0.08);

		color: #8cc63f;

		font-size: 11px;

		font-weight: 800;

		letter-spacing: 2px;
	}


	.intro h1 {

		margin:
			0
			0
			15px;

		font-size:
			clamp(45px, 6vw, 68px);

		letter-spacing: -3px;
	}


	.intro > p {

		max-width: 700px;

		margin: auto;

		color: #9aa9bc;

		font-size: 17px;

		line-height: 1.6;
	}


	/* ===============================
	   CONTACT LAYOUT
	================================ */

	.contact-container {

		width: min(1200px, 92%);

		margin: auto;

		padding-bottom: 100px;

		display: grid;

		grid-template-columns:
			minmax(0, 2fr)
			minmax(300px, 1fr);

		gap: 30px;

		align-items: start;
	}


	/* ===============================
	   CARDS
	================================ */

	.form-card,
	.info-card,
	.social-card {

		border:
			1px solid #243247;

		border-radius: 14px;

		background:
			rgba(7, 16, 31, 0.85);
	}


	.form-card {

		padding: 35px;
	}


	.form-card h2,
	.info-card h2,
	.social-card h2 {

		margin:
			0
			0
			8px;

		font-size: 24px;
	}


	.subtitle {

		margin:
			0
			0
			35px;

		color: #91a0b5;

		font-size: 14px;
	}


	/* ===============================
	   FORM
	================================ */

	.form-grid {

		display: grid;

		grid-template-columns:
			1fr
			1fr;

		gap:
			25px
			22px;
	}


	.field label {

		display: block;

		margin-bottom: 10px;

		font-size: 13px;

		font-weight: 700;

		color: #e2e8f0;
	}


	input,
	select,
	textarea {

		width: 100%;

		padding:
			14px
			15px;

		border:
			1px solid #33445d;

		border-radius: 7px;

		outline: none;

		background: #111d30;

		color: white;

		font: inherit;

		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}


	input::placeholder,
	textarea::placeholder {

		color: #7d8da3;
	}


	input:focus,
	select:focus,
	textarea:focus {

		border-color: #8cc63f;

		box-shadow:
			0 0 0 3px
			rgba(140, 198, 63, 0.1);
	}


	select option {

		background: #111d30;

		color: white;
	}


	.message-field {

		margin-top: 25px;
	}


	textarea {

		resize: vertical;

		min-height: 150px;
	}


	button {

		width: 100%;

		margin-top: 22px;

		padding: 15px;

		border: none;

		border-radius: 6px;

		background: #8cc63f;

		color: #07101f;

		font-size: 14px;

		font-weight: 800;

		cursor: pointer;

		transition:
			transform 0.2s,
			background 0.2s;
	}


	button span {

		margin-right: 8px;
	}


	button:hover {

		background: #9ed850;

		transform: translateY(-2px);
	}


	/* ===============================
	   RIGHT COLUMN
	================================ */

	.right-column {

		display: flex;

		flex-direction: column;

		gap: 25px;
	}


	.info-card,
	.social-card {

		padding: 28px;
	}


	.info-card h2 {

		margin-bottom: 25px;
	}


	.contact-box {

		padding: 15px;

		margin-top: 12px;

		border:
			1px solid #172941;

		border-radius: 9px;

		background: #0d192b;

		display: flex;

		align-items: center;

		gap: 14px;

		text-decoration: none;

		color: white;

		transition:
			border-color 0.2s,
			transform 0.2s;
	}


	a.contact-box:hover {

		border-color: #8cc63f;

		transform: translateX(3px);
	}


	.icon-box {

		width: 43px;

		height: 43px;

		flex-shrink: 0;

		display: flex;

		align-items: center;

		justify-content: center;

		border-radius: 7px;

		background:
			rgba(140, 198, 63, 0.1);

		color: #8cc63f;

		font-size: 19px;
	}


	.contact-box span {

		display: block;

		margin-bottom: 5px;

		color: #8fa0b7;

		font-size: 11px;
	}


	.contact-box strong {

		display: block;

		font-size: 14px;
	}


	/* ===============================
	   SOCIAL
	================================ */

	.social-card > p {

		color: #91a0b5;

		font-size: 14px;

		line-height: 1.5;
	}


	.social-grid {

		margin-top: 22px;

		display: grid;

		grid-template-columns:
			1fr
			1fr;

		gap: 12px;
	}


	.social-grid a {

		min-height: 95px;

		padding: 15px;

		border:
			1px solid #172941;

		border-radius: 9px;

		background: #0d192b;

		display: flex;

		flex-direction: column;

		align-items: center;

		justify-content: center;

		gap: 10px;

		color: white;

		text-decoration: none;

		transition:
			transform 0.2s,
			border-color 0.2s;
	}


	.social-grid a:hover {

		border-color: #8cc63f;

		transform: translateY(-3px);
	}


	.social-grid span {

		color: #8cc63f;

		font-size: 22px;
	}


	.social-grid strong {

		font-size: 12px;
	}


	/* ===============================
	   HELP CTA
	================================ */

	.help {

		width: min(1200px, 92%);

		margin:
			20px
			auto
			100px;

		padding: 60px;

		border-radius: 15px;

		background: #8cc63f;

		color: #07101f;

		display: flex;

		align-items: center;

		justify-content: space-between;

		gap: 30px;
	}


	.small {

		font-size: 11px;

		font-weight: 900;

		letter-spacing: 3px;
	}


	.help h2 {

		margin:
			10px
			0
			0;

		font-size:
			clamp(35px, 5vw, 55px);

		letter-spacing: -3px;
	}


	.help h2 span {

		color: white;
	}


	.help > a {

		flex-shrink: 0;

		padding:
			18px
			25px;

		background: #07101f;

		color: white;

		border-radius: 7px;

		text-decoration: none;

		font-weight: 700;
	}


	.help > a span {

		margin-left: 20px;
	}


	/* ===============================
	   FOOTER
	================================ */

	footer {

		padding:
			40px
			5%;

		border-top:
			1px solid #1d2a3d;

		display: flex;

		align-items: center;

		justify-content: space-between;

		gap: 30px;

		color: #8291a5;
	}


	.footer-logo {

		color: white;

		font-size: 28px;

		font-weight: 950;
	}


	.footer-logo span {

		color: #8cc63f;
	}


	footer p {

		font-size: 12px;
	}


	footer a {

		color: #8cc63f;

		text-decoration: none;

		font-size: 12px;

		font-weight: 700;
	}


	/* ===============================
	   RESPONSIVE
	================================ */

	@media (max-width: 850px) {

		.contact-container {

			grid-template-columns: 1fr;
		}


		.help {

			align-items: flex-start;

			flex-direction: column;
		}
	}


	@media (max-width: 600px) {

		.intro {

			padding-top: 60px;
		}


		.form-card,
		.info-card,
		.social-card {

			padding: 22px;
		}


		.form-grid {

			grid-template-columns: 1fr;
		}


		.help {

			padding:
				40px
				25px;
		}


		footer {

			align-items: flex-start;

			flex-direction: column;
		}
	}

</style>
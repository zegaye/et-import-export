<svelte:head>
	<title>About 4KAZ Marketplace</title>
	<meta
		name="description"
		content="4KAZ is a modern marketplace for buying and selling cars, phones, electronics and more."
	/>
</svelte:head>

<div class="about-page">

	<!-- ================= HERO ================= -->

	<section class="hero">
		<div class="hero-top">
			<p>ABOUT 4KAZ</p>

			<span>
				Marketplace / Ethiopia
			</span>
		</div>

		<div class="hero-title">
			<h1>
				ONE PLACE.
				<br />
				<span>ENDLESS</span>
				<br />
				POSSIBILITIES.
			</h1>
		</div>

		<div class="hero-bottom">
			<div class="hero-description">
				<div class="green-line"></div>

				<p>
					4KAZ is a marketplace built to make buying
					and selling simple, fast and accessible.
				</p>
			</div>

			<div class="scroll">
				<span>SCROLL TO DISCOVER</span>
				<div class="arrow">↓</div>
			</div>
		</div>
	</section>


	<!-- ================= MARQUEE ================= -->

	<section class="ticker">
		<div>
			<span>BUY</span>
			<b>✦</b>
			<span>SELL</span>
			<b>✦</b>
			<span>DISCOVER</span>
			<b>✦</b>
			<span>CONNECT</span>
			<b>✦</b>
			<span>4KAZ</span>
		</div>
	</section>


	<!-- ================= INTRO ================= -->

	<section class="intro">

		<div class="intro-number">
			01
		</div>

		<div class="intro-content">

			<p class="small-title">
				WHY WE EXIST
			</p>

			<h2>
				Buying and selling
				shouldn't be
				<span>complicated.</span>
			</h2>

			<div class="intro-text">

				<p>
					Finding the right product should be easy.
					Selling something you no longer need should
					be just as simple.
				</p>

				<p>
					That's why we're building 4KAZ — one digital
					marketplace where people can discover products,
					compare options and connect with sellers.
				</p>

			</div>

		</div>

	</section>


	<!-- ================= CATEGORIES ================= -->

	<section class="categories">

		<div class="categories-header">

			<div>
				<p>WHAT YOU CAN FIND</p>

				<h2>
					A marketplace
					<br />
					for <span>everything.</span>
				</h2>
			</div>

			<p class="category-description">
				From your next car to your next phone,
				4KAZ brings different markets together
				under one digital roof.
			</p>

		</div>


		<div class="category-grid">

			<a href="/cars" class="category big">

				<div class="category-top">
					<span>01</span>
					<span>EXPLORE ↗</span>
				</div>

				<div>
					<div class="category-icon">◉</div>
					<h3>CARS</h3>
				</div>

			</a>


			<div class="category">

				<div class="category-top">
					<span>02</span>
					<span>COMING SOON</span>
				</div>

				<div>
					<div class="category-icon">▯</div>
					<h3>PHONES</h3>
				</div>

			</div>


			<div class="category light">

				<div class="category-top">
					<span>03</span>
					<span>COMING SOON</span>
				</div>

				<div>
					<div class="category-icon">⌁</div>
					<h3>ELECTRONICS</h3>
				</div>

			</div>


			<div class="category green">

				<div class="category-top">
					<span>04</span>
					<span>MORE TO COME</span>
				</div>

				<div>
					<div class="category-icon">＋</div>
					<h3>MORE</h3>
				</div>

			</div>

		</div>

	</section>


	<!-- ================= PHILOSOPHY ================= -->

	<section class="philosophy">

		<div class="philosophy-left">

			<p>
				OUR PHILOSOPHY
			</p>

			<div class="giant-number">
				4
			</div>

		</div>


		<div class="philosophy-right">

			<h2>
				FOUR PRINCIPLES.
				<br />
				ONE MARKETPLACE.
			</h2>


			<div class="principle">

				<span>01</span>

				<div>
					<h3>Simple.</h3>

					<p>
						No unnecessary complexity.
						Find what you need quickly.
					</p>
				</div>

			</div>


			<div class="principle">

				<span>02</span>

				<div>
					<h3>Accessible.</h3>

					<p>
						A marketplace designed for
						everyday buyers and sellers.
					</p>
				</div>

			</div>


			<div class="principle">

				<span>03</span>

				<div>
					<h3>Connected.</h3>

					<p>
						Bringing buyers, sellers
						and opportunities together.
					</p>
				</div>

			</div>


			<div class="principle">

				<span>04</span>

				<div>
					<h3>Growing.</h3>

					<p>
						Starting with today's categories
						and building tomorrow's marketplace.
					</p>
				</div>

			</div>

		</div>

	</section>


	<!-- ================= MANIFESTO ================= -->

	<section class="manifesto">

		<p>THIS IS ONLY THE BEGINNING.</p>

		<h2>
			We're building the place
			<br />
			where Ethiopia
			<span>buys & sells.</span>
		</h2>

	</section>


	<!-- ================= CTA ================= -->

	<section class="cta">

		<div class="cta-number">
			04KAZ
		</div>

		<div class="cta-content">

			<p>READY TO EXPLORE?</p>

			<h2>
				FIND IT.
				<br />
				BUY IT.
				<br />
				<span>SELL IT.</span>
			</h2>

			<div class="cta-buttons">

				<a href="/" class="explore">
					EXPLORE MARKETPLACE
					<span>→</span>
				</a>

				<a href="/cars" class="browse">
					BROWSE CARS
				</a>

			</div>

		</div>

	</section>


	<!-- ================= FOOTER ================= -->

	<footer>

		<strong>4KAZ</strong>

		<p>
			BUY. SELL. DISCOVER.
		</p>

		<span>
			© 2026 4KAZ Marketplace
		</span>

	</footer>

</div>


<style>

	/* =========================
	   GLOBAL
	========================= */

	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		background: #f1f1ed;
		font-family:
			Arial,
			Helvetica,
			sans-serif;
		color: #111;
	}

	.about-page {
		width: 100%;
		overflow: hidden;
	}


	/* =========================
	   HERO
	========================= */

	.hero {

		min-height: 100vh;

		padding:
			50px
			clamp(25px, 6vw, 100px)
			60px;

		background: #f1f1ed;

		display: flex;

		flex-direction: column;

		justify-content: space-between;
	}


	.hero-top {

		display: flex;

		justify-content: space-between;

		align-items: center;

		padding-bottom: 25px;

		border-bottom: 1px solid #bbb;
	}


	.hero-top p {

		margin: 0;

		font-weight: 900;

		font-size: 13px;

		letter-spacing: 4px;
	}


	.hero-top span {

		font-size: 13px;

		color: #777;
	}


	.hero-title {

		padding: 50px 0;
	}


	.hero-title h1 {

		margin: 0;

		font-size:
			clamp(70px, 11vw, 180px);

		line-height: 0.78;

		letter-spacing: -10px;

		font-weight: 950;
	}


	.hero-title h1 span {

		color: #8cc63f;
	}


	.hero-bottom {

		display: flex;

		justify-content: space-between;

		align-items: flex-end;

		gap: 40px;
	}


	.hero-description {

		display: flex;

		align-items: flex-start;

		gap: 20px;

		max-width: 550px;
	}


	.green-line {

		width: 70px;

		height: 5px;

		background: #8cc63f;

		flex-shrink: 0;

		margin-top: 10px;
	}


	.hero-description p {

		margin: 0;

		font-size: 19px;

		line-height: 1.6;

		color: #555;
	}


	.scroll {

		display: flex;

		align-items: center;

		gap: 20px;

		font-size: 11px;

		font-weight: 800;

		letter-spacing: 2px;
	}


	.arrow {

		width: 55px;

		height: 55px;

		border: 1px solid #222;

		border-radius: 50%;

		display: flex;

		align-items: center;

		justify-content: center;

		font-size: 20px;
	}


	/* =========================
	   TICKER
	========================= */

	.ticker {

		width: 100%;

		overflow: hidden;

		background: #8cc63f;

		padding: 25px 0;
	}


	.ticker div {

		display: flex;

		justify-content: space-around;

		align-items: center;

		gap: 35px;

		white-space: nowrap;
	}


	.ticker span {

		font-size: 22px;

		font-weight: 950;

		letter-spacing: 2px;
	}


	.ticker b {

		font-size: 20px;
	}


	/* =========================
	   INTRO
	========================= */

	.intro {

		padding:
			150px
			clamp(25px, 7vw, 120px);

		display: grid;

		grid-template-columns:
			0.25fr
			1fr;

		gap: 70px;

		background: white;
	}


	.intro-number {

		font-size: 20px;

		font-weight: bold;

		color: #8cc63f;
	}


	.small-title {

		font-size: 12px;

		font-weight: 900;

		letter-spacing: 4px;

		color: #777;
	}


	.intro h2 {

		max-width: 1000px;

		margin:
			20px
			0
			70px;

		font-size:
			clamp(50px, 7vw, 105px);

		line-height: 0.95;

		letter-spacing: -6px;
	}


	.intro h2 span {

		color: #8cc63f;
	}


	.intro-text {

		max-width: 750px;

		margin-left: auto;

		display: grid;

		grid-template-columns: 1fr 1fr;

		gap: 50px;
	}


	.intro-text p {

		margin: 0;

		font-size: 17px;

		line-height: 1.8;

		color: #666;
	}


	/* =========================
	   CATEGORIES
	========================= */

	.categories {

		padding:
			130px
			clamp(25px, 6vw, 100px);

		background: #111;
		color: white;
	}


	.categories-header {

		display: flex;

		align-items: flex-end;

		justify-content: space-between;

		gap: 50px;

		margin-bottom: 80px;
	}


	.categories-header > div > p {

		color: #8cc63f;

		font-size: 12px;

		font-weight: bold;

		letter-spacing: 4px;
	}


	.categories-header h2 {

		margin: 15px 0 0;

		font-size:
			clamp(50px, 6vw, 90px);

		line-height: 0.95;

		letter-spacing: -5px;
	}


	.categories-header h2 span {

		color: #8cc63f;
	}


	.category-description {

		max-width: 400px;

		font-size: 17px;

		line-height: 1.7;

		color: #999;
	}


	.category-grid {

		display: grid;

		grid-template-columns:
			1.4fr
			1fr;

		grid-template-rows:
			350px
			350px;

		gap: 15px;
	}


	.category {

		padding: 35px;

		background: #202020;

		color: white;

		text-decoration: none;

		display: flex;

		flex-direction: column;

		justify-content: space-between;

		transition: 0.3s;
	}


	.category:hover {

		transform: scale(0.98);

		background: #292929;
	}


	.category.big {

		grid-row: span 2;

		background: #292929;
	}


	.category.light {

		background: #e7e7e2;

		color: #111;
	}


	.category.green {

		background: #8cc63f;

		color: #111;
	}


	.category-top {

		display: flex;

		justify-content: space-between;

		font-size: 11px;

		font-weight: bold;

		letter-spacing: 2px;
	}


	.category-icon {

		font-size: 60px;

		margin-bottom: 15px;
	}


	.category h3 {

		margin: 0;

		font-size:
			clamp(40px, 5vw, 80px);

		letter-spacing: -4px;
	}


	/* =========================
	   PHILOSOPHY
	========================= */

	.philosophy {

		padding:
			150px
			clamp(25px, 7vw, 120px);

		display: grid;

		grid-template-columns:
			0.8fr
			1.2fr;

		gap: 100px;

		background: #f1f1ed;
	}


	.philosophy-left > p {

		font-size: 12px;

		font-weight: bold;

		letter-spacing: 4px;
	}


	.giant-number {

		font-size:
			clamp(250px, 35vw, 550px);

		font-weight: 950;

		line-height: 0.8;

		color: #8cc63f;

		letter-spacing: -30px;
	}


	.philosophy-right h2 {

		font-size:
			clamp(45px, 5vw, 75px);

		line-height: 0.95;

		letter-spacing: -4px;

		margin:
			0
			0
			70px;
	}


	.principle {

		padding: 30px 0;

		border-top: 1px solid #aaa;

		display: grid;

		grid-template-columns:
			70px
			1fr;

		gap: 30px;
	}


	.principle > span {

		color: #8cc63f;

		font-weight: bold;
	}


	.principle h3 {

		margin: 0 0 10px;

		font-size: 30px;
	}


	.principle p {

		margin: 0;

		color: #666;

		line-height: 1.6;
	}


	/* =========================
	   MANIFESTO
	========================= */

	.manifesto {

		padding:
			160px
			clamp(25px, 7vw, 120px);

		background: #8cc63f;

		color: #111;
	}


	.manifesto p {

		font-size: 12px;

		font-weight: 900;

		letter-spacing: 4px;
	}


	.manifesto h2 {

		margin: 25px 0 0;

		font-size:
			clamp(55px, 8vw, 125px);

		line-height: 0.9;

		letter-spacing: -7px;
	}


	.manifesto h2 span {

		color: white;
	}


	/* =========================
	   CTA
	========================= */

	.cta {

		min-height: 750px;

		padding:
			100px
			clamp(25px, 7vw, 120px);

		background: #111;

		color: white;

		position: relative;

		overflow: hidden;

		display: flex;

		align-items: center;
	}


	.cta-number {

		position: absolute;

		right: -30px;

		bottom: -60px;

		font-size:
			clamp(180px, 28vw, 500px);

		font-weight: 950;

		color: #181818;

		letter-spacing: -25px;
	}


	.cta-content {

		position: relative;

		z-index: 2;
	}


	.cta-content > p {

		color: #8cc63f;

		font-size: 12px;

		font-weight: bold;

		letter-spacing: 4px;
	}


	.cta h2 {

		margin: 25px 0 50px;

		font-size:
			clamp(60px, 9vw, 140px);

		line-height: 0.8;

		letter-spacing: -8px;
	}


	.cta h2 span {

		color: #8cc63f;
	}


	.cta-buttons {

		display: flex;

		gap: 15px;
	}


	.explore,
	.browse {

		padding: 20px 25px;

		text-decoration: none;

		font-size: 12px;

		font-weight: 900;

		letter-spacing: 1px;
	}


	.explore {

		background: #8cc63f;

		color: #111;
	}


	.explore span {

		margin-left: 30px;
	}


	.browse {

		border: 1px solid #555;

		color: white;
	}


	/* =========================
	   FOOTER
	========================= */

	footer {

		padding:
			50px
			clamp(25px, 6vw, 100px);

		background: #080808;

		color: white;

		display: flex;

		align-items: center;

		justify-content: space-between;

		border-top: 1px solid #222;
	}


	footer strong {

		font-size: 32px;
	}


	footer p {

		font-size: 11px;

		font-weight: bold;

		letter-spacing: 3px;

		color: #8cc63f;
	}


	footer span {

		font-size: 12px;

		color: #666;
	}


	/* =========================
	   TABLET
	========================= */

	@media (max-width: 900px) {

		.hero-title h1 {
			letter-spacing: -6px;
		}

		.intro {
			grid-template-columns: 1fr;
		}

		.intro-text {
			margin: 0;
		}

		.categories-header {
			align-items: flex-start;
			flex-direction: column;
		}

		.category-grid {

			grid-template-columns: 1fr;

			grid-template-rows: auto;
		}

		.category,
		.category.big {

			grid-row: auto;

			min-height: 350px;
		}

		.philosophy {

			grid-template-columns: 1fr;
		}

		.giant-number {

			font-size: 300px;
		}

		footer {

			gap: 30px;

			flex-direction: column;

			align-items: flex-start;
		}
	}


	/* =========================
	   MOBILE
	========================= */

	@media (max-width: 550px) {

		.hero {
			min-height: 800px;
		}

		.hero-title h1 {

			font-size: 65px;

			letter-spacing: -5px;
		}

		.hero-bottom {

			align-items: flex-start;

			flex-direction: column;
		}

		.scroll {
			display: none;
		}

		.ticker div {
			gap: 15px;
		}

		.ticker span {
			font-size: 15px;
		}

		.intro h2 {

			font-size: 50px;

			letter-spacing: -4px;
		}

		.intro-text {

			grid-template-columns: 1fr;
		}

		.categories-header h2 {

			font-size: 50px;

			letter-spacing: -3px;
		}

		.category {

			min-height: 280px;
		}

		.philosophy {

			gap: 30px;
		}

		.giant-number {

			font-size: 220px;

			letter-spacing: -15px;
		}

		.principle {

			grid-template-columns:
				40px
				1fr;
		}

		.manifesto h2 {

			font-size: 55px;

			letter-spacing: -4px;
		}

		.cta {

			min-height: 650px;
		}

		.cta h2 {

			font-size: 65px;

			letter-spacing: -5px;
		}

		.cta-buttons {

			align-items: flex-start;

			flex-direction: column;
		}
	}

</style>
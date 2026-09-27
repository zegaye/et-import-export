<script>
	let search = $state('');

	const cars = [
		{
			id: 1,
			name: 'Toyota Corolla',
			price: '2,850,000 ETB',
			year: 2022,
			mileage: '34,000 km',
			transmission: 'Automatic',
			fuel: 'Petrol',
			location: 'Addis Ababa',
			image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80'
		},
		{
			id: 2,
			name: 'Hyundai Tucson',
			price: '4,200,000 ETB',
			year: 2023,
			mileage: '18,500 km',
			transmission: 'Automatic',
			fuel: 'Petrol',
			location: 'Addis Ababa',
			image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80'
		},
		{
			id: 3,
			name: 'Toyota Land Cruiser',
			price: '9,500,000 ETB',
			year: 2021,
			mileage: '42,000 km',
			transmission: 'Automatic',
			fuel: 'Diesel',
			location: 'Addis Ababa',
			image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80'
		},
		{
			id: 4,
			name: 'Kia Sportage',
			price: '3,950,000 ETB',
			year: 2022,
			mileage: '27,000 km',
			transmission: 'Automatic',
			fuel: 'Petrol',
			location: 'Addis Ababa',
			image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80'
		},
		{
			id: 5,
			name: 'Toyota RAV4',
			price: '5,400,000 ETB',
			year: 2023,
			mileage: '15,000 km',
			transmission: 'Automatic',
			fuel: 'Hybrid',
			location: 'Addis Ababa',
			image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
		},
		{
			id: 6,
			name: 'Mercedes-Benz C-Class',
			price: '7,800,000 ETB',
			year: 2021,
			mileage: '39,000 km',
			transmission: 'Automatic',
			fuel: 'Petrol',
			location: 'Addis Ababa',
			image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80'
		}
	];

	let filteredCars = $state(cars);

	function searchCars() {
		filteredCars = cars.filter((car) =>
			car.name.toLowerCase().includes(search.toLowerCase())
		);
	}
</script>

<svelte:head>
	<title>Cars | 4KAZ Marketplace</title>
	<meta
		name="description"
		content="Browse cars for sale on 4KAZ Marketplace."
	/>
</svelte:head>

<div class="page">

	<!-- HERO -->

	<section class="hero">

		<div>
			<p class="eyebrow">4KAZ / CARS</p>

			<h1>
				Find your
				<span>next car.</span>
			</h1>

			<p class="description">
				Explore vehicles from sellers across Ethiopia.
			</p>
		</div>

		<a class="sell" href="/">
			+ SELL A CAR
		</a>

	</section>


	<!-- SEARCH -->

	<section class="search-section">

		<div class="search-box">

			<span>⌕</span>

			<input
				bind:value={search}
				oninput={searchCars}
				type="text"
				placeholder="Search Toyota, Hyundai, Mercedes..."
			/>

		</div>


		<select>
			<option>All Makes</option>
			<option>Toyota</option>
			<option>Hyundai</option>
			<option>Kia</option>
			<option>Mercedes-Benz</option>
		</select>


		<select>
			<option>Any Price</option>
			<option>Under 3M ETB</option>
			<option>3M – 5M ETB</option>
			<option>Above 5M ETB</option>
		</select>


		<select>
			<option>Newest First</option>
			<option>Price: Low to High</option>
			<option>Price: High to Low</option>
		</select>

	</section>


	<!-- LISTINGS -->

	<main>

		<div class="heading">

			<div>
				<p>AVAILABLE VEHICLES</p>

				<h2>
					Cars for
					<span>sale.</span>
				</h2>
			</div>

			<p class="count">
				{filteredCars.length} vehicles
			</p>

		</div>


		<div class="cars">

			{#each filteredCars as car}

				<article class="card">

					<div class="image-container">

						<img
							src={car.image}
							alt={car.name}
						/>

						<div class="year">
							{car.year}
						</div>

						<button
							class="heart"
							type="button"
							aria-label="Save car"
						>
							♡
						</button>

					</div>


					<div class="card-content">

						<p class="location">
							⌖ {car.location}
						</p>

						<h3>{car.name}</h3>


						<div class="specifications">

							<div>
								<span>YEAR</span>
								<strong>{car.year}</strong>
							</div>

							<div>
								<span>MILEAGE</span>
								<strong>{car.mileage}</strong>
							</div>

							<div>
								<span>GEARBOX</span>
								<strong>{car.transmission}</strong>
							</div>

							<div>
								<span>FUEL</span>
								<strong>{car.fuel}</strong>
							</div>

						</div>


						<div class="card-bottom">

							<div class="price">

								<span>PRICE</span>

								<strong>
									{car.price}
								</strong>

							</div>


							<a href={`/cars/${car.id}`}>
								View Details
								<span>→</span>
							</a>

						</div>

					</div>

				</article>

			{/each}

		</div>


		{#if filteredCars.length === 0}

			<div class="empty">

				<h2>No cars found.</h2>

				<p>
					Try searching for another vehicle.
				</p>

			</div>

		{/if}

	</main>

</div>


<style>

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: Arial, Helvetica, sans-serif;
		background: #f4f4f0;
		color: #111;
	}

	.page {
		min-height: 100vh;
	}


	/* =========================
	   HERO
	========================= */

	.hero {

		min-height: 430px;

		padding:
			80px
			clamp(25px, 6vw, 100px);

		background: #111;

		color: white;

		display: flex;

		align-items: flex-end;

		justify-content: space-between;

		gap: 50px;
	}


	.eyebrow {

		margin: 0 0 20px;

		color: #8cc63f;

		font-size: 11px;

		font-weight: 900;

		letter-spacing: 4px;
	}


	.hero h1 {

		margin: 0;

		font-size:
			clamp(60px, 8vw, 110px);

		line-height: 0.85;

		letter-spacing: -7px;
	}


	.hero h1 span {

		display: block;

		color: #8cc63f;
	}


	.description {

		margin:
			30px
			0
			0;

		color: #999;

		font-size: 18px;
	}


	.sell {

		padding:
			18px
			25px;

		background: #8cc63f;

		color: #111;

		text-decoration: none;

		font-size: 12px;

		font-weight: 900;

		letter-spacing: 1px;

		white-space: nowrap;
	}


	/* =========================
	   SEARCH
	========================= */

	.search-section {

		padding:
			25px
			clamp(25px, 6vw, 100px);

		background: white;

		border-bottom: 1px solid #ddd;

		display: grid;

		grid-template-columns:
			2fr
			1fr
			1fr
			1fr;

		gap: 12px;
	}


	.search-box {

		min-height: 52px;

		padding: 0 17px;

		border: 1px solid #ddd;

		display: flex;

		align-items: center;

		gap: 10px;
	}


	.search-box > span {

		color: #8cc63f;

		font-size: 25px;
	}


	.search-box input {

		width: 100%;

		border: none;

		outline: none;

		background: transparent;

		font-size: 14px;
	}


	select {

		padding: 0 15px;

		min-height: 52px;

		border: 1px solid #ddd;

		background: white;

		color: #333;

		outline: none;
	}


	/* =========================
	   LISTINGS
	========================= */

	main {

		width: min(1450px, 100%);

		margin: auto;

		padding:
			80px
			clamp(25px, 6vw, 100px)
			120px;
	}


	.heading {

		margin-bottom: 45px;

		display: flex;

		align-items: flex-end;

		justify-content: space-between;

		gap: 30px;
	}


	.heading > div > p {

		margin: 0;

		color: #777;

		font-size: 11px;

		font-weight: 900;

		letter-spacing: 3px;
	}


	.heading h2 {

		margin:
			10px
			0
			0;

		font-size:
			clamp(45px, 5vw, 70px);

		letter-spacing: -4px;
	}


	.heading h2 span {

		color: #8cc63f;
	}


	.count {

		color: #777;

		font-size: 13px;
	}


	/* =========================
	   CAR GRID
	========================= */

	.cars {

		display: grid;

		grid-template-columns:
			repeat(3, minmax(0, 1fr));

		gap: 25px;
	}


	.card {

		min-width: 0;

		background: white;

		border: 1px solid #e0e0dc;

		overflow: hidden;

		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}


	.card:hover {

		transform: translateY(-6px);

		box-shadow:
			0 20px 40px
			rgba(0, 0, 0, 0.09);
	}


	/* IMAGE */

	.image-container {

		height: 250px;

		position: relative;

		overflow: hidden;

		background: #ddd;
	}


	.image-container img {

		width: 100%;

		height: 100%;

		object-fit: cover;

		display: block;

		transition: transform 0.4s ease;
	}


	.card:hover img {

		transform: scale(1.04);
	}


	.year {

		position: absolute;

		top: 15px;

		left: 15px;

		padding:
			7px
			11px;

		background: #8cc63f;

		color: #111;

		font-size: 11px;

		font-weight: 900;
	}


	.heart {

		position: absolute;

		top: 15px;

		right: 15px;

		width: 42px;

		height: 42px;

		border: none;

		border-radius: 50%;

		background: white;

		color: #111;

		font-size: 23px;

		cursor: pointer;
	}


	/* CARD */

	.card-content {

		padding: 25px;
	}


	.location {

		margin:
			0
			0
			9px;

		color: #888;

		font-size: 11px;
	}


	.card h3 {

		margin: 0;

		font-size: 25px;

		letter-spacing: -1px;
	}


	/* SPECIFICATIONS */

	.specifications {

		margin:
			22px
			0;

		padding:
			20px
			0;

		border-top: 1px solid #eee;

		border-bottom: 1px solid #eee;

		display: grid;

		grid-template-columns:
			1fr
			1fr;

		gap:
			18px
			15px;
	}


	.specifications span {

		display: block;

		margin-bottom: 5px;

		color: #999;

		font-size: 8px;

		font-weight: 900;

		letter-spacing: 1px;
	}


	.specifications strong {

		font-size: 12px;

		color: #444;
	}


	/* PRICE */

	.card-bottom {

		display: flex;

		align-items: flex-end;

		justify-content: space-between;

		gap: 15px;
	}


	.price > span {

		display: block;

		margin-bottom: 5px;

		color: #999;

		font-size: 8px;

		font-weight: 900;

		letter-spacing: 2px;
	}


	.price strong {

		font-size: 19px;
	}


	.card-bottom > a {

		padding:
			12px
			14px;

		background: #111;

		color: white;

		text-decoration: none;

		font-size: 10px;

		font-weight: 800;

		white-space: nowrap;

		transition:
			background 0.2s,
			color 0.2s;
	}


	.card-bottom > a span {

		margin-left: 7px;
	}


	.card-bottom > a:hover {

		background: #8cc63f;

		color: #111;
	}


	/* NO RESULTS */

	.empty {

		padding:
			100px
			20px;

		text-align: center;
	}


	.empty h2 {

		font-size: 35px;

		margin-bottom: 10px;
	}


	.empty p {

		color: #777;
	}


	/* =========================
	   TABLET
	========================= */

	@media (max-width: 1050px) {

		.cars {

			grid-template-columns:
				repeat(2, minmax(0, 1fr));
		}


		.search-section {

			grid-template-columns:
				1fr
				1fr;
		}

	}


	/* =========================
	   MOBILE
	========================= */

	@media (max-width: 650px) {

		.hero {

			min-height: 500px;

			align-items: flex-start;

			justify-content: flex-end;

			flex-direction: column;
		}


		.hero h1 {

			font-size: 65px;

			letter-spacing: -5px;
		}


		.search-section {

			grid-template-columns: 1fr;
		}


		.cars {

			grid-template-columns: 1fr;
		}


		.heading {

			align-items: flex-start;

			flex-direction: column;
		}


		.image-container {

			height: 230px;
		}


		.card-bottom {

			align-items: flex-start;

			flex-direction: column;
		}

	}

</style>
<script>
    let search = $state('');

    const phones = [
        {
            id: 1,
            name: 'iPhone 15 Pro',
            brand: 'Apple',
            price: '125,000 ETB',
            storage: '256 GB',
            condition: 'Like New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 2,
            name: 'Samsung Galaxy S24 Ultra',
            brand: 'Samsung',
            price: '115,000 ETB',
            storage: '256 GB',
            condition: 'New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 3,
            name: 'Google Pixel 8 Pro',
            brand: 'Google',
            price: '78,000 ETB',
            storage: '128 GB',
            condition: 'Used',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 4,
            name: 'Samsung Galaxy A55',
            brand: 'Samsung',
            price: '42,000 ETB',
            storage: '128 GB',
            condition: 'New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 5,
            name: 'iPhone 13',
            brand: 'Apple',
            price: '65,000 ETB',
            storage: '128 GB',
            condition: 'Used',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 6,
            name: 'Xiaomi Redmi Note',
            brand: 'Xiaomi',
            price: '28,500 ETB',
            storage: '128 GB',
            condition: 'New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'
        }
    ];

    let filteredPhones = $derived(
        phones.filter((phone) =>
            phone.name.toLowerCase().includes(search.toLowerCase()) ||
            phone.brand.toLowerCase().includes(search.toLowerCase())
        )
    );
</script>

<svelte:head>
    <title>Mobile Phones | 4KAZ Marketplace</title>
    <meta
        name="description"
        content="Buy mobile phones on 4KAZ Marketplace."
    />
</svelte:head>

<header class="navbar">
    <div class="brand">
        <img
            src="/images/ethioz logo.jpg"
            alt="4KAZ"
            class="logo"
        />

        <a href="/">4KAZ</a>
    </div>

    <nav>
        <a href="/">Home</a>
        <a href="/#categories">Marketplace</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

    <a class="sell" href="/">+ Sell Item</a>
</header>

<main>

    <section class="hero">

        <p class="eyebrow">4KAZ MARKETPLACE</p>

        <h1>
            MOBILE<br />
            <span>PHONES.</span>
        </h1>

        <p>
            Find smartphones from sellers across Ethiopia.
        </p>

        <div class="search">
            <input
                bind:value={search}
                type="text"
                placeholder="Search iPhone, Samsung, Xiaomi..."
            />

            <button>Search</button>
        </div>

    </section>

    <section class="products">

        <div class="heading">

            <div>
                <p class="eyebrow">AVAILABLE NOW</p>
                <h2>Mobile Phones</h2>
            </div>

            <span>{filteredPhones.length} phones</span>

        </div>

        <div class="grid">

            {#each filteredPhones as phone}

                <article class="card">

                    <div class="image-container">

                        <img
                            src={phone.image}
                            alt={phone.name}
                        />

                        <span class="condition">
                            {phone.condition}
                        </span>

                    </div>

                    <div class="info">

                        <p class="brand">
                            {phone.brand}
                        </p>

                        <h3>
                            {phone.name}
                        </h3>

                        <div class="specs">
                            <span>💾 {phone.storage}</span>
                            <span>📍 {phone.location}</span>
                        </div>

                        <div class="bottom">

                            <strong>
                                {phone.price}
                            </strong>

                            <button>
                                View Details →
                            </button>

                        </div>

                    </div>

                </article>

            {:else}

                <div class="empty">
                    <h2>No phones found.</h2>
                    <p>Try another search.</p>
                </div>

            {/each}

        </div>

    </section>

</main>

<footer>
    <strong>4KAZ</strong>

    <span>
        Cars · Mobile · Electronics
    </span>

    <span>
        © 2026 4KAZ Marketplace
    </span>
</footer>

<style>

    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #f4f4f2;
        color: #171717;
    }

    button {
        font-family: inherit;
        cursor: pointer;
    }

    /* NAVBAR */

    .navbar {
        height: 85px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 6%;
        background: #f4f4f2;
        border-bottom: 1px solid #ddd;
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .brand a {
        text-decoration: none;
        color: #111;
        font-size: 26px;
        font-weight: 900;
    }

    .logo {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }

    nav {
        display: flex;
        gap: 30px;
    }

    nav a {
        text-decoration: none;
        color: #222;
        font-weight: 600;
        font-size: 14px;
    }

    .sell {
        text-decoration: none;
        background: #191919;
        color: white;
        padding: 15px 23px;
        border-radius: 8px;
        font-weight: bold;
    }

    /* HERO */

    .hero {
        min-height: 470px;
        padding: 80px 6%;
        background: #191919;
        color: white;
    }

    .eyebrow {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 4px;
        margin: 0 0 20px;
    }

    .hero h1 {
        font-size: clamp(70px, 10vw, 135px);
        line-height: 0.8;
        letter-spacing: -7px;
        margin: 0;
    }

    .hero h1 span {
        color: #777;
    }

    .hero > p:not(.eyebrow) {
        color: #aaa;
        font-size: 18px;
        margin-top: 35px;
    }

    /* SEARCH */

    .search {
        display: flex;
        max-width: 700px;
        background: white;
        padding: 8px;
        border-radius: 10px;
        margin-top: 35px;
    }

    .search input {
        flex: 1;
        border: none;
        outline: none;
        padding: 17px;
        font-size: 15px;
        min-width: 0;
    }

    .search button {
        border: none;
        background: #191919;
        color: white;
        padding: 15px 30px;
        border-radius: 7px;
        font-weight: bold;
    }

    /* PRODUCTS */

    .products {
        padding: 90px 6%;
    }

    .heading {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 45px;
    }

    .heading h2 {
        font-size: clamp(45px, 6vw, 80px);
        letter-spacing: -4px;
        margin: 0;
    }

    .heading > span {
        color: #777;
        font-weight: bold;
    }

    /* GRID */

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    .card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        transition: 0.25s;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    }

    .image-container {
        height: 310px;
        position: relative;
        background: #eee;
        overflow: hidden;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.4s;
    }

    .card:hover img {
        transform: scale(1.04);
    }

    .condition {
        position: absolute;
        top: 18px;
        left: 18px;
        background: white;
        padding: 8px 13px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: bold;
    }

    .info {
        padding: 25px;
    }

    .brand {
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: bold;
        color: #777;
    }

    .info h3 {
        margin: 8px 0 18px;
        font-size: 25px;
        letter-spacing: -1px;
    }

    .specs {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        color: #777;
        font-size: 13px;
        border-bottom: 1px solid #eee;
        padding-bottom: 22px;
    }

    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 22px;
        gap: 15px;
    }

    .bottom strong {
        font-size: 20px;
    }

    .bottom button {
        border: none;
        background: #191919;
        color: white;
        padding: 11px 15px;
        border-radius: 7px;
    }

    .empty {
        grid-column: 1 / -1;
        padding: 70px;
        text-align: center;
        background: white;
        border-radius: 15px;
    }

    /* FOOTER */

    footer {
        padding: 50px 6%;
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        gap: 30px;
        color: #777;
        font-size: 13px;
    }

    footer strong {
        color: #111;
        font-size: 22px;
    }

    /* TABLET */

    @media (max-width: 950px) {

        .grid {
            grid-template-columns: repeat(2, 1fr);
        }

    }

    /* MOBILE */

    @media (max-width: 650px) {

        nav {
            display: none;
        }

        .sell {
            padding: 12px 15px;
        }

        .hero {
            padding: 65px 20px;
        }

        .hero h1 {
            letter-spacing: -4px;
        }

        .products {
            padding: 60px 20px;
        }

        .grid {
            grid-template-columns: 1fr;
        }

        .image-container {
            height: 300px;
        }

        .heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
        }

        .search button {
            padding: 12px 17px;
        }

        footer {
            padding: 40px 20px;
            flex-direction: column;
        }

    }

</style>
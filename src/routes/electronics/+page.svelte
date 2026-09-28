<script>
    let search = $state('');

    const products = [
        {
            id: 1,
            name: 'HP EliteBook Laptop',
            category: 'Laptop',
            price: '85,000 ETB',
            condition: 'Like New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 2,
            name: 'Samsung Smart TV',
            category: 'Television',
            price: '72,000 ETB',
            condition: 'New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 3,
            name: 'Gaming Desktop PC',
            category: 'Computer',
            price: '120,000 ETB',
            condition: 'Used',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 4,
            name: 'Sony Headphones',
            category: 'Audio',
            price: '18,500 ETB',
            condition: 'New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 5,
            name: 'Canon Camera',
            category: 'Camera',
            price: '95,000 ETB',
            condition: 'Like New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80'
        },
        {
            id: 6,
            name: 'PlayStation 5',
            category: 'Gaming',
            price: '68,000 ETB',
            condition: 'New',
            location: 'Addis Ababa',
            image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80'
        }
    ];

    let filteredProducts = $derived(
        products.filter((product) =>
            `${product.name} ${product.category} ${product.condition} ${product.location}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );
</script>

<svelte:head>
    <title>Electronics | 4KAZ Marketplace</title>
    <meta
        name="description"
        content="Browse electronics for sale on 4KAZ Marketplace."
    />
</svelte:head>

<div class="page">

    <section class="hero">
        <p class="eyebrow">4KAZ MARKETPLACE</p>
        <h1>Electronics</h1>
        <p class="subtitle">
            Find computers, TVs, gaming devices, cameras and more.
        </p>

        <div class="search-box">
            <span>⌕</span>
            <input
                type="text"
                placeholder="Search electronics..."
                bind:value={search}
            />
        </div>
    </section>

    <section class="products-section">

        <div class="section-header">
            <div>
                <p class="small-title">SHOP ELECTRONICS</p>
                <h2>Available Products</h2>
            </div>

            <p class="count">{filteredProducts.length} items</p>
        </div>

        <div class="product-grid">

            {#each filteredProducts as product}

                <article class="product-card">

                    <div class="image-container">
                        <img src={product.image} alt={product.name} />

                        <span class="condition">
                            {product.condition}
                        </span>
                    </div>

                    <div class="product-content">

                        <p class="category">
                            {product.category}
                        </p>

                        <h3>{product.name}</h3>

                        <p class="location">
                            📍 {product.location}
                        </p>

                        <div class="card-bottom">

                            <div>
                                <span class="price-label">PRICE</span>
                                <p class="price">{product.price}</p>
                            </div>

                            <button type="button">
                                View Item →
                            </button>

                        </div>

                    </div>

                </article>

            {:else}

                <div class="empty">
                    <h2>No electronics found.</h2>
                    <p>Try another search.</p>
                </div>

            {/each}

        </div>

    </section>

</div>


<style>

    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #f5f5f3;
        color: #171717;
    }

    .page {
        min-height: 100vh;
    }


    /* HERO */

    .hero {
        background: #171717;
        color: white;
        padding: 70px 8%;
    }

    .eyebrow {
        margin: 0 0 14px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 4px;
        color: #8cc63f;
    }

    h1 {
        margin: 0;
        font-size: clamp(48px, 7vw, 88px);
        line-height: .95;
        letter-spacing: -4px;
    }

    .subtitle {
        max-width: 600px;
        margin-top: 22px;
        color: #bdbdbd;
        font-size: 18px;
        line-height: 1.6;
    }


    /* SEARCH */

    .search-box {
        margin-top: 35px;
        max-width: 650px;
        background: white;
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 0 18px;
    }

    .search-box span {
        color: #777;
        font-size: 25px;
    }

    .search-box input {
        width: 100%;
        border: none;
        outline: none;
        padding: 18px;
        font-size: 16px;
    }


    /* PRODUCTS */

    .products-section {
        max-width: 1250px;
        margin: auto;
        padding: 60px 30px 100px;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-bottom: 30px;
    }

    .small-title {
        margin: 0 0 8px;
        color: #8cc63f;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 3px;
    }

    .section-header h2 {
        margin: 0;
        font-size: 35px;
    }

    .count {
        color: #777;
    }


    /* GRID */

    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }

    .product-card {
        background: white;
        border: 1px solid #e2e2e2;
        border-radius: 12px;
        overflow: hidden;
        transition: 0.25s;
    }

    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0,0,0,.1);
    }


    /* IMAGE */

    .image-container {
        height: 230px;
        position: relative;
        background: #eee;
        overflow: hidden;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.35s;
    }

    .product-card:hover img {
        transform: scale(1.05);
    }

    .condition {
        position: absolute;
        top: 15px;
        left: 15px;
        background: #171717;
        color: white;
        padding: 7px 12px;
        border-radius: 20px;
        font-size: 12px;
    }


    /* CARD CONTENT */

    .product-content {
        padding: 22px;
    }

    .category {
        margin: 0 0 8px;
        color: #8cc63f;
        font-size: 11px;
        font-weight: bold;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    .product-content h3 {
        margin: 0;
        font-size: 21px;
    }

    .location {
        color: #777;
        margin: 12px 0 25px;
        font-size: 14px;
    }

    .card-bottom {
        border-top: 1px solid #eee;
        padding-top: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }

    .price-label {
        font-size: 10px;
        color: #888;
        letter-spacing: 2px;
    }

    .price {
        margin: 4px 0 0;
        font-size: 19px;
        font-weight: 800;
    }

    button {
        border: none;
        background: #171717;
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
    }

    button:hover {
        background: #8cc63f;
        color: #171717;
    }


    /* EMPTY SEARCH */

    .empty {
        grid-column: 1 / -1;
        text-align: center;
        padding: 80px 20px;
    }

    .empty h2 {
        margin-bottom: 8px;
    }

    .empty p {
        color: #777;
    }


    /* TABLET */

    @media (max-width: 900px) {

        .product-grid {
            grid-template-columns: repeat(2, 1fr);
        }

    }


    /* MOBILE */

    @media (max-width: 650px) {

        .hero {
            padding: 50px 22px;
        }

        h1 {
            letter-spacing: -2px;
        }

        .products-section {
            padding: 40px 18px 70px;
        }

        .product-grid {
            grid-template-columns: 1fr;
        }

        .section-header {
            align-items: flex-start;
            flex-direction: column;
        }

        .image-container {
            height: 240px;
        }

        .card-bottom {
            align-items: flex-start;
            flex-direction: column;
        }

        button {
            width: 100%;
        }

    }

</style>
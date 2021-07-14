<script>
    export let id ;
    export let location ;
    // global store
    import products from '../stores/defaultProducts' ;
    import Loading from '../components/Loading.svelte' ;
    import { link } from 'svelte-routing' ;
    import globalStore from '../stores/globalStore' ;
    import { addToCart } from  '../stores/cart' ;
    $: product = $products.find(item => item.id === parseInt(id)) ;
</script>

<svelte:head>
    <title>{product ? product.title : "Single Product"}</title>
</svelte:head>

{#if !product}
    <Loading />
{:else}
    <section class="single-product">
        <a href="/products" use:link class="btn btn-primary">
            back to products
        </a>
        
        <div class="single-product-container">
            <article class="sinle-product-image">
                <img src={product.image} alt={product.title} />
            </article>
            <article>
                <h1> {product.title}</h1>
                <h2> ${product.price} </h2>
                <p> {product.description}</p>
                <button class="btn btn-primary btn-block"
                    on:click={() => {
                        addToCart(product) ;
                        globalStore.toggleItem('cart', true) ;
                    }} >
                    add to cart
                </button>

            </article>
        </div>
    
    </section>
{/if}

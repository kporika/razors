<script>
    
    import products from '../../stores/Products' ;
    import Product from './Product.svelte' ;
    import Loading from '../Loading.svelte' ;
    export let title =""
    
</script>

<section class="section">
    <h2 class="section-title">{title}</h2>
</section>
<div class="products-center">
    {#each $products as product (product.id) }
        <Product {product} />
    {:else}
        <Loading />
    {/each}
</div>

<script>

import Login from "../../pages/Login.svelte";
import globalStore from "../../stores/globalStore" ;
import cart from '../../stores/cart' ;

$:total = $cart.reduce((acc,cur) => {
    return (acc+= cur.amount);
}, 0 ) ;
</script>
<div class="btn-cart-container">
    <button class="btn-cart-toggle" on:click="{() => {
        globalStore.toggleItem('cart', true); }
        }">
        <i class="fas fa-cart-plus"></i>
    </button>
    <span class="btn-cart-items">
        {total}
    </span>
</div>
<script>
    import globalStore from '../../stores/globalStore' ;
    import user from '../../stores/user' ;
    import { fly, fade, blur} from "svelte/transition" ;
    import { link } from "svelte-routing" ;
    import ItemsList from './ItemsList.svelte' ;
    // Item List
    // let user = null ;
</script>
<div class="cart-overlay" transition:blur>
    <div class="cart-container" transition:fly={{ x: 100}} >
        <div class="cart" transition:fade={{delay:400}}>
            <!-- Cart Header-->
            <div class="cart-header">
                <button class="btn-close" on:click="{() => 
                    { globalStore.toggleItem('cart', false) ;}
                }">
                    <i class="fas fa-window-close" />
                </button>
                <h2 class="cart-title">
                    your bag
                </h2>
            </div>
            <!-- end of Cart Header-->
            <!-- Cart Items-->
            <ItemsList />
            <!-- End of Cart Items -->
            <!-- cart footer-->
            <div class="cart-footer">
                {#if $user.jwt}
                    <a href="/checkout" use:link class="btn btn-primary btn-block" 
                    on:click="{() => 
                        { globalStore.toggleItem('cart', false) ;}
                    }">
                        Check Out
                    </a>
                {:else}
                    <p class="cart-login"> 
                        in order to checkout, please 
                        <a href="/login" use:link  on:click="{() => 
                        { globalStore.toggleItem('cart', false) ;}
                        }">
                            login
                        </a>
                    </p>
                    
                {/if}
            </div>
            <!-- cart footer-->
        </div>
    </div>

</div>
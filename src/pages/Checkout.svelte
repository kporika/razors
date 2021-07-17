
<script>
    import {onMount} from 'svelte';
    import { navigate, link } from 'svelte-routing' ;
    import cart, { cartTotal } from '../stores/cart';
    import user from '../stores/user' ;
    import submitOrder from '../strapi/submitOrder' ;
    import globalStore from '../stores/globalStore' ;
    let name = '';
    // strip variables
    let cardElement ;
    let cardErrors ;
    let card;
    let stripe ;
    let elements ;
    $: isEmpty = !name  || $globalStore.alert;

    onMount(() => {
        if(!$user.jwt) {
            navigate("/login") ;
            return ;
        }
    if($cartTotal > 0){
        stripe = Stripe('pk_test_51JDrzeIReip1Owxqf5VmO8iUIEz8Ab0tz1yyvEWsqoRqKFbPqm7zmAKZeejS8lqtCfuY7xeqNH5Xretivn2FLOEz00HvRaBcnr');
        elements = stripe.elements() ;
        card = elements.create('card') ;
        card.mount(cardElement) ;
        card.addEventListener("change", function(event){
            if (event.error){
                cardErrors.textContent = event.error.message ;
            }
            else{
                cardErrors.textContent ="" ;
            }
        });
    }
    });
    async function handleSubmit() {
        globalStore.toggleItem('alert', true, "submitting the order, please wait...") ;
       let response = await stripe.createToken(card).catch(error=> console.log(error)) ;
       const {token} = response ;
       if(token){
           const {id} = token ;
           let order = await submitOrder(
               {
                name,
                total: $cartTotal,
                items: $cart,
                stripeTokenId: id,
                userToken: $user.jwt
            });
            if(order){
                globalStore.toggleItem('alert', true, "Your order is complete") ;
                cart.set([]) ;
                localStorage.setItem('cart', JSON.stringify([])) ;
                navigate("/") ;
                return ;
            }else{
                globalStore.toggleItem('alert', true, "There was an error with your order, please try again", true) ;
            }

       }else{
            console.log(response) ;
       }
    }
</script>
{#if $cartTotal > 0}
    <section class="form">
        <h2 class="section-title">checkout</h2>
        <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
            <h3> order total : $ {$cartTotal}</h3>
            <!-- single input-->
            <div class="form-control">
                <label for="name">name</label>
                <input type="text" id="name" bind:value={name} />
            </div>
            <!--stripe stuff-->
            <div class="stripe-input">
                <label for="card-element">
                    Credit Card or Debit Card
                </label>
                <p class="stripe-info">
                    Test using this credit card:
                    <span>4242 4242 4242 4242</span>
                    <br>
                    enter any 5 digits for the zip 
                    <br>
                    enter any 3 digits for the CVC
                    <br>
                </p>
                <!---info -->
                <div id="card-element" bind:this={cardElement}>
                    <!-- stripe -->
                </div>
                <div id="card-errors" bind:this={cardErrors} role="alert">
                </div>
            </div>
            <!-- end of strip stuff-->
            <!--- error -->
            {#if isEmpty}
            <p class="form-empty"> please fillout the name and the credit card number</p>
            {/if}
            <!-- end of error -->
            <!--submit button-->
            <button 
            type="submit" 
            class="btn btn-block btn-primary" 
            disabled={isEmpty} 
            class:disabled={isEmpty}
            >   submit
        </button>
        </form>
    </section>
{:else}
<div class="checkout-empty">
    <a href="/products" use:link class="btn btn=primary">
        Add products to the Cart
    </a>
</div>
{/if}
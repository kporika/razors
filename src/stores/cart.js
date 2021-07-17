import { writable, derived } from "svelte/store";
// import localCart from "../localCart";

const cart = writable(getStorageCart()) ;

export const cartTotal = derived (cart, ($cart) => {
    let total = $cart.reduce((acc,cur) => {
        return (acc+= (cur.amount*cur.price));
    }, 0 ) ;
    return parseFloat(total.toFixed(2)) ;
}) ;

const remove = (id, items ) => {
    return items.filter(item => item.id !== id )
};

const toggleAmount = (id, items, action) => {
    return items.map(item => {
        let newAmount ;
        if (action === "inc"){
            newAmount = item.amount +1 ;
        }else if (action === 'dec'){
            newAmount = item.amount - 1;
        }else{
            newAmount = item.amount ;
        }
        return item.id === id ? {...item, amount:newAmount} : {...item} ;

    })
};
export const removeItem = id => {
    cart.update(prevCart => {
       return  remove(id,prevCart) ;
    }
)};
export const increaseAmount = id => {
    cart.update(prevCart => {
       return  toggleAmount(id, prevCart, 'inc');
    }
)};
export const decreaseAmount = (id, amount) => {
    cart.update(prevCart => {
       //let item = prevCart.find(item => item.id ===id) ;
       let newCart ;
       if (amount === 1) {
           newCart = remove(id, prevCart ) ;
       }
       else{
           newCart = toggleAmount(id, prevCart, 'dec') ;
       }
       return [...newCart] ;
    }
)};
export const addToCart = product => {
    cart.update(prevCart => {
        const {id} = product ;
        let item = prevCart.find(item => item.id ===id) ;
        let newCart ;
        if (item) {
            newCart = toggleAmount(id, prevCart, 'inc') ;
        }
        else{
            let newItem = {...product, amount: 1} ;
            newCart = [...prevCart, newItem] ;
        }
        return newCart ;
    })
};

function getStorageCart(){
    // console.log(localStorage.getItem('cart')) ;
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] ;
}
export function setStorageCart(cartValues){
    localStorage.setItem('cart', JSON.stringify(cartValues)) ;
};
export default cart ;
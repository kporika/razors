import {writable} from 'svelte/store' ;
import getProducts from '../strapi/getProducts.js';
import url from '../strapi/URL' ;
// const store =writable([]) ;
const store = writable ([], () => {
    setProducts() ;
    return () => {};
}) ;

async function setProducts() {
    let products = await getProducts() ;
    if (products){
        products = flattenProducts(products) ;
        store.set(products) ;
    }
}

function flattenProducts(data) {
    
    return data.map(item => {
        //let image = item.image.url ;
        let image = `${url}${item.image.url}` ;
        return {...item, image} ;
    });
}

export default store ;
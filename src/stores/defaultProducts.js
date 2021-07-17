import {writable} from 'svelte/store' ;
import localProducts from '../localProducts.js' ;
// import getProducts from '../strapi/getProducts.js';
// const store =writable([]) ;
const store = writable (flattenProducts([...localProducts])) ;

function flattenProducts(data) {
    return data.map(item => {
        let image = item.image.url ;
        return {...item, image} ;
    })
}

export default store ;
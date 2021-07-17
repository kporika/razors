import url from './URL' ;
import axios from 'axios' ;

async function submitOrder({name, total, items, stripeTokenId, userToken }) {
    const response = await axios.post(`${url}/orders`, {
        name,
        total,
        items,
        stripeTokenId
    },{
        headers: {
            Authorization: `Bearer ${userToken}`,
          },
    }).catch(error => console.log(error)) ;

    console.log(response) ;
    return response ;
}


export default submitOrder ;
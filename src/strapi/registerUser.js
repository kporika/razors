import url from './URL' ;
import axios from 'axios' ;
import setupUser from './setupUser' ;
async function registerUser({email, password, username}) {
    const response = await axios.post(`${url}/auth/local/register`, {
        username,
        email,
        password
    }).catch(error => console.log(error)) ;

    if(response) {
        setupUser(response) ;
    }
    return response ;
}

export default registerUser ;
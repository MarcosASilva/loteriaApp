import axios from 'axios'
import token from '../config/config'

const api = axios.create({
    baseURL: `https://apiloterias.com.br/app/resultado?loteria=megasena&token=${token}`
    
    
})
console.log(api.getUri);
export default api;
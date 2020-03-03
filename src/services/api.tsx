import axios from 'axios'
import token from '../config/config'

const api = axios.create({
    baseURL: `https://apiloterias.com.br/app/resultado?token=${token}&loteria=`
})

export default api;
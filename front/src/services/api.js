import Axios from 'axios';

const baseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
                    ? 'http://localhost:8000/api' : 'http://covidac.tk/api'

console.log(baseURL)

const api = Axios.create({
    baseURL
});

export default api;
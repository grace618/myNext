import axios from 'axios';
import Cookies from 'js-cookie'
// import getCode from './index'
const config = {
    timeout: 50000,
    baseURL: process.env.URL,
};

const service = axios.create(config);

// request拦截器
service.interceptors.request.use(config => {
    if (process.env.NODE_ENV !== 'development') {
        if (/^\/api/.test(config.url)) {
            config.url = process.env.REACT_APP_BASEURLAPI + config.url
        }
        if (/^\/v1/.test(config.url)) {
            config.url = process.env.REACT_APP_BASEURLV1 + config.url
        }
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (response.status === 401 || res.code === 30300) {
            alert('error~')
            Cookies.remove('token')
            Cookies.remove('authCode')
            location.reload()
        }
        return res
    },
    error => {
        console.log(error); // for debug
        return Promise.reject(error)
    }
)


export default service;
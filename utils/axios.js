import axios from 'axios';

const config = {
    timeout: 50000,
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
        // response.setHeader("Set-Cookie", "Secure;SameSite=Strict")
        return response.data
    },
    error => {
        console.log(error); // for debug
        return Promise.reject(error)
    }
)




export default service;
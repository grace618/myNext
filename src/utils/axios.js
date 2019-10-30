import axios from 'axios';

const config = {
    timeout: 50000,
};
const service = axios.create(config);
// respone拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log(error); // for debug
        return Promise.reject(error)
    }
)
export default service;
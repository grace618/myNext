import axios from 'utils/axios'

//初始化
const getInitConfigByWeb = (data) => axios({
    url: `/api/member/config/getInitConfigByWeb`,
    method: 'post',
    data
})
//登出
const logout = (data, code) => {
    return axios({
        url: '/api/member/user/logout',
        method: 'post',
        data,
        headers: { 'token': code }
    })
}
//登录时发送手机验证码
const sendPhoneCode = (data, code) => {
    return axios({
        url: '/api/member/user/v3/sendPhoneCode',
        method: 'post',
        data,
        headers: { 'authCode': code }
    })
}
//登录
const login = (data, code) => {
    return axios({
        url: '/api/member/user/v3/login',
        method: 'post',
        data,
        headers: { 'authCode': code }
    })
}
//注册
const registerByEmailValitor = (data, code) => {
    return axios({
        url: '/api/member/user/registerByEmailValitor',
        method: 'post',
        data,
        headers: { 'authCode': code }
    })
}
//未登录发送邮箱验证码
const sendCaptchaByAuthCode = (data, code) => {
    return axios({
        url: '/api/member/user/sendCaptchaByAuthCode',
        method: 'post',
        data,
        headers: { 'authCode': code }
    })
}
//已登录发送邮箱验证码
const sendBindCaptcha = (data, code) => {
    return axios({
        url: '/api/member/user/v3/sendBindCaptcha',
        method: 'post',
        data,
        headers: { 'token': code }
    })
}
//未登录忘记密码
const resetPassword = (data, code) => {
    return axios({
        url: '/api/member/user/resetPassword',
        method: 'post',
        data,
        headers: { 'authCode': code }
    })
}
//已登录忘记密码
const changePassword = (data, code) => {
    return axios({
        url: '/api/member/user/changePassword',
        method: 'post',
        data,
        headers: { 'token': code }
    })
}
export { getInitConfigByWeb, logout, login, sendPhoneCode, registerByEmailValitor, sendCaptchaByAuthCode, resetPassword, sendBindCaptcha, changePassword }
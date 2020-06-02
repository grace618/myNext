import getLanguage from 'utils/i18n.js'
import { login, registerByEmailValitor } from 'service/login'
import Cookies from 'js-cookie'
const LANGUAGE = 'APP/LANGUAGE'
const AUTHCODE = 'APP/AUTHCODE'
const TOKEN = 'APP/TOKEN'
const UID = 'APP/UID'
export const setLang = (data => ({
    type: LANGUAGE,
    data
}))
export const setCode = (data => ({
    type: AUTHCODE,
    data
}))
export const setToken = (data => ({
    type: TOKEN,
    data
}))
export const setUid = (data => ({
    type: UID,
    data
}))
const initialState = {
    lang: getLanguage(),
    authcode: Cookies.get('authCode'),
    token: Cookies.get('token'),
    uid: Cookies.get('uid')
}
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case LANGUAGE:
            Cookies.set('lang-ulu', action.data.lang)
            return {
                ...state,
                lang: action.data.lang
            }
        case AUTHCODE:
            Cookies.set('authCode', action.data.authcode)
            return {
                ...state,
                authcode: action.data.authcode
            }
        case TOKEN:
            Cookies.set('token', action.data)
            return {
                ...state,
                token: action.data
            }
        case UID:
            Cookies.set('uid', action.data)
            return {
                ...state,
                uid: action.data
            }
        default:
            return state
    }
}
export const getUserInfo = (data, code) => async (dispatch) => {
    const res = await login(data, code);
    if (res.code == 0) {
        dispatch(setToken(res.data.token));
        dispatch(setUid(res.data.uid));
    }
    return res;
};
export const register = (data, code) => async (dispatch) => {
    const res = await registerByEmailValitor(data, code);
    if (res.code == 0) {
        dispatch(setToken(res.data.token));
        dispatch(setUid(res.data.uid));
    }
    return res;
};
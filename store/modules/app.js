import getLanguage from 'utils/i18n.js'
import Cookies from 'js-cookie'
const LANGUAGE = 'APP/LANGUAGE'
export const language = (data => ({
    type: LANGUAGE,
    data
}))
const initialState = {
    lang: getLanguage()
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LANGUAGE:
            Cookies.set('language', action.data.lang)
            /*{
                data: {lang: "en"}
                type: "APP/LANGUAGE"
            }
            */
            return action.data
        default:
            return state
    }
}
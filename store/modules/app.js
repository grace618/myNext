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
            Cookies.set('lang-ulu', action.data.lang)
            /*{
                data: {lang: "en"}
                type: "APP/LANGUAGE"
            }
            */
            console.log(action.data, 'action.ata')
            return action.data
        default:
            console.log(state, 'stateInit')
            return state
    }
}
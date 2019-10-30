import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLanguage } from 'utils/i18n.js'
import zhGameList from './zh_CN/gameList'
import enGameList from './en_US/gameList'
import zhCommon from './zh_CN/common'
import enCommon from './en_US/common'
const resources = {
    cn: {//中文简体
        gameList: {
            ...zhGameList
        },
        common: {
            ...zhCommon
        }
    },
    en: {
        gameList: {
            ...enGameList
        },
        common: {
            ...enCommon
        }
    }

}
i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: getLanguage(),

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
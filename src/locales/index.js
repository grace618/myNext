import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLanguage } from 'utils/i18n.js'
import zhGameList from './zh_CN/gameList'
import enGameList from './en_US/gameList'
import zhCommon from './zh_CN/common'
import enCommon from './en_US/common'
import zhHome from './zh_CN/home'
import enHome from './en_US/home'
import zhPublishing from './zh_CN/publish'
import enPublishing from './en_US/publish'
import zhJobs from './zh_CN/jobs'
import enJobs from './en_US/jobs'
import zhGameDetail from './zh_CN/gameDetail'
import enGameDetail from './en_US/gameDetail'
const resources = {
    cn: {//中文简体
        gameList: { ...zhGameList },
        common: { ...zhCommon },
        home: { ...zhHome },
        publishing: { ...zhPublishing },
        jobs: { ...zhJobs },
        gameDetail: { ...zhGameDetail },
    },
    en: {
        gameList: { ...enGameList },
        common: { ...enCommon },
        home: { ...enHome },
        publishing: { ...enPublishing },
        jobs: { ...enJobs },
        gameDetail: { ...enGameDetail },
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
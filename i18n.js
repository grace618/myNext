
const NextI18Next = require('next-i18next').default;
const getLanguage = require('./utils/i18n.js');
const language = getLanguage()
console.log(language, 'i18n插件的初始值')
module.exports = new NextI18Next({
    defaultLanguage: language,
    otherLanguages: ['cn', 'en'],
})
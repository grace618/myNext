
const NextI18Next = require('next-i18next').default;
const getLanguage = require('./utils/i18n.js');
const language = getLanguage()
module.exports = new NextI18Next({
    defaultLanguage: language,
    otherLanguages: ['zh', 'en']
})
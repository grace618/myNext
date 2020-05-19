
const Cookies = require('js-cookie')
var getLanguage = () => {
  // const lang = navigator.language || navigator.userLanguage
  const lang = 'en'
  let language = Cookies.get('lang-ulu') || lang.toLocaleLowerCase().split('-')[0] || 'en';
  if (language !== 'zh') {
    language = 'en'
  }
  return language
}
module.exports = getLanguage
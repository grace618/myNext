
const Cookies = require('js-cookie')
var getLanguage = () => {
  // const lang = navigator.language || navigator.userLanguage
  const lang = 'zh'
  let language = Cookies.get('lang-ulu') || lang;
  if (language !== 'zh') {
    language = 'en'
  }
  return language
}
module.exports = getLanguage
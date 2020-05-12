
const Cookies = require('js-cookie')
var getLanguage = () => {
  // const lang = navigator.language || navigator.userLanguage
  const lang = 'zh-CN'
  let language = Cookies.get('language') || lang.toLocaleLowerCase().split('-')[1] || 'en';
  if (language !== 'cn') {
    language = 'en'
  }
  return language
}
module.exports = getLanguage
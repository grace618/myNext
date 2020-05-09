const getLanguage = () => {
  if (typeof window !== 'undefined') {
    const lang = window.navigator.language || window.navigator.userLanguage
    let language = lang.toLocaleLowerCase();
    let str = localStorage.getItem('language') || 'en'
    if (language.split('-')[1] == 'cn') {
      str = 'cn'
    }
    return str;
  }
}
module.exports = getLanguage
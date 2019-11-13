export function getLanguage() {
  // const languageList = ['en', 'ja', 'ko', 'cn', 'tw']//其他中文地区使用繁体，
  const languageList = ['en', 'cn']
  const lang = navigator.language || navigator.userLanguage
  let language = localStorage.getItem('language') || lang.toLocaleLowerCase();
  const str = language.split('-')
  if (str[0] === 'zh') {
    str[0] = 'cn'
  }
  if (!languageList.includes(str[0])) {//其他地区使用英文
    str[0] = 'en'
  }
  return str[0];
}

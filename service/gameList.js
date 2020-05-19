import axios from 'utils/axios'
const gameList = (language) => axios({
    url: `/api/website/official/gameInfoList/${language}`,
    method: 'get',
})
export { gameList }
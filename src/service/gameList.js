import axios from 'utils/axios'
const gameList = (language) => axios({
    url: `/api/gameList/${language}`,
    method: 'get',
})
export { gameList }
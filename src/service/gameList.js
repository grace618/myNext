import axios from 'utils/axios'
const gameList = (language) => axios({
    url: `/v1/gameList/${language}`,
    method: 'get',
})
export { gameList }
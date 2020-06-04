import axios from 'utils/axios'
const gameList = (data) => {
    return axios({
        url: `/api/news/introduct/gameInfoList`,
        method: 'post',
        data
    })
}
export { gameList }
import axios from 'utils/axios'
const getGameDetail = (id, language) => axios({
    url: `/v1/gameList/getAll/${id}/${language}`,
    method: 'get',
})
export { getGameDetail }
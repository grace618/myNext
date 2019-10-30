import axios from 'utils/axios'
const getGameDetail = (id, language) => axios({
    url: `/api/gameList/getAll/${id}/${language}`,
    method: 'get',
})
export { getGameDetail }
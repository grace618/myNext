import axios from 'utils/axios'
const getGameDetail = (id, language) => axios({
    url: `/api/website/official/getAll/${id}/${language}`,
    method: 'get',
})
export { getGameDetail }
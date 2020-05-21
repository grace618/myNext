import axios from 'utils/axios'
const newsDetail = (id) => axios({
    url: `/api/news/info/id/${id}`,
    method: 'get',
})
export { newsDetail }
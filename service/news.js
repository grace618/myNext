import axios from 'utils/axios'
const newsDetail = (data) => axios({
    url: `/api/news/info/getDetail`,
    method: 'post',
    data
})
const getList = (data) => axios({
    url: `/api/news/info/list`,
    method: 'post',
    data
})
export { getList, newsDetail }
import axios from 'utils/axios'
const getTurnList = (language) => {
    return axios({
        url: `/api/news/info/getTurnList/${language}`,
        method: 'get',
    })
}
export { getTurnList }
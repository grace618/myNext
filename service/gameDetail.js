import axios from 'utils/axios'
const getGameDetail = (data) => {
    return axios({
        url: `/api/news/introduct/getDetail`,
        method: 'post',
        data
    })
}
export { getGameDetail }
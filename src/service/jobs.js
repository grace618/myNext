import axios from 'utils/axios'
const addRecruitment = (data) => axios({
    url: `/v1/gameList/addRecruitment`,
    method: 'post',
    data
})
export { addRecruitment }
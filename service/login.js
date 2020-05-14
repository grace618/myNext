import axios from 'utils/axios'
const addCollaboration = (data) => axios({
    url: `/v1/gameList/addCollaboration`,
    method: 'post',
    data
})
const uploadFile = (data) => axios({
    url: `/api/operation/file/uploadFile`,
    method: 'post',
    data
})
//登出
const logout = (data) => {
    return axios({
        url: '/api/member/user/logout',
        method: 'post',
        data
    })
}
export { addCollaboration, uploadFile, logout }
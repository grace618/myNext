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
export { addCollaboration, uploadFile }
import axios from 'axios';
const reqInstance = axios.create({})
reqInstance.interceptors.response.use(onRes, onError)
reqInstance.setErrorHandle = setErrorHandle
reqInstance.interceptors.request.use(onReq, (err) => err)

function setErrorHandle({ pass401Paths, unauthorizedCb, forbiddenCb }) {
  reqInstance.unauthorizedCb = unauthorizedCb
  reqInstance.forbiddenCb = forbiddenCb
  reqInstance.pass401Paths = pass401Paths
}

function onReq(config) {
  return config
}

function onRes(res) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`<<< ${res.config.method} ${res.config.url} >>>`)
    console.log('status:', res.status, 'data:', res.data)
  }
  return res
}

function onError(error) {
  let { response } = error
  switch (response.status) {
    // token 過期或錯誤
    case 401:
      if (reqInstance.unauthorizedCb)
        return reqInstance.unauthorizedCb()
    case 403:
      if (reqInstance.forbiddenCb)
        return reqInstance.forbiddenCb()
    default:
      break;
  }
  return response
}

export default reqInstance
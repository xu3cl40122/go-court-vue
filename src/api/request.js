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

let isLoading = false
let loader


function onReq(config) {
  if (!isLoading && !config.skipLoading) {
    isLoading = true
    loader = vm.$loading.show({
      container: null,
      'z-index': 1020,
      canCancel: true,
      loader: 'dots',
      color: '#1b295d',
    })
  }

  return config
}

function onRes(res) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`<<< ${res.config.method} ${res.config.url} >>>`)
    res.config.skipLoading && console.log('skipLoading')
    res.config.keepLoading && console.log('keepLoading')
    console.log('status:', res.status, 'data:', res.data)
  }
  if (isLoading && !res.config.keepLoading) {
    isLoading = false
    loader?.hide()
  }
  return res
}

function onError(error) {
  loader?.hide()
  let { response } = error
  // if (!response) return error
  let path = response.data?.path
  switch (response.status) {
    // token 過期或錯誤
    case 401:
      if (!reqInstance.pass401Paths.includes(path) && reqInstance.unauthorizedCb)
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
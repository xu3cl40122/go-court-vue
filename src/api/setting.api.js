import q from '@/api/request'

let apiPath = ''

export function getSetting() {
  const pathMap = {
    development: '/setting.json'
  }
  let url = pathMap[process.env.NODE_ENV]
  return q.get(url)
}

export function setApiPaths(setting) {
  apiPath = setting.apiPath
}

export {
  apiPath
}
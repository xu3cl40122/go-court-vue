import q from '@/api/request'

let apiPath = ''

export function getSetting(option) {
  const pathMap = {
    development: '/setting.json'
  }
  let url = pathMap[process.env.NODE_ENV]
  return q.get(url, option)
}

export function setApiPaths(setting) {
  apiPath = setting.apiPath
}

export {
  apiPath
}
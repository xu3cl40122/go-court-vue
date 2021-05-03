const apiPath = process.env.VUE_APP_API_PATH
import q from './request'

export function queryCourts({ params, option }) {
  let url = `${apiPath}/courts`
  return q.get(url, { ...option, params })
}

export function getCourtById({ court_id, option }) {
  let url = `${apiPath}/courts/${court_id}`
  return q.get(url, { ...option })
}




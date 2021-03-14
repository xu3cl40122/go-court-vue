import { apiPath } from './setting.api'
import q from './request'

export function queryCourts({ params, option }) {
  let url = `${apiPath}/courts`
  return q.get(url, { ...option, params })
}

export function searchCourts({ params, option }) {
  let url = `${apiPath}/courts/search`
  return q.get(url, { ...option, params })
}

export function getCourtById({ court_id, option }) {
  let url = `${apiPath}/courts/${court_id}`
  return q.get(url, { ...option })
}




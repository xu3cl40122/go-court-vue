import { apiPath } from './setting.api'
import q from './request'

export function queryGames({ params, option }) {
  let url = `${apiPath}/games`
  return q.get(url, { ...option, params })
}

export function login({ params, option }) {
  let url = `${apiPath}/auth/login`
  return q.post(url, params, option)
}

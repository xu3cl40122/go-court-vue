import { apiPath } from './setting.api'
import q from './request'

export function checkout({ body, option }) {
  let url = `${apiPath}/games/checkout`
  return q.post(url, body, option)
}

export function getMyTickets({ params, option }) {
  let url = `${apiPath}/games/tickets`
  return q.get(url, { ...option, params })
}


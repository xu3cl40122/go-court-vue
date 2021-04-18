const apiPath = process.env.VUE_APP_API_PATH
import q from './request'

export function checkout({ body, option }) {
  let url = `${apiPath}/games/checkout`
  return q.post(url, body, option)
}

export function getMyTickets({ params, option }) {
  let url = `${apiPath}/games/tickets`
  return q.get(url, { ...option, params })
}

export function getTicketById({ game_ticket_id, option }) {
  let url = `${apiPath}/games/tickets/${game_ticket_id}`
  return q.get(url, { ...option })
}

export function verifyTicket({ game_id, game_ticket_id, option }) {
  let url = `${apiPath}/games/${game_id}/tickets/${game_ticket_id}/verify`
  return q.put(url, {}, { ...option })
}


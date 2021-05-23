const apiPath = process.env.VUE_APP_API_PATH
import q from './request'

export function checkout({ body, option }) {
  let url = `${apiPath}/tickets/checkout`
  return q.post(url, body, option)
}

export function getMyTickets({ params, option }) {
  let url = `${apiPath}/tickets`
  return q.get(url, { ...option, params })
}

export function getGameTickets({ game_id, params, option }) {
  let url = `${apiPath}/tickets/games/${game_id}/tickets`
  return q.get(url, { ...option, params })
}

export function getTicketById({ game_ticket_id, option }) {
  let url = `${apiPath}/tickets/${game_ticket_id}`
  return q.get(url, { ...option })
}

export function verifyTicket({ game_id, game_ticket_id, option }) {
  let url = `${apiPath}/tickets/games/${game_id}/tickets/${game_ticket_id}/verify`
  return q.put(url, {}, { ...option })
}

export function transferTicket({ game_ticket_id, body, option }) {
  let url = `${apiPath}/tickets/${game_ticket_id}/transfer`
  return q.put(url, body, { ...option })
}


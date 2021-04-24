const apiPath = process.env.VUE_APP_API_PATH
import q from './request'

export function queryGames({ params, option }) {
  let url = `${apiPath}/games`
  return q.get(url, { ...option, params })
}

export function getGameById({ game_id, option }) {
  let url = `${apiPath}/games/${game_id}`
  return q.get(url, { ...option })
}

export function getMyHostGames({ params, option }) {
  let url = `${apiPath}/games/host`
  return q.get(url, { ...option, params })
}

export function postGame({ body, option }) {
  let url = `${apiPath}/games`
  return q.post(url, body, option)
}

export function putGame({ game_id, body, option }) {
  let url = `${apiPath}/games/${game_id}`
  return q.put(url, body, option)
}

export function putGameStock({ game_id, body, option }) {
  let url = `${apiPath}/games/${game_id}/stock`
  return q.put(url, body, option)
}

export function getGameTickets({ game_id, params, option }) {
  let url = `${apiPath}/games/${game_id}/tickets`
  return q.get(url, { ...option, params })
}

export function getGameUsers({ game_id, params, option }) {
  let url = `${apiPath}/games/${game_id}/game_users`
  return q.get(url, { ...option, params })
}

export function initGame({ game_id, body, option }) {
  let url = `${apiPath}/games/${game_id}/init`
  return q.put(url, body, option)
}

export function closeGame({ game_id, body, option }) {
  let url = `${apiPath}/games/${game_id}/close`
  return q.put(url, body, option)
}


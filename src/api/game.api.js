import { apiPath } from './setting.api'
import q from './request'

export function queryGames({ params, option }) {
  let url = `${apiPath}/games`
  return q.get(url, { ...option, params })
}

export function getGameById({ game_id, option }) {
  let url = `${apiPath}/games/${game_id}`
  return q.get(url, { ...option })
}

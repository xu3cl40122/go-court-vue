import { apiPath } from './setting.api'
import q from './request'

export function register({ params, option }) {
  let url = `${apiPath}/register`
  return q.post(url, params, option)
}

export function login({ params, option }) {
  let url = `${apiPath}/auth/login`
  return q.post(url, params, option)
}

export function sendVerification({ params, option }) {
  let url = `${apiPath}/users/verification`
  return q.put(url, params, option)
}

export function enableUser({ params, option }) {
  let url = `${apiPath}/users/enable`
  return q.put(url, params, option)
}

export function getProfile({ option }) {
  let url = `${apiPath}/profile`
  return q.get(url, option)
}
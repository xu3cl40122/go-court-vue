const apiPath = process.env.VUE_APP_API_PATH
import q from './request'

export function register({ params, option }) {
  let url = `${apiPath}/register`
  return q.post(url, params, option)
}

export function login({ params, option }) {
  let url = `${apiPath}/auth/login`
  return q.post(url, params, option)
}

export function socialLogin({ params, option }) {
  let url = `${apiPath}/auth/social_login`
  return q.post(url, params, option)
}

export function sendEnableVerif({ params, option }) {
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

export function putProfile({ body, option }) {
  let url = `${apiPath}/profile`
  return q.put(url, body, option)
}

export function getUserById({ user_id, option }) {
  let url = `${apiPath}/users/${user_id}`
  return q.get(url, option)
}

// 登入狀態下改密碼
export function changePassword({ body, option }) {
  let url = `${apiPath}/users/password`
  return q.put(url, body, option)
}

export function sendForgotVerif({ body, option }) {
  let url = `${apiPath}/forgot/verification`
  return q.put(url, body, option)
}

// 忘記密碼後重設
export function resetPassword({ body, option }) {
  let url = `${apiPath}/forgot/reset_password`
  return q.put(url, body, option)
}


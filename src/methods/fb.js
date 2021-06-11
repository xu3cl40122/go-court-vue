export function promiseFbLogin() {
  return new Promise((resolve, reject) => {
    if(!FB) reject('fb instance not found')
    FB.login(res => resolve(res), { scope: 'email' })
  })
}

export function promiseGetLoginStatus() {
  return new Promise((resolve, reject) => {
    if(!FB) reject('fb instance not found')
    FB.getLoginStatus(res => resolve(res))
  })
}

export function promiseGetFbProfile() {
  return new Promise((resolve, reject) => {
    if(!FB) reject('fb instance not found')
    FB.api('/me', { fields: 'id,name,email,picture.width(400).height(400)' }, res => resolve(res))
  })
}
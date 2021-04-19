const apiPath = process.env.VUE_APP_API_PATH
import q from './request'

export function queryFiles({ params, option }) {
  let url = `${apiPath}/files`
  return q.get(url, { ...option, params })
}

export function postFile({ body, option }) {
  let url = `${apiPath}/files`
  return q.post(url, body, option)
}

export function putFile({ file_id, body, option }) {
  let url = `${apiPath}/files/${file_id}`
  return q.put(url, body, option)
}

export function putFileContent({ file_id, body, option }) {
  let url = `${apiPath}/files/${file_id}/content`
  return q.put(url, body, option)
}

export function deleteFile({ file_id, option }) {
  let url = `${apiPath}/files/${file_id}`
  return q.delete(url, option)
}






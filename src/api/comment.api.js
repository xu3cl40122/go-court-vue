const apiPath = process.env.VUE_APP_COMMENT_API_PATH
import q from './request'

export function queryComments({ params, option }) {
  let url = `${apiPath}/comments`
  return q.get(url, { ...option, params })
}

export function getCommentById({ comment_id, option }) {
  let url = `${apiPath}/comments/${comment_id}`
  return q.get(url, { ...option })
}

export function postComment({ body, option }) {
  let url = `${apiPath}/comments`
  return q.post(url, body, option)
}

export function putComment({ comment_id, body, option }) {
  let url = `${apiPath}/comments/${comment_id}`
  return q.put(url, body, option)
}

export function deleteComment({ comment_id, option }) {
  let url = `${apiPath}/comments/${comment_id}`
  return q.delete(url, option)
}

export function postReply({ comment_id, body, option }) {
  let url = `${apiPath}/comments/${comment_id}/reply`
  return q.post(url, body, option)
}

export function putReply({ comment_id, reply_id, body, option }) {
  let url = `${apiPath}/comments/${comment_id}/reply/${reply_id}`
  return q.put(url, body, option)
}

export function deleteReply({ comment_id, reply_id, option }) {
  let url = `${apiPath}/comments/${comment_id}/reply/${reply_id}`
  return q.delete(url, option)
}


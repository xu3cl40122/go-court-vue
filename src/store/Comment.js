import { Comment } from '@/api/'

const state = () => ({

})

const getters = {

}

const mutations = {
  // setGames: (state, data) => state.games = data,

}

const actions = {
  async queryComments(context, { params, option }) {
    let res = await Comment.queryComments({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

/**
 * get 評論對象統計資訊 平均分數, 評論數...
 * query 要帶 target_id, tag 
 */
  async getStatistics(context, { params, option }) {
    let res = await Comment.getStatistics({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getCommentById(context, { comment_id, option }) {
    let res = await Comment.getCommentById({ comment_id, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async postComment(context, { body, option }) {
    let res = await Comment.postComment({ body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async putComment(context, { comment_id, body, option }) {
    let res = await Comment.putComment({ comment_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async deleteComment(context, { comment_id, option }) {
    let res = await Comment.deleteComment({ comment_id, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async postReply(context, { comment_id, body, option }) {
    let res = await Comment.postReply({ comment_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async putReply(context, { comment_id, reply_id, body, option }) {
    let res = await Comment.putReply({ comment_id, reply_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async deleteReply(context, { comment_id, reply_id, option }) {
    let res = await Comment.deleteReply({ comment_id, reply_id, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },



}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
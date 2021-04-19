import { File } from '@/api/'

const state = () => ({

})

const getters = {

}

const mutations = {
  // setGames: (state, data) => state.games = data,

}

const actions = {
  async queryFiles(context, { params, option }) {
    let res = await File.queryFiles({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async postFile(context, { body, option }) {
    let res = await File.postFile({ body, option })
    let { status, data } = res
    switch (status) {
      case 201:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async putFile(context, { file_id, body, option }) {
    let res = await File.putFile({ file_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async putFileContent(context, { file_id, file, option }) {
    let body = new FormData();
    body.append('file', file)
    option.headers = { "Content-Type": "multipart/form-data" }
    let res = await File.putFileContent({ file_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async deleteFile(context, { file_id, option }) {
    let res = await File.deleteFile({ file_id, option })
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
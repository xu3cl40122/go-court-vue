import { Court } from '@/api/'

const state = () => ({

})

const getters = {

}

const mutations = {
  // setGames: (state, data) => state.games = data,

}

const actions = {
  async queryCourts(context, { params, option }) {
    let res = await Court.queryCourts({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async searchCourts(context, { params, option }) {
    let res = await Court.searchCourts({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getCourtById(context, { court_id, option }) {
    let res = await Court.getCourtById({ court_id, option })
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
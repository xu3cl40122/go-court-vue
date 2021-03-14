import { Ticket } from '@/api/'

const state = () => ({

})

const getters = {

}

const mutations = {
  // setGames: (state, data) => state.games = data,

}

const actions = {
  async checkout(context, { body, option }) {
    let res = await Ticket.checkout({ body, option })
    let { status, data } = res
    switch (status) {
      case 201:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getMyTickets(context, { params, option }) {
    let res = await Ticket.getMyTickets({ params, option })
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
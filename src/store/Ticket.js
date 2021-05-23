import { Ticket } from '@/api/'

const state = () => ({
  ticketStatusMap: {
    PENDING: { label: '未開始', value: 'PENDING', class: 'main' },
    PLAYING: { label: '進行中', value: 'PLAYING', class: 'second' },
    VERIFIED: { label: '已驗證', value: 'VERIFIED', class: 'success' },
  },
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

  async getTicketById(context, { game_ticket_id, option }) {
    let res = await Ticket.getTicketById({ game_ticket_id, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getGameTickets(context, { game_id, params, option }) {
    let res = await Ticket.getGameTickets({ game_id, params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async verifyTicket(context, { game_id, game_ticket_id, option }) {
    let res = await Ticket.verifyTicket({ game_id, game_ticket_id, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async transferTicket(context, { game_ticket_id, body, option }) {
    let res = await Ticket.transferTicket({ game_ticket_id, body, option })
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
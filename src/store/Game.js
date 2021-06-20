
import q from '@/api/request'
import { Game } from '@/api/'

const state = () => ({
  gameTypeMap: {
    MALE_NET: { label: '男網', value: 'MALE_NET', class: '' },
    FEMALE_NET_MIX: { label: '女網混排', value: 'FEMALE_NET_MIX', class: '' },
    FEMAL_NET_PURE: { label: '女網', value: 'FEMAL_NET_PURE', class: '' },
    BEACH: { label: '沙排', value: 'BEACH', class: '' },
  },

  courtTypeMap: {
    INDOOR: { label: '室內', value: 'INDOOR', class: 'success' },
    COVERED: { label: '風雨球場', value: 'COVERED', class: 'info' },
    OUTDOOR: { label: '室外', value: 'OUTDOOR', class: 'main' },
  },

  gameStatusMap: {
    PENDING: { label: '未開始', value: 'PENDING', class: 'info' },
    PLAYING: { label: '進行中', value: 'PLAYING', class: 'second' },
    FINISHED: { label: '已結束', value: 'FINISHED', class: 'success' },
  },

  games: []

})

const getters = {
  getGameTypeOptions: (state) => Object.values(state.gameTypeMap).map(d => d),
  getCourtTypeOptions: (state) => Object.values(state.courtTypeMap).map(d => d),

}

const mutations = {
  setLoginParams: (state, data) => state.loginParams = data,
  setGames: (state, data) => state.games = data,

}

const actions = {
  async queryGames(context, { params, option }) {
    let res = await Game.queryGames({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        context.commit('setGames', data.content)
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },
  
  async queryPopularGames(context, { params, option }) {
    let res = await Game.queryPopularGames({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getGameById(context, { game_id, option }) {
    let res = await Game.getGameById({ game_id, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async postGame(context, { body, option }) {
    let res = await Game.postGame({ body, option })
    let { status, data } = res
    switch (status) {
      case 201:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async putGame(context, { game_id, body, option }) {
    let res = await Game.putGame({ game_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async putGameStock(context, { game_id, body, option }) {
    let res = await Game.putGameStock({ game_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getMyHostGames(context, { params, option }) {
    let res = await Game.getMyHostGames({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getGameUsers(context, { game_id, params, option }) {
    let res = await Game.getGameUsers({ game_id, params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async initGame(context, { game_id, body, option }) {
    let res = await Game.initGame({ game_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },
  
  async initGameUsers(context, { game_id, body, option }) {
    let res = await Game.initGameUsers({ game_id, body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },
  
  async closeGame(context, { game_id, body, option }) {
    let res = await Game.closeGame({ game_id, body, option })
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
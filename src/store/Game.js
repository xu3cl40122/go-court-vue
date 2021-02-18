
import q from '@/api/request'
import { Game } from '@/api/'

const state = () => ({
  gameTypeMap: {
    MALE_NET: '男網',
    FEMALE_NET_MIX: '女網混排',
    FEMAL_NET_PURE: '女網',
    BEACH: '沙排',
  },

  courtTypeMap: {
    INDOOR: '室內',
    COVERED: '風雨球場',
    OUTDOOR: '室外',
  },

})

const getters = {
  getGameTypeOptions: (state) => Object.keys(state.gameTypeMap).map(key => {
    return { label: state.gameTypeMap[key], value: key }
  }),
  getCourtTypeOptions: (state) => Object.keys(state.courtTypeMap).map(key => {
    return { label: state.courtTypeMap[key], value: key }
  })
}

const mutations = {
  setLoginParams: (state, data) => state.loginParams = data,

}

const actions = {
  async queryGames(context, { params, option }) {
    let res = await Game.queryGames({ params, option })
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
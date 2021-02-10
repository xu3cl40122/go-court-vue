
import { Setting } from '@/api/'

const state = () => ({
  setting: {}

})

const getters = {

}

const mutations = {
  setSetting: (state, setting) => state.setting = setting
}

const actions = {
  async getSetting(context) {
    let res = await Setting.getSetting()
    switch (res.status) {
      case 200:
        context.commit('setSetting', res.data)
        Setting.setApiPaths(res.data)
        break;
      default:
        break;
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
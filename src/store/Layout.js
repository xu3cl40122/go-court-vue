
const state = () => ({
  isSidebarOpen: false

})

const getters = {

}

const mutations = {
  setSidebarOpen: (state, open) => state.isSidebarOpen = open
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
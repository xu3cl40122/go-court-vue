
const state = () => ({
  userDialogOpen: false,
  userDialogInfo: {}

})

const getters = {

}

const mutations = {
  openDialog: (state, { name, info = {} }) => {
    state[`${name}Open`] = true
    state[`${name}Info`] = info
  },
  closeDialog: (state, name) => state[`${name}Open`] = false
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

const state = () => ({
  userDialogOpen: false,
  userDialogInfo: {},

  messageDialogOpen: false,
  messageDialogInfo: {},

})

const getters = {

}

const mutations = {
  setDialog: (state, { name, info = {}, open = true }) => {
    state[`${name}Open`] = open
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
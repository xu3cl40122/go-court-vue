import { createStore } from 'vuex'
import Layout from './Layout'
import Dialog from './Dialog'
import Setting from './Setting'
import User from './User'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    async initApp(context) {
      await context.dispatch('Setting/getSetting')
    }
  },
  modules: {
    Layout,
    Dialog,
    Setting,
    User
  }
})

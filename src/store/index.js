import { createStore } from 'vuex'
import Layout from './Layout'
import Dialog from './Dialog'
import Setting from './Setting'
import User from './User'
import Game from './Game'
import Ticket from './Ticket'
import Court from './Court'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    async initApp(context) {
      await context.dispatch('Setting/getSetting')
      await context.dispatch('User/setErrorHandle')
      await context.dispatch('User/autoLogin')
    }
  },
  modules: {
    Layout,
    Dialog,
    Setting,
    User,
    Game,
    Ticket,
    Court
  }
})

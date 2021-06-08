import { createStore } from 'vuex'
import Layout from './Layout'
import Dialog from './Dialog'
import Setting from './Setting'
import User from './User'
import Game from './Game'
import Ticket from './Ticket'
import Court from './Court'
import File from './File'
import Comment from './Comment'

export default createStore({
  state: {
    inited: false
  },
  mutations: {
    setInited: (state, bool) => state.inited = bool
  },
  actions: {
    async initApp(context) {
      await context.dispatch('User/setErrorHandle')
      await context.dispatch('User/autoLogin')
      await context.dispatch('User/FBAutoLogin')
    
      context.commit('setInited', true)
    }
  },
  modules: {
    Layout,
    Dialog,
    Setting,
    User,
    Game,
    Ticket,
    Court,
    File,
    Comment,
  }
})

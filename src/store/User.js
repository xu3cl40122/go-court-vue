
import { User } from '@/api/'
import q from '@/api/request'

const state = () => ({
  // 註冊流程時暫存帳密
  loginParams: {},
  user: {},
  isLogin: false,

})

const getters = {

}

const mutations = {
  setLoginParams: (state, data) => state.loginParams = data,
  setUser: (state, user) => state.user = user,
  setIsLogin: (state, boolean) => state.isLogin = boolean,
}

const actions = {
  async setErrorHandle(context) {
    let pass401Paths = ['/auth/login']
    let unauthorizedCb = () => context.dispatch('logout')
    q.setErrorHandle({ pass401Paths, unauthorizedCb })
  },

  async register(context, { params, option }) {
    let res = await User.register({ params, option })
    let { status, data } = res
    switch (status) {
      case 201:
        return { success: true, status, data }
      default:
        return { success: false, status, message: '' }
    }
  },

  async login(context, { params, option }) {
    let res = await User.login({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        let jwtToken = res.headers.authorization
        context.dispatch('onLoginSuccess', { jwtToken })
        return { success: true, status, data }
      default:
        return { success: false, status, message: res.data?.message }
    }
  },

  async autoLogin(context) {
    let jwtToken = localStorage.getItem(process.env.VUE_APP_TOKEN_NAME)
    if (!jwtToken) return
    q.defaults.headers.common['Authorization'] = jwtToken
    await context.dispatch('getProfile', { option: {} })
    context.commit('setIsLogin', true)
  },

  async FBAutoLogin(context) {
    if (!window.FB) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '147041934150129',
          cookie: true,
          xfbml: true,
          version: 'v10.0'
        });

        FB.AppEvents.logPageView();

        FB.getLoginStatus(function (response) {
        });
        // FB.login(function(response){
        //   // handle the response 
        // });

      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }

  },

  async onLoginSuccess(context, { jwtToken }) {
    q.defaults.headers.common['Authorization'] = jwtToken
    localStorage.setItem(process.env.VUE_APP_TOKEN_NAME, jwtToken)
    await context.dispatch('getProfile', { option: {} })
    context.commit('setIsLogin', true)
  },

  async logout(context) {
    localStorage.removeItem(process.env.VUE_APP_TOKEN_NAME)
    window.location.href = window.location.origin
  },

  async getProfile(context, { option }) {
    let res = await User.getProfile({ option })
    let { status, data } = res
    switch (status) {
      case 200:
        context.commit('setUser', data)
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async putProfile(context, { body, option }) {
    let res = await User.putProfile({ body, option })
    let { status, data } = res
    switch (status) {
      case 200:
        context.commit('setUser', data)
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async sendVerification(context, { params, option }) {
    let res = await User.sendVerification({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async enableUser(context, { params, option }) {
    let res = await User.enableUser({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, data }
      default:
        return { success: false, status, message: data?.message }
    }
  },

  async getUserById(context, { user_id, option }) {
    let res = await User.getUserById({ user_id, option })
    let { status, data } = res
    switch (status) {
      case 200:
        context.commit('setUser', data)
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
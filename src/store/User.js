
import { User } from '@/api/'
import q from '@/api/request'

const state = () => ({
  // 註冊流程時暫存帳密
  loginParams: {}

})

const getters = {

}

const mutations = {
  setLoginParams: (state, data) => state.loginParams = data
}

const actions = {
  async register(context, { params, option }) {
    let res = await User.register({ params, option })
    let { status, data } = res
    switch (status) {
      case 201:
        return { success: true, status, ...data }
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
        return { success: true, status, ...data }
      default:
        return { success: false, status, message: res.data?.message }
    }
  },

  async onLoginSuccess(context, { jwtToken }) {
    q.defaults.headers.common['Authorization'] = jwtToken
    localStorage.setItem(process.env.VUE_APP_TOKEN_NAME, jwtToken)

  },
  
  async sendVerification(context, { params, option }) {
    let res = await User.sendVerification({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, ...data }
      default:
        return { success: false, status, message: res.data?.message }
    }
  },

  async enableUser(context, { params, option }) {
    let res = await User.enableUser({ params, option })
    let { status, data } = res
    switch (status) {
      case 200:
        return { success: true, status, ...data }
      default:
        return { success: false, status, message: res.data?.message }
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
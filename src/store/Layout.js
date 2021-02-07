
const state = () => ({
  isSidebarOpen: false,
  sidebarMenu: {
    login: { label: '登入', path: '', event: 'login' },
    register: { label: '註冊', path: '', event: 'register' },
    logout: { label: '登出', path: '/logout' },
    profile: { label: '個人檔案', path: '/profile' },
    myGame: { label: '我的比賽', path: '/myGame' },
  }

})

const getters = {
  getMenu: state => (features) => {
    let menu = features.map(key => state.sidebarMenu[key]).filter(d => d)
    return menu
  }
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
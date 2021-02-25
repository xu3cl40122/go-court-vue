
const state = () => ({
  isSidebarOpen: false,
  isSidePanelOpen: false,

  sidebarMenu: {
    login: { label: '登入', path: '', event: 'login' },
    register: { label: '註冊', path: '', event: 'register' },
    logout: { label: '登出', path: '', event: 'logout' },
    // profile: { label: '個人檔案', path: '/profile' },
    // myGame: { label: '我的比賽', path: '/myGame' },
  },

  showNavbar: true,
  navbarMenu: {
    home: { label: '主頁', icon: 'fas fa-home', class: '', path: '/' },
    games: { label: '找球賽', icon: 'fas fa-search', class: '', path: '/games' },
    myGames: { label: '球賽管理', icon: 'fas fa-trophy', class: '', path: '/myGames' },
    myTickets: { label: '我的票夾', icon: 'fas fa-ticket-alt', class: '', path: '/myTickets' },
    profile: { label: '個人檔案', icon: 'fas fa-user', class: '', path: '/profile' },
  },

  headers: [
    {},
    {
      type: 'title',
      title: 'GO COURT'
    },
    {
      type: 'icons',
      icons: [{ icon: 'fas fa-bars', class: '', event: 'toggleSidebar' }]
    },
  ]

})

const getters = {
  getMenu: state => (features) => {
    return features.map(key => state.sidebarMenu[key]).filter(d => d)
  },
  getNavbarMenu: state => (features) => {
    return features.map(key => state.navbarMenu[key]).filter(d => d)
  }
}

const mutations = {
  setSidebarOpen: (state, open) => state.isSidebarOpen = open,
  setSidePanelOpen: (state, open) => state.isSidePanelOpen = open,
  setHeaders: (state, headers) => state.headers = headers,
  setShowNavbar: (state, show) => state.showNavbar = show,
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
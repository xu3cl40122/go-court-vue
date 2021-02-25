import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import Games from '@/views/games/games.vue'
import GameDetail from '@/views/games/game-detail.vue'
import store from '@/store/'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/games/:game_id',
    name: 'GameDetail',
    component: GameDetail,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let { name } = to
  switch (name) {
    case 'GameDetail':
      store.commit('Layout/setHeaders', [
        {
          type: 'icons',
          icons: [{ icon: 'fas fa-chevron-left', class: '', event: 'back' }]
        },
        {
          type: 'title',
          title: 'GO COURT'
        },
        {
          type: 'icons',
          icons: [{ icon: 'fas fa-bars', class: '', event: 'toggleSidebar' }]
        },
      ])
      store.commit('Layout/setShowNavbar', false)
      break;
    default:
      store.commit('Layout/setHeaders', [
        {},
        {
          type: 'title',
          title: 'GO COURT'
        },
        {
          type: 'icons',
          icons: [{ icon: 'fas fa-bars', class: '', event: 'toggleSidebar' }]
        },
      ])
      store.commit('Layout/setShowNavbar', true)
      break;
  }

  next()
})

export default router

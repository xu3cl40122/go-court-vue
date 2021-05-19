import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import Games from '@/views/games/games.vue'
import GameDetail from '@/views/games/game-detail.vue'
import HostGameDetail from '@/views/games/host-game-detail.vue'
import Tickets from '@/views/tickets/'
import MyGames from '@/views/myGames/myGames'
import Profile from '@/views/profile/profile'
import Courts from '@/views/courts/courts'
import CourtDetail from '@/views/courts/courtDetail'
import Refresh from '@/views/refresh'
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
  {
    path: '/games/host/:game_id',
    name: 'HostGameDetail',
    component: HostGameDetail,
    props: true
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/myGames',
    name: 'MyGames',
    component: MyGames,
  },
  {
    path: '/courts',
    name: 'Courts',
    component: Courts,
  },
  {
    path: '/courts/:court_id',
    name: 'CourtDetail',
    component: CourtDetail,
    props: true
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: Refresh,
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let { name } = to
  switch (name) {
    case 'Courts':
      store.commit('Layout/setLayout', 'empty')
      break
    case 'GameDetail':
    case 'HostGameDetail':
      store.commit('Layout/setLayout', 'default')
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
      store.commit('Layout/setLayout', 'default')
      store.commit('Layout/setHeaders', [
        {
          type: 'logo',
        },
        {},
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

<template lang="pug">
.Sidebar(:class="isSidebarOpen ? 'show' : ''")
  .menu.grid 
    .col(v-for="(col, i) of menu", :key="i", @click="clickCol(col)") {{ col.label }}
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Sidebar',
  props: {

  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const isSidebarOpen = computed(() => store.state.Layout.isSidebarOpen)

    const menu = computed(() => {
      let features = ['login', 'register', 'profile', 'myGame']
      return store.getters['Layout/getMenu'](features)
    })


    function clickCol(col) {
      toggleSidebar()
      col.path
        ? router.push({ path: col.path })
        : this[col.event]()
    }

    function toggleSidebar() {
      store.commit('Layout/setSidebarOpen', !isSidebarOpen.value)
    }

    function login() {
      store.commit('Dialog/openDialog', {
        name: 'userDialog',
        info: { type: 'login' }
      })
    }

    function register() {
      store.commit('Dialog/openDialog', {
        name: 'userDialog',
        info: { type: 'register' }
      })
    }

    return {
      isSidebarOpen,
      menu,
      clickCol,
      login,
      register
    }
  }
}
</script>

<style lang="sass" scoped>
.Sidebar
  position: fixed
  top: $headerH
  left: 0
  height: calc(100% - #{$headerH})
  width: 100%
  background-color: $second_c
  transform: translateX(-100%)
  transition: transform .3s ease-in-out
  z-index: $headerZ
  &.show
    transform: translateX(0)

.menu
  display: grid
  grid-template-columns: 1fr
  padding-top: 10%

.col
  padding: .5rem 0
  color: #333
  font-size: 1.5rem
  text-align: center
  font-weight: 600
</style>
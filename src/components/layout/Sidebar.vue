<template lang="pug">
.Sidebar(:class="isSidebarOpen ? 'show' : ''")
  .menu.grid 
    .col(v-for="(col, i) of menu", :key="i") {{ col.label }}
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Sidebar',
  props: {

  },
  setup(props) {
    const store = useStore()
    const isSidebarOpen = computed(() => store.state.Layout.isSidebarOpen)
    const menu = computed(() => {
      let features = ['login', 'profile', 'myGame']
      return store.getters['Layout/getMenu'](features)
    })

    return {
      isSidebarOpen,
      menu
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
  color: main_c
  font-size: 1.5rem
  text-align: center
  font-weight: 600
</style>
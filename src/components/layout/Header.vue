<template lang="pug">
header.Header.grid.v-center
  i.fas.fa-bars
  h1.title GO COURT
  
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  props: {

  },
  setup(props) {
    const store = useStore()
    const isSidebarOpen = computed(() => store.state.Layout.isSidebarOpen)
    const toggleSidebar = () => store.commit('Layout/setSidebarOpen', !isSidebarOpen.value)

    return {
      isSidebarOpen,
      toggleSidebar

    }
  }
}
</script>

<style lang="sass" scoped>
.Header
  height: $headerH
  grid-template-columns: 50px 1fr 50px
  padding: 0 1rem
  background-color: $main_c
  color: #fff
  .title
    font-size: 1.25rem
    text-align: center
</style>
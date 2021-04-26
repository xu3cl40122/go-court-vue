<template lang="pug">
.Navbar.grid(:style="gridStyle")
  .col.flex.h-center.v-center.column(v-for="(col, i) of menu" :key="i" @click="clickCol(col)"
    :class="[path === col.path && 'active']")
    i(:class="col.icon")
    .label {{ col.label }}

</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  props: {},
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const path = computed(() => route.path)
    const features = computed(() => store.state.User.isLogin
      ? ['home', 'games', 'myGames', 'myTickets', 'profile']
      : ['home', 'games']
    )
    const menu = computed(() => store.getters['Layout/getNavbarMenu'](features.value))
    const gridStyle = computed(() => {
      return {
        'grid-template-columns': `repeat(${features.value.length}, 1fr)`
      }
    })

    function clickCol(col) {
      let { path, event } = col
      col.path ? router.push({ path }) : ''
    }

    return {
      menu,
      gridStyle,
      path,
      clickCol,

    }
  }
}
</script>

<style lang="sass" scoped>
.Navbar 
  position: fixed 
  bottom: 0 
  left: 0
  height: $navbarH
  width: 100%
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1)
  border-radius: 8px 8px 0 0
  overflow: hidden
  background-color: #fff
  .col
    @include setTextStyle(.75rem, normal, #333)
    &.active 
      color: $main_c
      font-weight: 600
    i 
      font-size: 16px
      margin-bottom: 4px
</style>


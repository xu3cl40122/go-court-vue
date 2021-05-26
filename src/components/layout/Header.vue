<template lang="pug">
header.Header.grid.v-center(:class="className")
  .col(v-for="(col, i) of headers" :key="i" :class="[col.class,  i === headers.length -1 && 'right']")
    template(v-if="col.type === 'icons'")
      i.pointer(v-for="(icon, j) of col.icons" :key="j" :class="[icon.icon, icon.class]" @click="onIconClick(icon)")
    template(v-else-if="col.type === 'title'")
      router-link(to="/")
        h1.title {{ col.title }}
    template(v-else-if="col.type === 'logo'")
      router-link(to="/")
        .logo.flex.v-center
          img(:src="imgWhiteSrc")
          span GO COURT 
  
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import logoImg from '@/assets/image/logo.png'
import logoWhiteImg from '@/assets/image/logo_white.png'

export default {
  name: 'Header',
  props: {
    className: String
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const isSidebarOpen = computed(() => store.state.Layout.isSidebarOpen)
    const headers = computed(() => store.state.Layout.headers)
    let imgSrc = ref(logoImg)
    let imgWhiteSrc = ref(logoWhiteImg)

    function onIconClick(icon) {
      let { event, args } = icon
      if (event)
        this[event](args)
    }

    const toggleSidebar = () => {
      store.commit('Layout/setSidebarOpen', !isSidebarOpen.value)
    }

    function back() {
      let url = router.go(-1)
    }

    return {
      headers,
      isSidebarOpen,
      toggleSidebar,
      onIconClick,
      back,
      imgSrc,
      imgWhiteSrc
    }
  }
}
</script>

<style lang="sass" scoped>
.Header
  height: $headerH
  grid-template-columns: auto 1fr auto
  padding: 0 1rem
  background-color: $main_c
  color: #fff
  z-index: $headerZ
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 10%)
  &.white
    background-color: #fff
    color: $main_c
  .title
    font-size: 1.25rem
    text-align: center
  .col
    min-width: 50px
    &.right
      text-align: right

  .logo
    img
      height: 40px
      width: auto
      margin-right: .5rem 
</style>
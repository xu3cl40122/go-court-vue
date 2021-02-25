<template lang="pug">
header.Header.grid.v-center
  .col(v-for="(col, i) of headers" :key="i" :class="[i === headers.length -1 && 'right']")
    template(v-if="col.type === 'icons'")
      i.pointer(v-for="(icon, j) of col.icons" :key="j" :class="[icon.icon, icon.class]" @click="onIconClick(icon)")
    template(v-else-if="col.type === 'title'")
      h1.title {{ col.title }}
  
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  props: {

  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const isSidebarOpen = computed(() => store.state.Layout.isSidebarOpen)
    const headers = computed(() => store.state.Layout.headers)

    function onIconClick(icon) {
      let { event, args } = icon
      if (event)
        this[event](args)
    }

    const toggleSidebar = () => {
      store.commit('Layout/setSidebarOpen', !isSidebarOpen.value)
    }

    function back() {
      router.go(-1)
    }

    return {
      headers,
      isSidebarOpen,
      toggleSidebar,
      onIconClick,
      back
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
  .col
    &.right
      text-align: right
</style>
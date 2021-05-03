<template lang="pug">
.Home
  button.gc-btn.main.full(@click="toMapPage") 球場地圖
  //- TabBlocks(v-model:tabIndex="tabIndex" :tabs="tabs")
  //- SearchPanel
</template>

<script>
import SearchPanel from '@/components/public/SearchPanel'
import TabBlocks from '@/components/unit/TabBlocks'
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    TabBlocks
  },
  setup() {
    let router = useRouter()
    let tabIndex = ref(0)
    let tabs = reactive([
      { icon: 'fas fa-volleyball-ball', label: '找比賽', value: 'game' },
      { icon: 'fas fa-map-marked-alt', label: '找球場', value: 'court' },
    ])

    function toMapPage() {
      router.push({ name: 'Courts' })
    }

    return {
      tabIndex,
      tabs,
      router,
      toMapPage
    }
  }
}
</script>

<style lang="sass" scoped>
.Home
  padding: 1rem
</style>

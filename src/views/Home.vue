<template lang="pug">
.Home
  TabBlocks(v-model:tabIndex="tabIndex" :tabs="tabs")
  SearchPanel
</template>

<script>
import SearchPanel from '@/components/public/SearchPanel'
import TabBlocks from '@/components/unit/TabBlocks'
import { ref, computed, reactive } from 'vue'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    TabBlocks
  },
  setup() {
    let tabIndex = ref(0)
    let tabs = reactive([
      { icon: 'fas fa-volleyball-ball', label: '找比賽', value: 'game' },
      { icon: 'fas fa-map-marked-alt', label: '找球場', value: 'court' },
    ])

    return {
      tabIndex,
      tabs,
    }
  }
}
</script>

<style lang="sass" scoped>
.Home
  padding: 1rem
</style>

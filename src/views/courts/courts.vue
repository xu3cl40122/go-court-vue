<template lang="pug">
.CourtsPage 
  CourtMap

  SidePanel(v-model:isOpen="isPanelOpen" title="搜尋球場")
    CourtSearchPanel(v-model:queryParams="queryParams")

</template>

<script>
import CourtMap from '@/components/court/CourtMap'
import CourtSearchPanel from '@/components/court/CourtSearchPanel'
import SidePanel from '@/components/layout/SidePanel'

export default {
  name: 'CourtsPage',
  components: {
    CourtMap,
    SidePanel,
    CourtSearchPanel
  },
  data() {
    return {
      isPanelOpen: true,
      queryParams: {}
    }
  }
}
</script>

<style lang="sass" scoped>
.CourtsPage 
  height: 100%
</style>
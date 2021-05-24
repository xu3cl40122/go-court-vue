<template lang="pug">
.CourtsPage 
  CourtMap(:courts="courts" @markerClick="markerClick")
  MapSearchBar.bar(:queryParams="queryParams" @back="back" @clickBar="clickBar")

  .cards.flex 
    CourtCard(v-for="(court, i) of courts" :id="`court_${i}`" :key="i" :court="court" @clickCard="clickCard(court)")
  SidePanel(v-model:isOpen="isPanelOpen" title="搜尋球場")
    CourtSearchPanel(v-model:queryParams="queryParams")

</template>

<script>
import CourtMap from '@/components/court/CourtMap'
import CourtCard from '@/components/court/CourtCard'
import MapSearchBar from '@/components/court/MapSearchBar'
import CourtSearchPanel from '@/components/court/CourtSearchPanel'
import SidePanel from '@/components/layout/SidePanel'

export default {
  name: 'CourtsPage',
  components: {
    CourtMap,
    SidePanel,
    CourtSearchPanel,
    MapSearchBar,
    CourtCard
  },

  watch: {
    queryParams: {
      handler(val) {
        this.isPanelOpen = false
        this.queryCourts()
      }
    }
  },
  data() {
    return {
      itemRefs: [],
      courts: [],
      isPanelOpen: true,
      queryParams: {
        city_code: "63000", dist_code: "",
      }
    }
  },
  mounted() {
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },

    async queryCourts() {
      let params = { ...this.queryParams, size: 999 }
      let option = { skipLoading: true }
      let { sucess, data } = await this.$store.dispatch('Court/queryCourts', { params, option })
      this.courts = data.content
    },

    markerClick(index) {
      let el = document.getElementById(`court_${index}`)
      el.scrollIntoView({
        behavior: "smooth"
      })
    },

    clickCard(court) {
      let { court_id } = court
      this.$router.push({ name: 'CourtDetail', params: { court_id } })
    },

    clickBar() {
      this.isPanelOpen = true
    },

    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>
.CourtsPage 
  position: relative
.bar 
  position: absolute 
  width: 80%
  top: 1rem
  left: 50% 
  transform: translateX(-50%)
.cards 
  position: absolute 
  width: 100%
  bottom: 1rem
  padding: 0 1.5rem
  overflow-x: scroll
  scroll-snap-type: x mandatory
  scroll-padding: 1rem
  // scroll-snap-points-x: repeat(300px)
  > * 
    flex: 0 0 auto
    margin-right: 1rem
    scroll-snap-align: start


</style>
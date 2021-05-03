<template lang="pug">
.MapSearchBar.flex.v-center.h-center(@click="clickBar")
  i.fas.fa-chevron-left.back(@click.stop="back")
  .area
    span {{ displayQuery.city_code }} / 
    span {{ displayQuery.dist_code }}
  
</template>

<script>
import { getDistrictCodeMap } from '@/methods/district'
export default {
  name: 'MapSearchBar',
  props: {
    queryParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  computed: {
    codeMap() {
      return getDistrictCodeMap()
    },

    displayQuery() {
      let { city_code, dist_code } = this.queryParams
      return {
        city_code: this.codeMap[city_code],
        dist_code: this.codeMap[dist_code],
      }
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },

    clickBar() {
      this.$emit('clickBar')
    }
  }
}
</script>

<style lang="sass" scoped>
.MapSearchBar
  position: relative 
  background-color: #f7f7f7
  border-radius: 30px
  padding: .75rem 1rem
  box-shadow: 0px 2px 4px rgb(0 0 0 / 18%)
  .back
    position: absolute
    left: .5rem 
    padding: .5rem 

</style>
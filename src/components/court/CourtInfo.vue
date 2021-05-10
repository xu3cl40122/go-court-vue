<template lang="pug">
.CourtInfo 
  h3.title {{ court.name }}
  .address.pointer(@click="showGoogleMap(court.name)")
    span {{ court.address }}
    i.fas.fa-map-marker-alt
  .phone {{ court.phone }}
  .description {{ court.description }}

</template>

<script>
export default {
  name: 'CourtInfo',
  props: {
    court: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  methods: {
    showGoogleMap(placeName) {
      let url = `https://www.google.com.tw/maps/search/${placeName}/`
      window.open(url, 'map', 'noopener noreferrer')
    }
  }
}
</script>

<style lang="sass" scoped>
.CourtInfo
  .title 
    color: $main_c
    margin-bottom: .5rem
  .address, .phone
    margin-bottom: .25rem
  .address 
    text-decoration: underline
    color: $info_c
    span 
      margin-right: .25rem
</style>
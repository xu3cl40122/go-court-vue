<template lang="pug">
.CourtCard.flex
  .img(:style="{'background-image': `url(${court.logo_url || defaultImg})`}")
    //- .defaultImg(:style="{'background-image': `url(${defaultImg})`}")
  .infoPart 
    .name {{ court.name }}
    .address {{ court.address }}
    .description {{ court.description }}

</template>

<script>
import defaultImg from '@/assets/image/default.jpg'

export default {
  name: 'CourtCard',
  props: {
    court: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      defaultImg
    }
  },
  computed() {

  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
$h: 105px
.CourtCard 
  width: 100%
  height: $h
  background-color: #fff
  border-radius: 8px 
  overflow: hidden
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px 
.img
  position: relative
  width: $h
  height: $h
  z-index: 1
  @include bgImgSetting()
.infoPart 
  padding: 1rem 
  .name 
    color: $main_c
    margin-bottom: .5rem
  .address 
    color: #333 
    font-size: .875rem
    margin-bottom: .25rem
    @include limitRow(0, 1)
  .description 
    color: #333 
    font-size: .875rem
    @include limitRow(0, 1)
  

</style>
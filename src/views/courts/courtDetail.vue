<template lang="pug">
.CourtDetailPage
  //- .carouselWrapper
  Carousel(:carousel="carousel")
 

</template>

<script>
import 'swiper/swiper-bundle.css'
import Carousel from '@/components/public/Carousel'
import redMarker from '@/assets/image/marker-red.svg'

import defaultImg from '@/assets/image/default.jpg'
export default {
  name: 'CourtDetailPage',
  components: {
    Carousel,
  },
  props: {
    court_id: String
  },
  data() {
    return {
      defaultImg,
      carousel: [
        { src: defaultImg },
        { src: redMarker },
      ]
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
.carouselWrapper 
  height: 240px
img 
  height: 300px
  width: 100%
</style>
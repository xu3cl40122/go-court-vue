<template lang="pug">
.Carousel
  Swiper(:slides-per-view="1" :space-between="0" :pagination="pageSetting"   
    @swiper="onSwiper" @slideChange="onSlideChange")
    SwiperSlide(v-for="(item, i) in carousel")
      .img(:style="{'background-image':`url(${item.src})`}")
</template>

<script>
import 'swiper/swiper-bundle.min.css'
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);
import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
  name: 'Carousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    carousel: {
      type: Array,
      default() {
        return [
          { src: '', link: '' }
        ]
      }
    }
  },
  computed: {
    pageSetting() {
      return this.carousel.length > 1 ? { clickable: true } : false
    }
  },
  methods: {
    onSwiper(swiper) {

    },
    onSlideChange() {

    },
  }

}
</script>

<style lang="sass" scoped>
.img 
  height: 240px 
  @include bgImgSetting()
</style>
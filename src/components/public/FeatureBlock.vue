<template lang="pug">
.FeatureBlock(@click="clickBlock") 
  .infoPart 
    h3.title {{ info.title }}
    .des {{ info.description }}
    button.gc-btn.main.white.small {{ info.btnText }}
  .img(:style="{'background-image': `url(${info.imgSrc})`}")
  
</template>

<script>
import defaultImg from '@/assets/image/default.jpg'

export default {
  name: 'FeatureBlock',
  props: {
    info: {
      type: Object,
      default() {
        return {
          title: '球場地圖',
          description: '探索沒去過的球場，認識新球友',
          imgSrc: defaultImg,

        }
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    clickBlock() {
      if (this.info.callback)
        this.info.callback()
    }
  }
}
</script>

<style lang="sass" scoped>
.FeatureBlock
  border-radius: 16px 
  overflow: hidden
.infoPart 
  padding: 1.5rem 2rem
  text-align: center
  color:#fff
  background-color: #232323
  h3
    margin-bottom: .5rem 
  .des 
    margin-bottom: .75rem
.img
  height: 150px
  @include bgImgSetting()

</style>
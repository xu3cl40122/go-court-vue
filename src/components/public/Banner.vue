<template lang="pug">
.Banner
    .bg(:style="{'background-image': `url(${bgImg})`}")
      .content.flex.h-center
        h2.title 
          span GO COURT
          br
          span 球場資源交流平台
      a.credit(href='https://www.freepik.com/vectors/people' rel="noreferrer noopener") Copyright©
      
</template>

<script>
import bgImg from '@/assets/image/banner.jpg'

export default {
  name: 'Banner',
  data() {
    return {
      bgImg
    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
.Banner
  .bg
    position: relative 
    height: 300px
    @include bgImgSetting()
  .content
    position: absolute
    top: 2rem
    width: 100%
    .title 
      font-size: 1.75rem
      font-weight: bold
      color: $main_c
      padding: .25rem .5rem
      border-radius: 4px
      text-align: center
  .credit
    position: absolute
    bottom: .75rem
    right: 2px
    font-size: 8px
    color: #333

</style>
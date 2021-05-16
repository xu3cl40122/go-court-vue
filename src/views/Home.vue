<template lang="pug">
.Home
  Banner
  .wrapper
    .blocks
      FeatureBlock(:info="courtBlock")
    RecommendGames
</template>

<script>
import Carousel from '@/components/public/Carousel'
import Banner from '@/components/public/Banner'
import FeatureBlock from '@/components/public/FeatureBlock'
import RecommendGames from '@/components/game/RecomendGames'
import courtImg from '@/assets/image/court.jpg'

export default {
  name: 'Home',
  components: {
    Carousel,
    Banner,
    RecommendGames,
    FeatureBlock
  },
  data() {
    return {
      courtBlock: {
        title: '球場地圖',
        description: '探索沒去過的球場，認識新球友',
        btnText: '搜尋球場',
        imgSrc: courtImg,
        callback: () => this.$router.push({ name: 'Courts' })
      }

    }
  },
  mounted() {

  },
  methods: {
    
  }

}
</script>

<style lang="sass" scoped>
.wrapper
  padding: 1rem
.blocks 
  margin-bottom: 1rem
</style>

<template lang="pug">
.Home
  Banner
  .wrapper
    //- RecommendGames
    button.gc-btn.main.full(@click="toMapPage") 球場地圖
</template>

<script>
import Carousel from '@/components/public/Carousel'
import Banner from '@/components/public/Banner'
import RecommendGames from '@/components/game/RecomendGames'


export default {
  name: 'Home',
  components: {
    Carousel,
    Banner,
    RecommendGames
  },
  data() {
    return {
     
    }
  },
  mounted() {

  },
  methods: {
    toMapPage() {
      this.$router.push({ name: 'Courts' })
    }
  }

}
</script>

<style lang="sass" scoped>
.wrapper
  padding: 1rem
</style>

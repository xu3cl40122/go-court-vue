<template lang="pug">
.CourtDetailPage
  Carousel(:carousel="carousel")
  .wrapper
    .infoWrapper
      CourtInfo(:court="court")
    Comments(:target_id="`${court.court_id}`")

</template>

<script>
import Carousel from '@/components/public/Carousel'
import CourtInfo from '@/components/court/CourtInfo'
import Comments from '@/components/comment/Comments'
import defaultImg from '@/assets/image/default.jpg'

export default {
  name: 'CourtDetailPage',
  components: {
    Carousel,
    CourtInfo,
    Comments
  },
  props: {
    court_id: String
  },
  data() {
    return {
      court: {},
      carousel: []
    }
  },
  computed: {
    target_id() {
      return this.court.court_id?.toString() ?? ''
    }
  },
  mounted() {
    this.getCourtById()
  },
  methods: {
    async getCourtById() {
      let { success, data } = await this.$store.dispatch('Court/getCourtById', { court_id: this.court_id })
      this.court = data
      this.setCarousel()
    },

    setCarousel() {
      let courtImgs = this.court.meta?.images ?? [{ image_url: defaultImg }]
      this.carousel = courtImgs.map(d => {
        return { src: d.image_url }
      })
    },


  }
}
</script>

<style lang="sass" scoped>
.wrapper 
  padding: 1rem
.infoWrapper 
  margin-bottom: 1.5rem
</style>
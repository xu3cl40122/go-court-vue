<template lang="pug">
.RecommendGames 
  h2 123
</template>

<script>
export default {
  name: 'RecommendGames',
  components: {},
  props: {
    query: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.queryGames()
  },
  methods: {
    async queryGames() {
      let params = {
        ...this.query
      }
      let { success, data } = await this.$store.dispatch('Game/queryGames', { params, option: { skipLoading: true } })
    }
  }
}
</script>
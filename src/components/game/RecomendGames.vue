<template lang="pug">
.RecommendGames
  .header.flex.between.v-center
    h4.title 推薦賽事
    .more.pointer(@click="toGamesPage") 
      span 看更多
      i.fas.fa-chevron-right

  .games.grid(v-if="games.length > 0")
    router-link(v-for="(game, i) of games" :key="game.game_id" :to="`/games/${game.game_id}`")
      GameCard(:info="game")
  
  Empty(v-else title="目前無推薦的賽事")

</template>

<script>
import GameCard from '@/components/game/GameCard'
import Empty from '@/components/unit/Empty'

export default {
  name: 'RecommendGames',
  components: {
    GameCard,
    Empty
  },
  props: {
    size: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      games: [],
      query: {}
    }
  },
  computed: {

  },
  mounted() {
    this.setRecommendQuery()
    this.queryGames()
  },
  methods: {
    setRecommendQuery() {
      let query = {
        start: new Date(),
        size: this.size
      }
      let localData = localStorage.getItem('GC_SEARCH_GAME_PARAMS')
      if (localData) {
        localData = JSON.parse(localData)
        query.city_code = localData.city_code
      }
      this.query = query
    },

    /**
     * 推薦縣市跟預設條件各取 3個
     * 推薦的不夠就用預設的去補
     */
    async queryGames() {
      let defaultQuery = {
        start: new Date(),
        size: this.size
      }

      let [recRes, defaultRes] = await Promise.all([
        this.$store.dispatch('Game/queryGames', { params: this.query, option: { skipLoading: true } }),
        this.$store.dispatch('Game/queryGames', { params: defaultQuery, option: { skipLoading: true } })
      ])

      let games = recRes.data.content
      let defaultGames = defaultRes.data.content
      defaultGames.forEach(game => {
        !games.find(d => d.game_id === game.game_id) ? games.push(game) : null
      })
      this.games = games.slice(0, 3)
    },

    toGamesPage() {
      this.$router.push({ name: 'Games' })
    }
  }
}
</script>

<style lang="sass" scoped>
.header 
  margin-bottom: .5rem
  .more
    color: $main_c 
    i 
      margin-left: .25rem 
.games
  grid-gap: 1rem 
</style>
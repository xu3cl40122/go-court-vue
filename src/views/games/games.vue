<template lang="pug">
.GamesPage
  .searchInput(@click="() => isPanelOpen = true")
    .query 
      span {{ gameQuery.city_code }}
      template(v-if="gameQuery.dist_code")
        span /
        span {{ gameQuery.dist_code }}
    .time {{ gameQuery.time_range }}
    i.fas.fa-search

  .games.grid
    router-link(v-for="(game, i) of games" :key="i" :to="`/games/${game.game_id}`")
      GameCard(:info="game")

  SidePanel(v-model:isOpen="isPanelOpen" title="搜尋球賽")
    SearchPanel(@queryGames="queryGames")

</template>

<script>
import SearchPanel from '@/components/public/SearchPanel'
import SidePanel from '@/components/layout/SidePanel'
import GameCard from '@/components/game/GameCard'
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getDistrictCodeMap } from '@/methods/district'
import { toTimeRangeString } from '@/methods/time'

export default {
  name: 'GamesPage',
  components: {
    SearchPanel,
    SidePanel,
    GameCard
  },
  setup() {
    const store = useStore()
    let isPanelOpen = ref(false)
    let games = ref([])
    let gameQuery = ref({})
    const codeMap = computed(() => getDistrictCodeMap())
    const storeGames = computed(() => store.state.Game.games)

    onMounted(() => {
      let hasGame = storeGames.value?.length
      isPanelOpen.value = !storeGames.value?.length
    })

    async function queryGames(params) {
      let { data } = await store.dispatch('Game/queryGames', { params, option: {} })
      games.value = data.content
      isPanelOpen.value = false
      setDisplayQuery(params)
    }

    function setDisplayQuery(params) {
      let { city_code, dist_code, start, end } = params
      gameQuery.value = {
        city_code: codeMap.value[params.city_code],
        dist_code: codeMap.value[params.dist_code],
        time_range: toTimeRangeString(start, end)
      }
    }


    return {
      isPanelOpen,
      queryGames,
      games,
      gameQuery
    }
  }
}
</script>

<style lang="sass" scoped>
.GamesPage
  padding: 1rem
  .searchInput
    position: relative
    padding: .5rem 2rem .5rem 1rem
    background-color: #ececec
    border-radius: 20px
    margin-bottom: 1rem
    i 
      position: absolute 
      right: 1rem
      top: 50% 
      transform: translateY(-50%)
    .query
      margin-bottom: .25rem 
    .time 
      font-size: .75rem
  .games
    grid-row-gap: 1rem 

</style>

<template lang="pug">
.GamesPage
  .searchInput(@click="() => isPanelOpen = true")
    template(v-if="Object.keys(displayQuery).length === 0")
      .searchPlaceholder 請選擇搜尋條件
    template(v-else)
      .location 
        span {{ displayQuery.city_code }}
        template(v-if="displayQuery.dist_code")
          span /
          span {{ displayQuery.dist_code }}
      .time {{ displayQuery.time_range }}
      .searchOption {{ displayQuery.game_type }}
      .searchOption {{ displayQuery.court_type }}
    i.fas.fa-search

  .games.grid
    router-link(v-for="(game, i) of games" :key="game.game_id" :to="`/games/${game.game_id}`")
      GameCard(:info="game")
    h5.loading(v-if="!toEnd" ref="loadingEl") LOADING ...

  SidePanel(v-model:isOpen="isPanelOpen" title="搜尋球賽")
    SearchPanel(@queryGames="setQuery")

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
    let displayQuery = computed(() => {
      let { city_code, dist_code, start, end, court_type, game_type } = gameQuery.value
      return {
        city_code: codeMap.value[city_code],
        dist_code: codeMap.value[dist_code],
        time_range: toTimeRangeString(start, end),
        court_type: court_type?.split(',').map(key => store.state.Game.courtTypeMap[key].label).join(', '),
        game_type: game_type?.split(',').map(key => store.state.Game.gameTypeMap[key].label).join(', '),
      }
    })
    
    let pageSetting = ref({
      page: 0,
      size: 1,
      totalPage: 10
    })
    let loadingEl = ref(false)
    let toEnd = ref(false)

    const codeMap = computed(() => getDistrictCodeMap())
    const storeGames = computed(() => store.state.Game.games)


    onMounted(() => {
      let hasGame = storeGames.value?.length
      isPanelOpen.value = !storeGames.value?.length
     
    })

    function onInterset(entryArr) {
      entryArr.forEach(entry => {
        if (entry.isIntersecting && !toEnd.value) {
          queryGames({})
        }
      })
    }

    async function setQuery(params) {
      console.log(params)
      gameQuery.value = params
      isPanelOpen.value = false
      await queryGames({ init: true })
      let observer = new IntersectionObserver(onInterset, {})
      observer.observe(loadingEl.value)
    }

    async function queryGames({ init }) {
      init
        ? pageSetting.value.page = 0
        : pageSetting.value.page++

      let params = {
        ...gameQuery.value,
        ...pageSetting.value
      }
      let { data } = await store.dispatch('Game/queryGames', { params, option: {} })
      games.value = games.value.concat(data.content)

      isPanelOpen.value = false
      if (data.totalPage -1 === data.page)
        toEnd.value = true
    }

    return {
      isPanelOpen,
      queryGames,
      games,
      gameQuery,
      loadingEl,
      pageSetting,
      setQuery,
      displayQuery,
      toEnd
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
    .location
      margin-bottom: .25rem 
    .searchPlaceholder
      color: #666
    .time 
      font-size: .75rem
    .searchOption
      margin: .25rem 0
  .games
    grid-row-gap: 1rem 
  .loading 
    text-align: center 
    color: #666
</style>

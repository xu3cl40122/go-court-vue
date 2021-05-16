<template lang="pug">
.GamesPage
  .searchInput(@click="() => isPanelOpen = true")
    template(v-if="Object.values(displayQuery).every(d => !d)")
      .searchPlaceholder 請選擇搜尋條件
    template(v-else)
      .location 
        span {{ displayQuery.city_code }}
        template(v-if="displayQuery.dist_code")
          span /
          span {{ displayQuery.dist_code }}
      .time {{ displayQuery.time_range }}
      //- .searchOption {{ displayQuery.game_type }}
      //- .searchOption {{ displayQuery.court_type }}
    i.fas.fa-search

  .games.grid(v-if="games.length > 0")
    router-link(v-for="(game, i) of games" :key="game.game_id" :to="`/games/${game.game_id}`")
      GameCard(:info="game")
  Empty(v-else title="無符合條件之球賽")
  h5.loading(v-if="!toEnd" ref="loadingEl") LOADING ...

  SidePanel(v-model:isOpen="isPanelOpen" title="搜尋球賽")
    SearchPanel(v-model:queryParams="queryParams")

</template>

<script>
import SearchPanel from '@/components/public/SearchPanel'
import SidePanel from '@/components/layout/SidePanel'
import GameCard from '@/components/game/GameCard'
import Empty from '@/components/unit/Empty'
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { getDistrictCodeMap } from '@/methods/district'
import { toTimeRangeString } from '@/methods/time'
import dayjs from 'dayjs'

export default {
  name: 'GamesPage',
  components: {
    SearchPanel,
    SidePanel,
    GameCard,
    Empty
  },
  setup() {
    const store = useStore()
    let isPanelOpen = ref(false)
    let games = ref([])
    let queryParams = ref({})
    let displayQuery = computed(() => {
      let { city_code, dist_code, start, end, court_type, game_type } = queryParams.value
      return {
        city_code: codeMap.value[city_code],
        dist_code: codeMap.value[dist_code],
        time_range: toTimeRangeString(start, end, true),
        court_type: court_type?.split(',').map(key => store.state.Game.courtTypeMap[key]?.label).join(', '),
        game_type: game_type?.split(',').map(key => store.state.Game.gameTypeMap[key]?.label).join(', '),
      }
    })

    let pageSetting = ref({
      page: 0,
      size: 10,
      totalPage: 10
    })
    let loadingEl = ref(false)
    let toEnd = ref(false)

    const codeMap = computed(() => getDistrictCodeMap())
    const storeGames = computed(() => store.state.Game.games)

    /**
     * todo 
     * clear observer ?
     */
    onMounted(async () => {
      let hasGame = storeGames.value?.length
      getParamsFromLocal()
      let observer = new IntersectionObserver(onInterset, {})
      loadingEl.value && observer.observe(loadingEl.value)
    })

    watch(queryParams, (val) => {
      isPanelOpen.value = false
      localStorage.setItem('GC_SEARCH_GAME_PARAMS', JSON.stringify(val))
      queryGames({ init: true })
    })

    function getParamsFromLocal() {
      let localData = localStorage.getItem('GC_SEARCH_GAME_PARAMS')
      if (!localData) return
      queryParams.value = JSON.parse(localData)
    }


    function onInterset(entryArr) {
      entryArr.forEach(entry => {
        if (entry.isIntersecting && !toEnd.value) {
          queryGames({})
        }
      })
    }

    async function queryGames({ init }) {
      if (init) {
        pageSetting.value.page = 0
        toEnd.value = false
        games.value = []
      }
      else {
        pageSetting.value.page++
      }

      if (toEnd.value) return

      let params = {
        ...queryParams.value,
        ...pageSetting.value
      }
      let { data } = await store.dispatch('Game/queryGames', { params, option: { skipLoading: true } })
      games.value = games.value.concat(data.content)

      isPanelOpen.value = false
      if (data.totalPage - 1 <= data.page)
        toEnd.value = true
    }

    return {
      isPanelOpen,
      queryGames,
      games,
      queryParams,
      loadingEl,
      pageSetting,
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

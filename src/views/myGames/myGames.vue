<template lang="pug">
.MyGames
  .titleRow.flex.between.v-center
    h3.main_c 我舉辦的球賽
    button.gc-btn.main(@click="showPanel(true)") 新增球賽
  .games.grid
    router-link(v-for="(game, i) of games" :key="game.game_id" :to="`/games/host/${game.game_id}`")
      GameCard(:info="game")
    h5.loading(v-if="!toEnd" ref="loadingEl") LOADING ...

  SidePanel(v-model:isOpen="isPanelOpen" title="建立球賽")
    GameCreator(@onGameChange="onGameChange")
</template>

<script>
import SidePanel from '@/components/layout/SidePanel'
import GameCreator from '@/components/game/GameCreator'
import GameCard from '@/components/game/GameCard'
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MyGamesPage',
  components: {
    SidePanel,
    GameCreator,
    GameCard
  },
  setup(props) {
    const store = useStore()
    let isPanelOpen = ref(false)
    let games = ref([])

    let pageSetting = ref({
      page: 0,
      size: 10,
      totalPage: 10
    })
    let loadingEl = ref(false)
    let toEnd = ref(false)

    onMounted(async () => {
      queryGames({ init: true })
      let observer = new IntersectionObserver(onInterset, {})
      loadingEl.value && observer.observe(loadingEl.value)
    })

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

      let params = {
        ...pageSetting.value
      }
      let { data } = await store.dispatch('Game/getMyHostGames', { params, option: {} })
      games.value = games.value.concat(data.content)

      isPanelOpen.value = false
      if (data.totalPage - 1 <= data.page)
        toEnd.value = true
    }

    function showPanel(open = true) {
      isPanelOpen.value = open
    }

    function onGameChange() {
      showPanel(false)
      getHostGames()
    }

    return {
      isPanelOpen,
      showPanel,
      onGameChange,
      games,
      pageSetting,
      loadingEl,
      toEnd,
      queryGames,
    }
  }


}
</script>

<style lang="sass" scoped>
.MyGames
  padding: 1rem
.games
  grid-row-gap: 1rem
.titleRow
  margin-bottom: 1rem
</style>
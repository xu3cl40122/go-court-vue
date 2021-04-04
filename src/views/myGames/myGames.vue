<template lang="pug">
.MyGames
  .titleRow.flex.between.v-center
    h3.main_c 我舉辦的球賽
    button.gc-btn.main(@click="showPanel(true)") 新增球賽
  .games.grid
    router-link(v-for="(game, i) of games" :key="game.game_id" :to="`/games/host/${game.game_id}`")
      GameCard(:info="game")
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

    onMounted(async () => {
      getHostGames()
    })

    async function getHostGames() {
      let params = {}
      let option = {}
      let { data } = await store.dispatch('Game/getMyHostGames', { params, option })
      games.value = data.content
    }

    function showPanel(open = true) {
      isPanelOpen.value = open
    }

    function onGameChange() {
      showPanel(false)
    }

    return {
      isPanelOpen,
      showPanel,
      onGameChange,
      games
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
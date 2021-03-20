<template lang="pug">
.GameDetailPage
  GameBasicInfo(:game="game")
  
  .gc-fixed-wrapper  
    button.gc-btn.main.full(@click="openPanel(true)") 參加球賽
  
  SidePanel(v-model:isOpen="isPanelOpen" title="選擇種類及數量")
    GameStockSelector(:game="game")

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import SidePanel from '@/components/layout/SidePanel'
import GameStockSelector from '@/components/game/GameStockSelector'
import GameBasicInfo from '@/components/game/GameBasicInfo'

export default {
  name: 'GameDetailPage',
  components: {
    SidePanel,
    GameStockSelector,
    GameBasicInfo
  },
  props: {
    game_id: String
  },
  setup(props) {
    const store = useStore()
    let game = ref({})
    let isPanelOpen = ref(false)
    onMounted(() => {
      getGameById()
    })

    async function getGameById() {
      let game_id = props.game_id
      let { success, data } = await store.dispatch('Game/getGameById', { game_id, option: {} })
      if (!success) return
      game.value = data
    }

    function openPanel(open) {
      isPanelOpen.value = open
    }

    return {
      game,
      isPanelOpen,
      openPanel
    }
  }
}
</script>

<style lang="sass" scoped>
.GameDetailPage 
  padding: 1rem
  .img 
    display: block 
    width: 100% 
    height: auto
    border-radius: 4px
    margin-bottom: 1rem
  .title, .time 
    margin-bottom: .5rem
  .detail 
    color: #666
    .detailCol
      margin-bottom: .5rem
      i 
        display: inline-block
        width: 1rem 
        text-align: center
        margin-right: .25rem
  .spec 
    font-size: 1.125rem 
    margin-bottom: .25rem
    span 
      margin-right: .25rem
  .blockTitle 
    margin: 1rem 0 .5rem
  .description 
    color: #666

</style>
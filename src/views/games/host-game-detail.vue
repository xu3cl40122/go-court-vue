<template lang="pug">
.HostGameDetail
  Tabs(:tabs="tabs" v-model:active="active")
  .wrapper
    template(v-if="active === 'basicInfo'")
      GameBasicInfo(:game="game")
    template(v-else-if="active === 'tickets'")
      BuyerList(:game_id="game_id")    
    .gc-fixed-wrapper  
      button.gc-btn.main.full(@click="openPanel(true)") 編輯球賽
    
    SidePanel(v-model:isOpen="isPanelOpen" title="編輯球賽")
      GameCreator(:game="game" @onGameChange="onGameChange" type="edit" )

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import SidePanel from '@/components/layout/SidePanel'
import GameCreator from '@/components/game/GameCreator'
import GameBasicInfo from '@/components/game/GameBasicInfo'
import BuyerList from '@/components/game/BuyerList'
import Tabs from '@/components/unit/Tabs'

export default {
  name: 'HostGameDetail',
  components: {
    SidePanel,
    GameCreator,
    GameBasicInfo,
    Tabs,
    BuyerList,
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

    let active = ref('basicInfo')
    let tabs = ref({
      basicInfo: { label: '基本資訊' },
      tickets: { label: '購票者' },
    })

    function onGameChange() {
      getGameById()
      openPanel(false)
    }

    function openPanel(open) {
      isPanelOpen.value = open
    }

    return {
      game,
      isPanelOpen,
      openPanel,
      onGameChange,
      active,
      tabs
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper 
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
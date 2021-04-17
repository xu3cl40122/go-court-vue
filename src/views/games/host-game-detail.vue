<template lang="pug">
.HostGameDetail
  Tabs(:tabs="tabs" v-model:active="active")
  .wrapper
    template(v-if="active === 'basicInfo'")
      GameBasicInfo(:game="game")
    template(v-else-if="active === 'tickets'")
      BuyerList(:game_id="game_id")    
    template(v-else-if="active === 'gameUsers'")
      GameUserList(:game_id="game_id")
      
    .gc-fixed-wrapper(v-if="btns.length")
      .gc-btns
        button.gc-btn(v-for="(btn, i) of btns" :key="i" :class="btn.class" @click="btn.callback") {{ btn.text }}
    
    SidePanel(v-model:isOpen="isPanelOpen" :title="panelTitle")
      template(v-if="game.game_status === 'PENDING'")     
        GameCreator(:game="game" @onGameChange="onGameChange" type="edit" )
      template(v-else-if="game.game_status === 'PLAYING'")  
        QrScanner(@onScan="onScan")
    
    OperatorDialog(v-model:show="isOpDialogOpen" :info="opDialogInfo")
      template(v-if="game.game_status === 'PENDING'")   
        .confirmWrapper
          h5 確定要開始球賽?
      template(v-else-if="game.game_status === 'PLAYING'")
        h2 777

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import SidePanel from '@/components/layout/SidePanel'
import GameCreator from '@/components/game/GameCreator'
import GameBasicInfo from '@/components/game/GameBasicInfo'
import BuyerList from '@/components/game/BuyerList'
import GameUserList from '@/components/game/GameUserList'
import Tabs from '@/components/unit/Tabs'
import OperatorDialog from '@/components/dialog/OperatorDialog'
import QrScanner from '@/components/public/QrScanner'

export default {
  name: 'HostGameDetail',
  components: {
    SidePanel,
    GameCreator,
    GameBasicInfo,
    Tabs,
    BuyerList,
    GameUserList,
    OperatorDialog,
    QrScanner
  },
  props: {
    game_id: String
  },
  setup(props) {
    const store = useStore()
    let game = ref({})

    let active = ref('basicInfo')

    let tabs = computed(() => {
      switch (game.value.game_status) {
        case 'PLAYING':
          return {
            basicInfo: { label: '基本資訊' },
            gameUsers: { label: '參賽者' },
          }

        default:
          return {
            basicInfo: { label: '基本資訊' },
            tickets: { label: '購票者' },
          }
      }
    })

    let panelTitle = computed(() => {
      switch (game.value.game_status) {
        case 'PLAYING':
          return `驗證票券`
        default:
          return '編輯球賽'
      }
    })

    let btns = computed(() => {
      switch (game.value.game_status) {
        case 'PLAYING':
          return [
            { text: '驗票', class: 'main', callback: openPanel.bind(this, true) },
          ]

        default:
          return [
            { text: '編輯球賽', class: 'main', callback: openPanel.bind(this, true) },
            { text: '開始球賽', class: 'second', callback: openOpDialog.bind(this, true) },
          ]
      }
    })

    onMounted(() => {
      getGameById()
      let game_ticket_id = 'f92b82c9-ea14-4661-8399-2057a38d7159'
      store.dispatch('Ticket/getTicketById', { game_ticket_id })
    })

    async function getGameById() {
      let game_id = props.game_id
      let { success, data } = await store.dispatch('Game/getGameById', { game_id })
      if (!success) return
      game.value = data
    }

    async function initGame() {
      let game_id = props.game_id
      let params = {}
      let { success, data } = await store.dispatch('Game/initGame', { game_id, params })
      if (!success) return
      getGameById()

    }

    async function onScan(str) {
      let matchRes = str.match(/^gc\-(.*)/)

      if (!matchRes) return window.alert('無法辨識的 QR code')
      let game_ticket_id = matchRes[1]
      let { success, data } = await store.dispatch('Ticket/getTicketById', { game_ticket_id })
      if (!success) return window.alert('找不到票券')
      if (data.game_id !== game.value.game_id) return window.alert('請確認是否為本場賽事的票券')
      openOpDialog(true)

    }

    function onGameChange() {
      getGameById()
      openPanel(false)
    }

    let isPanelOpen = ref(false)

    function openPanel(open) {
      isPanelOpen.value = open
    }

    let isOpDialogOpen = ref(false)
    let opDialogInfo = reactive({
      btns: [
        { text: '取消', class: 'hollow-gray', callback: null },
        { text: '確認', class: 'main', callback: initGame.bind(this) },
      ]
    })

    function openOpDialog(open) {
      isOpDialogOpen.value = open
    }

    return {
      game,
      isPanelOpen,
      openPanel,
      onGameChange,
      active,
      tabs,
      isOpDialogOpen,
      openOpDialog,
      opDialogInfo,
      initGame,
      btns,
      onScan,
      panelTitle
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper 
  padding: 1rem

.confirmWrapper
  text-align: center

</style>
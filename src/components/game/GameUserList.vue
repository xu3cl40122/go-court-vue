<template lang="pug">
.GameUserList
  .tickets.grid 
    .ticketCol(v-for="(gameUser, i) of gameUsers" :key="i" @click="setOpDialog(gameUser)")
      .flex.between
        h5.buyer {{ gameUser.game_user_detail.profile_name }}
        .time {{ gameUser.createdTimeStr }}

      .specWrapper.flex
        span {{ gameUser.game_stock_detail.spec_name }}
        span {{ gameUser.game_stock_detail.price }} NTD
  
  OperatorDialog(v-model:show="isOpDialogOpen" :info="opDialogInfo")
    .gameUser
      h5.buyer {{ opDialogInfo.gameUser.game_user_detail.profile_name }}
      .specWrapper.flex
        span {{ opDialogInfo.gameUser.game_stock_detail.spec_name }}
        span {{ opDialogInfo.gameUser.game_stock_detail.price }} NTD

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import OperatorDialog from '@/components/dialog/OperatorDialog'
import SidePanel from '@/components/layout/SidePanel'
import QrScanner from '@/components/public/QrScanner'

export default {
  name: 'GameUserList',
  components: {
    OperatorDialog,
    SidePanel,
    QrScanner
  },
  props: {
    game_id: String
  },
  setup(props) {
    const store = useStore()
    let gameUsers = ref([])
    onMounted(() => {
      getTickets()
    })

    async function getTickets() {
      let game_id = props.game_id
      let params = { size: 9999 }
      let { success, data } = await store.dispatch('Game/getGameUsers', { game_id, params, option: {} })
      if (!success) return
      gameUsers.value = data.content.map(d => {
        d.createdTimeStr = dayjs(d.created_at).format('YYYY/MM/DD HH:mm')
        return d
      })
    }

    let isOpDialogOpen = ref(false)
    let opDialogInfo = ref({})

    function setOpDialog(gameUser) {
      opDialogInfo.value = {
        gameUser,
        btns: [
          // { text: '取消', class: 'hollow-gray', callback: null },
          // { text: '驗票', class: 'main', callback: showScanner.bind(this) },
        ]
      }
      openOpDialog(true)
    }

    function openOpDialog(open) {
      isOpDialogOpen.value = open
    }

    let isPanelOpen = ref(false)

    function openPanel(open) {
      isPanelOpen.value = open
    }

    function showScanner() {
      openPanel(true)
    }

    return {
      gameUsers,
      isOpDialogOpen,
      openOpDialog,
      opDialogInfo,
      setOpDialog,
      isPanelOpen,
      openPanel,
    }
  }
}
</script>

<style lang="sass" scoped>
.tickets 
  grid-gap: 1rem 
  .ticketCol
    position: relative 
    border-radius: 4px
    padding: .5rem 1rem
    background-color: rgba($main_c, .1)
.buyer
  color: $main_c 
  margin-bottom: .25rem 
.time 
  color: #666 
  flex: 0 0 auto
.specWrapper
  span 
    margin-right: .25rem
      
</style>
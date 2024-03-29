<template lang="pug">
.GameUserList
  .total(v-if="pageSetting.total")
    span 已進場 {{ pageSetting.total }} 位
  .tickets.grid 
    .ticketCol(v-for="(gameUser, i) of gameUsers" :key="i" @click="setOpDialog(gameUser)")
      .flex.between
        h5.buyer {{ gameUser.game_user_detail.profile_name }}
        .time {{ gameUser.createdTimeStr }}

      .flex.between
        .specWrapper.flex
          span {{ gameUser.game_stock_detail.spec_name }}
          span {{ gameUser.game_stock_detail.price }} NTD
        
        .verify(v-if="gameUser.game_ticket_detail.game_ticket_status === 'VERIFIED'")
          i.fas.fa-check-circle
          span 已驗票
  
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

export default {
  name: 'GameUserList',
  components: {
    OperatorDialog,
    SidePanel,
  },
  props: {
    game_id: String
  },
  setup(props) {
    const store = useStore()
    let gameUsers = ref([])
    let pageSetting = ref({
      page: 0,
      size: 10,
      total: 0
    })
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

      pageSetting.value = {
        page: data.page,
        size: data.size,
        total: data.total,
      }
    }

    let isOpDialogOpen = ref(false)
    let opDialogInfo = ref({})

    function setOpDialog(gameUser) {
      return false
      opDialogInfo.value = {
        gameUser,
        btns: []
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
      pageSetting
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
    .verify
      i
        color: $success_c
        margin-right: .25rem

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
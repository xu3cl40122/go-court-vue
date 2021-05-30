<template lang="pug">
.BuyerList
  .tickets.grid(v-if="tickets.length > 0")
    .ticketCol.ticketInfo(v-for="(ticket, i) of tickets" :key="i" @click="setOpDialog(ticket)")
      .flex.between
        h5.buyer {{ ticket.owner_user_detail.profile_name }}
        .time {{ ticket.createdTimeStr }}

      .flex.between
        .specWrapper.flex
          span {{ ticket.game_stock_detail.spec_name }}
          span {{ ticket.game_stock_detail.price }} NTD
        .verify(v-if="ticket.game_ticket_status === 'VERIFIED'")
          i.fas.fa-check-circle
          span 已進場
  
  Empty(v-else title="尚無購票者")
      
  OperatorDialog(v-model:show="isOpDialogOpen" :info="opDialogInfo")
    .ticketInfo
      .flex.between
        h5.buyer {{ opDialogInfo.ticket.owner_user_detail.profile_name }}
        .time {{ opDialogInfo.ticket.createdTimeStr }}
      .flex.between
        .specWrapper.flex
          span {{ opDialogInfo.ticket.game_stock_detail.spec_name }}
          span {{ opDialogInfo.ticket.game_stock_detail.price }} NTD
        .verify(v-if="opDialogInfo.ticket.game_ticket_status === 'VERIFIED'")
          i.fas.fa-check-circle
          span 已進場

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import OperatorDialog from '@/components/dialog/OperatorDialog'
import Empty from '@/components/unit/Empty'

export default {
  name: 'BuyerList',
  components: {
    OperatorDialog,
    Empty
  },
  props: {
    game_id: String
  },
  setup(props) {
    const store = useStore()
    let tickets = ref([])
    onMounted(() => {
      getTickets()
    })

    async function getTickets() {
      let game_id = props.game_id
      let params = { size: 9999 }
      let { success, data } = await store.dispatch('Ticket/getGameTickets', { game_id, params, option: {} })
      if (!success) return
      tickets.value = data.content.map(d => {
        d.createdTimeStr = dayjs(d.created_at).format('YYYY/MM/DD HH:mm')
        return d
      })
    }

    async function verifyTicket(ticket) {
      let { game_id, game_ticket_id } = ticket
      let { success } = await store.dispatch('Ticket/verifyTicket', { game_id, game_ticket_id })
      if(!success) return showMessageDialog('verifyFailed')
      showMessageDialog('verifySuccess', `${ticket.owner_user_detail.profile_name} 已進場`)
      getTickets()
    }


    let isOpDialogOpen = ref(false)
    let opDialogInfo = ref({})

    function setOpDialog(ticket) {
      let btns = ticket.game_ticket_status === 'PENDING'
        ? [{ text: '確認進場', class: 'main', callback: verifyTicket.bind(this, ticket) }]
        : []
      opDialogInfo.value = {
        ticket,
        btns
      }
      openOpDialog(true)
    }


    function openOpDialog(open) {
      isOpDialogOpen.value = open
    }

    function showMessageDialog(status, message = '') {
      let info = {}
      switch (status) {
        case 'verifyFailed':
          info = {
            status: 'danger',
            title: `驗證票券失敗`,
            subtitles: ['請稍後再試', '或聯絡系統管理員'],
          }
          break;
        case 'verifySuccess':
          info = {
            status: 'success',
            title: message,
            subtitles: [''],
          }
          break;
        default:
          break;
      }

      store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info
      })
    }

    return {
      tickets,
      isOpDialogOpen,
      opDialogInfo,
      setOpDialog,
      openOpDialog
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

.ticketInfo
  .time 
    color: #666 
    flex: 0 0 auto
  .specWrapper
    span 
      margin-right: .25rem
  .buyer
    color: $main_c 
    margin-bottom: .25rem 
  .verify 
    i
      color: $success_c
      margin-right: .25rem 
    

</style>
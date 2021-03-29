<template lang="pug">
.TicketsPage 
  h2.title 我的票夾
  .cards.grid 
    TicketCard(v-for="(ticket, i) of tickets" :info="ticket" :key="i" @onCardClick="showTicketDetail(ticket)")
  
  OperatorDialog(v-model:show="isOpDialogOpen")
    TicketCard(:info="selectedTicketInfo" :showQrCode="true")

</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import TicketCard from '@/components/ticket/TicketCard'
import OperatorDialog from '@/components/dialog/OperatorDialog'

export default {
  name: 'TicketPage',
  components: {
    TicketCard,
    OperatorDialog
  },
  setup() {
    const store = useStore()
    let tickets = ref([])
    let pageSetting = ref({
      page: 0,
      size: 10
    })

    onMounted(() => {
      getMyTickets()
    })

    async function getMyTickets() {
      let params = pageSetting.value
      let option = {}
      let { success, data } = await store.dispatch('Ticket/getMyTickets', { params, option })
      tickets.value = data.content
    }

    let isOpDialogOpen = ref(false)
    let opDialogInfo = ref({})
    function openOpDialog(open) {
      isOpDialogOpen.value = open
    }

    let selectedTicketInfo = ref({})
    function showTicketDetail(ticket) {
      selectedTicketInfo.value = ticket
      openOpDialog(true)
    }

    return {
      tickets,
      pageSetting,
      getMyTickets,
      isOpDialogOpen,
      openOpDialog,
      opDialogInfo,
      showTicketDetail,
      selectedTicketInfo
    }
  }
}
</script>

<style lang="sass" scoped>
.TicketsPage 
  padding: 1rem
  .title
    color: $main_c
    margin-bottom: 1.5rem

.cards 
  grid-row-gap: 1rem

</style>
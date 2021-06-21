<template lang="pug">
.TicketsPage 
  //- h3.title 我的票夾
  .tabsWrapper
    Tabs(v-model:active="activeTab" :tabs="tabs")
  .wrapper
    .cards.grid(v-if="tickets.length > 0")
      TicketCard(v-for="(ticket, i) of tickets" :info="ticket" :key="i" @onCardClick="showTicketDetail(ticket)")
    Empty(v-if="toEnd && tickets.length == 0" title="尚無票券")
    h5.loading(v-if="!toEnd" ref="loadingEl") LOADING ...
    
  OperatorDialog(v-model:show="isOpDialogOpen")
    TicketCard(:info="selectedTicketInfo" :features="['id', 'transfer', 'qrcode']" @transferTicket="openPanel(true)")
  
  SidePanel(v-model:isOpen="isPanelOpen" title="轉送票券")
    .panelWrapper(v-if="selectedTicketInfo.game_ticket_id")
      TransferTicket(:info="selectedTicketInfo" @transferSuccess="transferSuccess")

</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import TicketCard from '@/components/ticket/TicketCard'
import OperatorDialog from '@/components/dialog/OperatorDialog'
import SidePanel from '@/components/layout/SidePanel'
import TransferTicket from '@/components/ticket/TransferTicket'
import Empty from '@/components/unit/Empty'
import Tabs from '@/components/unit/Tabs'

export default {
  name: 'TicketPage',
  components: {
    TicketCard,
    OperatorDialog,
    SidePanel,
    TransferTicket,
    Empty,
    Tabs
  },
  setup() {
    const store = useStore()
    let tickets = ref([])
    let pageSetting = ref({
      page: 0,
      size: 10,
      totalPage: 10
    })
    let loadingEl = ref(false)
    let toEnd = ref(false)

    let activeTab = ref('PENDING')
    let tabs = ref({
      PENDING: { label: '未使用' },
      VERIFIED: { label: '已使用' },
    })

    onMounted(async () => {
      await queryTickets({ init: true })
      let observer = new IntersectionObserver(onInterset, {})
      loadingEl.value && observer.observe(loadingEl.value)
    })

    watch(activeTab, (val) => queryTickets({ init: true }))

    function onInterset(entryArr) {
      entryArr.forEach(entry => {
        if (entry.isIntersecting && !toEnd.value) {
          queryTickets({})
        }
      })
    }

    async function queryTickets({ init }) {
      if (init) {
        pageSetting.value.page = 0
        toEnd.value = false
        tickets.value = []
      }
      else {
        pageSetting.value.page++
      }

      let params = {
        ...pageSetting.value,
        game_ticket_status: activeTab.value
      }
      let { data } = await store.dispatch('Ticket/getMyTickets', { params, option: { skipLoading: true } })
      tickets.value = tickets.value.concat(data.content)

      if (data.totalPage - 1 <= data.page)
        toEnd.value = true
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


    let isPanelOpen = ref(false)
    function openPanel(open) {
      openOpDialog(false)
      isPanelOpen.value = open
    }

    function transferSuccess() {
      openPanel(false)
      queryTickets({ init: true })

    }

    return {
      tickets,
      pageSetting,
      isOpDialogOpen,
      openOpDialog,
      opDialogInfo,
      showTicketDetail,
      selectedTicketInfo,
      loadingEl,
      toEnd,
      queryTickets,
      isPanelOpen,
      openPanel,
      transferSuccess,
      tabs,
      activeTab
    }
  }
}
</script>

<style lang="sass" scoped>
.TicketsPage
  .tabsWrapper
    // width: 50%
    margin: 0 auto
  .wrapper
    padding: 1rem
  .title
    color: $main_c
    margin-bottom: 1.5rem

.cards
  grid-row-gap: 1rem
.panelWrapper
  padding: 1rem
.loading
  text-align: center
  color: #666
</style>
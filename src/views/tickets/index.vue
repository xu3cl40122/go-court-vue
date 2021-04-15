<template lang="pug">
.TicketsPage 
  h2.title 我的票夾
  .cards.grid 
    TicketCard(v-for="(ticket, i) of tickets" :info="ticket" :key="i" @onCardClick="showTicketDetail(ticket)")
    h5.loading(v-if="!toEnd" ref="loadingEl") LOADING ...
  
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
      size: 10,
      totalPage: 10
    })
    let loadingEl = ref(false)
    let toEnd = ref(false)

    onMounted(() => {
      queryTickets({ init: true })
      let observer = new IntersectionObserver(onInterset, {})
      loadingEl.value && observer.observe(loadingEl.value)
    })

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
        ...pageSetting.value
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
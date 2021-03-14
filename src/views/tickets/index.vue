<template lang="pug">
.TicketsPage 
  h2.title 我的票夾
  .cards.grid 
    TicketCard(v-for="(ticket, i) of tickets" :info="ticket" :key="i")

</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import TicketCard from '@/components/ticket/TicketCard'

export default {
  name: 'TicketPage',
  components: {
    TicketCard
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

    return {
      tickets,
      pageSetting,
      getMyTickets,
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
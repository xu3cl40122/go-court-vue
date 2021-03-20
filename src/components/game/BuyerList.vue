<template lang="pug">
.BuyerList
  .tickets.grid 
    .ticketCol(v-for="(ticket, i) of tickets" :key="i")
      .flex.between
        h5.buyer {{ ticket.owner_user_detail.profile_name }}
        .time {{ ticket.createdTimeStr }}

      .specWrapper.flex
        span {{ ticket.game_stock_detail.spec_name }}
        span {{ ticket.game_stock_detail.price }} NTD

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'BuyerList',
  components: {
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
      let { success, data } = await store.dispatch('Game/getGameTickets', { game_id, params, option: {} })
      if (!success) return
      tickets.value = data.content.map(d => {
        d.createdTimeStr = dayjs(d.created_at).format('YYYY/MM/DD HH:mm')
        return d
      })
    }

    return {
      tickets
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
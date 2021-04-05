<template lang="pug">
.TicketCard.grid.v-center(@click="onCardClick")
  .flex.between.v-center
    .status(:class="statusTag.class") {{ statusTag.label }}
    .tags 
      .gc-tag(v-for="(tag, i) of tags" :key="i" :class="tag.class") {{ tag.label }}

  
  .nameRow.flex.v-center
    .name {{ info.game_detail.game_name }} 
    .spec {{ info.game_stock_detail.spec_name }}
  .location {{ info.game_detail.court_detail.name }}
  .time {{ time }}
  .qrcode(v-if="showQrCode" ref="qrcodeRef")
  
</template>

<script>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import defaultImg from '@/assets/image/default.jpg'
import { toTimeRangeString } from '@/methods/time'

export default {
  name: 'TicketCard',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    showQrCode: Boolean
  },
  setup(props, { emit }) {
    const store = useStore()
    let { game_start_at, game_end_at, game_stock, game_type, court_type } = props.info.game_detail
    let time = computed(() => toTimeRangeString(game_start_at, game_end_at))
    let tags = computed(() => {
      let matchCourt = store.state.Game.courtTypeMap[court_type]
      let matchGame = store.state.Game.gameTypeMap[game_type]
      return [
        { label: matchCourt.label, class: matchCourt.class },
        { label: matchGame.label, class: matchGame.class },
      ]
    })

     let statusTag = computed(() => {
      let { game_ticket_status } = props.info
      let match = store.state.Ticket.ticketStatusMap[game_ticket_status]
      return match || {}
    })

    let price = computed(() => {
      if (!game_stock?.length) return '免費'
      let priceArr = game_stock.map(d => d.price).sort((a, b) => a - b)
      let min = priceArr[0]
      let max = priceArr[priceArr.length - 1]
      if (priceArr.length === 1 || min === max)
        return min
      return `${min} - ${max}`

    })

    let qrcodeRef = ref(null)
    function generateQrcode() {
      // new QRCode(qrcodeRef.value, props.info.game_ticket_id)
      let qrcode = new QRCode(qrcodeRef.value, {
        text: `gc-${props.info.game_ticket_id}`,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    onMounted(() => {
      if (props.showQrCode)
        generateQrcode()
    })

    function onCardClick() {
      emit('onCardClick')
    }

    return {
      time,
      price,
      tags,
      onCardClick,
      qrcodeRef,
      statusTag
    }
  }
}
</script>

<style lang="sass" scoped>
.TicketCard
  position: relative
  border-radius: 4px
  padding: .75rem 1rem 1rem
  background-color: rgba($main_c, .1)
  .status 
    padding: .25rem .5rem
    background-color: $main_c
    color: #fff 
    border-radius: 4px
    &.success 
      background-color: $success_c
    &.second 
      background-color: $second_c

  .nameRow 
    margin-bottom: .25rem
    font-size: 1.125rem 
    dont-weight: 500

  .name
    margin-right: 1rem
  .location 
    font-size: .875rem
    color: #666
    margin-bottom: .25rem
  .time
    font-size: 1.125rem
  .qrcode 
    margin: 1rem auto
</style>
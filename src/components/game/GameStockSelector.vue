<template lang="pug">
.GameStockSelector
  template(v-if="game.game_id")
    .tags 
      .gc-tag(v-for="(tag, i) of tags" :key="i" :class="tag.class") {{ tag.label }}

    h3.title {{ game.game_name }}
    .time {{ time }}

    .detail
      .detailCol 
        i.fas.fa-map-marker-alt
        span {{ game.court_detail.name }}
      //- .detailCol 
      //-   i.fas.fa-user 
      //-   span {{ game.host_user_detail.profile_name }} 
    .specContainer.grid 
      GameStockCard(v-for="(stock, i) of gameStock" :key="i" :stock="stock" :game="game" @change="cardChange")

    .gc-fixed-wrapper  
      button.gc-btn.main.full(@click="checkout") 送出

</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toTimeRangeString } from '@/methods/time'
import GameStockCard from '@/components/game/GameStockCard'

export default {
  name: 'GameStockSelector',
  components: {
    GameStockCard
  },
  props: {
    game: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    let gameStock = ref([])
    let time = computed(() => {
      let { game_start_at, game_end_at } = props.game
      return game_start_at ? toTimeRangeString(game_start_at, game_end_at) : ''
    })
    let tags = computed(() => {
      let { game_type, court_type } = props.game
      if (!props.game.game_id) return []
      let matchCourt = store.state.Game.courtTypeMap[court_type]
      let matchGame = store.state.Game.gameTypeMap[game_type]
      return [
        { label: matchCourt.label, class: matchCourt.class },
        { label: matchGame.label, class: matchGame.class },
      ]
    })

    watch(props, (newVal) => {
      let { game } = newVal
      if (!game.game_stock) return
      gameStock.value = game.game_stock.map(d => {
        d.count = 0
        return d
      })
    }, {
      immediate: true
    })

    function cardChange({ game_stock_id, count }) {
      let index = gameStock.value.findIndex(d => d.game_stock_id === game_stock_id)
      gameStock.value[index] = { ...gameStock.value[index], count }
    }

    async function checkout() {
      let body = gameStock.value
        .filter(d => d.count > 0)
        .map(d => {
          let { game_stock_id, count } = d
          return { game_stock_id, stock_amount: count }
        })
      let option = {}
      let { success, status } = await store.dispatch('Ticket/checkout', { body, option })
      success
        ? showMessageDialog('success')
        : showMessageDialog('failed', status)
    }

    function showMessageDialog(event, status) {
      let info = {}
      switch (event) {
        case 'success':
          info = {
            status: 'success',
            title: `購票成功`,
            subtitles: ['可在票券管理查看'],
            closeAfter: 3000,
            closeCb: toTicketsPage.bind(this)
          }
          break;
        case 'failed': {
          let subtitles = status === 400
            ? ['票已經賣光啦']
            : ['請稍後再試', '或聯絡系統管理員']
          info = {
            status: 'danger',
            title: `購票失敗`,
            subtitles,
          }
          break;
        }
        default:
          break;
      }
      store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info
      })
    }

    function toTicketsPage() {
      router.push({ name: 'Tickets' })
    }


    return {
      time,
      tags,
      gameStock,
      cardChange,
      checkout,
    }
  }
}
</script>

<style lang="sass" scoped>
.GameStockSelector
  padding: 1rem
  .title, .time
    margin-bottom: .5rem
  .detail
    color: #666
    .detailCol
      margin-bottom: .5rem
      i
        display: inline-block
        width: 1rem
        text-align: center
        margin-right: .25rem

  .specContainer
    margin-top: 1.5rem
    grid-row-gap: .5rem
</style>
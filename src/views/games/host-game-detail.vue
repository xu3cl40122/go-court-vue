<template lang="pug">
.GameDetailPage
  img.img(:src="logo")
  .content(v-if="game.game_id")
    .tags 
      .gc-tag(v-for="(tag, i) of tags" :key="i" :class="tag.class") {{ tag.label }}

    h3.title {{ game.game_name }}
    .time {{ time }}

    .detail
      .detailCol 
        i.fas.fa-map-marker-alt
        span {{ game.court_detail.name }}
      .detailCol 
        i.fas.fa-user 
        span {{ game.host_user_detail.profile_name }}
    
    h5.blockTitle 收費方式 
    .specCols.grid 
      .spec(v-for="(spec, i) of game.game_stock" :key="i")
        span {{ spec.spec_name }}
        span {{ spec.price }}
        span NTD
    
    h5.blockTitle 賽事說明
    .description {{ game.description }}
  
  .gc-fixed-wrapper  
    button.gc-btn.main.full(@click="openPanel(true)") 編輯球賽
  
  SidePanel(v-model:isOpen="isPanelOpen" title="編輯球賽")
    GameCreator(:game="game" @onGameChange="onGameChange" type="edit" )

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import defaultImg from '@/assets/image/default.jpg'
import { toTimeRangeString } from '@/methods/time'
import SidePanel from '@/components/layout/SidePanel'
import GameCreator from '@/components/game/GameCreator'

export default {
  name: 'GameDetailPage',
  components: {
    SidePanel,
    GameCreator
  },
  props: {
    game_id: String
  },
  setup(props) {
    const store = useStore()
    let game = ref({})
    let isPanelOpen = ref(false)
    onMounted(() => {
      store.commit('Layout/setHeaders', [
        {
          type: 'icons',
          icons: [{ icon: 'fas fa-chevron-left', class: '', event: 'back' }]
        },
        {
          type: 'title',
          title: 'GO COURT'
        },
        {
          type: 'icons',
          icons: [{ icon: 'fas fa-bars', class: '', event: 'toggleSidebar' }]
        },
      ])
      getGameById()
    })

    let logo = computed(() => game.value.logo_url || defaultImg)
    let time = computed(() => {
      let { game_start_at, game_end_at } = game.value
      return game_start_at ? toTimeRangeString(game_start_at, game_end_at) : ''
    })
    let tags = computed(() => {
      let { game_type, court_type } = game.value
      if (!game.value.game_id) return []
      let matchCourt = store.state.Game.courtTypeMap[court_type]
      let matchGame = store.state.Game.gameTypeMap[game_type]
      return [
        { label: matchCourt.label, class: matchCourt.class },
        { label: matchGame.label, class: matchGame.class },
      ]
    })

    let price = computed(() => {
      let game_stock = game.value.game_stock
      if (!game_stock?.length) return '免費'
      let priceArr = game_stock.map(d => d.price).sort((a, b) => a - b)
      let min = priceArr[0]
      let max = priceArr[priceArr.length - 1]
      if (priceArr.length === 1 || min === max)
        return min
      return `${min} - ${max}`

    })

    async function getGameById() {
      let game_id = props.game_id
      let { success, data } = await store.dispatch('Game/getGameById', { game_id, option: {} })
      if (!success) return
      game.value = data
    }

    function onGameChange() {
      getGameById()
      openPanel(false)
    }

    function openPanel(open) {
      console.log(7777777, open)
      isPanelOpen.value = open
    }

    return {
      game,
      logo,
      time,
      tags,
      price,
      isPanelOpen,
      openPanel,
      onGameChange
    }
  }
}
</script>

<style lang="sass" scoped>
.GameDetailPage 
  padding: 1rem
  .img 
    display: block 
    width: 100% 
    height: auto
    border-radius: 4px
    margin-bottom: 1rem
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
  .spec 
    font-size: 1.125rem 
    margin-bottom: .25rem
    span 
      margin-right: .25rem
  .blockTitle 
    margin: 1rem 0 .5rem
  .description 
    color: #666

</style>
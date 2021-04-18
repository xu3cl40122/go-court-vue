<template lang="pug">
.GameBasicInfo
  img.img(:src="logo")
  .content(v-if="game.game_id")
    .flex.between.v-center
      .tags 
        .gc-tag(v-for="(tag, i) of tags" :key="i" :class="tag.class") {{ tag.label }}
      .statusTag() 
        span {{ gameStatusTag.label }}

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
  
  

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import defaultImg from '@/assets/image/default.jpg'
import { toTimeRangeString } from '@/methods/time'

export default {
  name: 'GameBasicInfo',
  props: {
    game: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore()

    let logo = computed(() => props.game.logo_url || defaultImg)
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

    let gameStatusTag = computed(() => {
      let { game_status } = props.game
      let match = store.state.Game.gameStatusMap[game_status]
      return match || {}
    })

    let price = computed(() => {
      let game_stock = props.game.game_stock
      if (!game_stock?.length) return '免費'
      let priceArr = game_stock.map(d => d.price).sort((a, b) => a - b)
      let min = priceArr[0]
      let max = priceArr[priceArr.length - 1]
      if (priceArr.length === 1 || min === max)
        return min
      return `${min} - ${max}`

    })

    return {
      logo,
      time,
      tags,
      price,
      gameStatusTag,
    }
  }
}
</script>

<style lang="sass" scoped>
.GameBasicInfo 
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
  .statusTag 
    padding: .25rem .5rem
    background-color: $second_c
    color: #fff 
    border-radius: 4px

</style>
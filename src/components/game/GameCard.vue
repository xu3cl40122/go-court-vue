<template lang="pug">
.GameCard.grid.v-center
  .imgPart.flex.v-center
    .img(:style="{'background-image': `url(${logo})`}")
  .infoPart
    .tags 
      .gc-tag(v-for="(tag, i) of tags" :key="i" :class="tag.class") {{ tag.label }}
    h5.title {{ info.game_name }}
    .time {{ time }}
    .detail
      .detailCol 
        i.fas.fa-map-marker-alt
        span {{ info.court_detail.name }}
      .detailCol 
        i.fas.fa-dollar-sign
        span {{ price }}
      //- .detailCol 
      //-   i.fas.fa-user 
      //-   span {{ info.host_user_detail.profile_name }}
  
  .statusTag(:class="gameStatusTag.class") {{ gameStatusTag.label }}

</template>

<script>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import defaultImg from '@/assets/image/default.jpg'
import { toTimeRangeString } from '@/methods/time'
import dayjs from 'dayjs'

export default {
  name: 'GameCard',
  props: {
    info: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },
  setup(props) {
    const store = useStore()
    let logo = computed(() => props.info.logo_url || defaultImg)
    let { game_start_at, game_end_at, game_stock, game_type, court_type } = props.info
    let time = computed(() => toTimeRangeString(game_start_at, game_end_at))
    let tags = computed(() => {
      let matchCourt = store.state.Game.courtTypeMap[court_type]
      let matchGame = store.state.Game.gameTypeMap[game_type]
      return [
        { label: matchCourt.label, class: matchCourt.class },
        { label: matchGame.label, class: matchGame.class },
      ]
    })

    let gameStatusTag = computed(() => {
      let { game_status } = props.info
      let match = store.state.Game.gameStatusMap[game_status]
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

    onMounted(() => {
    })

    return {
      logo,
      time,
      price,
      tags,
      gameStatusTag,
    }
  }
}
</script>

<style lang="sass" scoped>
.GameCard
  position: relative
  grid-template-columns: auto 1fr
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16)
  border-radius: 4px
  border: 1px solid #eee
  overflow: hidden
  .imgPart
    padding-left: 1rem
    .img
      width: 80px
      height: 80px
      border-radius: 4px
      @include bgImgSetting()
  .infoPart 
    background-color: #fff
    padding: .5rem 1rem
    .title, .time 
      margin-bottom: .25rem
    .detail 
      color: #666
      font-size: .875rem
      .detailCol
        margin-bottom: .25rem
        i 
          display: inline-block
          width: 1rem 
          text-align: center
          margin-right: .25rem
  .statusTag 
    position: absolute 
    top: .25rem 
    right: .25rem 
    padding: .25rem .5rem
    color: #fff 
    border-radius: 4px
    &.success
      background-color: $success_c
    &.second
      background-color: $second_c
    &.info
      visibility: hidden
</style>
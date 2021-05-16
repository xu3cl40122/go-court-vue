<template lang="pug">
.GameBasicInfo
  .imgWrapper
    img.img(:src="logo")
    .statusTag(:class="gameStatusTag.class") 
      span {{ gameStatusTag.label }}
  .content(v-if="game.game_id")
    .flex.between.v-center
      .tags 
        .gc-tag(v-for="(tag, i) of tags" :key="i" :class="tag.class") {{ tag.label }}
      .flex
        .operator.flex
          .btn.pointer(v-if="editable && game.game_status === 'PENDING'" @click="editGame")
            i.fas.fa-edit 
            span 編輯
          .btn.pointer(v-if="canShare" @click="shareGame")
            i.fas.fa-share-alt
            span 分享
       

    h3.title {{ game.game_name }}
    .time {{ time }}

    .detail
      .detailCol.link(@click="toCourtDetail(game.court_detail.court_id)")
        i.fas.fa-map-marker-alt
        span {{ game.court_detail.name }}
      .detailCol.link(@click="showGoogleMap(game.court_detail.name)")
        i.fas.fa-location-arrow
        span {{ game.court_detail.address }}
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
import { useRouter } from 'vue-router'
import defaultImg from '@/assets/image/default.jpg'
import { toTimeRangeString } from '@/methods/time'

export default {
  name: 'GameBasicInfo',
  props: {
    editable: Boolean,
    game: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    let canShare = ref(false)

    let logo = computed(() => props.game?.meta?.logo_file_url || defaultImg)
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

    onMounted(() => {
      canShare.value = navigator.canShare()
    })

    function editGame() {
      emit('editGame')
    }

    function showGoogleMap(placeName) {
      let url = `https://www.google.com.tw/maps/search/${placeName}/`
      window.open(url, 'map', 'noopener noreferrer')
    }

    function toCourtDetail(court_id) {
      router.push({
        name: 'CourtDetail',
        params: {
          court_id
        }
      })
    }

    function shareGame() {
      const sharePromise = navigator.share({
        url: `${window.origin}/games/${props.game.game_id}`,
        title: props.game.game_name,
        text: props.game.game_name
      });
    }

    return {
      logo,
      time,
      tags,
      price,
      editGame,
      gameStatusTag,
      shareGame,
      canShare,
      showGoogleMap,
      toCourtDetail
    }
  }
}
</script>

<style lang="sass" scoped>
.GameBasicInfo
  .imgWrapper
    position: relative
  .img 
    display: block 
    width: 100% 
    height: auto
    border-radius: 4px
    margin-bottom: 1rem

  .statusTag
    position: absolute
    top: .5rem 
    right: .5rem
    padding: .25rem .5rem
    background-color: $second_c
    color: #fff 
    border-radius: 4px
    z-index: 1
    &.success
      background-color: $success_c
    &.second
      background-color: $second_c
    &.info
      background-color: #ccc

  .title, .time 
    margin-bottom: .5rem
  .operator 
    color: $main_c
    .btn 
      &:not(:last-child)
        margin-right: .5rem
    i 
      margin-right: .25rem
  .detail 
    color: #666
    .detailCol
      margin-bottom: .5rem
      &.link 
        text-decoration: underline
        color: $info_c
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
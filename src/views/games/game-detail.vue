<template lang="pug">
.GameDetailPage
  GameBasicInfo(:game="game")
  
  .gc-fixed-wrapper(v-if="btns.length")
    button.gc-btn.main.full(v-for="(btn, i) of btns" :key="i" :class="btn.class" :disabled="btn.disabled" @click="btn.callback") {{ btn.text }}
  
  SidePanel(v-model:isOpen="isPanelOpen" title="選擇種類及數量")
    GameStockSelector(:game="game")

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useMeta } from 'vue-meta'
import SidePanel from '@/components/layout/SidePanel'
import GameStockSelector from '@/components/game/GameStockSelector'
import GameBasicInfo from '@/components/game/GameBasicInfo'
import dayjs from 'dayjs'

export default {
  name: 'GameDetailPage',
  components: {
    SidePanel,
    GameStockSelector,
    GameBasicInfo
  },
  props: {
    game_id: String
  },
  setup(props) {
    let game = ref({})
    const computedMeta = computed(() => ({
      title: game.value.game_name,
      description: game.value.description,
      "og:title": `${game.value.game_name} | GO COURT 球場資源交流平台`,
      "og:site_name": `${game.value.game_name} | GO COURT 球場資源交流平台`,
      "og:description": game.value.description,
    }))
    // const { meta, onRemoved } = useMeta(computedMeta)
    const store = useStore()

    let isLogin = computed(() => store.state.User.isLogin)
    let isPanelOpen = ref(false)
    onMounted(() => {
      getGameById()
    })

    let btns = computed(() => {
      switch (game.value.game_status) {
        case 'PENDING': {
          let isSelling = dayjs().isAfter(dayjs(game.value.sell_start_at)) && dayjs().isBefore(dayjs(game.value.sell_end_at))
          return [{ text: '參加球賽', class: '', disabled: !isSelling, callback: joinGame.bind(this) }]
        }

        default:
          return []
      }
    })

    async function getGameById() {
      let game_id = props.game_id
      let { success, data } = await store.dispatch('Game/getGameById', { game_id, option: {} })
      if (!success) return
      game.value = data
    }

    function joinGame() {
      isLogin.value
        ? openPanel(true)
        : login()
    }

    function login() {
      store.commit('Dialog/setDialog', {
        name: 'userDialog',
        info: { type: 'login' }
      })
    }

    function openPanel(open) {
      isPanelOpen.value = open
    }

    return {
      game,
      isPanelOpen,
      openPanel,
      btns
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
<template lang="pug">
.GameRecord
  .gc-form()
    .col(v-for="(col, key) in infoColumns" :key="key" :class="col.class")
      FormItem(
        :iCol="col",
        :iKey="key",
        @onChange="onChange"
      )

  .flex.h-center
    .gc-btns
      button.gc-btn.main(@click="putGame") 編輯備註
      button.gc-btn.second(@click="closeGame") 關閉球賽
     


</template>

<script>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FormItem from "@/components/unit/FormItem.vue"
import { isNull } from "@/methods/"

export default {
  name: 'GameRecord',
  components: {
    FormItem,
  },
  props: {
    game: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { emit, slots }) {
    const store = useStore()
    const router = useRouter()

    watch(() => props.game, val => {
      //待研究  等 infoCloumns 初始化 
      setTimeout(() => setGameInfo(val), 0)
    }, { immediate: true })

    function setGameInfo(val) {
      Object.keys(infoColumns).forEach(key => {
        let col = infoColumns[key]
        switch (key) {
          case 'comment':
            col.model = props.game.meta?.comment
            break;
          default:
            if (props.game[key])
              col.model = props.game[key]
            break;
        }

      })
    }

    const infoColumns = reactive({
      comment: {
        label: '球賽備註',
        model: '',
        type: 'textarea',
        class: '',
        required: false,
        error: '',
      },
    })

    async function putGame() {
      let body = emitData()
      let { game_id } = props.game
      let { success, data } = await store.dispatch('Game/putGame', { game_id, body, option: {} })
    }

    async function closeGame() {
      let { game_id } = props.game
      let { success, data } = await store.dispatch('Game/closeGame', { game_id, body: {}, option: {} })
      if (!success) return showMessageDialog('failed')
      showMessageDialog('closeGameSuccess')
    }

    function emitData() {
      let outputData = {}
      let isValid = true
      Object.keys(infoColumns).forEach(key => {
        let col = infoColumns[key]
        checkValue({ col, key })
        if (col.error) return isValid = false

        switch (key) {
          case 'comment':
            outputData.meta = { ...props.game.meta, comment: col.model }
            break;
          default:
            outputData[key] = col.model
            break;
        }
      })

      return isValid ? outputData : false
    }


    function checkValue({ col, key }) {
      let { model, required, label } = col
      if (required && isNull(model))
        return col.error = `請輸入"${label}"`

      return col.error = ''
    }

    function onChange({ col, key }) {
      switch (key) {
        default:
          checkValue({ col, key })
          break;
      }
    }

    function showMessageDialog(status) {
      let info = {}
      switch (status) {
        case 'closeGameSuccess':
          info = {
            status: 'success',
            title: `球賽結束`,
            subtitles: ['打完球就是要吃個飽的'],
            closeAfter: 3000,
            closeCb: () => router.push({ name: 'MyGames' })
          }
          break;
        case 'failed':
          info = {
            status: 'danger',
            title: `服務異常`,
            subtitles: ['請稍後再試', '或聯絡系統管理員'],
          }
          break;

        default:
          break;
      }
      store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info
      })
    }

    function onGameChange() {
      emit('onGameChange')
    }


    return {
      onChange,
      infoColumns,
      putGame,
      closeGame
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
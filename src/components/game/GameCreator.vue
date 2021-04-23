<template lang="pug">
.GameCreator
  Tabs(:tabs="tabs" :active="active" @changeTab="changeTab")
  .body
    template(v-if="active === 'basicInfo'")
      label.imgWrapper
        img.img(:src="logoSrc || defaultImg")
        input.hidden(v-show="false" type="file" accept="image/jpeg, image/png" @change="addFile")
      .gc-form(:key="updateIndex")
        .col(v-for="(col, key) in basicColumns" :key="key" :class="col.class")
          FormItem(
            :iCol="col",
            :iKey="key",
            @onChange="onChange"
          )
    template(v-else-if="active === 'timeLocation'") 
      .gc-form(:key="updateIndex")
        .col(v-for="(col, key) in timeLocationColumns" :key="key" :class="col.class")
          FormItem(
            :iCol="col",
            :iKey="key",
            @onChange="onChange"
          )
    template(v-else-if="active === 'ticket'")
      .gc-form(:key="updateIndex")
        .col(v-for="(col, key) in ticketColumns" :key="key" :class="col.class")
          FormItem(
            :iCol="col",
            :iKey="key",
            @onChange="onChange"
          )
      .specWrapper
        SpecCreator(ref="SpecCreatorRef" v-if="!ticketColumns.is_free.model" v-model:specList="specList")

  .gc-fixed-wrapper 
    .gc-btns 
      button.gc-btn.full(v-for="(btn, i) of btns" :key="active + i" :class="btn.class" @click="btn.callback") {{ btn.text }}

</template>

<script>
import Tabs from '@/components/unit/Tabs'
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import FormItem from "@/components/unit/FormItem.vue"
import SpecCreator from "@/components/game/SpecCreator.vue"
import { isNull } from "@/methods/"
import defaultImg from '@/assets/image/default.jpg'

export default {
  name: 'GameCreator',
  components: {
    FormItem,
    Tabs,
    SpecCreator,
  },
  props: {
    game: {
      type: Object,
      default: () => ({})
    },
    // create, edit
    type: {
      type: String,
      default: 'create'
    }
  },
  setup(props, { emit, slots }) {
    const store = useStore()
    let updateIndex = ref(0)
    let SpecCreatorRef = ref(null)
    let specList = ref([])

    onMounted(async () => {
       if (props.game) {
        setGameInfo(props.game)
        setSpecList(props.game)

      }
    })

    // watch(props, val => {
    //   console.log(77777777)
    //   if (props.game) {
    //     setGameInfo(props.game)
    //     setSpecList(props.game)

    //   }
    // })

    function setGameInfo(game) {
      Object.keys(allColumns.value).forEach(key => {
        let col = allColumns.value[key]
        switch (key) {
          case 'game_start_at':
          case 'game_end_at':
          case 'sell_start_at':
            if (game[key])
              col.model = new Date(game[key])
            break;
          default:
            if (game[key])
              col.model = game[key]
            break;
        }

      })
    }

    function setSpecList(game) {
      specList.value = game.game_stock
    }

    let active = ref('basicInfo')
    let tabs = ref({
      basicInfo: { label: '基本資訊' },
      timeLocation: { label: '時間地點' },
      ticket: { label: '收費設定' },
    })

    function changeTab(tab) {
      let body = emitData(activeColumns.value)
      if (!body) return

      active.value = tab
    }

    let btns = computed(() => {
      switch (active.value) {
        case 'basicInfo':
          return [{ text: '下一步', class: 'main', callback: changeTab.bind(this, 'timeLocation') }]
        case 'timeLocation':
          return [
            // { text: '上一步', class: 'second', callback: changeTab.bind(this, 'basicInfo') },
            { text: '下一步', class: 'main', callback: changeTab.bind(this, 'ticket') },
          ]
        case 'ticket':
          return [
            // { text: '上一步', class: 'second', callback: changeTab.bind(this, 'timeLocation') },
            { text: '確認送出', class: 'second', callback: submit.bind(this) },
          ]
        default:
          break;
      }
    })


    const basicColumns = reactive({
      game_name: {
        label: '球賽名稱',
        model: '',
        type: 'text',
        class: '',
        required: true,
        error: '',
      },
      game_type: {
        label: '球賽類型',
        model: [],
        type: 'select',
        class: '',
        required: true,
        error: '',
        options: store.getters['Game/getGameTypeOptions']
      },
      court_type: {
        label: '場地類型',
        model: [],
        type: 'select',
        class: '',
        required: true,
        error: '',
        options: store.getters['Game/getCourtTypeOptions']
      },
      is_public: {
        label: "是否公開",
        type: "radio",
        model: true,
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
        required: true,
        asterisk: false,
        error: "",
      },
      description: {
        label: '球賽簡介',
        model: '',
        type: 'textarea',
        class: '',
        required: false,
        error: '',
      },
    })

    const timeLocationColumns = reactive({
      court_id: {
        label: '地點',
        model: '',
        placeholder: '輸入並搜尋球場名稱',
        type: 'courtSelector',
        class: '',
        required: true,
        error: '',
      },
      game_start_at: {
        label: '開始時間',
        model: null,
        type: 'datetime',
        class: '',
        required: true,
        error: '',
      },
      game_end_at: {
        label: '結束時間',
        model: null,
        type: 'datetime',
        class: '',
        required: true,
        error: '',
      },
      sell_start_at: {
        label: '上架時間',
        model: new Date(),
        placeholder: '上架後其他人才能報名您的球賽',
        type: 'datetime',
        class: '',
        required: true,
        error: '',
      },

    })

    const ticketColumns = reactive({
      is_free: {
        label: "是否收費",
        type: "radio",
        model: false,
        options: [
          { label: '是', value: false },
          { label: '否', value: true },
        ],
        required: true,
        asterisk: false,
        error: "",
      },
    })


    let activeColumns = computed(() => {
      switch (active.value) {
        case 'basicInfo':
          return basicColumns
        case 'timeLocation':
          return timeLocationColumns
        case 'ticket':
          return ticketColumns
        default:
          return {}
      }
    })

    let allColumns = computed(() => {
      return {
        ...basicColumns,
        ...timeLocationColumns,
        ...ticketColumns
      }
    })

    async function submit() {
      let body = emitData(allColumns.value, true)
      if (!body) return
      let isSpecValid = validSpecList()
      if (!isSpecValid) return


      props.type === 'create'
        ? addGame({ body })
        : editGame({ body, game_id: props.game.game_id })
    }

    async function addGame({ body }) {
      let { success, data } = await store.dispatch('Game/postGame', { body, option: { keepLoading: true } })
      if (!success) return showMessageDialog('failed')
      return editGame({ body: data, game_id: data.game_id })
    }

    async function editGame({ game_id, body }) {
      let { meta = {} } = body

      let { file_id, file_url } = await updateLogo({ game_id, file_id: meta?.logo_file_id })
      console.log(777777777, file_id, file_url)
      body.meta = {
        ...meta,
        logo_file_id: file_id,
        logo_file_url: file_url
      }

      let option = {}
      console.log('meta', meta)
      let apis = [
        store.dispatch('Game/putGame', { game_id, body, option }),
        store.dispatch('Game/putGameStock', { game_id, body: specList.value, option })
      ]

      let resArr = await Promise.all(apis).catch(err => false)

      resArr.every(res => res.success)
        ? showMessageDialog('success')
        : showMessageDialog('failed')
    }


    /**
     * @columns 要處理的欄位
     * @isAll 是否為全部欄位
     */
    function emitData(columns, isAll) {
      let outputData = {}
      let isValid = true
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        checkValue({ col, key })
        if (col.error) return isValid = false

        switch (key) {
          case 'game_start_at':
          case 'game_end_at':
          case 'sell_start_at':
            outputData[key] = new Date(col.model).toISOString()
            break;
          default:
            outputData[key] = col.model
            break;
        }
      })

      if (isAll) {
        outputData.sell_end_at = outputData.game_start_at
        outputData.deleted = false
      }
      updateIndex.value++

      return isValid ? outputData : false
    }


    let logoFile = ref({})
    let tempLogoUrl = ref('')
    let logoSrc = computed(() => tempLogoUrl.value || props.game?.meta?.logo_url)

    function addFile(e) {
      logoFile.value = e.target.files[0]
      let url = URL.createObjectURL(logoFile.value)
      tempLogoUrl.value = url
    }

    async function updateLogo({ game_id, file_id }) {
      let file = logoFile.value
      if (!file) return {}
      // create file entity
      if (!file_id) {
        let body = {
          reference_id: game_id,
          file_name: file.name,
          description: '',
          tag: 'GAME_LOGO'
        }
        let { success, data } = await store.dispatch('File/postFile', { body, option: { keepLoading: true } })
        if (!success) return showMessageDialog('failed')
        file_id = data.file_id
      }
      // put file content
      let contentRes = await store.dispatch('File/putFileContent', { file_id, file, option: { keepLoading: true } })
      if (!contentRes.success) return showMessageDialog('failed')

      return { file_id, file_url: contentRes.data.file_url }
    }

    function checkValue({ col, key }) {
      let { model, required, label } = col
      if (required && isNull(model))
        return col.error = `請輸入"${label}"`

      return col.error = ''
    }

    function onChange({ col, key }) {
      switch (key) {
        case 'game_start_at':
          if (!timeLocationColumns.game_end_at.model)
            timeLocationColumns.game_end_at.model = col.model
          break;
        default:
          checkValue({ col, key })
          break;
      }
    }

    function validSpecList() {
      let isPass = true
      specList.value = specList.value.map(spec => {
        let { spec_name, stock_amount, price } = spec
        if (isNull(spec_name) || isNull(stock_amount) || isNull(price)) {
          spec.error = '請完成表單再送出'
          isPass = false
        }
        return spec
      })
      return isPass
    }



    function showMessageDialog(status) {
      let info = {}
      let eventNameMap = {
        'create': '新增球賽',
        'edit': '編輯球賽',
      }
      let eventName = eventNameMap[props.type]
      switch (status) {
        case 'success':
          info = {
            status: 'success',
            title: `${eventName}成功`,
            subtitles: ['可在球賽管理查看'],
            closeAfter: 3000,
            closeCb: onGameChange.bind(this)
          }
          break;
        case 'failed':
          info = {
            status: 'danger',
            title: `${eventName}失敗`,
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
      basicColumns,
      timeLocationColumns,
      ticketColumns,
      onChange,
      updateIndex,
      submit,
      emitData,
      active,
      tabs,
      changeTab,
      btns,
      specList,
      SpecCreatorRef,
      allColumns,
      defaultImg,
      logoSrc,
      addFile,
      logoFile,
      tempLogoUrl
    }
  }
}
</script>

<style lang="sass" scoped>
.body 
  padding: 1rem 1rem 4rem

.imgWrapper
  position: relative
  width: 100%
.img
  display: block
  width: 100%
  height: auto
  margin-bottom: 1rem
  border-radius: 4px
.specWrapper 
  margin-top: 1.5rem
</style>
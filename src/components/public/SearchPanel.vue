<template lang="pug">
.SearchPanel
  .gc-form.col-2(:key="updateIndex")
    .col(v-for="(col, key) in columns" :key="key" :class="col.class")
      FormItem(
        :iCol="col",
        :iKey="key",
        @onChange="onChange"
      )
  
  .gc-btns 
    button.gc-btn.main(@click="submit") 找球賽

</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import FormItem from "@/components/unit/FormItem.vue"
import _ from 'lodash';
import { getCityOptions, getDistOptions } from '@/methods/district'
import { isNull, delay } from "@/methods/"
import dayjs from 'dayjs'

export default {
  name: 'SearchPanel',
  components: {
    FormItem
  },
  props: {
    className: String
  },
  setup(props, { emit }) {
    let updateIndex = ref(0)
    const store = useStore()
    const columns = {
      city_code: {
        label: "縣市",
        type: "select",
        class: '',
        model: "",
        placeholder: "",
        options: getCityOptions(),
        required: true,
        error: "",
      },
      dist_code: {
        label: '鄉鎮市區',
        model: '',
        type: 'select',
        class: '',
        required: false,
        showClear: true,
        error: '',
        options: []
      },
      date_range: {
        label: '日期區間',
        model: '',
        type: 'dateRange',
        class: 'span2',
        required: true,
        error: '',
        options: []
      },
      game_type: {
        label: '球賽類型',
        model: [],
        type: 'multiSelect',
        class: 'span2',
        required: false,
        error: '',
        options: store.getters['Game/getGameTypeOptions']
      },
      court_type: {
        label: '球場',
        model: [],
        type: 'multiSelect',
        class: 'span2',
        required: false,
        error: '',
        options: store.getters['Game/getCourtTypeOptions']
      }

    }

    onMounted(async () => {
      getParamsFromLocal()

    })

    function getParamsFromLocal() {
      let params = localStorage.getItem('GC_SEARCH_GAME_PARAMS')
      if (!params) return
      params = JSON.parse(params)
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        switch (key) {
          case 'date_range':
            if (params[key]) {
              let [start, end] = params[key]
              col.model = [new Date(start), new Date(end)]
            }
            break;
          case 'city_code':
            col.model = params[key]
            onChange({ col, key })
            break
          default:
            if (params[key])
              col.model = params[key]
            break;
        }

      })
      updateIndex.value++
    }

    async function submit() {
      let params = emitData()
      if (!params) return
      saveParamsToLocal()
      emit('queryGames', params)
    }

    function saveParamsToLocal() {
      let params = {}
      Object.keys(columns).forEach(key => params[key] = columns[key].model)
      localStorage.setItem('GC_SEARCH_GAME_PARAMS', JSON.stringify(params))
    }

    function emitData() {
      let outputData = {}
      let isValid = true
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        checkValue({ col, key })
        if (col.error) return isValid = false

        switch (key) {
          case 'game_type':
          case 'court_type':
            outputData[key] = col.model.join(',')
            break;
          case 'date_range':
            let [start, end] = col.model
            outputData.start = new Date(start).toISOString()
            outputData.end = new Date(dayjs(end).add(24, 'hour')).toISOString()
            break;
          default:
            outputData[key] = col.model
            break;
        }
      })
      updateIndex.value++
      return isValid ? outputData : false
    }

    function checkValue({ col, key }) {
      let { model, required, label } = col
      if (required && isNull(model))
        return col.error = `請輸入"${label}"`
      if (key === 'date_range' && col.model.some(d => !d))
        return col.error = `請選擇開始及結束時間`

      return col.error = ''
    }

    function onChange({ col, key }) {
      switch (key) {
        case 'city_code':
          columns.dist_code.options = getDistOptions(col.model)
          columns.dist_code.model = null
          updateIndex.value++
          checkValue({ col, key })
          break;

        default:
          checkValue({ col, key })
          break;
      }
    }

    return {
      columns,
      onChange,
      updateIndex,
      submit,
      emitData,
    }
  }
}
</script>

<style lang="sass" scoped>
.SearchPanel
  padding: 1rem 1rem
  &.card
    border-radius: 8px
    background-color: #fff
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 1px
.col 
  &.span2 
    grid-column: span 2
.gc-btns 
  margin-top: 1rem
</style>
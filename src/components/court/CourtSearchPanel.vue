<template lang="pug">
.CourtSearchPanel
  .gc-form.col-2(:key="updateIndex")
    .col(v-for="(col, key) in columns" :key="key" :class="col.class")
      FormItem(
        :iCol="col",
        :iKey="key",
        @onChange="onChange"
      )
  
  .gc-btns 
    button.gc-btn.main.full(@click="submit") 找球場

</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import FormItem from "@/components/unit/FormItem.vue"
import _ from 'lodash';
import { getCityOptions, getDistOptions } from '@/methods/district'
import { isNull, delay } from "@/methods/"
import dayjs from 'dayjs'

export default {
  name: 'CourtSearchPanel',
  components: {
    FormItem
  },
  props: {
    className: String,
    queryParams: {
      type: Object,
      default: () => ({})
    }
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
      name: {
        label: '關鍵字',
        model: [],
        class: 'span2',
        type: 'text',
        required: false,
        error: '',
      }

    }

    watch(props, (val) => {
      if (Object.keys(props.queryParams).length)
        setParams(props.queryParams)
    }, { immediate: true })

    function setParams(params) {
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        switch (key) {
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
      emit('update:queryParams', params)
    }

    function emitData() {
      let outputData = {}
      let isValid = true
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        checkValue({ col, key })
        if (col.error) return isValid = false

        switch (key) {
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
.CourtSearchPanel
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
<template lang="pug">
.SearchPanel
  .gc-form(:key="updateIndex")
    FormItem(
      v-for="(col, key) in columns",
      :key="key",
      :iCol="col",
      :iKey="key",
      @onChange="onChange"
    )
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import FormItem from "@/components/unit/FormItem.vue"
import _ from 'lodash';
import { getCityOptions, getDistOptions } from '@/methods/district'

export default {
  name: 'SearchPanel',
  components: {
    FormItem
  },
  props: {},
  setup(props, context) {
    let updateIndex = ref(0)
    const columns = {
      city: {
        label: "縣市",
        type: "select",
        model: "",
        placeholder: "",
        options: getCityOptions(),
        required: true,
        error: "",
      },
      dist: {
        label: '鄉鎮市區',
        model: '',
        type: 'select',
        required: false,
        error: '',
        options: []
      },

    }

    onMounted(() => {
      let citys = getCityOptions()
      columns.city.options = citys
    })

    function onChange({ col, key }) {
      switch (key) {
        case 'city':
          columns.dist.options = getDistOptions(col.model)
          columns.dist.model = col.model
          updateIndex.value++
          break;

        default:
          break;
      }
    }

    return {
      columns,
      onChange,
      updateIndex
    }
  },
  methods: {
  
  }
}
</script>

<style lang="sass" scoped>
.SearchPanel
  padding: 1rem 1rem
  border-radius: 8px
  background-color: #fff
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 1px
</style>
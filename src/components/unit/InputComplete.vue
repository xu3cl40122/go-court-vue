<template lang="pug">
.InputComplete
  AutoComplete(v-model="courtName" :suggestions="suggestions" @complete="searchItem($event)" 
  field="name" :forceSelection="true" :placeholder="placeholder" :disabled="disabled" :minLength="0" @item-select="onSelect")
    template(#item="slotProps")
      span.name {{ slotProps.item.name }}
      span.address {{ slotProps.item.address }}


</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'

import AutoComplete from 'primevue/autocomplete';
import { useStore } from 'vuex';

export default {
  name: 'InputComplete',
  components: {
    AutoComplete,
  },
  props: {
    modelValue: Object,
    target: String,
    // 要拿來用的 attribute
    emitAttr: String,
    placeholder: String,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    let store = useStore()
    let courtName = ref('')
    let suggestions = ref([])

    function searchItem(e) {
      switch (props.target) {
        case 'court':
          return searchCourts(e)
        default:
          break;
      }
    }

    function onSelect({ value }) {
      emit('onSelect', value)
    }

    async function searchCourts(e) {
      let params = { name: e.query }
      let option = {}
      let { data } = await store.dispatch('Court/searchCourts', { params, option })
      suggestions.value = data
    }

    return {
      courtName,
      suggestions,
      searchItem,
      onSelect
    }
  }
}
</script>

<style lang="sass" scoped>
:deep .p-autocomplete
  width: 100%
.name 
  margin-right: 1rem
  font-weight: 500
.address 
  color: #666
  font-size: .75rem
</style>
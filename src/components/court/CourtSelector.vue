<template lang="pug">
.CourtSelector
  template(v-if="!courtInfo.court_id")
    AutoComplete(v-model="queryText" :suggestions="suggestions" @complete="searchCourts($event)" 
    field="name" :forceSelection="true" placeholder="輸入並搜尋球場名稱" :disabled="disabled" :minLength="0" @item-select="onSelect")
      template(#item="slotProps")
        span.name {{ slotProps.item.name }}
        span.address {{ slotProps.item.address }}
  template(v-else)
    .flex.between.v-center
      .info
        .name.mgb {{ courtInfo.name }}
        .address {{ courtInfo.address }}
      .icons 
        i.fas.fa-map-marker-alt(@click="showGoogleMap(courtInfo.name)")
        i.fas.fa-pen(@click="edit")
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'CourtSelector',
  components: {
    AutoComplete
  },
  props: {
    courtId: String,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    let store = useStore()
    let queryText = ref('')
    let suggestions = ref([])
    let courtInfo = ref({})

    function onSelect({ value }) {
      courtInfo.value = value
      emit('onSelect', value.court_id)
    }

    watch(props, (val) => {
      if (props.courtId)
        getCourtById(props.courtId)
    }, { immediate: true })

    async function searchCourts(e) {
      let params = { name: e.query }
      let option = { skipLoading: true }
      let { data } = await store.dispatch('Court/searchCourts', { params, option })
      suggestions.value = data
    }

    async function getCourtById(court_id) {
      let option = { skipLoading: true }
      let { data, success } = await store.dispatch('Court/getCourtById', { court_id, option })
      if (!success) return
      courtInfo.value = data
    }

    function edit() {
      courtInfo.value = {}
      queryText.value = ''
    }

    function showGoogleMap(placeName) {
      let url = `https://www.google.com.tw/maps/search/${placeName}/`
      window.open(url, 'map', 'noopener noreferrer')
    }

    return {
      queryText,
      suggestions,
      searchCourts,
      onSelect,
      courtInfo,
      edit,
      showGoogleMap
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
  &.mgb 
    margin-bottom: .25rem 
.address 
  color: #666
  font-size: .75rem

.icons 
  i 
    font-size: 1.25rem
    margin-right: .75rem 
    color: $main_c
</style>

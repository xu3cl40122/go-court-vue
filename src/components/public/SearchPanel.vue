<template lang="pug">
.SearchPanel
  .col
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'SearchPanel',
  props: {},
  setup(props) {
    const columns = {
      city: {
        label: '縣市',
        model: '',
        type: 'select',
        required: true,
        error: '',
        options: []
      },
      dist: {
        label: '鄉鎮市區',
        model: '',
        type: 'select',
        required: true,
        error: '',
        options: []
      },
      
    }
    return {
    }
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
<template lang="pug">
.ListItem.flex.v-center(:class="info.className")
  .label
    i(:class="info.icon")
    span {{ info.label }}
  .value {{ info.value }}
  
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'

export default {
  name: 'Avatar',
  props: {
    info: {
      type: Object,
      default: {
        label: '',
        value: '',
        icon: '',
        className: ''

      }
    },
  },
  setup(props) {

    return {
    }
  }
}
</script>

<style lang="sass" scoped>
.ListItem
  padding: .75rem 1.25rem
  &.block 
    flex-direction: column
    align-items: flex-start
    .label 
      margin-bottom: .75rem
    .value 
      margin-left: 1rem
  i 
    display: inline-block
    width: 1.25rem
    text-align: center
    margin-right: .25rem
  .label 
    color: #4a4a4a
    margin-right: 1rem
  .value 
    color: #333
    font-weight: 500
    
 

</style>
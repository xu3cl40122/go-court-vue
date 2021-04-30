<template lang="pug">
.ListItem.flex.baseline(:class="info.className")
  .label
    i(:class="info.icon")
    span {{ info.label  }}
  .value(:id="info.copy ? iKey : ''" ) 
    span {{ info.value }}
    i.fas.fa-clone.copyBtn(v-if="info.copy" :data-clipboard-target="`#${iKey}`")
  
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'

export default {
  name: 'Avatar',
  props: {
    iKey: String,
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
    onMounted(() => {
      new ClipboardJS('.copyBtn');
    })

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
  &.small 
    .value 
      font-size: .75rem
  i 
    display: inline-block
    width: 1.25rem
    text-align: center
    margin-right: .25rem
  .label
    flex: 0 0 auto
    color: #4a4a4a
    margin-right: 1rem
  .value 
    flex: 1 1 auto
    color: #333
    font-weight: 500
  .copyBtn 
    font-size: 1rem
    margin-left: .5rem
    color: $main_c
    
 

</style>
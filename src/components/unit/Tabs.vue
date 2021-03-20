<template lang="pug">
.Tabs.grid(:style="tabsStyle")
  .tab.pointer(v-for="(tab, key) of tabs" :key="key" :class="[active === key && 'active']" @click="changeTab(key)")
    span {{ tab.label }}
</template>

<script>
import { ref, computed, onMounted } from 'vue'
export default {
  name: 'Tabs',
  props: {
    active: String,
    tabs: {
      type: Object,
      default() {
        return {
          key1: { label: 'key1' },
          key2: { label: 'key2' },
        }
      }
    }
  },
  setup(props, { emit }) {
    let tabsStyle = computed(() => {
      return {
        'grid-template-columns': `repeat(${Object.keys(props.tabs).length}, 1fr)`
      }
    })

    function changeTab(key) {
      emit('changeTab', key)
      emit('update:active', key)
    }

    return {
      tabsStyle,
      changeTab,
    }
  }
}
</script>

<style lang="sass" scoped>
.tab 
  padding: .75rem 0
  text-align: center
  border-bottom: 1px solid #eee
  color: #666
  transition: color .3s ease-in-out
  position: relative
  transition: color .3s ease-in-out
  &:before 
    content: ''
    position: absolute
    bottom: 0 
    left: 0
    width: 100% 
    height: 3px
    background-color: $main_c
    width: 100%
    transform: scale3d(0, 1, 1)
    transition: transform .3s ease-in-out
  &.active 
    color: $main_c
    font-weight: 500
    &:before
      transform: scale3d(1, 1, 1)
    
      

</style>
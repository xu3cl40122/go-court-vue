<template lang="pug">
.TabBlocks
  .block(v-for="(block, i) of tabs" :key="i" :class="tabIndex === i ? 'active' : ''" @click="changeTab(i)")
    i(:class="block.icon")
    .label {{ block.label }}
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'TabBlocks',
  props: {
    tabs: {
      type: Array,
      default: () => ([
        { label: '', icon: '', value: '' }
      ])
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, {emit}) {
    function changeTab(index) {
      emit('update:tabIndex', index)
    }

    return { changeTab }

  }
}
</script>

<style lang="sass" scoped>
.TabBlocks
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: .5rem
  padding: .5rem 0
  .block
    padding: 1rem 0
    border-radius: 8px
    text-align: center
    color: #fff
    background-color: rgba(0, 0, 0, .4)
    font-weight: 600
    transition-property: color, background-color
    transition-duration: .3s
    transition-timing-function: ease-in-out
    &.active
      color: $main_c
      background-color: #fff
</style>
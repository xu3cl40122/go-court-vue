<template lang="pug">
.SidePanel(:class="isOpen ? 'show' : ''")
  .header.flex.v-center.h-center
    i.fas.fa-chevron-left.backIcon.pointer(@click="toggleOpen")
    h5 {{ title }}
  slot
  
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'SidePanel',
  props: {
    isOpen: Boolean,
    title: String
  },
  setup(props, { emit }) {
    function toggleOpen() {
      let { isOpen } = props
      emit('update:isOpen', !isOpen)
    }

    return {
      toggleOpen,
    }
  }
}
</script>

<style lang="sass" scoped>
.SidePanel
  position: fixed
  top: 0
  left: 0
  height: 100%
  width: 100%
  background-color: #fff
  transform: translateX(100%)
  transition: transform .3s ease-in-out
  z-index: $headerZ
  &.show
    transform: translateX(0)

  .header 
    height: $headerH 
    background-color: $main_c
    color: #fff
    padding: 0 1rem
    .backIcon 
      position: absolute 
      left: 1rem
      font-size: 1.25rem

</style>
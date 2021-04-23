<template lang="pug">
.IconBtns.flex.h-center
  .btn.flex.h-center.baseline(v-for="(btn, i) of buttons" :key="i" @click="clickBtn(btn)"
    :class="btn.class")
    i(:class="btn.icon")
    .label {{ btn.text }}

</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'IconBtns',
  props: {
    buttons: {
      type: Array,
      default() {
        return [
          { icon: 'fas fa-edit', class: '', text: '編輯', callback: null },
          { icon: 'fas fa-edit', class: '', text: '編輯', callback: null },
        ]
      }
    }
  },
  setup(props) {


    function clickBtn(btn) {
      if (btn.callback)
        btn.callback()
    }

    return {
      clickBtn,
    }
  }
}
</script>

<style lang="sass" scoped>
.IconBtns 
  background-color: #fff
  .btn
    flex: 1 1 auto
    background-color: #eee
    border-radius: 10px
    padding: .5rem 1rem
    i 
      margin-right: .5rem
   
</style>


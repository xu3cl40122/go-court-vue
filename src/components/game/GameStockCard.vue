<template lang="pug">
.GameStockCard
  .flex.between
    h5 {{ stock.spec_name }}
    h3 
      span.main_c {{ stock.price }} 
      span.unit NTD

  .counter.flex.v-center.h-end 
    span.label 數量
    i.fas.fa-minus-circle(@click="setCount(-1)")
    input.countInput(v-model="count")
    i.fas.fa-plus-circle(@click="setCount(1)")
    
</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue'
export default {
  name: 'GameStockCard',
  props: {
    game: {
      type: Object,
      default: () => ({})
    },
    stock: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let count = ref(0)

    function setCount(val) {
      count.value += val
    }

    return {
      count,
      setCount,
    }
  }
}
</script>

<style lang="sass" scoped>
.GameStockCard 
  padding: .75rem 1rem 
  border-radius: 4px
  border: solid 1px #eaeaea
  .unit 
    font-size: .75rem
    margin-left: .25rem
    color: #333
  
  .counter
    margin-top: 1rem
    .label 
      margin-right: .5rem
    i 
      color: $main_c
      font-size: 1.5rem
    .countInput 
      width: 3rem
      text-align: center
      font-size: 1.25rem
      border: none 
      outline: none
</style>
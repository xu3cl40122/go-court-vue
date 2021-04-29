<template lang="pug">
.GameStockCard
  .flex.between
    h5 {{ stock.spec_name }}
    h3 
      span.main_c {{ stock.price }} 
      span.unit NTD

  .flex.between
    .rest.flex 
      span 剩餘
      span {{ stock.stock_amount }}

    .counter.flex.v-center.h-end 
      span.label 數量
      i.fas.fa-minus-circle(@click="setCount(-1)" :class="[count === 0 && 'disabled']")
      input.countInput(v-model="count" type="number")
      i.fas.fa-plus-circle(@click="setCount(1)" :class="[count >= stock.stock_amount && 'disabled']")
    
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
  setup(props, { emit }) {
    let count = ref(0)

    watch(count, newVal => {
      newVal = Number(newVal)
      if (newVal < 0)
        count.value = 0
      else if (newVal > props.stock.stock_amount)
        count.value = props.stock.stock_amount
      else
        count.value = newVal

      emit('change', {
        game_stock_id: props.stock.game_stock_id,
        count: count.value
      })
    })

    function setCount(val) {
      count.value = Number(count.value) + val
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
  
  .rest 
    align-items: flex-end
    span 
      margin-right: .25rem
      color: #666
      font-size: .875rem
  .counter
    margin-top: 1rem
    .label 
      margin-right: .5rem
    i 
      color: $main_c
      font-size: 1.5rem
      &.disabled 
        color: #ccc
        pointer-events: none
    .countInput 
      width: 3rem
      text-align: center
      font-size: 1.25rem
      border: none 
      outline: none
</style>
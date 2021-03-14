<template lang="pug">
.SpecCreator
  .specCols.grid
    .specCol.grid(v-for="(spec, i) of listModel" :key="i")
      .col.flex.v-center.spec_name
        .label 票種
        InputText(v-model="spec.spec_name" placeholder="ex:男生、女生")
      .col.flex.v-center.stock_amount
        .label 數量
        InputText(v-model="spec.stock_amount")
      .col.flex.v-center.price
        .label 價格
        InputText(v-model="spec.price" placeholder="NTD")
      .errorMsg(v-if="spec.error") {{ spec.error }}
      i.fas.fa-times.close.pointer(v-if="listModel.length > 1" @click="deleteCol(i)")

  .btns.flex.h-center
    button.gc-btn.main(@click="addCol")
      i.fas.fa-plus

</template>

<script>
import { ref, computed, watch, reactive } from 'vue'

export default {
  name: 'SpecCreator',
  props: {
    specList: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, { emit }) {
    let listModel = computed({
      get() {
        return props.specList
      },
      set(val) {
        emit('update:specList', val)
      },
    })


    watch(props, val => {
      if (props.specList.length === 0)
        listModel.value = [
          {
            spec_name: '',
            stock_amount: '',
            price: '',
            error: ''
          }
        ]
    }, { immediate: true })

    function addCol() {
      listModel.value = [
        ...listModel.value,
          {
          spec_name: '',
          stock_amount: '',
          price: ''
        }
      ]
    }

    function deleteCol(index) {
      listModel.value.splice(index, 1)
    }

    return {
      addCol,
      deleteCol,
      listModel,
    }
  }
}
</script>

<style lang="sass" scoped>
:deep .p-inputtext
  width: 100%
.specCols
  grid-gap: 1rem
.specCol
  position: relative
  grid-template-areas: 'spec_name spec_name' 'stock_amount price' 'errorMsg errorMsg'
  grid-column-gap: 1rem
  grid-row-gap: 1rem
  border: 1px solid #ccc
  padding: 1rem 2rem 1rem .5rem
  border-radius: 4px
  .spec_name 
    grid-area: spec_name
  .stock_amount 
    grid-area: stock_amount
  .price 
    grid-area: price
  .errorMsg
    grid-area: errorMsg
    text-align: right
    color: $danger_c
  .label
    flex: 0 0 auto
    margin-right: 1rem
  .close 
    position: absolute 
    top: .5rem 
    right: .5rem
    font-size: 1.25rem

.btns
  margin-top: 1rem




</style>

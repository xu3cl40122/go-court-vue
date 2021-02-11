<template lang="pug">
.FormItem
  .label {{ iCol.label }}
  template(v-if="iCol.type === 'radio'")
    .radioWrapper(v-for="(option, i) of iCol.selectItems" :key="i")
      RadioButton( :name="option.label" 
        :value="option.value" v-model="model") 
      label(:for="option.label") {{ option.label }}
  template(v-else-if="iCol.type === 'password'")
    Password(v-model="model" :placeholder="iCol.placeholder" :feedback="false" toggleMask @keyup.native.enter="onEnter")
  template(v-else)
    InputText(:type="iCol.type" v-model="model" :placeholder="iCol.placeholder" :disabled="iCol.disabled" @keyup.native.enter="onEnter")
  
  .errorMsg.danger_c {{ iCol.error }}

 
</template>

<script>
import { ref, computed } from "vue"
import RadioButton from 'primevue/radiobutton';
import Password from 'primevue/password';

export default {
  name: "FormItem",
  components: {
    RadioButton,
    Password
  },
  props: {
    iCol: {
      type: Object,
      default: () => ({}),
    },
    iKey: String,
  },
  setup(props, { emit }) {
    let model = computed({
      get() {
        return props.iCol.model
      },
      set(val) {
        props.iCol.model = val
        emit("onChange", { col: props.iCol, key: props.iKey })
      },
    })

    function onEnter() {
      emit('onEnter', { col: props.iCol, key: props.iKey })
    }

    return {
      model,
      onEnter
    }
  },
}
</script>

<style lang="sass" scoped>
:deep .p-inputtext, .p-password
  width: 100%

.label
  @include setTextStyle(1rem, 600, #333)
  margin-bottom: .5rem
.errorMsg 
  margin-top: .35rem 
  text-align: right
  font-size: .875rem
  font-weight: 600
.radioWrapper 
  display: inline
  margin-right: .5rem
  label 
    margin-left: .25rem
</style>

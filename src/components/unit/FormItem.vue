<template lang="pug">
.FormItem
  .label {{ iCol.label }}
  template(v-if="iCol.type === 'radio'")
    .radioWrapper(v-for="(option, i) of iCol.options" :key="i")
      RadioButton( :name="option.label" 
        :value="option.value" v-model="model") 
      label(:for="option.label") {{ option.label }}

  template(v-else-if="iCol.type === 'password'")
    Password(v-model="model" :placeholder="iCol.placeholder" :feedback="false" toggleMask 
      @keyup.native.enter="onEnter")

  template(v-else-if="iCol.type === 'select'")
    Dropdown(:modelValue="iCol.model" :options="iCol.options" optionLabel="label" optionValue="value" 
      :placeholder="iCol.placeholder" :disabled="iCol.disabled" :showClear="iCol.showClear" @change="onSelect")

  template(v-else-if="iCol.type === 'multiSelect'")
    MultiSelect(:modelValue="iCol.model" :options="iCol.options" optionLabel="label" optionValue="value" 
      :placeholder="iCol.placeholder" :disabled="iCol.disabled" @change="onSelect")

  template(v-else-if="iCol.type === 'dateRange'")
    Calendar(:modelValue="iCol.model" :placeholder="iCol.placeholder" :disabled="iCol.disabled"
    selectionMode="range" :manualInput="false" @date-select="onSelectDate" dateFormat="yy-mm-dd")

  template(v-else)
    InputText(:type="iCol.type" v-model="model" :placeholder="iCol.placeholder" :disabled="iCol.disabled" 
      @keyup.native.enter="onEnter")
  
  .errorMsg.danger_c {{ iCol.error }}

 
</template>

<script>
import { ref, computed } from "vue"
import RadioButton from 'primevue/radiobutton';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import MultiSelect from 'primevue/multiselect';

export default {
  name: "FormItem",
  components: {
    RadioButton,
    Password,
    Dropdown,
    Calendar,
    MultiSelect
  },
  props: {
    iCol: {
      type: Object,
      default: () => ({}),
    },
    iKey: String,
  },
  setup(props, { emit, }) {
    let model = computed({
      get() {
        return props.iCol.model
      },
      set(val) {
        props.iCol.model = val
        onChange()
      },
    })

    let updateIndex = ref(0)

    function onEnter() {
      emit('onEnter', { col: props.iCol, key: props.iKey })
    }

    function onChange(val) {
      emit("onChange", { col: props.iCol, key: props.iKey })
    }

    return {
      model,
      onEnter,
      onChange,
    }
  },
  methods: {
    // 這樣才能調用 this
    async onSelect({ orginalEvent, value }) {
      this.model = value
      this.$forceUpdate()
    },

    async onSelectDate(value) {
      let [start, end] = this.iCol.model
      if (start && end)
        this.iCol.model = [value, null]
      else {
        new Date(value).getTime() > new Date(start).getTime()
          ? this.iCol.model = [start, value]
          : this.iCol.model = [value, start]
      }
      this.$forceUpdate()
      this.onChange()
    }
  }
}
</script>

<style lang="sass" scoped>
:deep .p-inputtext, .p-password, .p-dropdown, .p-calendar, .p-multiselect
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

<template lang="pug">
.ProfileEditor
  .gc-form
    FormItem(
      v-for="(col, key) in columns",
      :key="key",
      :iCol="col",
      :iKey="key",
      @onChange="onChange"
    )
  .gc-fixed-wrapper 
    .gc-btns 
      button.gc-btn.main.full(@click="submit") 送出


</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { isNull } from "@/methods/"

import FormItem from '@/components/unit/FormItem'

export default {
  name: 'ProfileEditor',
  components: {
    FormItem
  },
  setup(props, { emit }) {
    const store = useStore()

    onMounted(() => {
      setColumns()
    })

    let user = computed(() => store.state.User.user)

    let columns = reactive({
      profile_name: {
        label: "暱稱",
        type: "text",
        model: "",
        placeholder: "您的暱稱",
        required: true,
        asterisk: false,
        error: "",
      },
      phone: {
        label: "連絡電話",
        type: "text",
        model: "",
        placeholder: "連絡電話",
        required: false,
        asterisk: false,
        error: "",
      },
      gender: {
        label: "生理性別",
        type: "radio",
        model: "",
        options: [
          { label: '男', value: 'MALE' },
          { label: '女', value: 'FEMALE' },
        ],
        required: false,
        asterisk: false,
        error: "",
      },
      description: {
        label: "想說的話",
        type: "textarea",
        model: "",
        placeholder: "想說的話",
        required: false,
        asterisk: false,
        error: "",
      },


    })

    function setColumns() {
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        switch (key) {
          default:
            col.model = user.value[key]
            break;
        }
      })
    }

    function emitData() {
      let outputData = {}
      let isValid = true
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        checkValue({ col, key })
        if (col.error) return isValid = false

        switch (key) {
          default:
            outputData[key] = col.model
            break;
        }
      })

      return isValid ? outputData : false
    }

    async function submit() {
      let body = emitData()
      if (!body) return
      let { success, data } = await store.dispatch('User/putProfile', { body, option: {} })
      if (!success) return emit('updateProfileFaild')
      emit('updateProfileSuccess')
    }

    function onChange({ col, key }) {
      checkValue({ col, key })
    }

    function checkValue({ col, key }) {
      let { model, required, label } = col
      if (required && isNull(model))
        return col.error = `請輸入"${label}"`

      return col.error = ''
    }


    return {
      columns,
      onChange,
      submit
    }
  }
}
</script>

<style lang="sass" scoped>
.ProfileEditor
  padding: 1rem
</style>
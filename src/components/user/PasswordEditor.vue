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
      password: {
        label: "舊密碼",
        type: "password",
        model: "",
        placeholder: "密碼長度至少 8 碼",
        required: true,
        asterisk: false,
        error: "",
      },
      new_password: {
        label: "新密碼",
        type: "password",
        model: "",
        placeholder: "密碼長度至少 8 碼",
        required: true,
        asterisk: false,
        error: "",
      },
      confirm_new_password: {
        label: "確認新密碼",
        type: "password",
        model: "",
        placeholder: "確認密碼",
        required: true,
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
          case 'confirm_new_password':
            break
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
      let { success, data } = await store.dispatch('User/changePassword', { body, option: {} })
      if (!success) return emit('updateFailed')
      emit('upodateSuccess')
    }

    function onChange({ col, key }) {
      checkValue({ col, key })
    }

    function checkValue({ col, key }) {
      let { model, required, label } = col
      if (key === "new_password" && model.length < 8)
        return col.error = "密碼長度至少 8 碼"
      if ((key === "new_password" || key === 'confirm_new_password') && columns.new_password.model !== columns.confirm_new_password.model) {
        columns.confirm_new_password.error = "確認密碼需與密碼相符"
        if (key === 'confirm_new_password') return
      }
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
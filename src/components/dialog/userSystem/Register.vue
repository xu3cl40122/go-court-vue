<template lang="pug">
.user-container
  .gc-form
    FormItem(
      v-for="(col, key) in columns",
      :key="key",
      :iCol="col",
      :iKey="key",
      @onChange="onChange"
    )
</template>

<script>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import FormItem from "@/components/unit/FormItem.vue"
import { isEmail, isNull } from "@/methods/"

export default {
  name: "Register",
  components: {
    FormItem,
  },
  props: {
    dialogInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
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
      email: {
        label: "電子郵件",
        type: "text",
        model: "",
        placeholder: "example@email.com",
        required: true,
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
        required: true,
        asterisk: false,
        error: "",
      },
      password: {
        label: "密碼",
        type: "password",
        model: "",
        placeholder: "密碼長度至少 8 碼",
        required: true,
        asterisk: false,
        error: "",
      },
      confirm_password: {
        label: "確認密碼",
        type: "password",
        model: "",
        placeholder: "確認密碼",
        required: true,
        asterisk: false,
        error: "",
      },
    })

    function emitData() {
      let outputData = {}
      let isValid = true
      Object.keys(columns).forEach(key => {
        let col = columns[key]
        checkValue({ col, key })
        if (col.error) return isValid = false

        switch (key) {
          case 'confirm_password':
            break;
          default:
            outputData[key] = col.model
            break;
        }
      })

      return isValid ? outputData : false
    }

    function onChange({ col, key }) {
      checkValue({ col, key })
    }

    function checkValue({ col, key }) {
      let { model, required, label } = col
      if (key === "email" && !isEmail(model))
        return col.error = "email 格式不正確"
      if (key === "password" && model.length < 8)
        return col.error = "密碼長度至少 8 碼"
      if ((key === "password" || key === 'confirm_password') && columns.password.model !== columns.confirm_password.model) {
        columns.confirm_password.error = "確認密碼需與密碼相符"
        if (key === 'confirm_password') return
      }
      if (required && isNull(model))
        return col.error = `請輸入"${label}"`

      return col.error = ''
    }

    return { columns, onChange, emitData }
  },
}
</script>

<style lang="sass" scoped>
.user-container
  padding: 0 1rem 1rem
</style>

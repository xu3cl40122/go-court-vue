<template lang="pug">
.user-container
  .gc-form
    FormItem(
      v-for="(col, key) in columns",
      :key="key",
      :iCol="col",
      :iKey="key",
      @onChange="onChange"
      @onEnter="onEnter"
    )
  
</template>

<script>
import { watch, reactive, ref } from "vue";
import FormItem from "@/components/unit/FormItem.vue"
import { isEmail, isNull } from "@/methods/"

export default {
  name: "Login",
  components: {
    FormItem
  },
  props: {
    errorMsg: {
      type: Object,
      default: () => ({}),
    },
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    let columns = reactive({
      email: {
        label: "電子郵件",
        type: "text",
        model: "test@gmail.com",
        placeholder: "example@email.com",
        required: true,
        asterisk: false,
        error: "",
      },
      password: {
        label: "密碼",
        type: "password",
        model: "11111111",
        placeholder: "password",
        required: true,
        asterisk: false,
        error: "",
      },
    })

    watch(props, (newVal) => {
      let { errorMsg } = newVal
      if (errorMsg.text)
        columns.password.error = errorMsg.text
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

    function onEnter({ col, key }) {
      if (key === 'password')
        emit('submit')
    }

    function checkValue({ col, key }) {
      let { model, required, label } = col
      if (key === "email" && !isEmail(model))
        return col.error = "email 格式不正確"
      if (key === "password" && model.length < 8)
        return col.error = "密碼長度至少 8 碼"
      if (required && isNull(model))
        return col.error = `請輸入"${label}"`

      return col.error = ''
    }

    return {
      columns,
      onChange,
      emitData,
      onEnter
    }
  },
};
</script>

<style lang="sass" scoped>
.user-container
  padding: 1rem
  .errorMsg
    margin-top: 1rem 
    text-align: center
</style>

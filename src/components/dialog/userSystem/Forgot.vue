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
  
  .gc-btns 
    button.gc-btn.full(
      v-for="(btn, i) of btns",
      :key="i",
      :class="btn.class",
      @click="btn.callback"
    ) {{ btn.text }}
  
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from 'vuex'
import FormItem from "@/components/unit/FormItem.vue"
import { isEmail, isNull } from "@/methods/"

export default {
  name: "Forgot",
  components: {
    FormItem
  },
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const store = useStore()
    let columns = reactive({
      email: {
        label: "電子郵件",
        type: "text",
        model: "",
        placeholder: "example@email.com",
        required: true,
        asterisk: false,
        error: "",
      },
      password: {
        label: "新密碼",
        type: "password",
        model: "",
        placeholder: "密碼長度至少 8 碼",
        required: true,
        asterisk: false,
        error: "",
      },
      confirm_password: {
        label: "確認新密碼",
        type: "password",
        model: "",
        placeholder: "確認新密碼",
        required: true,
        asterisk: false,
        error: "",
      },

    })

    let btns = computed(() => [
      { text: '發送驗證碼', class: 'main', callback: toVerificationTab.bind(this) }
    ])

    function toVerificationTab() {
      let user = emitData()
      if (!user) return
      store.commit('Dialog/setDialog', {
        name: 'userDialog',
        info: {
          type: 'verification',
          verification_type: 'FORGOT_PASSWORD',
          user
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

    function onChange({ col, key }) {
      checkValue({ col, key })
    }

    function onEnter({ col, key }) {
      if (key === 'email')
        emit('submit')
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

    return {
      columns,
      onChange,
      emitData,
      onEnter,
      btns
    }
  },
};
</script>

<style lang="sass" scoped>
.links
  text-align: center
  .gc-link
    margin-bottom: .5rem

.title
  text-align: center
  margin-bottom: 1rem
.gc-btns
  margin-top: 1.5rem
.user-container
  padding: 1rem
  .errorMsg
    margin-top: 1rem
    text-align: center
</style>

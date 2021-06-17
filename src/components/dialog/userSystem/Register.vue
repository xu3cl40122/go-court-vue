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

  .links
    .gc-link.pointer(@click="toLogin") 已經有帳號嗎?
  
  .gc-btns 
    button.gc-btn.full(
      v-for="(btn, i) of btns",
      :key="i",
      :class="btn.class",
      @click="btn.callback"
    ) {{ btn.text }}
  
</template>

<script>
import { ref, reactive, computed } from "vue"
import { useStore } from "vuex"
import FormItem from "@/components/unit/FormItem.vue"
import { isEmail, isNull } from "@/methods/"
import { promiseFbLogin, promiseGetFbProfile } from '@/methods/fb'

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
  setup(props, { emit }) {
    const store = useStore()
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

    let btns = computed(() => [
      { text: '使用 Facebook 繼續', class: 'fb', callback: fbLogin.bind(this) },
      { text: '確認', class: 'main', callback: addUser.bind(this) }
    ])

    async function addUser() {
      let params = emitData()
      if (!params) return

      let res = await store.dispatch('User/register', { params, option: {} })
      switch (res.status) {
        case 201:
          store.commit('User/setLoginParams', params)
          toVerificationTab()
        case 400:
          return columns.email.error =  '該 e-mail 已被使用，請確認是否已有帳號' 
        default:
          return
      }
    }

    function toVerificationTab() {
      store.commit('Dialog/setDialog', {
        name: 'userDialog',
        info: {
          type: 'verification',
          verification_type: 'ENABLE_ACCOUNT',
          user: store.state.User.loginParams
        }
      })
    }

    async function fbLogin() {
      let loginRes = await promiseFbLogin()
      if (loginRes.status !== "connected") return
      let accessToken = loginRes.authResponse.accessToken
      let { success } = await store.dispatch('User/socialLogin', { accessToken, option: {} })
      if (!success) return emit('showMessageDialog', 'failed')

      emit('showMessageDialog', 'loginSuccess')
    }

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

    function toLogin() {
      emit('setDialogType', 'login')
    }
    function toLogin() {
      emit('setDialogType', 'login')
    }

    return { columns, onChange, emitData, toLogin, btns }
  },
}
</script>

<style lang="sass" scoped>
.links
  text-align: center
  .gc-link
    margin-bottom: .5rem
.gc-btns
  margin-top: 1.5rem
.user-container
  padding: 1rem
  .errorMsg
    margin-top: 1rem
</style>

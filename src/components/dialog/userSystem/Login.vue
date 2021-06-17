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
    .gc-link.pointer(@click="toRegister") 沒有帳號嗎?
    .gc-link.pointer(@click="toFogotPwd") 忘記密碼?
  
  .gc-btns 
    button.gc-btn.full(
      v-for="(btn, i) of btns",
      :key="i",
      :class="btn.class",
      @click="btn.callback"
    ) {{ btn.text }}
  
</template>

<script>
import { watch, reactive, ref, computed } from "vue";
import { useStore } from 'vuex'
import FormItem from "@/components/unit/FormItem.vue"
import { isEmail, isNull } from "@/methods/"
import { promiseFbLogin, promiseGetFbProfile } from '@/methods/fb'

export default {
  name: "Login",
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

    let btns = computed(() => [
      { text: '使用 Facebook 繼續', class: 'fb', callback: fbLogin.bind(this) },
      { text: '登入', class: 'main', callback: login.bind(this) },
    ])

    async function login() {
      let params = emitData()
      if (!params) return

      let res = await store.dispatch('User/login', { params, option: {} })
      switch (res.status) {
        case 200:
          return emit('showMessageDialog', 'loginSuccess')
        // initial account
        case 406:
          store.commit('User/setLoginParams', params)
          return emit('showMessageDialog', 'accountNotEnabled')
        default:
          columns.password.error = '帳號密碼錯誤'
          break;
      }
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

    function onEnter({ col, key }) {
      if (key === 'password')
        emit('login')
    }

    function toRegister() {
      emit('setDialogType', 'register')
    }

    function toFogotPwd() {
      store.commit('Dialog/setDialog', {
        name: 'userDialog',
        info: {
          type: 'forgot',
          user: store.state.User.loginParams,
          verification_type: 'FORGOT_PASSWORD'
        }
      })
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
      onEnter,
      toRegister,
      toFogotPwd,
      btns,
      login
    }
  },
};
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
    text-align: center
</style>

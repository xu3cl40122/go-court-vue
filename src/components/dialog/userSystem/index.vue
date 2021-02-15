<template lang="pug">
Dialog(
  v-model:visible="isDialogOpen",
  :closeOnEscape="true",
  :dismissableMask="false",
  :modal="true",
  :closable="true",
  position="top"
) 
  template(#header)
    .header.flex.v-center.h-center
      h4.main_c {{ layout.title }}
      i.fas.fa-times.close.pointer(v-if="!layout.hideClose" @click="close")
  template(v-if="dialogInfo.type === 'login'")
    Login(ref="RefLogin" :errorMsg="errorMsg" @submit="login")
  template(v-else-if="dialogInfo.type === 'register'")
    Register(ref="RefRegister")
  template(v-else-if="dialogInfo.type === 'verification'")
    Verification(ref="RefVerification" :info="dialogInfo" :errorMsg="errorMsg" @resend="sendVerification" @submit="enableUser")

  template(#footer)
    .gc-btns 
      button.gc-btn.full(
        v-for="(btn, i) of layout.btns",
        :key="i",
        :class="btn.class",
        @click="btn.callback"
      ) {{ btn.text }}
</template>

<script>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import Dialog from "primevue/dialog"
import Login from "@/components/dialog/userSystem/Login"
import Register from "@/components/dialog/userSystem/Register"
import Verification from "@/components/dialog/userSystem/Verification"

export default {
  name: "UserDialog",
  components: {
    Dialog,
    Login,
    Register,
    Verification
  },
  props: {},
  setup(props) {
    // ref component
    const RefRegister = ref(null)
    const RefVerification = ref(null)
    const RefLogin = ref(null)

    const store = useStore()
    const isDialogOpen = computed({
      get: () => store.state.Dialog.userDialogOpen,
      set: () => store.commit("Dialog/closeDialog", "userDialog"),
    })
    const dialogInfo = computed(() => store.state.Dialog.userDialogInfo)
    const loginParams = computed(() => store.state.User.loginParams)
    const layout = computed(() => {
      switch (dialogInfo.value.type) {
        case "login":
          return {
            title: "登入",
            btns: [
              { text: '登入', class: 'main', callback: login.bind(this) }
            ]
          }
        case "register":
          return {
            title: "註冊",
            btns: [
              { text: '確認', class: 'main', callback: addUser.bind(this) }
            ]
          }
        case "verification":
          return {
            title: "輸入驗證碼",
            hideClose: true,
            btns: [
              { text: '確認', class: 'main', callback: enableUser.bind(this) }
            ]
          }

        default:
          return {}
      }
    })


    // 用 string update 一樣的值不會被 watch 到只好用 object 包起來
    const errorMsg = ref({})
    watch(dialogInfo, () => errorMsg.value = { text: '' })

    async function login() {
      let params = RefLogin.value.emitData()
      if (!params) return

      let res = await store.dispatch('User/login', { params, option: {} })
      switch (res.status) {
        case 200:
          return showMessageDialog('loginSuccess')
        // initial account
        case 406:
          store.commit('User/setLoginParams', params)
          return showMessageDialog('accountNotEnabled')
        default:
          errorMsg.value = { text: '帳號密碼錯誤' }
          break;
      }
    }

    async function addUser() {
      let params = RefRegister.value.emitData()
      if (!params) return

      let res = await store.dispatch('User/register', { params, option: {} })
      switch (res.status) {
        case 201:
          store.commit('User/setLoginParams', params)
          return sendVerification({ email: params.email })
        case 400:
          return errorMsg.value = { text: '該 e-mail 已被使用，請確認是否已有帳號' }
        default:
          return
      }
    }

    async function enableUser() {
      let verification_code = RefVerification.value.verification_code
      let email = loginParams.value.email
      let params = { email, verification_code }
      let res = await store.dispatch('User/enableUser', { params, option: {} })
      switch (res.status) {
        case 400:
          return errorMsg.value = { text: '驗證碼錯誤' }
        case 406:
          return errorMsg.value = { text: '驗證碼已過期，請點擊重新發送' }
        default:
          return onVerifySuccess()
      }
    }

    // 驗證完 email 自動幫登入
    async function onVerifySuccess() {
      let params = loginParams.value
      let res = await store.dispatch('User/login', { params, option: {} })
      if (!res.success) return

      showMessageDialog('registerSuccess')
      close()
    }

    // 發送驗證碼到 email
    async function sendVerification({ email, toVerify = true }) {
      console.log('sendVerification', email)
      let params = { email }
      let res = await store.dispatch('User/sendVerification', { params, option: {} })
      if (res.status === 406)
        errorMsg.value = { text: '請求驗證碼太過頻繁，請先至您的信箱查看驗證碼或稍後再試' }
      if (toVerify)
        toVerificationTab()

    }

    function toVerificationTab() {
      store.commit('Dialog/setDialog', {
        name: 'userDialog',
        info: {
          type: 'verification',
          user: store.state.User.loginParams
        }
      })
    }

    function showMessageDialog(event) {
      let info = {}
      switch (event) {
        case 'registerSuccess':
          info = {
            status: 'success',
            title: '註冊完成',
            subtitles: ['祝您天天定三米'],
            closeAfter: 3000
          }
          break;
        case 'loginSuccess':
          info = {
            status: 'success',
            title: '登入成功',
            subtitles: [],
            closeAfter: 3000
          }
          break;
        case 'accountNotEnabled':
          info = {
            status: 'warning',
            title: '帳號 e-mail 未驗證',
            subtitles: ['請先驗證您的 email'],
            closeAfter: 3000,
            closeCb: sendVerification.bind(this, { email: loginParams.value.email })
          }
          break;

        default:
          break;
      }
      close()
      store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info
      })
    }

    function close() {
      store.commit("Dialog/closeDialog", "userDialog")
    }

    return {
      isDialogOpen,
      dialogInfo,
      layout,
      close,
      RefRegister,
      RefVerification,
      RefLogin,
      errorMsg,
      sendVerification,
      login,
      enableUser,
    }
  },
}
</script>

<style lang="sass" scoped>
:deep .p-dialog
  margin-top: 10vh
  width: 600px
  max-width: 90%
  border-radius: 8px
  overflow: hidden
  color: #333
  .p-dialog-header
    padding: 0
    .p-dialog-header-icons
      display: none
  .p-dialog-content
    padding: 0
  .p-dialog-footer
    padding: 0 1rem 1rem
.header
  position: relative
  width: 100%
  padding: 1rem
  .close
    position: absolute
    right: 1rem
    font-size: 1.25rem
</style>

<template lang="pug">
Dialog(
  v-model:visible="isDialogOpen",
  :closeOnEscape="true",
  :dismissableMask="false",
  :modal="true",
  :closable="true",
) 
  template(#header)
    .header.flex.v-center.h-center
      h4.main_c {{ layout.title }}
      i.fas.fa-times.close.pointer(v-if="!layout.hideClose" @click="close")
  template(v-if="dialogInfo.type === 'login'")
    Login(@setDialogType="setDialogType" @showMessageDialog="showMessageDialog")
  template(v-else-if="dialogInfo.type === 'register'")
    Register(ref="RefRegister" @setDialogType="setDialogType" @showMessageDialog="showMessageDialog")
  template(v-else-if="dialogInfo.type === 'forgot'")
    Forgot(ref="Forgot" @setDialogType="setDialogType" @showMessageDialog="showMessageDialog")
  template(v-else-if="dialogInfo.type === 'verification'")
    Verification(ref="RefVerification" :info="dialogInfo" :verification_type="dialogInfo.verification_type" 
      @setDialogType="setDialogType" @showMessageDialog="showMessageDialog")

</template>

<script>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import Dialog from "primevue/dialog"
import Login from "@/components/dialog/userSystem/Login"
import Register from "@/components/dialog/userSystem/Register"
import Verification from "@/components/dialog/userSystem/Verification"
import Forgot from "@/components/dialog/userSystem/Forgot"

export default {
  name: "UserDialog",
  components: {
    Dialog,
    Login,
    Register,
    Verification,
    Forgot
  },
  props: {},
  setup(props) {
    // ref component
    const store = useStore()
    const isDialogOpen = computed({
      get: () => store.state.Dialog.userDialogOpen,
      set: () => store.commit("Dialog/closeDialog", "userDialog"),
    })
    const dialogInfo = computed(() => store.state.Dialog.userDialogInfo)
    const layout = computed(() => {
      switch (dialogInfo.value.type) {
        case "login":
          return {
            title: "登入",
          }
        case "register":
          return {
            title: "註冊",
          }
        case "forgot":
          return {
            title: "忘記密碼",
          }
        case "verification":
          return {
            title: "輸入驗證碼",
            hideClose: false,
          }

        default:
          return {}
      }
    })


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

    function showMessageDialog(event) {
      let info = {}
      switch (event) {
        case 'registerSuccess':
          info = {
            status: 'success',
            title: '註冊完成',
            subtitles: ['祝您天天有球打'],
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
        case 'resetPasswordSuccess':
          info = {
            status: 'success',
            title: '重設密碼成功',
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
            // closeCb: sendEnableVerif.bind(this, { email: loginParams.value.email })
            closeCb: toVerificationTab.bind(this)
          }
          break;
        case 'failed':
          info = {
            status: 'danger',
            title: `操作失敗`,
            subtitles: ['請稍後再試', '或聯絡系統管理員'],
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

    function setDialogType(type) {
      store.commit("Dialog/setDialog", {
        name: 'userDialog',
        info: {
          type
        }
      })
    }

    return {
      isDialogOpen,
      dialogInfo,
      layout,
      close,
      setDialogType,
      showMessageDialog
    }
  },
}
</script>

<style lang="sass" scoped>
:deep .p-dialog
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
.btns
  display: flex
  flex-direction: column
  > *
    &:not(:last-child)
      margin-bottom: .75rem
</style>

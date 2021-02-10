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
    Login
  template(v-else-if="dialogInfo.type === 'register'")
    Register(ref="RefRegister")
  template(v-else-if="dialogInfo.type === 'verification'")
    Verification(ref="RefVerification" :info="dialogInfo" :errorMsg="errorMsg")

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
import { ref, computed, onMounted } from "vue"
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


    const errorMsg = ref('')

    async function addUser() {
      return enableUser()
      let params = RefRegister.value.emitData()
      if (!params) return
      console.log('result', params)
      store.commit('Dialog/setDialog', {
        name: 'userDialog',
        info: {
          type: 'verification',
          user: params
        }
      })
    }

    async function enableUser() {
      // let verification_code = RefVerification.value.verification_code
      // errorMsg.value = '驗證碼錯誤'
      close()
      store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info: {
          status: 'success',
          title: '註冊完成',
          subtitles: ['祝您天天定三米'],
          closeAfter: 3000
        }
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
      errorMsg
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

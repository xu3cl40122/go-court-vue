<template lang="pug">
Dialog(
  v-model:visible="isDialogOpen" :closeOnEscape="true" :dismissableMask="false" 
  :modal="true" :closable="true" :showHeader="false" position="top"
) 
  .header.flex.v-center.h-center
    h4.main_c {{ layout.title }}
    i.fas.fa-times.close.pointer(@click="close")
  Login

</template>

<script>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import Dialog from "primevue/dialog"
import Login from "@/components/dialog/userSystem/Login"

export default {
  name: "UserDialog",
  components: {
    Dialog,
    Login,
  },
  props: {},
  setup(props) {
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

        default:
          return {}
      }
    })

    function close() {
      store.commit("Dialog/closeDialog", "userDialog")
    }

    return {
      isDialogOpen,
      dialogInfo,
      layout,
      close,
    }
  },
}
</script>

<style lang="sass" scoped>
::v-deep .p-dialog
  margin-top: 10vh
  width: 600px
  max-width: 90%
  .p-dialog-content
    border-radius: 8px
    color: #333
    padding: 0

.header
  position: relative
  padding: 1rem
  .close
    position: absolute
    right: 1rem
    font-size: 1.25rem
</style>

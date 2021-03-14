<template lang="pug">
Dialog(
  v-model:visible="isDialogOpen",
  :closeOnEscape="true",
  :dismissableMask="true",
  :modal="true",
  :closable="true",
  :showHeader="false"
  position="top"
  @show="onOpen"
  @hide="onClose"
)
  .body
    i.icon(:class="[icon, dialogInfo.status]")
    h3.title {{ dialogInfo.title }}
    .subtitle(v-for="(subtitle, i) of dialogInfo.subtitles" :key="i") {{ subtitle }}
</template>

<script>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import Dialog from "primevue/dialog"

/**
 * dialogInfo arguments 
 * @status <string> enum [success, warning, danger] 
 * @title <string>
 * @subtitles string[]
 * @closeAfter number
 * @closeCb function
 * 
 */
export default {
  name: 'MessageDialog',
  components: {
    Dialog
  },
  setup() {
    const store = useStore()
    const isDialogOpen = computed({
      get: () => store.state.Dialog.messageDialogOpen,
      set: () => store.commit("Dialog/closeDialog", "messageDialog"),
    })
    const dialogInfo = computed(() => store.state.Dialog.messageDialogInfo)
    const iconMap = {
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-circle',
      danger: 'fas fa-times-circle',
    }
    const icon = computed(() => iconMap[dialogInfo.value.status])

    function onOpen() {
      if (dialogInfo.value.closeAfter)
        setTimeout(() => isDialogOpen.value = false, dialogInfo.value.closeAfter)
    }
    
    function onClose() {
      if (dialogInfo.value.closeCb)
        dialogInfo.value.closeCb()
    }

    return {
      isDialogOpen,
      dialogInfo,
      icon,
      onOpen,
      onClose
    }
  }

}
</script>

<style lang="sass" scoped>
:deep .p-dialog
  margin-top: 30vh
  width: 270px
  max-width: 90%
  border-radius: 8px
  overflow: hidden
  color: #333
  .p-dialog-content
    padding: 0
  .p-dialog-footer
    padding: 0 1rem 1rem

.body 
  text-align: center
  padding: 3rem 2rem 2rem
  color: #333
  .icon 
    font-size: 100px
    &.success 
      color: $success_c
    &.warning 
      color: $warning_c
    &.danger 
      color: $danger_c
  
  .title 
    margin: 1.25rem 0 .5rem
    color: #333
  .subtitle 
    color: #666
      
</style>
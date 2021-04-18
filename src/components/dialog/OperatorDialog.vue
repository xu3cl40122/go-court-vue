<template lang="pug">
Dialog(
  v-model:visible="show",
  :closeOnEscape="true",
  :dismissableMask="dismissableMask",
  :modal="true",
  :closable="true",
  :showHeader="false"
  position="top"
  @show="onOpen"
  @hide="onClose"
)
  .body
    slot
    .gc-btns
      button.gc-btn(v-for="(btn, i) of info.btns" :key="i" :class="btn.class" @click="onBtnClick(btn)") {{ btn.text }}

</template>

<script>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import Dialog from "primevue/dialog"

export default {
  name: 'OperatorDialog',
  components: {
    Dialog
  },
  props: {
    show: Boolean,
    dismissableMask: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    function onOpen() {

    }

    function onBtnClick(btn) {
      if (btn.callback)
        btn.callback()
      onClose()
    }

    function onClose() {
      emit('update:show', false)
    }

    return {
      onOpen, onClose, onBtnClick
    }
  }
}
</script>

<style lang="sass" scoped>
:deep .p-dialog
  margin-top: 30vh
  width: 90%
  border-radius: 8px
  overflow: hidden
  color: #333
  .p-dialog-content
    padding: 0
  .p-dialog-footer
    padding: 0 1rem 1rem

.body 
  padding: 1rem
.gc-btns 
  margin-top: 1rem
</style>
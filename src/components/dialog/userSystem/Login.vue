<template lang="pug">
.user-container
  .gc-btns 
    button.gc-btn.main.full 登入
    button.gc-btn.second.full 登入
    button.gc-btn.danger.full 登入
    button.gc-btn.hollow-main.full 登入
    button.gc-btn.hollow-main.full(disabled) 登入
 
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Login",
  props: {
    dialogInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
   
  },
};
</script>

<style lang="sass" scoped>
.user-container
  padding: 1rem
</style>

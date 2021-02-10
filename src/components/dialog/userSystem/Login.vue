<template lang="pug">
.user-container
  .gc-btns 
    button.gc-btn.main.full 登入
  
 
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

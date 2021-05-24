<template lang="pug">
.App
  UserDialog
  MessageDialog
  .main
    router-view(v-slot="{ Component }")
      keep-alive(include="CourtsPage")
        component(:is="Component")
</template>

<script>
import UserDialog from '@/components/dialog/userSystem/'
import MessageDialog from '@/components/dialog/MessageDialog'

export default {
  components: {
    UserDialog,
    MessageDialog,
  },
  data() {
    return {
    }
  },
  computed: {
  
  },
  async mounted() {
   
  }
}

</script>

<style lang="sass" scoped>

</style>


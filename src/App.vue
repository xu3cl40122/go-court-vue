<template lang="pug">
.App 
  Header
  Sidebar
  UserDialog
  MessageDialog
  router-view
  
</template>

<script>
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import UserDialog from '@/components/dialog/userSystem/'
import MessageDialog from '@/components/dialog/MessageDialog'

export default {
  components: {
    Header,
    Sidebar,
    UserDialog,
    MessageDialog
  },
  async mounted() {
    window.vm = this
    await this.$store.dispatch('initApp')
  }
}

</script>


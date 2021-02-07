<template lang="pug">
.App 
  Header
  Sidebar
  UserDialog
  router-view
  
</template>

<script>
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import UserDialog from '@/components/dialog/userSystem/'

export default {
  components: {
    Header,
    Sidebar,
    UserDialog
  },
  mounted() {
    window.vm = this
  }
}

</script>


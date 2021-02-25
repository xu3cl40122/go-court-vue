<template lang="pug">
.App
  template(v-if="redyRender")
    Header
    Sidebar
    UserDialog
    MessageDialog
    .main
      router-view(v-slot="{ Component }")
        keep-alive(include="GamesPage")
          component(:is="Component")
    Navbar(v-if="showNavbar")
  
</template>

<script>
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import UserDialog from '@/components/dialog/userSystem/'
import MessageDialog from '@/components/dialog/MessageDialog'

export default {
  components: {
    Header,
    Sidebar,
    UserDialog,
    MessageDialog,
    Navbar
  },
  data() {
    return {
      redyRender: false
    }
  },
  computed:{
    showNavbar() {
      return this.$store.state.Layout.showNavbar
    }
  },
  async mounted() {
    window.vm = this
    await this.$store.dispatch('initApp')
    this.redyRender = true
  }
}

</script>


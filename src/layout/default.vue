<template lang="pug">
.App
  Header.header(:className="headerClass")
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
    }
  },
  computed: {
    showNavbar() {
      return this.$store.state.Layout.showNavbar
    },
    headerClass() {
      let whiteHeaderPath = ['']
      return whiteHeaderPath.includes(this.$route.name) ? 'white' : ''
    }
  },
  async mounted() {

  }
}

</script>

<style lang="sass" scoped>
.header
  position: fixed
  top: 0
  left: 0
  width: 100%
.main
  margin-top: $headerH
  padding-bottom: $navbarH
</style>


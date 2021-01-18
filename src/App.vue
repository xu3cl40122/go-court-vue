<template lang="pug">
.App 
  Header
  Sidebar
  
</template>

<script>
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export default {
  components: {
    Header,
    Sidebar
  },
  mounted() {
    window.vm = this
  }
}

</script>


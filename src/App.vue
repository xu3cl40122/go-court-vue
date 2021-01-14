<template lang="pug">
.App 
  Header
</template>

<script>
import Header from '@/components/layout/Header'

export default {
  components: {
    Header
  },
  mounted() {
    window.vm = this
  }
}

</script>


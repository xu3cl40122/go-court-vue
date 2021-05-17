<template lang="pug">
.App(v-if="redyRender")
  Empty(v-if="layout === 'empty'")
  Default(v-else)
  
  
</template>

<script>
import Default from '@/layout/default'
import Empty from '@/layout/empty'

export default {
  components: {
    Default,
    Empty
  },
  data() {
    return {
      redyRender: false
    }
  },
  computed: {
    layout() {
      return this.$store.state.Layout.layout
    }
  },
  async mounted() {
    window.vm = this
    if (!this.$store.state.inited)
      await this.$store.dispatch('initApp')
    this.setVh()
    this.redyRender = true
  },
  methods: {
    setVh() {
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);

    }
  }
}

</script>

<style lang="sass" scoped>

</style>


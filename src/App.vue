<template lang="pug">
div
  .App(v-if="redyRender")
    Empty(v-if="layout === 'empty'")
    Default(v-else)
  metainfo
    template(v-slot:title="{ content }") {{ content ? `${content} | GO COURT 球場資源交流平台` : `GO COURT 球場資源交流平台` }}
  
  
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
    this.redyRender = true
  }
}

</script>

<style lang="sass" scoped>

</style>


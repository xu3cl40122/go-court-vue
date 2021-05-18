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
import { useMeta } from 'vue-meta'

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
  setup() {
    useMeta({
      title: '',
      "og:title": "GO COURT 球場資源交流平台",
      "og:site_name": "GO COURT 球場資源交流平台",
      "og:description": "探索沒去過的球場，認識新球友",
    })
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


<template lang="pug">
div
  .App(v-if="redyRender")
    //- 用 v-show 才能保有該 layout keep alive 的子組件
    //- 但是會讓 google map 壞掉
    Empty(v-if="layout === 'empty'")
    Default(v-else)
    //- Default(v-show="layout === 'default'")
    
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
    this.redyRender = true
  },
  methods: {
   
  }
}

</script>

<style lang="sass" scoped>
</style>


<template lang="pug">
.Empty.flex.h-center.baseline
  i(:class="icon") 
  .title {{ title }}
</template>

<script>
export default {
  name: 'Empty',
  props: {
    title: String,
    icon: {
      type: String,
      default: 'fas fa-info-circle'
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
.Empty 
  padding: 3rem 0
  font-size: 1.25rem
  i 
    margin-right: .5rem

</style>
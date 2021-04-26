<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log('from', from)
    next({ path: from.path, query: from.query })

  },
}
</script>
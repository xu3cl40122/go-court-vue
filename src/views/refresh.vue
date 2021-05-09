<script>
export default {
  beforeRouteEnter(to, from, next) {
    next({ path: from.path, query: from.query })

  },
}
</script>
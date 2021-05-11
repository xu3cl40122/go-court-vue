<template lang="pug">
.Comments
  h5.title 評價
  CommentCreator(:target_id="target_id" :commentTag="commentTag" @updateComment="queryComments")
  
  .cards 
    CommentCard(v-for="(comment, i) of comments" :key="i" :comment="comment" @addReply="openPanel(comment)")
  
  SidePanel(v-model:isOpen="isPanelOpen" title="查看評論")
    template(v-if="isPanelOpen")
      CommentDetail(:comment_id="selectedComment._id" @updateComment="queryComments")
      
</template>

<script>
import Rating from 'primevue/rating';
import CommentCard from '@/components/comment/CommentCard'
import CommentDetail from '@/components/comment/CommentDetail'
import CommentCreator from '@/components/comment/CommentCreator'
import SidePanel from '@/components/layout/SidePanel'

export default {
  name: 'Comments',
  components: {
    Rating,
    CommentCard,
    CommentDetail,
    CommentCreator,
    SidePanel
  },
  props: {
    target_id: String,
  },
  data() {
    return {
      comments: [],
      commentTag: 'gc-court',

      // panel 
      selectedComment: {},
      isPanelOpen: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.User.user
    },
    isLogin() {
      return this.$store.state.User.isLogin
    }
  },
  watch: {
    target_id: {
      handler(val) {
        if (val) {
          this.queryComments()
        }
      }
    }
  },
  methods: {
    async queryComments() {
      let params = { target_id: this.target_id, tag: this.commentTag }
      let { success, data } = await this.$store.dispatch('Comment/queryComments', { params })
      this.comments = data.content

    },

    openPanel(comment) {
      this.selectedComment = comment
      this.isPanelOpen = true
    },

  }
}
</script>

<style lang="sass" scoped>
.title 
  margin-bottom: 1rem
.inputPart
  .rating 
    margin-bottom: .25rem
  .gc-textarea
    height: 100px
  .gc-btn 
    margin-top: .5rem
  .errorMsg
    margin-top: .25rem 
    color: $danger_c
    text-align: right

</style>
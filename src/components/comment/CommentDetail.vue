<template lang="pug">
.CommentDetail 
  CommentCard(:comment="comment" showReply @updateComment="showDialog")
  .gc-fixed-wrapper
    .flex.between.v-center 
      input.replyInput(v-model="replyContent" placeholder="回覆......" @keyup.enter="postReply")
      .send.pointer(v-if="replyContent" @click="postReply") 送出
  
  OperatorDialog(v-model:show="isOpDialogOpen")
    CommentCreator(:oldComment="comment" isEdit @updateComment="onPutComment" commentTag="gc-court")
</template>

<script>
import CommentCard from '@/components/comment/CommentCard'
import CommentCreator from '@/components/comment/CommentCreator'
import OperatorDialog from '@/components/dialog/OperatorDialog'

export default {
  name: 'CommentDetail',
  components: {
    CommentCard,
    OperatorDialog,
    CommentCreator,
  },
  props: {
    comment_id: String
  },
  data() {
    return {
      comment: {},
      replyContent: '',

      isOpDialogOpen: false
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
  mounted() {
    this.getCommentById()
  },
  methods: {
    async getCommentById() {

      let comment_id = this.comment_id
      let { success, data } = await this.$store.dispatch('Comment/getCommentById', { comment_id })
      this.comment = data
    },

    async postReply() {
      if (!this.replyContent) return

      let comment_id = this.comment_id
      let body = {
        content: this.replyContent,
        creator_display_name: this.user.profile_name
      }
      let { success, data } = await this.$store.dispatch('Comment/postReply', { comment_id, body })
      this.getCommentById()
      this.replyContent = ''
    },

    onPutComment() {
      this.showDialog(false)
      this.getCommentById()
      this.$emit('updateComment')

    },

    showDialog(bool = true) {
      this.isOpDialogOpen = bool
    },

  }
}
</script>

<style lang="sass" scoped>
.CommentDetail 
  padding: 1rem
.replyInput 
  width: 100%
  -webkit-appearance: none
  background-color: #eee
  border-radius: 8px
  border: none
  color: #606266
  display: inline-block
  font-size: inherit
  padding: .5rem 1rem
.send 
  flex: 0 0 auto
  color: $main_c
  margin-left: .5rem
</style>
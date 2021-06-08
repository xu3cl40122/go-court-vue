<template lang="pug">
.CommentDetail 
  CommentCard(:comment="comment"  @updateComment="showEditDialog('updateComment', comment)" 
  @deleteComment="showDeleteDialog('comment', comment)" @deleteReply="showDeleteDialog('reply', $event)"  @updateReply="showEditDialog('updateReply', $event)" isDetail)
  .gc-fixed-wrapper
    .flex.between.v-center 
      input.replyInput(v-model="replyContent" placeholder="回覆......" @keyup.enter="postReply")
      .send.pointer(v-if="replyContent" @click="postReply") 送出
  
  OperatorDialog(v-model:show="isEditDialogOpen")
    CommentCreator(:oldData="oldData" :action="commentAction" @onUpdate="onPutComment" commentTag="gc-court")
  
  OperatorDialog(v-model:show="isDeleteDialogOpen" :info="deleteDialogInfo")
    .flex.h-center
      h5 {{ deleteDialogInfo.title }}

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
      commentAction: 'updateComment',
      // 暫存要編輯的資料
      oldData: {},

      deleteTarget: {},

      // dialog
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.User.user
    },
    isLogin() {
      return this.$store.state.User.isLogin
    },
    deleteDialogInfo() {
      let { entity } = this.deleteTarget
      return {
        title: entity === 'comment' ? '確認要刪除評論?' : '確認要刪除留言?',
        btns: [
          {
            text: '刪除',
            class: 'danger',
            callback: entity === 'comment'
              ? this.deleteComment.bind(this)
              : this.deleteReply.bind(this)
          }
        ]
      }
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
      this.$emit('onUpdate')
    },

    async deleteComment() {
      let comment_id = this.comment_id
      let { success, data } = await this.$store.dispatch('Comment/deleteComment', { comment_id })
      if (!success) return this.showMessageDialog('failed')
      this.showMessageDialog('success', '已刪除評論')
      this.$emit('onDelete')
    },

    async deleteReply() {
      let { comment_id, reply_id } = this.deleteTarget
      let { success, data } = await this.$store.dispatch('Comment/deleteReply', { comment_id, reply_id })
      if (!success) return this.showMessageDialog('failed')
      this.showMessageDialog('success', '已刪除留言')
      this.getCommentById()
      this.$emit('onUpdate')
    },

    onPutComment() {
      this.isEditDialogOpen = false
      this.getCommentById()
      this.$emit('onUpdate')
    },

    showMessageDialog(status, message = '') {
      let info = {}
      switch (status) {
        case 'failed':
          info = {
            status: 'danger',
            title: `操作失敗`,
            subtitles: ['請稍後再試', '或聯絡系統管理員'],
          }
          break;
        case 'success':
          info = {
            status: 'success',
            title: message,
            subtitles: [''],
          }
          break;
        default:
          break;
      }

      this.$store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info
      })
    },

    showEditDialog(action, oldData) {
      this.commentAction = action
      this.oldData = oldData
      this.isEditDialogOpen = true
    },

    showDeleteDialog(entity, reply) {
      this.deleteTarget = {
        entity,
        comment_id: this.comment_id,
        reply_id: reply._id,
      }
      this.isDeleteDialogOpen = true
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
<template lang="pug">
.CommentCard
  .topPart 
    .name {{ comment.creator_display_name }}
    .flex.between.v-center
      Rating(v-model="comment.rank" readonly :cancel="false")
      .time
        span 最後更新 
        span {{ edited_at }}

  .content {{ comment.content }}
  .operator.flex.h-end
    .count(v-if="replyNum" @click="toDetail") {{ replyNum }} 則留言
    template(v-if="isCreator && isDetail")
      .edit.pointer(@click="updateComment") 編輯
      .edit.pointer(@click="deleteComment") 刪除
    .pointer(v-else @click="toDetail") 回覆
  
  .replies(v-if="isDetail")
    .reply(v-for="(reply, i) of comment.replies" :key="i")
      .replyBody
        .flex.between
          .creator {{ reply.creator_display_name }}
          .time {{ toTimeString(reply.updated_at) }} 
        .replyContent {{ reply.content }}
      .replyOperator.flex.h-end
        .edit.pointer(@click="updateReply(reply)") 編輯
        .edit.pointer(@click="deleteReply(reply)") 刪除

</template>

<script>
import Rating from 'primevue/rating';
import dayjs from 'dayjs'


export default {
  name: 'CommentCard',
  components: {
    Rating
  },
  props: {
    isDetail: Boolean,
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    user() {
      return this.$store.state.User.user
    },
    isCreator() {
      return this.user.user_id === this.comment.creator_id
    },
    edited_at() {
      return dayjs(this.comment?.edited_at).format('YYYY/MM/DD HH:mm')
    },
    replyNum() {
      return this.comment.replies?.length
    }
  },
  methods: {
    toDetail() {
      this.$emit('toDetail')
    },

    updateComment() {
      this.$emit('updateComment')
    },

    deleteComment() {
      this.$emit('deleteComment')
    },

    updateReply(reply) {
      reply.comment_id = this.comment._id
      this.$emit('updateReply', reply)
    },

    deleteReply(reply) {
      reply.comment_id = this.comment._id
      this.$emit('deleteReply', reply)
    },

    toTimeString(time) {
      if (!time) return ''
      return dayjs(time).format('YYYY/MM/DD HH:mm')
    }
  }
}
</script>

<style lang="sass" scoped>
.CommentCard
  .time 
    font-size: .75rem
    color: #666

  .topPart 
    padding: .25rem 0
    flex-wrap: wrap
    .name
      font-size: 1.25rem 
      margin-bottom: .25rem
    
  .content 
    padding: .5rem 1rem 
    background-color: #eee
    border-radius: 4px
  .operator 
    font-size: .875rem
    padding: .25rem
    .count, .edit 
      margin-right: .5rem
  
  .replies 
    padding-left: 2rem 
    .reply
      margin-bottom: .5rem
      .replyBody 
        padding: .5rem 1rem 
        background-color: #eee
        border-radius: 4px
        .creator 
          color: $main_c
          font-weight: 500 
      .replyOperator
        font-size: .875rem
        margin-top: .25rem
        .edit
          margin-right: .5rem
</style>
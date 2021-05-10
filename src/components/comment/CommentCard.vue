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
    .pointer(@click="addReply") 回覆
  
  .replies(v-if="showReply")
    .reply(v-for="(reply, i) of comment.replies" :key="i")
      .replyBody
        .creator {{ reply.creator_display_name }}
        .replyContent {{ reply.content }}
      .replyOperator.flex.h-end
        .time {{ toTimeString(reply.updated_at) }} 

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
    showReply: Boolean,
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
    edited_at() {
      return dayjs(this.comment?.edited_at).format('YYYY/MM/DD HH:mm')
    }
  },
  methods: {
    addReply() {
      this.$emit('addReply')
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
      margin-bottom: .25rem
    
  .content 
    padding: .5rem 1rem 
    background-color: #eee
    border-radius: 4px
  .operator 
    font-size: .875rem
    padding: .25rem
  
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
        margin-top: .25rem
</style>
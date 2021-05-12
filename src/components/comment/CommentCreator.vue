<template lang="pug">
.CommentCreator 
  Rating.rating(v-if="action !== 'updateReply'" v-model="rank" :stars="5" :cancel="false") 
  textarea.gc-textarea(v-model="content" placeholder="對球場的評價")
  .errorMsg(v-if="errorMsg") {{ errorMsg }}
  button.gc-btn.main.full(@click="submit") {{ btnText }}

</template>

<script>
import Rating from 'primevue/rating';
export default {
  name: 'CommentCreator',
  components: {
    Rating
  },
  props: {
    commentTag: String,
    target_id: String,
    //  updateComment, addComment, updateReply
    action: String,
    oldData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      content: '',
      rank: 0,
      errorMsg: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.User.user
    },
    isLogin() {
      return this.$store.state.User.isLogin
    },
    btnText() {
      let textMap = {
        'updateComment': '編輯評論',
        'addComment': '送出評論',
        'updateReply': '編輯留言',
      }
      return textMap[this.action] ?? ''
    }
  },
  watch: {
    oldData: {
      immediate: true,
      handler(data) {
        let { content, rank } = data
        this.content = content ?? ''
        this.rank = rank ?? 0

      }
    }
  },
  methods: {
    async postComment() {
      let { target_id, content, rank } = this
      let body = {
        target_id,
        content,
        rank,
        tag: this.commentTag,
        creator_display_name: this.user.profile_name
      }
      return await this.$store.dispatch('Comment/postComment', { body })
    },

    async putComment() {
      let { content, rank } = this
      let comment_id = this.oldData._id
      let body = {
        content,
        rank,
        tag: this.commentTag,
        creator_display_name: this.user.profile_name
      }
      return await this.$store.dispatch('Comment/putComment', { comment_id, body })
    },

    async putReply() {
      let { content } = this
      let reply_id = this.oldData._id
      let comment_id = this.oldData.comment_id
      let body = {
        content,
        creator_display_name: this.user.profile_name
      }
      return await this.$store.dispatch('Comment/putReply', { comment_id, reply_id, body })
    },

    async submit() {
      if (!this.isLogin) return
      if (!this.content) return this.errorMsg = '請填寫內容'
      this.errorMsg = ''
      let res
      switch (this.action) {
        case 'updateComment':
          res = await this.putComment()
          break;
        case 'addComment':
          res = await this.postComment()
          break;
        case 'updateReply':
          res = await this.putReply()
          break;

        default:
          break;
      }

      this.initInput()
      this.$emit('onUpdate')
    },

    initInput() {
      this.rank = 0
      this.content = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.CommentCreator 
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
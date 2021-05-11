<template lang="pug">
.CommentCreator 
  Rating.rating(v-model="rank" :stars="5" :cancel="false") 
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
    isEdit: Boolean,
    oldComment: {
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
      return this.isEdit ? '編輯評論' : '送出評論'
    }
  },
  watch: {
    oldComment: {
      immediate: true,
      handler(comment) {
        if (this.isEdit) {
          let { content, rank } = comment
          this.content = content ?? ''
          this.rank = rank ?? 0
        }

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
      let { success, data } = await this.$store.dispatch('Comment/postComment', { body })
      this.initInput()
      this.$emit('updateComment')
    },

    async putComment() {
      let { content, rank } = this
      let comment_id = this.oldComment._id
      let body = {
        content,
        rank,
        tag: this.commentTag,
        creator_display_name: this.user.profile_name
      }
      let { success, data } = await this.$store.dispatch('Comment/putComment', { comment_id, body })
      this.initInput()
      this.$emit('updateComment')
    },

    submit() {
      if (!this.isLogin) return
      if (!this.content) return this.errorMsg = '請填寫評論'
      this.errorMsg = ''
      this.isEdit
        ? this.putComment()
        : this.postComment()
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
<template lang="pug">
.Comments
  h5.title 評價  
  .inputPart
    Rating.rating(v-model="rank" :stars="5" :cancel="false") 
    textarea.gc-textarea(v-model="content" placeholder="對球場的評價")
    .errorMsg(v-if="errorMsg") {{ errorMsg }}
    button.gc-btn.main.full(@click="submit") 送出評論
  
  .cards 
    CommentCard(v-for="(comment, i) of comments" :key="i" :comment="comment" @addReply="openPanel(comment)")
  
  SidePanel(v-model:isOpen="isPanelOpen" title="查看評論")
    template(v-if="isPanelOpen")
      CommentDetail(:comment_id="selectedComment._id")
      
</template>

<script>
import Rating from 'primevue/rating';
import CommentCard from '@/components/comment/CommentCard'
import CommentDetail from '@/components/comment/CommentDetail'
import SidePanel from '@/components/layout/SidePanel'

export default {
  name: 'Comments',
  components: {
    Rating,
    CommentCard,
    CommentDetail,
    SidePanel
  },
  props: {
    target_id: String,
    editable: Boolean
  },
  data() {
    return {
      comments: [],
      content: '',
      rank: 0,
      errorMsg: '',
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
      this.queryComments()
      this.initInput()
    },

    submit() {
      if (!this.isLogin) return
      if (!this.content) return this.errorMsg = '請填寫評論'
      this.errorMsg = ''
      this.postComment()
    },

    openPanel(comment) {
      this.selectedComment = comment
      this.isPanelOpen = true
    },

    initInput() {
      this.rank = 0
      this.content = ''
    }

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
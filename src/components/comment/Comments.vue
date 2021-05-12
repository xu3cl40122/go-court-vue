<template lang="pug">
.Comments
  h5.title 評價
  CommentCreator(:target_id="target_id" :commentTag="commentTag" :action="commentAction" @onUpdate="queryComments")
  
  .cards 
    CommentCard(v-for="(comment, i) of comments" :key="i" :comment="comment" @toDetail="openPanel(comment)")
  h5.loading(v-if="!toEnd" ref="loadingEl") LOADING ...
  
  SidePanel(v-model:isOpen="isPanelOpen" title="查看評論")
    template(v-if="isPanelOpen")
      CommentDetail(:comment_id="selectedComment._id" @onUpdate="queryComments" @onDelete="onDeleteComment")
      
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
      commentAction: 'addComment',

      // 
      observer: {},
      toEnd: false,
      pageSetting: {
        page: 0,
        size: 1,
        totalPage: 10
      },

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
          this.observer = new IntersectionObserver(this.onInterset, {})
          let loadingEl = this.$refs['loadingEl']
          loadingEl && this.observer.observe(loadingEl)
          this.queryComments({ init: true })
        }
      }
    }
  },
  methods: {
    async queryComments({ init }) {
      if (init) {
        this.pageSetting.page = 0
        this.toEnd = false
        this.comments = []
      }
      else {
        this.pageSetting.page++
      }
      let params = { target_id: this.target_id, tag: this.commentTag, ...this.pageSetting }
      let option = { skipLoading: true }
      let { success, data } = await this.$store.dispatch('Comment/queryComments', { params, option })
      this.comments = this.comments.concat(data.content)

      if (data.totalPage - 1 <= data.page)
        this.toEnd = true

    },

    onInterset(entryArr) {
      entryArr.forEach(entry => {
        if (entry.isIntersecting && !this.toEnd) {
          this.queryComments({})
        }
      })
    },

    openPanel(comment) {
      this.selectedComment = comment
      this.isPanelOpen = true
    },

    onDeleteComment() {
      this.queryComments()
      this.isPanelOpen = false
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
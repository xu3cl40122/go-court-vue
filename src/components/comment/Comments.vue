<template lang="pug">
.Comments
  CommentCreator(:target_id="target_id" :commentTag="commentTag" :action="commentAction" @onUpdate="reloadComments")
  .statistic.flex.v-center
    .scoreBox {{ avgRank }}
    .num 
      span {{ statistic.total }}
      span 篇評論

  .cards 
    CommentCard(v-for="(comment, i) of comments" :key="i" :comment="comment" @toDetail="openPanel(comment)")
  h5.loading(v-if="!toEnd" ref="loadingEl") LOADING ...
  
  SidePanel(v-model:isOpen="isPanelOpen" title="查看評論")
    template(v-if="isPanelOpen")
      CommentDetail(:comment_id="selectedComment._id" @onUpdate="reloadComments" @onDelete="onDeleteComment")
      
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
      statistic: {
        avgRank: 0,
        total: 0
      },

      // 
      observer: {},
      toEnd: false,
      pageSetting: {
        page: 0,
        size: 4,
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
    },
    avgRank() {
      return Number(this.statistic?.avgRank)?.toFixed(1) ?? 0
    }
  },
  watch: {
    target_id: {
      handler(val) {
        if (val) {
         this.reloadComments()
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
        await this.$nextTick()
        this.initObserver()
      }
      else {
        this.pageSetting.page++
      }
      let params = { target_id: this.target_id, tag: this.commentTag, ...this.pageSetting }
      let option = { skipLoading: true }
      let { success, data } = await this.$store.dispatch('Comment/queryComments', { params, option })
      this.comments = this.comments.concat(data.content)

      this.pageSetting.size = data.size

      if (data.totalPage - 1 <= data.page)
        this.toEnd = true
      console.log('observer', this.observer)
    },

    initObserver() {
      this.observer = new IntersectionObserver(this.onInterset, {})
      let loadingEl = this.$refs['loadingEl']
      loadingEl && this.observer.observe(loadingEl)
    },

    onInterset(entryArr) {
      entryArr.forEach(entry => {
        if (entry.isIntersecting && !this.toEnd) {
          this.queryComments({})
        }
      })
    },

    async getStatistics() {
      let params = {
        target_id: this.target_id,
        tag: 'gc-court'
      }
      let { success, data } = await this.$store.dispatch('Comment/getStatistics', { params })
      this.statistic = data
    },


    openPanel(comment) {
      this.selectedComment = comment
      this.isPanelOpen = true
    },

    reloadComments() {
      this.queryComments({ init: true })
      this.getStatistics()
    },

    onDeleteComment() {
      this.reloadComments()
      this.isPanelOpen = false
    }

  }
}
</script>

<style lang="sass" scoped>
.title
  margin-bottom: 1rem
.cards
  margin-top: 1rem
.statistic
  margin-top: 1rem
  .scoreBox
    padding: .5rem
    background-color: $main_c
    color: #fff
    margin-right: .5rem
    border-radius: 4px
</style>
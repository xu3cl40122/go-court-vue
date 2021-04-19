<template lang="pug">
.ProfilePage
  .banner.flex.h-center.v-center.column
    Avatar(:src="user.avatar_url" :editable="true" @fileChange="avatarChange" )
    h3 {{ user.profile_name }}
    h5 {{ user.email }}
  .gc-fixed-wrapper(v-if="btns.length")
    button.gc-btn.main.full(v-for="(btn, i) of btns" :key="i" :class="btn.class" @click="btn.callback") {{ btn.text }}
  
  .infoWrapper 
    ListItem(v-for="(col, key) of infoColumns" :key="key" :info="col") 

  SidePanel(v-model:isOpen="isPanelOpen" title="選擇種類及數量")

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import SidePanel from '@/components/layout/SidePanel'
import Avatar from '@/components/unit/Avatar'
import ListItem from '@/components/unit/ListItem'

export default {
  name: 'ProfilePage',
  components: {
    SidePanel,
    Avatar,
    ListItem
  },
  setup(props) {
    const store = useStore()
    let isPanelOpen = ref(false)
    let user = computed(() => store.state.User.user)
    let btns = computed(() => {
      switch ('') {
        case 'PENDING':
          return [{ text: '參加球賽', class: '', callback: '' }]

        default:
          return []
      }
    })

    onMounted(() => {
      setInfoColumns()
    })

    let infoColumns = reactive({
      phone: {
        label: '連絡電話',
        value: '',
        icon: 'fas fa-mobile-alt'
      },
      gender: {
        label: '生理性別',
        value: '',
        icon: 'fas fa-venus-mars'
      },
      description: {
        label: '想說的話',
        value: '',
        className: 'block',
        icon: 'fas fa-comment-dots'
      }
    })

    function setInfoColumns() {
      Object.keys(infoColumns).forEach(key => {
        let col = infoColumns[key]
        switch (key) {
          case 'gender':
            col.value = user.value[key] === 'MALE' ? '男生' : '女生'
            break;
          default:
            col.value = user.value[key]
            break;
        }
      })
    }

    async function avatarChange(file) {
      let body = {
        reference_id: user.value.user_id,
        file_name: file.name,
        description: '',
        tag: 'AVATAR'
      }
      let { success, data } = await store.dispatch('File/postFile', { body, option: {} })
      if (!success) return
      let { file_id } = data
      let contentRes = await store.dispatch('File/putFileContent', { file_id, file, option: {} })
      if (!contentRes.success) return
      let profile = { ...user.value }
      profile.avatar_url = contentRes.data.file_url
      let userRes = await store.dispatch('User/putProfile', { body: profile, option: {} })
    }

    function openPanel(open) {
      isPanelOpen.value = open
    }

    return {
      user,
      isPanelOpen,
      openPanel,
      btns,
      avatarChange,
      infoColumns
    }
  }
}
</script>

<style lang="sass" scoped>
.banner
  min-height: 200px
  background-color: $second_c
  h3  
    margin: .5rem 0 .25rem
.infoWrapper 
  margin-top: 1.5rem
  
</style>
<template lang="pug">
.ProfilePage
  .banner.flex.h-center.v-center.column
    Avatar(:src="user.avatar_url" :editable="true" @fileChange="avatarChange" )
    h3 {{ user.profile_name }}
    h5 {{ user.email }}
  //- .gc-fixed-wrapper(v-if="btns.length")
  //-   button.gc-btn.main.full(v-for="(btn, i) of btns" :key="i" :class="btn.class" @click="btn.callback") {{ btn.text }}
  
  .infoWrapper
    .operator.pointer(@click="openPanel(true)")
      i.fas.fa-edit 
      span 編輯
    ListItem(v-for="(col, key) of infoColumns" :key="key" :info="col")
    .flex.h-center
      .gc-btns
        button.gc-btn.main(v-for="(btn, i) of btns" :key="i" :class="btn.class" @click="btn.callback") {{ btn.text }}

  SidePanel(v-model:isOpen="isPanelOpen" title="編輯個人資訊")
    ProfileEditor(@updateProfile="updateProfile")

</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import SidePanel from '@/components/layout/SidePanel'
import Avatar from '@/components/unit/Avatar'
import ListItem from '@/components/unit/ListItem'
import ProfileEditor from '@/components/public/ProfileEditor'


export default {
  name: 'ProfilePage',
  components: {
    SidePanel,
    Avatar,
    ListItem,
    ProfileEditor
  },
  setup(props) {
    const store = useStore()
    let isPanelOpen = ref(false)
    let user = computed(() => store.state.User.user)
    let btns = computed(() => {
      return [
        { text: '變更密碼', class: '', callback: '' }
        ]
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

    function updateProfile(){
      setInfoColumns()
      openPanel(false)
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
      infoColumns,
      updateProfile
    }
  }
}
</script>

<style lang="sass" scoped>
.ProfilePage 
  padding-bottom: $navbarH
.banner
  min-height: 200px
  background-color: $second_c
  h3  
    margin: .5rem 0 .25rem
.infoWrapper
  position: relative
  padding-top: 1.5rem
  .operator 
    position: absolute 
    top: .5rem
    right: .5rem
    color: $main_c
    i 
      margin-right: .25rem

</style>
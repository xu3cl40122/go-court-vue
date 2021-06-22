<template lang="pug">
.ProfilePage
  .banner.flex.h-center.v-center.column
    Avatar(:src="user.meta && user.meta.avatar_url" :key="updateIndex" :editable="true" @fileChange="avatarChange")
    h3 {{ user.profile_name }}
    h5 {{ user.email }}
  
  .infoWrapper
    .operator.pointer(@click="openPanel(true)")
      i.fas.fa-edit 
      span 編輯
    ListItem(v-for="(col, key) of infoColumns" :key="key" :info="col" :iKey="key")
    .flex.h-center
      .gc-btns
        button.gc-btn.main(v-for="(btn, i) of btns" :key="i" :class="btn.class" @click="btn.callback") {{ btn.text }}

  SidePanel(v-model:isOpen="isPanelOpen" title="編輯個人資訊")
    template(v-if="panelUseFor === 'password'")
      PasswordEditor(@upodateSuccess="changePwdSuccess" @updateFailed="showMessageDialog('changePwdFailed')")
    template(v-else)
      ProfileEditor(@updateProfileSuccess="updateProfileSuccess" @updateProfileFaild="showMessageDialog('failed')")

</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import SidePanel from '@/components/layout/SidePanel'
import Avatar from '@/components/unit/Avatar'
import ListItem from '@/components/unit/ListItem'
import ProfileEditor from '@/components/user/ProfileEditor'
import PasswordEditor from '@/components/user/PasswordEditor'
import { compressImg } from "@/methods/"


export default {
  name: 'ProfilePage',
  components: {
    SidePanel,
    Avatar,
    ListItem,
    ProfileEditor,
    PasswordEditor
  },
  setup(props) {
    const store = useStore()
    let updateIndex = ref(0)
    let isPanelOpen = ref(false)
    let panelUseFor = ref('profile')
    let user = computed(() => store.state.User.user)
    let btns = computed(() => {
      return [
        { text: '變更密碼', class: '', callback: openPanel.bind(this, true, 'password') }
      ]
    })

    watch(user, (val) => {
      setInfoColumns()
    })

    onMounted(() => {
      setInfoColumns()
    })

    let infoColumns = reactive({
      user_id: {
        label: 'ID',
        className: 'small',
        value: '',
        icon: 'fas fa-id-badge',
        copy: true
      },
      phone: {
        label: '連絡電話',
        value: '',
        icon: 'fas fa-mobile-alt',
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
            let genderMap = {
              'MALE': '男生',
              'FEMALE': '女生',
            }
            col.value = genderMap[user.value[key]] ?? ''
            break;
          default:
            col.value = user.value[key]
            break;
        }
      })
    }

    async function avatarChange(file) {
      if (file.size > 1024 * 1024 * 10) return alert('檔案大小不可超過 10 MB')
      file = await compressImg(file)
      let file_id = user.value.meta.avatar_file_id
      // create file entity
      if (!file_id) {
        let body = {
          reference_id: user.value.user_id,
          file_name: file.name,
          description: '',
          tag: 'AVATAR'
        }
        let { success, data } = await store.dispatch('File/postFile', { body, option: { keepLoading: true } })
        if (!success) return showMessageDialog('failed')
        file_id = data.file_id
      }
      // upload file content
      let contentRes = await store.dispatch('File/putFileContent', { file_id, file, option: { keepLoading: true } })
      if (!contentRes.success) return showMessageDialog('failed')
      let profile = { ...user.value }
      // save file info to user profile
      profile.meta = { ...profile.meta, avatar_file_id: file_id, avatar_url: contentRes.data.file_url }
      let userRes = await store.dispatch('User/putProfile', { body: profile, option: {} })
      if (!userRes.success) return showMessageDialog('failed')

      showMessageDialog('success')
      updateIndex.value++

    }

    function showMessageDialog(event) {
      let info = {}
      switch (event) {
        case 'success':
          info = {
            status: 'success',
            title: '編輯個人資訊成功',
            subtitles: [],
            closeAfter: 3000
          }
          break;

        case 'failed':
          info = {
            status: 'danger',
            title: '操作失敗',
            subtitles: ['請稍後再試', '或回報系統管理員'],
            closeAfter: 3000,
          }
          break;
        case 'changePwdSuccess':
          info = {
            status: 'success',
            title: '變更密碼成功',
            subtitles: [],
            closeAfter: 3000
          }
          break;
        case 'changePwdFailed':
          info = {
            status: 'warning',
            title: '變更密碼失敗',
            subtitles: ['請確認密碼是否正確'],
            closeAfter: 3000,
          }
          break;

        default:
          break;
      }
      close()
      store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info
      })
    }

    function updateProfileSuccess() {
      showMessageDialog('success')
      openPanel(false)
    }

    function changePwdSuccess() {
      showMessageDialog('changePwdSuccess')
      openPanel(false)
    }

    function openPanel(open, type) {
      panelUseFor.value = type
      isPanelOpen.value = open
    }

    return {
      user,
      isPanelOpen,
      openPanel,
      btns,
      avatarChange,
      infoColumns,
      showMessageDialog,
      updateProfileSuccess,
      updateIndex,
      panelUseFor,
      changePwdSuccess
    }
  }
}
</script>

<style lang="sass" scoped>
.ProfilePage
  padding-bottom: $navbarH
#user_id
  max-width: 200px
  text-align: center
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
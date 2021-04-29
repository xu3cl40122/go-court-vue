<template lang="pug">
.TransferTicket 
  TicketCard(:info="info")
  .confirmWrapper
    template(v-if="!receiver.user_id")
      InputText.input(v-model="searchText" placeholder="請輸入收票者帳號 ID")
      button.gc-btn.main.full(@click="searchUser") 搜尋使用者
    template(v-else)
      span 確認是否把票券轉送給
      h5 {{ receiver.profile_name }}({{ receiver.email }})
      button.gc-btn.main.full(@click="transferTicket") 確認
</template>

<script>
import TicketCard from '@/components/ticket/TicketCard'
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { toTimeRangeString } from '@/methods/time'
export default {
  name: 'TransferTicket',
  components: {
    TicketCard
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  setup(props, { emit }) {
    const store = useStore()
    let searchText = ref('')
    let receiver = ref({})
    async function searchUser() {
      let user_id = searchText.value
      let { success, data } = await store.dispatch('User/getUserById', { user_id, option: {} })
      if (!success) return alert('請確認收票者 ID 是否正確')
      receiver.value = data

    }

    async function transferTicket() {
      let { game_ticket_id } = props.info
      let body = { receiver_id: receiver.value.user_id }
      let { success, data } = await store.dispatch('Ticket/transferTicket', { game_ticket_id, body, option: {} })
      if (!success) return showMessageDialog('failed')

      showMessageDialog('success')
      emit('transferSuccess')
    }

    function showMessageDialog(status) {
      let info = {}
      switch (status) {
        case 'success':
          info = {
            status: 'success',
            title: `轉送票券成功`,
            subtitles: [''],
          }
          break;
        case 'failed':
          info = {
            status: 'danger',
            title: `轉送票券失敗`,
            subtitles: ['請稍後再試', '或聯絡系統管理員'],
          }
          break;

        default:
          break;
      }
      store.commit('Dialog/setDialog', {
        name: 'messageDialog',
        info
      })
    }

    return {
      searchUser,
      searchText,
      receiver,
      transferTicket
    }
  }

}
</script>

.<style lang="sass" scoped>
.input 
  width: 100%
  margin: 1rem 0
.confirmWrapper 
  margin-top: 1rem
  h5 
    margin: .25rem 0 1rem
</style>
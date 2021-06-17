<template lang="pug">
.Verification(@click="focusInput")
  .description 
    span 已將驗證碼發送到您的 e-mail
    .email.info_c {{ userEmail }}
    span(v-if="cdTime") 重發驗證碼({{ cdTime }}s)
    .underline.main_c.pointer(v-else @click="init") 重發驗證碼
 
  .flex.h-center
    .codeRow.grid(:style="gridStyle")
      .codeCol.flex.h-center.v-center(v-for="(code, i) of codeArr", :key="i") 
        span {{ code }}

  .errorMsg.danger_c(v-if="errorMsg") {{ errorMsg }}
  
  //- hidden input 
  input.disapper(ref="RefInput", v-model="verification_code" @blur="focusInput" @keyup="onChange" @keyup.enter="onEnter")

  .gc-btns 
    button.gc-btn.full(
      v-for="(btn, i) of btns",
      :key="i",
      :class="btn.class",
      @click="btn.callback"
    ) {{ btn.text }}
  

</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from 'vuex'

export default {
  name: "Verification",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    // ENABLE_ACCOUNT, FORGOT_PASSWORD
    verification_type: String,
    codeLength: {
      type: Number,
      default: 6
    },
    cdSecond: {
      type: Number,
      default: 300
    }
  },
  setup(props, { emit }) {
    let { info, codeLength, cdSecond } = props
    const store = useStore()
    let RefInput = ref(null)
    let userEmail = computed(() => info.user?.email || '')
    let gridStyle = computed(() => {
      return { 'grid-template-columns': `repeat(${codeLength}, minmax(24px, 40px))` }
    })
    const loginParams = computed(() => store.state.User.loginParams)
    let verification_code = ref('')
    let codeArr = ref(Array(codeLength).fill(''))
    let cdTime = ref(cdSecond)
    let errorMsg = ref('')
    let timer
    let btns = computed(() => [
      { text: '送出', class: 'main', callback: submit.bind(this) },
    ])

    onMounted(() => {
      init()
    })

    function init() {
      sendVerif()
      focusInput()
      initTimer()
    }

    // 連動 hidden input 跟顯示的驗證碼
    watch(verification_code, (newVal, oldVal) => {
      verification_code.value = verification_code.value.slice(0, codeLength)
      codeArr.value = codeArr.value.map((code, i) => verification_code.value[i] || '')
    })

    async function sendVerif() {
      let { email } = info.user
      props.verification_type === 'ENABLE_ACCOUNT'
        ? sendEnableVerif(email)
        : sendForgotVerif(email)
    }

    // 發啟用帳號驗證碼
    async function sendEnableVerif(email) {
      let params = { email }
      let res = await store.dispatch('User/sendEnableVerif', { params, option: {} })
      if (res.status === 406)
        errorMsg.value = '請求驗證碼太過頻繁，請先至您的信箱查看驗證碼或稍後再試'
    }

    // 發忘記密碼驗證碼
    async function sendForgotVerif(email) {
      let params = { email }
      let res = await store.dispatch('User/sendForgotVerif', { params, option: {} })
      if (res.status === 406)
        errorMsg.value = '請求驗證碼太過頻繁，請先至您的信箱查看驗證碼或稍後再試'
    }

    async function submit() {
      console.log('props.verification_type', props.verification_type)
      switch (props.verification_type) {
        case 'ENABLE_ACCOUNT':
          return enableUser()
          break;

        default:
          break;
      }
    }

    async function enableUser() {
      let email = loginParams.value.email
      let params = { email, verification_code: verification_code.value }
      let res = await store.dispatch('User/enableUser', { params, option: {} })
      switch (res.status) {
        case 400:
          return errorMsg.value = '驗證碼錯誤'
        case 406:
          return errorMsg.value = '驗證碼已過期，請點擊重新發送'
        default:
          return enableUserSuccess()
      }
    }

    // 驗證完 email 自動幫登入
    async function enableUserSuccess() {
      let params = loginParams.value
      let res = await store.dispatch('User/login', { params, option: {} })
      if (!res.success) return
      emit('showMessageDialog', 'registerSuccess')
    }

    function initTimer() {
      if (timer) return

      cdTime.value = cdSecond
      timer = setInterval(() => {
        if (cdTime.value > 1)
          return cdTime.value -= 1

        clearInterval(timer)
        timer = null
        cdTime.value = 0

      }, 1000)
    }

    function focusInput() {
      RefInput.value.focus()
    }

    function onEnter() {
      emit('submit')
    }

    return {
      userEmail,
      gridStyle,
      verification_code,
      codeArr,
      RefInput,
      focusInput,
      cdTime,
      initTimer,
      init,
      onEnter,
      btns,
      errorMsg,
      submit
    }
  },
};
</script>

<style lang="sass" scoped>
.Verification
  position: relative
  padding: 1rem
  .description
    text-align: center
    .email
      margin: .5rem

  .codeRow
    grid-gap: .75rem
  .codeCol
    width: 40px
    height: 60px
    @include setTextStyle(2rem, 600, #333)
    border-bottom: 2px solid #979797

  .errorMsg
    margin-top: 1rem
    text-align: center
  .disapper
    height: 0
    opacity: 0
</style>

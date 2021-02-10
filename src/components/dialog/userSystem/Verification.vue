<template lang="pug">
.Verification(@click="focusInput")
  .description 
    span 已將驗證碼發送到您的 e-mail
    .email.info_c {{ userEmail }}
    span(v-if="cdTime") 重新發送驗證碼({{ cdTime }}s)
    .underline.main_c.pointer(v-else @click="initTimer") 重新發送驗證碼

 
  .flex.h-center
    .codeRow.grid(:style="gridStyle")
      .codeCol.flex.h-center.v-center(v-for="(code, i) of codeArr", :key="i") 
        span {{ code }}

  .errorMsg.danger_c(v-if="errorMsg") {{ errorMsg }}
  
  //- hidden input 
  input.disapper(ref="RefInput", v-model="verification_code", @keyup="onChange")

  

</template>

<script>
import { ref, computed, onMounted, watch } from "vue";

export default {
  name: "Verification",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    errorMsg: String,
    codeLength: {
      type: Number,
      default: 6
    },
    cdSecond: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    let { info, codeLength, cdSecond } = props
    let RefInput = ref(null)
    let userEmail = computed(() => info.user?.email || '')
    let gridStyle = computed(() => {
      return { 'grid-template-columns': `repeat(${codeLength}, minmax(24px, 40px))` }
    })
    let verification_code = ref('')
    let codeArr = ref(Array(codeLength).fill(''))
    let cdTime = ref(cdSecond)
    let timer

    onMounted(() => {
      focusInput()
      initTimer()
    })

    // 連動 hidden input 跟顯示的驗證碼
    watch(verification_code, (newVal, oldVal) => {
      verification_code.value = verification_code.value.slice(0, codeLength)
      codeArr.value = codeArr.value.map((code, i) => verification_code.value[i] || '')
    })

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

    return {
      userEmail,
      gridStyle,
      verification_code,
      codeArr,
      RefInput,
      focusInput,
      cdTime,
      initTimer
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

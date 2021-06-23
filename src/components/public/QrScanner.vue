<template lang="pug">
.QrScanner
  .operatorBar.flex.between.v-center
    .cameraName camera {{ activeIndex +1 }}
    button.cameraBtn(@click="changeCamera") 切換相機
  .tips.flex.h-center 
    .tip 
      span 請參賽者打開 "我的票夾" 點擊票券
      br
      span 並掃描該票券 QR code
  video#preview
</template>

<script>
import Instascan from 'instascan'
import { onMounted, ref, onUnmounted } from 'vue'
export default {
  name: 'QrScanner',
  setup(props, { emit }) {
    onMounted(() => {
      openCamera()
      getUsedCamera()
    })

    let scanner
    let phoneCameras = []
    let activeIndex = ref(0)
    function openCamera() {
      scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
      scanner.addListener('scan', onScan)
      Instascan.Camera.getCameras().then(function (cameras) {
        cameras = cameras.filter(d => d.id || d.name)
        phoneCameras = cameras
        if (cameras.length > 0) {
          scanner.start(cameras[activeIndex.value]);
        } else {
          alert('No cameras found.')
        }
      })

    }

    function getUsedCamera() {
      let index = Number(localStorage.getItem('GC_SCAN_CAMERA_INDEX'))
      activeIndex.value = index ?? 0
    }

    function onScan(str) {
      emit('onScan', str)
    }

    function changeCamera() {
      activeIndex.value = activeIndex.value === phoneCameras.length - 1 ? 0 : activeIndex.value + 1
      scanner.start(phoneCameras[activeIndex.value])
      localStorage.setItem('GC_SCAN_CAMERA_INDEX', activeIndex.value)
    }

    onUnmounted(() => scanner?.stop())

    return {
      openCamera,
      changeCamera,
      activeIndex
    }
  }
}
</script>

<style lang="sass" scoped>
.QrScanner
  position: relative
  .operatorBar
    position: absolute
    bottom: 0
    letf: 0
    width: 100%
    z-index: 10
    padding: .5rem
    background-color: rgba(#000, .5)
    color: #fff
    .cameraName
      margin-bottom: .25rem
    .cameraBtn
      padding: .5rem
      border-radius: 8px
  .tips
    position: absolute
    top: 1rem
    left: 0
    width: 100%
    .tip
      text-align: center
      background-color: $second_c
      color: #333
      padding: .25rem
      border-radius: 4px
      font-size: 1.125rem
#preview
  display: block
  width: 100%
</style>
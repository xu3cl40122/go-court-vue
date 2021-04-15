<template lang="pug">
.QrScanner
  .operatorBar.flex.between.v-center
    .cameraName camera {{ activeIndex +1 }}
    button.cameraBtn(@click="changeCamera") 切換相機
  video#preview
</template>

<script>
import Instascan from 'instascan'
import { onMounted, ref, onUnmounted } from 'vue'
export default {
  name: 'QrScanner',
  setup(props) {
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
        phoneCameras = cameras
        if (cameras.length > 0) {
          scanner.start(cameras[activeIndex.value]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });

    }

    function getUsedCamera() {
      let index = Number(localStorage.getItem('GC_SCAN_CAMERA_INDEX'))
      activeIndex.value = index ?? 0
    }

    function onScan(str) {
      console.log(77777777777, str);
      localStorage.setItem('GC_SCAN_CAMERA_INDEX', activeIndex.value)


    }

    function changeCamera() {
      activeIndex.value = activeIndex.value === phoneCameras.length - 1 ? 0 : activeIndex.value + 1
      scanner.start(phoneCameras[activeIndex.value])
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
#preview
  display: block
  width: 100%
</style>
<template lang="pug">
.QrScanner 
  video#preview
</template>

<script>
import Instascan from 'instascan'
import { onMounted, ref } from 'vue'
export default {
  name: 'QrScanner',
  setup(props) {
    onMounted(() => {
      openCamera()
    })

    function openCamera() {
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        console.log(77777777777, content);
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
   
    }

    return {
      openCamera,
    }
  }
}
</script>

<style lang="sass" scoped>
#preview
  width: 100%
</style>
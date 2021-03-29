<template lang="pug">
.QrScanner 
  video#preview
</template>

<script>
const Instascan = require('instascan');
import { onMounted, ref } from 'vue'
export default {
  name: 'QrScanner',
  setup(props) {
    onMounted(() => {
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        console.log(content);
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
    })
  }
}
</script>
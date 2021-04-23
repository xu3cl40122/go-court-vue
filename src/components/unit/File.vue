<template lang="pug">
label.Avatar
  .img(:style="{'background-image': `url(${src})`}")
    .defaultImg(:style="{'background-image': `url(${defaultImg})`}")
  input.hidden(v-if="editable" type="file" accept="image/jpeg, image/png" @change="addFile")
    
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import defaultImg from '@/assets/image/default.jpg'

export default {
  name: 'Avatar',
  props: {
    src: String,
    editable: Boolean
  },
  setup(props, { emit }) {

    function addFile(e) {
      let file = e.target.files[0]
      emit('fileChange', file)
    }

    return {
      defaultImg,
      addFile
    }
  }
}
</script>

<style lang="sass" scoped>
.Avatar 
  display: block
.img
  position: relative
  width: 90px
  height: 90px
  border-radius: 50%
  overflow: hidden
  @include bgImgSetting()
  .defaultImg
    position: absolute
    width: 100% 
    height: 100%
    z-index: -1
    @include bgImgSetting()

.hidden
  position: absolute
  top: -9999px
  left: -9999px
  visibility: hidden



    
 

</style>
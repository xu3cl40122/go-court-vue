<template lang="pug">
.CourtMap 
  #courtmap(ref="courtmap")

</template>

<script>
import MarkerClusterer from '@googlemaps/markerclustererplus';
import redMarker from '@/assets/image/marker-red.svg'
import greenMarker from '@/assets/image/marker-green.svg'

// 推測是 vue 雙向綁定的關係 寫在 data google map zoom change 的更新會怪怪，就把變數寫在外面
let markers = []
let markerCluster
let map
let mapLoaded
let lastMarker

export default {
  name: 'CourtMap',
  props: {
    courts: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
     
    }
  },
  watch: {
    courts: {
      // immediate: true,
      handler(courts) {

        this.putMarkerOnMap(courts)
        this.zoomToMarker(0, 13)

      }
    }
  },
  async mounted() {
    this.initMap()
  },
  methods: {

    async initMap() {
     
      var taipei = { lat: 25, lng: 121.5 }
      map = new google.maps.Map(this.$refs['courtmap'], {
        zoom: 12,
        center: taipei,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        gestureHandling: 'cooperative'
      })

      map.addListener('zoom_changed', () => {
        console.log('zoom_changed')
      })

      // 地圖初始化完成
      google.maps.event.addDomListenerOnce(map, 'idle', async () => {
        mapLoaded = true
      })
    },
    /**
    * 由 parent query institution 時呼叫 因為 watch prop 的話拿 detail 會改變 instituions 就會觸發一次 function
    * */
    putMarkerOnMap(courts) {
      // map 還沒 init 的話就重來一次
      if (!mapLoaded) return setTimeout(() => this.putMarkerOnMap(courts), 100)
      // 清空 markerCluster
      if (markerCluster?.activeMap_)
        markerCluster.clearMarkers()

      markers = courts.map((d, i) => {

        let position = { lat: d.geometry?.coordinates?.[1], lng: d.geometry?.coordinates?.[0] }
        let marker = new google.maps.Marker({
          position,
          icon: redMarker
        })
        marker.addListener('click', () => this.onMarkerClick(marker, i, true))

        return marker
      })

      markerCluster = new MarkerClusterer(map, markers, {
        maxZoom: 14,
        gridSize: 80,
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
      })
      // this.$forceUpdate()
    },

    zoomToMarker(index, zoom = 15) {
      let marker = markers[index]
      // 如果 marker 還沒產生延後呼叫
      if (!marker)
        return setTimeout(() => this.zoomToMarker(index), 100)
      map.setZoom(zoom)
      map.panTo(marker.position)
      // this.onMarkerClick(marker, index, false)
    },

    onMarkerClick(marker, index) {
      if (marker === lastMarker) return
      marker.setIcon(greenMarker)
      lastMarker?.setIcon(redMarker)
      this.$emit('markerClick', index)
      lastMarker = marker
    }


  }
}
</script>

<style lang="sass" scoped>
#courtmap
  width: 100% 
  height: 100vh

</style>
<template lang="pug">
.CourtMap 
  #courtmap(ref="map")

</template>

<script>
import MarkerClusterer from '@googlemaps/markerclustererplus';

export default {
  name: 'CourtMap',
  components: {
    map: {}
  },
  data() {
    return {
      markers: [],
      markerCluster: {},
      map: {},
      mapLoaded: false,
      courts: []
    }
  },
  async mounted() {
    this.queryCourts()
    // await this.$nextTick()
    var taipei = { lat: 25, lng: 121.5 };
    this.map = new google.maps.Map(this.$refs['map'], {
      zoom: 12,
      center: taipei,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      gestureHandling: 'cooperative'
    })

    // 地圖初始化完成
    google.maps.event.addDomListenerOnce(this.map, 'idle', async () => {
      this.mapLoaded = true
    })
  },
  methods: {
    async queryCourts() {
      let params = { size: 50 }
      let option = { skipLoading: true }
      let { sucess, data } = await this.$store.dispatch('Court/queryCourts', { params, option })
      this.courts = data.content
      this.putMarkerOnMap(this.courts)
    },

    /**
    * 由 parent query institution 時呼叫 因為 watch prop 的話拿 detail 會改變 instituions 就會觸發一次 function
    * */
    putMarkerOnMap(courts) {
      // map 還沒 init 的話就重來一次
      if (!this.mapLoaded) return setTimeout(() => this.putMarkerOnMap(courts), 0)
      // 清空 markerCluster
      if (this.markerCluster?.activeMap_)
        this.markerCluster.clearMarkers()

      this.markers = courts.map((d, i) => {

        let position = { lat: d.geometry?.coordinates?.[1], lng: d.geometry?.coordinates?.[0] }
        let marker = new google.maps.Marker({
          position,
          // icon: redMarker
        })
        // marker.addListener('click', () => this.onMarkerClick(marker, i, true))

        return marker
      })

      this.markerCluster = new MarkerClusterer(this.map, this.markers, {
        maxZoom: 14,
        gridSize: 80,
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
      })
    },


  }
}
</script>

<style lang="sass" scoped>
#courtmap
  width: 100% 
  height: calc(100vh - #{$headerH})

</style>
<template>
  <transition name="slide">
    <div class="singer-detail">
      singer detail
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import { getSingerDetail } from '@/providers/singer'
import SongModel from '@/providers/SongModel'
import { createSong } from '@/providers/SongModel'

export default {
  name: "Detail",  
  computed: {
    ...mapState(['singer'])
  },
  data () {
    return {
      songs: []
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code == 0) {
          this.songs = this.normalizeSongs(res.data.list)
          console.log(res.data.list.musicData)
          console.log(res.data.list)
          console.log(res.data)
          console.log(this.songs)
        }
      })
    },
    normalizeSongs(songs) {
      let ret = []
      songs.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl';
  .singer-detail
    position : fixed
    z-index : 200
    top : 0
    left : 0
    right : 0
    bottom : 0
    background : $color-background
  .slide-enter-active, .slide-leave-active
    transition : all .3s
  .slide-enter, .slide-leave-to
    transform : translate3d(100%, 0, 0)
</style>

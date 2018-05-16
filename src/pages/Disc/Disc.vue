<template>

  <transition name="slide">
    <div class="disc">
      <music-list :title="title" :bgImg='picUrl' :songs='songs'></music-list>
    </div>
  </transition>
</template>
<script>
import MusicList from '@/components/music-list/MusicList'
import { mapState } from 'vuex'
import { getSongList } from '@/providers/recommend'
import { createSong } from '@/providers/SongModel'
export default {
  name: 'Disc',
  components: {
    MusicList
  },
  computed: {
    ...mapState(['disc']),
    title() {
      return this.disc.dissname
    },
    picUrl() {
      return this.disc.imgurl
    },
  },
  data () {
    return {
      songs: []
    }
  },
  activated() {
    this.getSongList()
  },
  methods: {
    getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.songs = this.normalizeSongs(res.cdlist[0].songlist)
        }
      })
      console.log('fuck')
      
    },
    normalizeSongs(list) {
      let result = []
      for (let musicData of list) {
        if (musicData.songid, musicData.albumid) {
          result.push(createSong(musicData))
        }
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition : all .3s
  .slide-enter, .slide-leave-to
    transform : translate3d(100%, 0, 0)
  .disc 
    position : fixed
    top : 0
    bottom : 0
    left : 0
    right : 0
</style>

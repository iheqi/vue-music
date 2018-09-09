<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImg" :songs='songs' :rank='rank'></music-list>
  </transition>
</template>
<script>
import MusicList from '@/components/music-list/MusicList'
import { mapState } from 'vuex'
import { getMusicList } from '@/providers/rank'
import { createSong } from '@/providers/SongModel'

export default {
  name: 'TopList',
  components: {
    MusicList
  },
  computed: {
    ...mapState(['topList']),
    title() {
      return this.topList.topTitle
    },
    bgImg() {
      if (this.songs.length) {
        return this.songs[0].img
      }
      return ''
    }
  },
  mounted() {
    this.getMusicList()
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  methods: {
    getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === 0) {
          this.songs = this.normalizeSongs(res.songlist)
        }
      })
    },

    normalizeSongs(list) {
      let result = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
          result.push(createSong(musicData))
        }
      })
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
</style>

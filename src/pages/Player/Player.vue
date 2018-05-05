<template>
  <div class="player">
    <normal-player v-show="fullScreen"></normal-player>
    <mini-player v-show="!fullScreen"></mini-player>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
import NormalPlayer from './components/NormalPlayer'
import MiniPlayer from './components/MiniPlayer'
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer
  },
  computed: {
    ...mapState(['fullScreen', 'playlist', 'playing']),
    ...mapGetters(['currentSong'])
  },
  
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newVal) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newVal ? audio.play() : audio.pause()
      })
    }
  },
  mounted () {
    console.log(this.currentSong)
  }
}
</script>

<style lang="stylus" scoped>

</style>

<template>
  <div class="player" v-show='playlist.length'>
    <normal-player v-show="fullScreen" :currentTime='currentTime'></normal-player>
    <mini-player v-show="!fullScreen"></mini-player>
    <audio :src="currentSong.url" ref="audio" @error="error" @timeupdate="updateTime"></audio>
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
  data () {
    return {
      currentTime: 0
    }
  },
  methods: {
    error () {
      //
    },
    updateTime(ev) {
      this.currentTime = ev.target.currentTime
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

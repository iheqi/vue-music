<template>
  <div class="player" v-show='playlist.length'>
    <normal-player v-show="fullScreen" :currentTime='currentTime'></normal-player>
    <mini-player v-show="!fullScreen"></mini-player>
    <audio 
      :src="currentSong.url" 
      ref="audio" 
      @error="error" 
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
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
      setTimeout(() => {   // 处理从后台切回的情况
        this.$refs.audio.play()
      }, 1000)
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
    },
    percentChange(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent
      if (!this.playing) {   // 滑动后自动播放
        this.setPlaying(!this.playing)
      }
    },
    ...mapMutations(['setPlaying']),
    end () {
      this.bus.$emit('ended');
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.bus.$on('percentChange', (percent) => {
        this.percentChange(percent)
      })
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>

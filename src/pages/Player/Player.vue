<template>
  <div class="player" v-show='playlist.length'>
    <normal-player v-show="fullScreen" :currentTime='currentTime'></normal-player>
    <mini-player v-show="!fullScreen"></mini-player>
    <play-list ref="playlist"></play-list>
    <audio 
      :src="currentSong.url" 
      ref="audio" 
      @error="error" 
      @timeupdate="updateTime"
      @ended="end"
      @play="ready"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from './components/NormalPlayer'
import MiniPlayer from './components/MiniPlayer'
import PlayList from './components/PlayList'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    PlayList,
    //songReady: false,
  },
  computed: {
    ...mapState(['fullScreen', 'playlist', 'playing']),
    ...mapGetters(['currentSong'])
  },
  
  watch: {
    currentSong() {
      if (this.playing) {       // fuck，歌都删完了还播放的原因
        setTimeout(() => {      // 处理从后台切回的情况
          this.$refs.audio.play()
        }, 1000)
      }
    },
    playing(newVal) {
      console.log(newVal)
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
    ...mapActions(['setPlayHistory']),
    end () {
      this.bus.$emit('ended');
    },
    showPlayList() {
      this.$refs.playlist.show()
    },
    ready() {
      //this.songReady = true
      this.setPlayHistory(this.currentSong)
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

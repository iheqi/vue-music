<template>
  <div class="middle">
    <div class="middle-l">
      <div class="cd-wrapper">
        <div class="cd">
          <img class="image" :src="currentSong.img" :class="cdRotate">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Lyric from 'lyric-parser'

export default {
  name: 'Lyric',
  data () {
    return {
      currentLyric: null
    }
  },
  props: {
    currentSong: null
  },
  computed: {
    ...mapState(['playing']),
    cdRotate () {
      return this.playing ? 'play' : 'play pause'   // 'play pause'而不是'pause'
    }
  },
  watch: {
    currentSong() {
      this.getLyric()
    }
  },
  methods: {
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric)
      })
      console.log(this.currentLyric)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
    .middle
      position: fixed
      width: 100%
      top: 1.6rem
      bottom: 3.4rem
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            position: relative
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused    // 设置动画运行或暂停。默认running
    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>

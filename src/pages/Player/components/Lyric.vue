<template>
  <div class="middle">
    <div class="middle-l" v-show="false">
      <div class="cd-wrapper">
        <div class="cd">
          <img class="image" :src="currentSong.img" :class="cdRotate">
        </div>
      </div>
    </div>

    <div class="middle-r">
      <div class="lyric-wrapper" ref="lyricWrapper">
        <div>
          <div v-if="currentLyric">
            <p 
              v-for="(line, index) of currentLyric.lines" 
              :key="index"
              class='text'
              :class="{'current': currentLineNum === index}"
              ref="lyricLine"
            >
              {{line.txt}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Lyric from 'lyric-parser'
import Bscroll from 'better-scroll'

export default {
  name: 'Lyric',
  data () {
    return {
      currentLyric: null,
      currentLineNum: 0
    }
  },
  
  computed: {
    ...mapState(['playing']),
    ...mapGetters(['currentSong']),
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
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()   // 滚动api
        }
      })
      
      setTimeout(() => {
        console.log(this.currentLyric)
      }, 2000)
    },
    handleLyric({lineNum, txt}) {   // 回调还有参数
      this.currentLineNum = lineNum
      if (lineNum > 6) {
        let lineEl = this.$refs.lyricLine[lineNum - 6]  // 6行约中间
        this.scroll.scrollToElement(lineEl, 800)
      } else {
        this.scroll.scrollTo(0, 0, 1000)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.lyricWrapper)
    })
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
      .middle-r
        display: inline-block
        width: 100%
        height: 100%
        .lyric-wrapper
          width: 80%
          height : 100%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>

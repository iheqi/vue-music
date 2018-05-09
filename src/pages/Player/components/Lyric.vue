<template>
  <div class="middle">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" :src="currentSong.img" :class="cdRotate">
            </div>
          </div>

          <div class="playing-line-wrapper">
            <div class="playing-line">{{playingLine}}</div>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
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
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
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
      currentLineNum: 0,
      swiperOption: {
          pagination: '.swiper-pagination',
          observeParents: true,             // 解决画廊隐藏或显示由于计算而引起的错误 
          observer: true                    // 这里会在自身或父级元素dom变化时刷新一次
      },
      playingLine: ''
    }
  },
  props: {
    currentTime: 0
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
      if (this.currentLyric) {
        this.currentLyric.stop()   // play()api是用定时器实现的，在换歌时清除之前的，防止跳动
        console.log('stop')
      }
      this.getLyric()
    },
    playing() {
      if (this.currentLyric) {
        this.currentLyric.togglePlay()   // 歌词滚动跟随播放状态
      }
    },
    currentTime() {
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    }
  },
  methods: {
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()   // 滚动api
        }
      }).catch(() => {    // 如果没有获取到
        this.currentLyric = null
        this.currentLineNum = 0
        this.playingLine = ''
      })

    },
    handleLyric({lineNum, txt}) {   // 回调还有参数
      this.currentLineNum = lineNum
      if (lineNum > 6) {
        let lineEl = this.$refs.lyricLine[lineNum - 6]  // 6行约中间
        this.scroll.scrollToElement(lineEl, 800)
      } else {
        this.scroll.scrollTo(0, 0, 1000)
      }
      this.playingLine = txt
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.lyricWrapper)

      /* this.bus.$on('percentChange', () => {
        if (this.currentLyric) {
          console.log('seek', this.currentTime)   // currentTime来自父组件，同时监听了percentChange，回调处理后父组件的currentTime可能还没改变
          this.currentLyric.seek(this.currentTime * 1000)
        }
      }) */
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
    .middle >>> .swiper-pagination-bullet-active   /* 穿透，不受scoped限制 */
      background-color : #fff !important

    .middle
      position: fixed
      width: 100%
      top: 1.6rem
      bottom: 3.2rem
      white-space: nowrap
      .swiper
        height : 100% !important
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
          .playing-line-wrapper
            width: 80%
            height : 30px
            text-align : center 
            margin: 30px auto 0 auto
            .playing-line
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          width: 100%
          height: 100%
          overflow : hidden
          .lyric-wrapper
            width: 80%
            height : 90%
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

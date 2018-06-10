<template>
  <transition name='normal'>
    <div class="normal-player">
      <div class="background"><!-- 只能用这个方法（css揭秘p158） -->
        <img width="100%" height="100%" :src="currentSong.img">
      </div>

      <div class="top">
        <player-header :currentSong='currentSong'></player-header>
      </div>

      <div>
        <lyric :currentTime='currentTime'></lyric>
      </div>
      
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{format(progressTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent='percent' ref="progress-bar"></progress-bar>
            </div>
          <span class="time time-r">{{format(currentSong.duration)}}</span>
        </div>
        <operators></operators>
      </div>

      <toast ref="toast" position='bottom' :duration='1000' :text='toastText()'></toast>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import PlayerHeader from './PlayerHeader'
import Lyric from './Lyric'
import Operators from './Operators'
import ProgressBar from './ProgressBar'
import Toast from '@/components/toast/Toast'

export default {
  name: 'NormalPlayer',
  props: {
    currentTime: {
      default: 0
    }
  },
  data() {
    return {
      progressTime: this.currentTime 
    }
  },
  watch: {  
    currentTime() {
      let progressBar = this.$refs['progress-bar']
      if (progressBar.touchStatus()) {       // 滑动中progress不跟currentTime改变，避免鼠标一直按着时
        return
      }
      this.progressTime = this.currentTime
    },
    mode() {
      this.showToast()
      console.log(this.toastText())
    }
  },
  computed: {
    ...mapGetters(['currentSong']),
    ...mapState(['mode']),
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    /* bgImg() {
      return `background: url(${this.currentSong.img}); background-size: 100% 100%; `
    } */


  },
  components: {
    PlayerHeader,
    Lyric,
    Operators,
    ProgressBar,
    Toast
  },
  methods: {
    format(interval) {
      interval = interval | 0   // 即取整
      const minute = interval / 60 | 0
      const second = this.pad(interval % 60)
      return `${minute}:${second}`
    },
    pad(num, n = 2) {    // 补个0
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    showToast() {
      this.$refs.toast.show()
    },

    toastText() {
      let text = ''
      switch (this.mode) {
        case 1: 
          text = '列表循环'
          break
        case 2: 
          text = '顺序播放'
          break
        case 3:
          text = '单曲循环'
      }
      return text
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.bus.$on('percentChange', (percent) => {   //
        this.progressTime = this.currentSong.duration * percent
      })

      this.bus.$on('progressTime', (percent) => {   //
        this.progressTime = this.currentSong.duration * percent
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
    .normal-enter-active, .normal-leave-active
      transition : all .3s cubic-bezier(.86, .18, .82, 1.32)

    .normal-enter, .normal-leave-to
      opacity : 0
      transform : translateY(100px)

    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .bottom
        .progress-wrapper
          display: flex
          align-items: center
          width: 90%
          padding: 10px 0
          position : absolute
          bottom : 2rem
          flex : 1
          padding : 0 5%
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 .6rem
            line-height: .6rem
            width: .6rem
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
</style>

<template>
  <transition name='normal'>
    <div class="normal-player">
      <div class="background">
        <img width="100%" height="100%" src="" alt="">
      </div>

      <div class="top">
        <player-header :currentSong='currentSong'></player-header>
      </div>

      <div>
        <lyric :currentTime='currentTime'></lyric>
      </div>
      
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent='percent'></progress-bar>
            </div>
          <span class="time time-r">{{format(currentSong.duration)}}</span>
        </div>
        <operators></operators>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import PlayerHeader from './PlayerHeader'
import Lyric from './Lyric'
import Operators from './Operators'
import ProgressBar from './ProgressBar'

export default {
  name: 'NormalPlayer',
  props: {
    currentTime: {
      default: 0
    }
  },
  computed: {
    ...mapGetters(['currentSong']),
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  components: {
    PlayerHeader,
    Lyric,
    Operators,
    ProgressBar
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
      z-index: 88
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        bottom : 0
        right : 0
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

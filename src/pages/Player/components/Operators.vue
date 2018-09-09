<template>
  <div class="operators">
    <div class="icon i-left">
      <i class="iconfont" v-html="iconMode" @click="setMode"></i>
    </div>
    <div class="icon i-left">
      <i class="iconfont" @click="preSong">&#xe610;</i>
    </div>
    <div class="icon i-center">
      <i class="iconfont center" v-html='ifPlaying' @click='togglePlaying'></i>
    </div>
    <div class="icon i-right">
      <i class="iconfont" @click="nextSong">&#xe611;</i>
    </div>
    <div class="icon i-right" @click="toggleFavorite(currentSong)">
      <i class="iconfont like" v-html="getFavoriteIcon(currentSong)"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { playMixin } from '@/providers/mixins'
export default {
  name: 'Operators',
  mixins: [playMixin],
  methods: {
    ...mapMutations(['setPlaying', 'setCurrentIndex', 'setMode']),
    togglePlaying() {
      this.setPlaying(!this.playing)
    },
    preSong() { // 还需处理快速点击时的报错
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      /* if (!this.playing) {      // 解决其暂停状态下点击时自动播放而图标没变化（已在mutations在设置）
        this.togglePlaying()
      } */
    },
    nextSong() {
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      /* if (!this.playing) {
        this.togglePlaying()
      } */
    },
    orderPlay() {
      if (this.currentIndex === this.playlist.length - 1) {
        this.togglePlaying()
        return
      }
      this.nextSong()
    },
    loopPlay() {
      this.togglePlaying()
      setTimeout(() => {
        this.togglePlaying()
      }, 100)
    },
    randomPlay() {
      let index = Math.floor(Math.random() * +this.playlist.length)
      this.setCurrentIndex(index)
    }
  },
  computed: {
    ...mapState(['playing', 'currentIndex', 'playlist', 'mode']),
    ifPlaying() {
      return this.playing ? '&#xe600;' : '&#xe63a;'
    }
  },
  mounted() {
    this.bus.$on('ended', () => {
      if (this.playlist.length === 1) {
        this.loopPlay()
        return
      }
      switch (this.mode) {
        case 1: // 列表循环
          this.nextSong()
          break
        case 2: // 顺序播放
          this.orderPlay()
          break
        case 3:
          this.loopPlay()
          break
        case 4:
          this.randomPlay()
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl';

    .operators
      position: absolute
      bottom: 6%
      width: 100%
      display: flex
      align-items: center
      .icon
        flex: 1
        color: $color-theme
        i
          font-size: .55rem
      .i-left
        text-align: right
      .i-center
        padding: 0 20px
        text-align: center
        .center
          font-size: .78rem
      .i-right
        text-align: left
        .like
          color : $color-sub-theme
          font-weight: 1000
          font-size : .6rem

</style>

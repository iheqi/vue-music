<template>
  <div class="operators">
    <div class="icon i-left">
      <i class="iconfont">&#xe649;</i>
    </div>
    <div class="icon i-left">
      <i class="iconfont" @click="preSong">&#xe610;</i>
    </div>
    <div class="icon i-center">
      <i class="iconfont" v-html='ifPlaying' @click='togglePlaying'></i>
    </div>
    <div class="icon i-right">
      <i class="iconfont" @click="nextSong">&#xe611;</i>
    </div>
    <div class="icon i-right">
      <i class="iconfont">&#xe612;</i>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from  'vuex'

export default {
  name: 'Operators',
  methods: {
    ...mapMutations(['setPlaying', 'setCurrentIndex']),
    togglePlaying () {
      this.setPlaying(!this.playing)
    },
    preSong() {    // 还需处理快速点击时的报错
      let index = this.currentIndex - 1
      if (index == -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {      // 解决其暂停状态下点击时播放而图标没变化
        this.togglePlaying()
      }
    },
    nextSong() {
      let index = this.currentIndex + 1
      if (index == this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    }

  },
  computed: {
    ...mapState(['playing', 'currentIndex', 'playlist']),
    ifPlaying() {
      return this.playing ? '&#xe600;' : '&#xe63a;'
    }
  },

}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl';
  
    .operators
      position: absolute
      bottom: 1rem
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
      .i-right
        text-align: left
        
</style>

<template>
  <div class="operators">
    <div class="icon i-left">
      <i class="iconfont" v-html="iconMode" @click="setIconMode"></i>
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
    ...mapMutations(['setPlaying', 'setCurrentIndex', 'setMode']),
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
    },
    setIconMode() {
      this.setMode()
    },
    
    orderPlay() {
      if (this.currentIndex === this.playlist.length-1) {
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
    }
  },
  computed: {
    ...mapState(['playing', 'currentIndex', 'playlist', 'mode']),
    ifPlaying() {
      return this.playing ? '&#xe600;' : '&#xe63a;'
    },
    
    iconMode() {
      let iconMode = '&#xe649;'
      switch (this.mode) {
        case 1: 
          iconMode = '&#xe649;'
          break
        case 2:
          iconMode = '&#xe721;'
          break
        case 3:
          iconMode = '&#xe613;'
      }
      return iconMode
    }
  },
  watch: {
    mode() {
      let next
      switch (this.mode) {
        case 1:  // 列表循环
          next = this.nextSong
          break
        case 2:  // 顺序播放
          next = this.orderPlay
          break
        case 3:
          next = this.loopPlay
      }
      console.log('change')
      this.modeNext = next
    },
  },
  mounted() {
    this.bus.$on('ended', () => {
      switch (this.mode) {
        case 1:  // 列表循环
          this.nextSong()
          break
        case 2:  // 顺序播放
          this.orderPlay()
          break
        case 3:
          this.loopPlay()
      }
    });
  }
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

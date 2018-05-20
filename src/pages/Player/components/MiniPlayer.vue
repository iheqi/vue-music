<template>
  <transition>
    <div class="mini-player" @click="openNormal">
      <div class="icon">
        <img :src="currentSong.img" width="40" height="40" :class="cdRotate">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>

      <div class="control" @click.stop="togglePlay">
        <i class="iconfont icon-mini" v-html="ifPlaying"></i>
      </div>

      <div class="control" @click.stop="showPlayList">
        <i class="iconfont icon-playlist">&#xe62b;</i>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'MiniPlayer',
  methods: {
    ...mapMutations(['setFullScreen', 'setPlaying']),
    openNormal() {
      this.setFullScreen(true)
    },
    togglePlay () {
      this.setPlaying(!this.playing)
    },
    showPlayList() {
      this.$parent.showPlayList()       // 子组件调用父组件的方法
    }
  },
  computed: {
    ...mapGetters(['currentSong']),
    ...mapState(['playing']),
    ifPlaying () {
      return this.playing ? '&#xe600;' : '&#xe63a;'
    },
    ...mapState(['playing']),
    cdRotate () {
      return this.playing ? 'play' : 'play pause'   // 'play pause'而不是'pause'
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
  @import '~styles/mixins';
  
    .mini-enter-active, .mini-leave-active
      transition : all .4s
    .mini-enter, .mini-leave-to
      opacity : 0

    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 88
      width: 100%
      height: 1.2rem
      background: $color-highlight-background
      .icon
        flex: 0 0 40px
        width: .8rem
        padding: 0 .2rem 0 .4rem
        img
          border-radius: 50%
          &.play
            animation: cd-rotate 20s linear infinite
          &.pause
            animation-play-state: paused    // 设置动画运行或暂停。默认running
    
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          font-size: $font-size-medium
          color: $color-text
          ellipsis()
        .desc
          font-size: $font-size-small
          color: $color-text-d
          ellipsis()
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-mini
          font-size : 34px
          color: $color-theme-d
        .icon-playlist
          font-size: 34px
          color: $color-theme-d
  @keyframes cd-rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

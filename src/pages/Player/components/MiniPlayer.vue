<template>
  <div>
    <div class="mini-player" @click="openNormal">
      <div class="icon">
        <img :src="currentSong.img" width="40" height="40">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name">

        </h2>
        <p class="desc" v-html="currentSong.singer">

        </p>
      </div>

      <div class="control">
        <i class="iconfont icon-mini">&#xe63a;</i>
      </div>

      <div class="control">
        <i class="iconfont icon-playlist">&#xe62b;</i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'MiniPlayer',
  methods: {
    ...mapMutations(['setFullScreen']),
    openNormal() {
      this.setFullScreen(true)
    }
  },
  computed: {
    ...mapGetters(['currentSong']),
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 1.2rem
      background: $color-highlight-background
      .icon
        flex: 0 0 40px
        width: .8rem
        padding: 0 .2rem 0 .4rem
        img
          border-radius: 50%
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
        .desc
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-mini
          font-size : 40px 
          color: $color-theme-d
        .icon-playlist
          font-size: 30px
          color: $color-theme-d
</style>

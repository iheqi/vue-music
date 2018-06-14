<template>
  <div class="header">
    <div class="back" @click="back">
      <span class="iconfont icon-back">&#xe60a;</span>
    </div>
    <h1 class="title" v-html="currentSong.name"></h1>
    <h2 class="subtitle" v-html="currentSong.singer"></h2>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PlayerHeader',
  props: {
    currentSong: null
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    ...mapMutations(['setFullScreen'])
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
  @import '~styles/mixins.styl';
  
    .header
      position: relative
      margin-bottom: .5rem
      .back
        position absolute
        top: 0
        left: .12rem
        z-index: 50
        .icon-back
          display: block
          padding: .16rem
          font-size: .6rem
          color: $color-theme
          transform: rotate(-90deg) 
      .title
        width: 70%
        margin: 0 auto
        line-height: .8rem
        text-align: center
        font-size: $font-size-large
        color: $color-text
        ellipsis()
      .subtitle
        line-height: .4rem
        text-align: center
        font-size: $font-size-medium
        color: $color-text
</style>

<template>
  <div class="music-list">
    <div class="back">
      <div class="iconfont back-icon">
        &#xe60a;
      </div>
    </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-img" :style="bgStyle">

      </div>

  </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImg})`
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl'
    .music-list
      position: fixed
      z-index: 100
      top: 0
      left: 0
      bottom: 0
      right: 0
      background: $color-background
      .back
        position absolute
        top: 0
        left: .12rem
        z-index: 50
        .back-icon
          display: block
          padding: .16rem
          font-size: .6rem
          color: $color-theme
      .title
        position: absolute
        top: 0
        left: 10%
        z-index: 40
        width: 80%
        text-align: center
        line-height: .8rem
        font-size: $font-size-large
        color: $color-text 
      .bg-img
        height: 0
        padding-top: 70%
        background-size: cover
          
</style>

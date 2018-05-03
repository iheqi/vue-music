<template>
  <div class="music-list">
    <div class="back">
      <div class="iconfont back-icon">
        &#xe60a;
      </div>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-img" :style="bgStyle"></div>

    <div class="song-list-wrapper" ref="songWrapper">
      <song-list :songs='songs'></song-list>
    </div>
  </div>
</template>

<script>
import SongList from '../song-list/SongList'
import Bscroll from 'better-scroll'

export default {
  name: 'MusicList',
  props: {
    bgImg: String,
    songs: Array,
    title: String,
  },
  components: {
    SongList
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImg})`
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.songWrapper)
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl'
    .music-list
      .back
        position absolute
        top: 0
        left: .12rem
        .back-icon
          display: block
          padding: .16rem
          font-size: .6rem
          color: $color-theme
      .title
        position: absolute
        top: 0
        left: 10%
        width: 80%
        text-align: center
        line-height: .8rem
        font-size: $font-size-large
        color: $color-text 
      .bg-img
        height: 0
        padding-top: 70%
        background-size: cover
      .song-list-wrapper
        position: fixed
        top: 5rem
        bottom: 0
        width: 100%
        background: $color-background
        overflow : hidden
          
</style>

<template>
  <div class="music-list">
    <header class="header">
      <div class="iconfont back-icon" @click="goBack">
        &#xe60a;
      </div>
      <h1 class="title" v-html="title"></h1>
    </header>
    <div class="bg-img" :style="bgStyle" ref="bgImg"></div>

    <!-- <div class="bg-layer" ref="layer"></div> -->

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
    title: String
  },
  components: {
    SongList
  },
  methods: {
    goBack() {
      this.$router.push('/singer')
    },
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImg})`
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.songWrapper, {
      click: true,
      probeType: 3       // 无节流
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl'
    .music-list
      .header
        width: 100%
        position: absolute
        top: 0
        z-index : 10
        display : flex
        .back-icon
          padding: .16rem
          font-size: .6rem
          color: $color-theme
        .title
          text-align: center
          line-height: .8rem
          font-size: $font-size-large
          color: $color-text 
          margin-left : 30%
      .bg-img
        position : relative
        height: 0
        padding-top: 70%
        background-size: cover
        z-index : 8
      .song-list-wrapper
        position: fixed
        padding-top : 3.70rem 
        top: .9rem
        bottom: 0
        width: 100%
        z-index : 9 
        overflow : hidden
      /* .bg-layer
        background: $color-background 
        height : 6rem */
          
</style>

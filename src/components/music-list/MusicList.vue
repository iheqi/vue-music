<template>
  <div class="music-list">
    <header class="header">
      <div class="iconfont back-icon" @click="goBack">
        &#xe60a;
      </div>
      <h1 class="title" v-html="title"></h1>
    </header>
    <div class="bg-img" :style="bgStyle" ref="bgImg"></div>

    <div class="song-list-wrapper" ref="songWrapper" @pullingDown='scaleImg'>
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
  data () {
    return {
      timer: null
    }
  },
  methods: {
    goBack() {
      this.$router.push('/singer')
    },
    
    scaleImg() {
      /* if (this.timer) {
        clearTimeout(this.timer)
      } */
      
      let scale = 1 + (this.scroll.y / 250)
      if (scale > 1) {
        this.$refs.bgImg.style['transform'] = `scale(${scale})`
        
        /* this.timer = setTimeout(() => {
        }, 10) */
      }
      
      console.log(scale)
    },
    scaleOneImg () {
      this.$refs.bgImg.style['transform'] = `scale(1)`
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImg})`
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.songWrapper, {
      click: true,
      probeType: 2
    }),
    this.scroll.on('scroll', this.scaleImg)
    this.scroll.on('touchEnd', this.scaleOneImg)
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
        transition : all 0.2s
      .song-list-wrapper
        position: fixed
        padding-top : 4rem 
        top: .9rem
        bottom: 0
        width: 100%
        z-index : 9 
        overflow : hidden
          
</style>

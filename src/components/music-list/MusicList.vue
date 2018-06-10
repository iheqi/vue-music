<template>
  <div class="music-list">
    <header class="header">
      <div class="iconfont back-icon" @click="goBack">
        &#xe60a;
      </div>
      <h1 class="title" v-html="title"></h1>
    </header>
    
    <div class="bg-img" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper" v-show="songs.length">
        <div class="play">
          <span class="iconfont play-icon">&#xe63a;</span>
          <span class="text">随机播放全部</span>
        </div>
      </div>

      <div class="filter" ref="filter"></div>
    </div>
    <loading v-show="!songs.length" class="loading"></loading>
    
    <div class="song-list-wrapper" ref="wrapper" @pullingDown='scaleImg'>
      <song-list :songs='songs' @openPlayer='openPlayer' :rank='rank'></song-list>
    </div>
  </div>
</template>

<script>
import SongList from '../song-list/SongList'
import Bscroll from 'better-scroll'
import Loading from '@/components/loading/Loading'
import { mapActions } from 'vuex'

export default {
  name: 'MusicList',
  props: {
    bgImg: String,
    songs: {
      type:  Array,
      default() {  // type Object/Array must use a factory function to return the default value.
        return []   
      }
    },
    title: String,
    rank: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SongList,
    Loading,
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    
    scaleImg() {
      let scale = 1 + (this.scroll.y / 250)
      if (scale > 1) {
        this.$refs.bgImg.style['transform'] = `scale(${scale})`
      }
    },
    scaleOneImg () {
      this.$refs.bgImg.style['transform'] = `scale(1)`
    },
    openPlayer(item, index) {
      this.selectPlay({
        list: this.songs,
        index     // 传入当前歌单和所点击的歌的索引
      })
    },
    ...mapActions(['selectPlay'])
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImg})`
    }
  },
  mounted () {
    this.$nextTick(() => {

      this.scroll = new Bscroll(this.$refs['wrapper'], {
            click: true,
            probeType: 2
          })
          this.scroll.on('scroll', this.scaleImg)
          this.scroll.on('touchEnd', this.scaleOneImg)
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  @import '~styles/mixins'
  
    .music-list
      position : fixed
      z-index : 20
      top : 0
      left : 0
      right : 0
      bottom : 0
      background : $color-background
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
          z-index : 11
        .title
          text-align: center
          line-height: .8rem
          font-size: $font-size-large
          color: $color-text
          position : absolute
          width : 100% 
          ellipsis()
      .bg-img
        position : relative
        height: 0
        padding-top: 70%
        background-size: cover
        z-index : 8
        transition : all 0.2s
        .play-wrapper
          position: absolute
          bottom: .4rem
          width: 100%
          z-index : 9
          .play
            width: 2.7rem
            height : .64rem
            margin : 0 auto
            text-align: center
            line-height : .64rem
            border: 1px solid $color-theme
            color: $color-theme
            border-radius: 2rem
            .play-icon
              font-size: $font-size-large-x
            .text
              display: inline-block
              vertical-align: middle
              padding-bottom : .2rem              
        .filter
          position: absolute
          top: 0
          left: 0
          right: 0
          bottom: 0
          background: rgba(7, 17, 27, 0.4)
      .song-list-wrapper
        position: fixed
        padding-top : 4.2rem // bs的滚动距离是按内容长度算的，这样会使滚不到底部
        top: .9rem
        bottom: 0
        width: 100%
        z-index : 9 
        overflow : hidden
      .loading
        padding-top : 1.2rem 
          
</style>

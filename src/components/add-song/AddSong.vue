<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close iconfont">&#xe620;</i>
        </div>
      </div>

      <div class="search-box-wrapper"> 
        <search-box placeholder='搜索歌曲' @query='queryChange' ref="searchBox"></search-box>
      </div>

      <div class="shortcut" v-show="!query">
        <switches :currentIndex='currentIndex' :switches='switches' @switch='switchItem'></switches>
        <div class="list-wrapper" ref="list-wrapper">
          <div v-show="currentIndex===0" class="song-list-wrapper" ref="song-list-wrapper">
            <song-list :songs='playHistory' @openPlayer="selectSong"></song-list>
          </div>

          <div class="search-wrapper" v-show="currentIndex===1">
            <search-list @delete='deleteSearchHistory' @select="addQuery" :searches='searchHistory'></search-list>
          </div>
        </div>
      </div>

      <div class="search-result" v-show="query">
        <suggest :query='query' :showSinger='false' @select="saveHistory"></suggest>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchBox from '@/components/search-box/SearchBox'
import Suggest from '@/components/suggest/Suggest'
import Switches from '@/components/switches/Switches'
import { searchMixin } from '@/providers/mixins'
import SongList from '@/components/song-list/SongList'
import { mapState, mapActions } from 'vuex'
import Bscroll from 'better-scroll'
import SongModel from '@/providers/SongModel'
import SearchList from '@/components/search-list/SearchList'

export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      currentIndex: 0,
      switches: [{
        name: '最近播放'
      }, {
        name: '搜索历史'
      }]
    }
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {      // 页面事先隐藏时，scroll已经计算好了，显示时需要刷新一下
        this.scroll.refresh()
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    switchItem(index) {
      this.currentIndex = index
    },
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new SongModel(song))
      }
    },
    ...mapActions(['insertSong'])
  },
  components: {
    SearchBox,
    Suggest,
    Switches,
    SongList,
    SearchList
  },
  computed: {
    ...mapState(['playHistory'])  
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs['song-list-wrapper'], {
      click: true
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translateX(100%)
    .header
      position : relative
      height : .9rem
      text-align : center
      .title
        line-height: .9rem
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: .1rem
        .icon-close
          display: block
          padding: .2rem
          font-size: .46rem
          color: $color-theme
    .search-box-wrapper
      margin: .4rem
    .shortcut
      .list-wrapper
        position: absolute
        top: 3.3rem
        bottom: 0
        width: 100%
        overflow: hidden
        .song-list-wrapper
          height: 100%
        .search-wrapper
          padding: .4rem .6rem
    .search-result
      position: fixed
      top: 2.5rem
      bottom: 0
      width: 100%
</style>


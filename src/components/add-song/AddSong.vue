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
        <search-box placeholder='搜索歌曲' @query='queryChange'></search-box>
      </div>

      <div class="shortcut" v-show="!query">
        <switches :currentIndex='currentIndex' :switches='switches' @switch='switchItem'></switches>
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
    },
    hide() {
      this.showFlag = false
    },
    switchItem(index) {
      this.currentIndex = index
    }
  },
  components: {
    SearchBox,
    Suggest,
    Switches
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
    .search-result
      position: fixed
      top: 2.5rem
      bottom: 0
      width: 100%
</style>


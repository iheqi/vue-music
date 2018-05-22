<template>
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

    </div>

    <div class="search-result" v-show="query">
      <suggest :query='query' :showSinger='false' @select="saveHistory"></suggest>
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/search-box/SearchBox'
import Suggest from '@/components/suggest/Suggest'
import { searchMixin } from '@/providers/mixins'

export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },

  },
  components: {
    SearchBox,
    Suggest
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


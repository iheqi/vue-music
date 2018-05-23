<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query='queryChange'></search-box>
    </div>

    <div class="shortcut-wrapper" v-show="!query" ref="shortcut-wrapper">
      <div>
        <div class="hot-keys">
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="hot of hotKey" :key="hot.n" @click="addQuery(hot.k)">
                {{hot.k}}
              </li>
            </ul>
          </div>
        </div>

        <div class="search-history" v-show="searchHistory && searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="delete" @click="showConfirm">
              <i class="iconfont">&#xe72f;</i>
            </span>
          </h1>
          
          <search-list 
            :searches='searchHistory'
            @select="addQuery"  
            @delete="deleteOne"  
          >  <!-- 直接调用就可以了,触发事件时已经将参数传入了-->
          </search-list>
        </div>
      </div>
    </div>

    <div class="search-result-wrapper" v-show="query">
        <suggest :query='query' @select='saveHistory'></suggest>
    </div>
    <confirm ref="confirm" @confirm='clearSearchHistory'></confirm>
    <router-view></router-view>
  </div>
  
</template>
<script>
import SearchBox from '@/components/search-box/SearchBox'
import Suggest from '@/components/suggest/Suggest'
import Confirm from '@/components/confirm/Confirm'
import { getHotKey } from '@/providers/search'
import { mapActions, mapState } from 'vuex'
import SearchList from '@/components/search-list/SearchList'
import Bscroll from 'better-scroll'
import { searchMixin } from '@/providers/mixins'

export default {
  name: 'Search',
  mixins: [searchMixin],
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm
  },
  mounted () {
    this.getHotKey()
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs['shortcut-wrapper'], {
        click: true
      })
    })
  },
  data() {
    return {
      hotKey: [],
    }
  },
  methods: {
    getHotKey() {
      getHotKey().then((res) => {   // 得到热门搜索词
        if (res.code === 0) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions(['clearSearchHistory']),

    showConfirm() {
      this.$refs.confirm.show()
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {    // 解决从搜索结果中返回时搜索历史无法滚动的问题（为什么无法滚动又没说清楚靠）
        setTimeout(() => {
          this.scroll.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"
    .search-box-wrapper
      margin : .4rem

    .shortcut-wrapper
      position: fixed
      top: 3.56rem
      bottom: 0
      width: 100%
      overflow : hidden
      .hot-keys
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 .3rem .3rem .4rem
          .title
            margin-bottom: .4rem
            font-size: $font-size-medium-x
            color: $color-text-l
          .item
            display: inline-block
            padding: .1rem .2rem
            margin: 0 .3rem .2rem 0
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
            border-radius: .1rem
      .search-history
        position : relative
        margin : 0 .4rem
        padding-bottom : 1.4rem
        .title
          display: flex
          align-items: center
          height: .8rem
          font-size: $font-size-medium-x
          color: $color-text-l
          .text
            flex: 1
          .delete
            padding: .1rem
    .search-result-wrapper
      position: fixed
      top: 3.4rem
      bottom: 0
      width: 100%
    
</style>


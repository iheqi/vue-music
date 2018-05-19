<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query='queryChange'></search-box>
    </div>

    <div class="hot-keys-wrapper" v-show="!query">
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


export default {
  name: 'Search',
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm
  },
  mounted () {
    this.getHotKey()
  },
  data() {
    return {
      hotKey: [],
      query: '',
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
    addQuery(key) {                        // 点击热门搜索的关键词时
      this.$refs.searchBox.setQuery(key)   // 组件上的方法即公共接口，可以这样调用子组件方法（组件一定要获取对啊，fuck）
      console.log(key)
    },                                     // 子组件调用父组件则是：this.$parent

    queryChange(query) {
      this.query = query
    },

    saveHistory() {
      this.setSearchHistory(this.query)
      console.log(this.searchHistory)
    },
    ...mapActions(['setSearchHistory', 'deleteSearchHistory', 'clearSearchHistory']),
    deleteOne(query) {
      this.deleteSearchHistory(query)
    },
    /* clearAll() {    // 单纯的调用的话那直接用就好了
      this.clearSearchHistory()
    } */

    showConfirm() {
      this.$refs.confirm.show()
    }
  },
  computed: {
    ...mapState(['searchHistory'])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"
    .search-box-wrapper
      margin : .4rem

    .hot-keys-wrapper
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
    
</style>


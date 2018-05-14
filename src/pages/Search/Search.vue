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
    </div>

    <div class="search-result-wrapper">
      <suggest :query='query'></suggest>
    </div>
  </div>
  
</template>
<script>
import SearchBox from '@/components/search-box/SearchBox'
import Suggest from '@/components/suggest/Suggest'
import { getHotKey } from '@/providers/search'

export default {
  name: 'Search',
  components: {
    SearchBox,
    Suggest
  },
  mounted () {
    this.getHotKey()
  },
  data() {
    return {
      hotKey: [],
      query: ''
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
    },                                     // 子组件调用父组件则是：this.$parent

    queryChange(query) {
      this.query = query
    }
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
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: .1rem .2rem
            margin: 0 .3rem .2rem 0
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
            border-radius: .1rem
    .search-result-wrapper
      position: fixed
      width: 100%
      top: 3.6rem
      bottom: 0
</style>


<template>
  <div class="search-box">
    <i class="iconfont icon-search"></i>
    <input class="box" :placeholder="placeholder" v-model="query"/>
    <i class="iconfont icon-dismiss" v-show="query" @click="clear">&#xe608;</i>
  </div>
</template>

<script>
import { debounce } from '@/providers/util'

export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(key) {
      this.query = key
    }
  },
  created() {
    this.$watch('query', debounce((newVal) => { // 节流
      this.$emit('query', newVal)
    }, 200))
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"
    .search-box
      display : flex
      background: $color-highlight-background
      width: 100%
      height: .76rem
      padding: 0 .12rem
      align-items: center
      box-sizing: border-box
      border-radius : 0.12rem

      .icon-search
        font-size: .42rem
        color: $color-background
      .box
        flex: 1
        margin: 0 .1rem
        line-height: .36rem
        background: $color-highlight-background
        color: $color-text-l
        font-size: $font-size-medium
        &::placeholder    //
          color: $color-text-d
          font-size : .26rem
      .icon-dismiss
        font-size: .4rem
        color: $color-background

</style>

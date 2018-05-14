<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item of result" :key="item.singerid">
        <div class="icon">
          <i class='iconfont' v-html="getIcon(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { search } from '@/providers/search'
import { filterSinger } from '@/providers/SongModel'

export default {
  name: 'Suggest',
  props: {
    query: {
      type: String,
      default: '邓紫棋'
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    search() {
      search(this.query, this.page, this.showSinger).then((res) => {   // !! 搜索
        if (res.code === 0) {
          this.result = this.getResult(res.data)
        }
        console.log(this.result)
        
      })
    },
    getResult(data) {
      let result = []
      if (data.zhida && data.zhida.singerid) {
        result.push({ ...data.zhida, ...{type: 'singer'} })  // 扩展运算符
      }
      if (data.song) {
        result = result.concat(data.song.list)
      }

      return result
    },
    getIcon(item) {
      if (item.type === 'singer') {
        return '&#xe614;'
      }
      return '&#xe6fa;'
    },
    getName(item) {
      if (item.type === 'singer') {
        return item.singername
      }
      return `${item.songname} - ${filterSinger(item.singer)}`
    }
  },
  watch: {
    query () {
      this.search()
    }
  },
  mounted () {
    this.search()
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables'
@import '~styles/mixins'
  .suggest
    height : 100%
    overflow : hidden
    .suggest-list
      padding: 0 .6rem
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: .4rem
        .icon
          margin-right: .1rem 
        .name
          flex: 1
          font-size: $font-size-medium
          color: $color-text-d
          overflow: hidden
          .text
            ellipsis()
</style>

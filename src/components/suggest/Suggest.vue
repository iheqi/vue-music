<template>
  <div class="suggest" ref="wrapper">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item of result" :key="item.singerid">
        <div class="icon">
          <i class='iconfont' v-html="getIcon(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getName(item)"></p>
        </div>
      </li>

      <loading v-show="hasMore" title=""></loading>
    </ul>
  </div>
</template>

<script>
import { search } from '@/providers/search'
import { filterSinger } from '@/providers/SongModel'
import Bsrcoll from 'better-scroll'
import Loading from '@/components/loading/Loading'

const perpage = 20

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
      result: [],
      hasMore: true
    }
  },
  methods: {
    search() {
      this.hasMore = true
      this.page = 1
      this.result = []   // 新请求时清空
      search(this.query, this.page, this.showSinger, perpage).then((res) => {   // !! 搜索
        console.log(res.data)
        if (res.code === 0) {
          this.result = this.getResult(res.data)
        }
        this.checkMore(res.data)  // 获取完后计算一下是否还有数据，为上拉加载做准备
        
      })
    },
    searchMore() {
      console.log('more')
      
      if (!this.hasMore) {
        return
      }
      console.log('more')
      this.page ++   // 如果有更多数据，则加载下一页的，page是第几页的参数

      search(this.query, this.page, this.showSinger, perpage).then((res) => {   // !! 搜索
        if (res.code === 0) {
          this.result = this.result.concat(this.getResult(res.data))   // 跟前面页面的数据拼在一起
        }
        this.checkMore(res.data)  
      })
      this.scroll.finishPullUp()
    },
    getResult(data) {
      let result = []
      if (!this.result.length) {   // 每次请求传回都会有歌手的信息，这里避免重复
        if (data.zhida && data.zhida.singerid) {
          result.push({ ...data.zhida, ...{type: 'singer'} })  // 扩展运算符
        }
      }
      if (data.song) {
        result = result.concat(data.song.list)
      }
      console.log('result', result)
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
    },
    checkMore(data) {
      const song = data.song   // song对象上有curnum curpage totalnum属性
      console.log(song.curpage, song.curnum, song.totalnum)
      if (!song.list.length || (song.curpage * perpage + song.curnum) > song.totalnum) {
        this.hasMore = false
      }
      console.log(this.hasMore)
    }
  },
  watch: {
    query (oldVal, newVal) {
      if (oldVal.trim() === newVal.trim()) {
        return
      }
      this.search()
    }
  },
  mounted () {
    this.search()
    this.$nextTick(() => {
      this.scroll = new Bsrcoll(this.$refs.wrapper, {
        click: true,
        pullUpLoad: true
      })
      this.scroll.on('pullingUp', this.searchMore)
    })
  },
  components: {
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables'
@import '~styles/mixins'
  .suggest
    position: fixed
    overflow : hidden
    width: 100%
    top: 3.4rem
    bottom: 0
    .suggest-list
      padding: 0 .5rem
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: .4rem
        .icon
          margin-right: .2rem 
        .name
          flex: 1
          font-size: $font-size-medium
          color: $color-text-d
          overflow: hidden
          .text
            ellipsis()
</style>

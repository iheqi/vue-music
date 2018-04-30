<template>
  <div class="recommend-wrapper" ref="wrapper">
    <div>
      <recommend-swiper :list='list'></recommend-swiper>
      <recommend-list :songList='songList'></recommend-list>
    </div>
  </div>
</template>
<script>
import { getRecommendData } from '@/providers/recommend'
import RecommendSwiper from './components/Swiper'
import RecommendList from './components/List'
import Bscroll from 'better-scroll'

export default {
  name: 'Recommend',
  components: {
    RecommendSwiper,
    RecommendList
  },
  data () {
    return {
      list: [],
      songList: []
    }
  },
  methods: {
    getData () {
      getRecommendData().then((res) => {
        if (res.code === 0) {
          this.list = res.data.slider
          this.songList = res.data.songList
        }
      })
    }
  },
  mounted () {
    this.getData()
    this.scroll = new Bscroll(this.$refs.wrapper)
  }
}
</script>

<style lang="stylus" scoped>
    .recommend-wrapper
      position: absolute         /* 对于bscroll必须的 */
      left : 0
      right : 0
      top : 1.76rem
      bottom : 0 
      overflow : hidden
</style>


<template>
  <div class="recommend-wrapper" ref="wrapper">
    <div>
      <recommend-swiper :list='list'></recommend-swiper>
      <recommend-list :discList='discList'></recommend-list>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from '@/providers/recommend'
import RecommendSwiper from './components/Swiper'
import RecommendList from './components/List'
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'

export default {

  name: 'Recommend',
  components: {
    RecommendSwiper,
    RecommendList
  },
  data() {
    return {
      list: [],
      discList: [],
      ...mapState(['disc'])
    }
  },
  methods: {
    getRecommendData() {
      getRecommend().then((res) => {
        if (res.code === 0) {
          this.list = res.data.slider
        }
      })
    },
    /*     selectDisc(disc) {
      this.$router.push({
        path: `/recommend/${disc.id}`
      })
    } */
    getDiscListData() {
      getDiscList().then(res => {
        if (res.code === 0) {
          this.discList = res.data.list
        }
      })
    }
  },
  mounted() {
    this.getRecommendData()
    this.getDiscListData()
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

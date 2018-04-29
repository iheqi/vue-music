<template>
  <div class="recommend">
    <div>
      <recommend-swiper :list='list'></recommend-swiper>
      <recommend-list :songList='songList'></recommend-list>
    </div>
  </div>
</template>
<script>
import { getRecommendData } from '@/assets/api/recommend'
import RecommendSwiper from './components/Swiper'
import RecommendList from './components/List'

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
  }
}
</script>

<style lang="stylus" scoped>

</style>


<template>
  <div class="recommend" >
    <div class="recommend-content">
      <recommend-swiper :list='list'></recommend-swiper>
    </div>

  </div>
</template>
<script>
import { getRecommendData } from '@/assets/api/recommend'
import RecommendSwiper from './components/Swiper'

export default {
  name: 'Recommend',
  components: {
    RecommendSwiper
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getData () {
      getRecommendData().then((res) => {
        if (res.code === 0) {
          this.list = res.data.slider
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


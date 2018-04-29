<template>
  <div class="recommend" >
    <div class="recommend-content">
      <div class="swiper-wrapper">

      </div>
    </div>

  </div>
</template>
<script>
import { getRecommendData } from '@/assets/api/recommend'
export default {
  name: 'Recommend',
  methods: {
    getData () {
      getRecommendData().then((res) => {
        if (res.code === 0) {
          console.log(res.data.slider)
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


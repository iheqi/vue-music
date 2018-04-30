<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">

        <swiper-slide v-for='img of list' :key='img.id'>
            <img class='swiper-img' :src="img.picUrl" />
        </swiper-slide>
        
        <div class="swiper-pagination"  slot="pagination"></div>

    </swiper>
  </div>
</template>

<script>
export default {
  name: 'RecommendSwiper',
  props: {
    list: Array
  },
  data () {
      return {
        swiperOption: {
            pagination: '.swiper-pagination',
            loop: true,
            observeParents: true,             // 解决画廊隐藏或显示由于计算而引起的错误 
            observer: true                    // 这里会在自身或父级元素dom变化时刷新一次
        }
      } 
  },
  /* 解决当list还是[]时渲染的问题 */
  computed: {
      showSwiper() {
          return this.list.length
      }
  }

}
</script>

<style lang='stylus' scoped>
    .wrapper >>> .swiper-pagination-bullet-active   /* 穿透，不受scoped限制 */
        background-color : #fff !important
    .wrapper
        overflow : hidden
        width: 100%
        height : 0
        padding-bottom : 2.88rem        /* 避免图片加载缓慢时的抖动 */
        /* height : 31.25vw */
        background-color : #eee
        /* .swiper-pagination-bullet-active
            background-color : red !important */   /* 这里无法修改 */
        .swiper-img
            width : 100%
</style>
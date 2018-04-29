<template>
  <div class="wrapper">
    <!-- <swiper :options="swiperOption" v-if="showSwiper">

        <swiper-slide v-for='img of list' :key='img.id'>
            <img class='swiper-img' :src="img.imgUrl" />
        </swiper-slide>
        
        <div class="swiper-pagination"  slot="pagination"></div>

    </swiper> -->
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  }

}
</script>

<style lang='stylus' scoped>

</style>
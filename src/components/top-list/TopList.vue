<template>
  <div class="toplist">
    textasasas
    asasasasasasasa
    <music-list :title="title" :bgImg="bgImg"></music-list>
  </div>
</template>
<script>
import MusicList from '@/components/music-list/MusicList'
import { mapState } from 'vuex'
export default {
  name: 'TopList',
  components: {
    MusicList
  },
  computed: {
    ...mapState(['topList']),
    title () {
      return this.topList.topTitle
    },
    bgImg() {
      return this.topList.picUrl
    }
  },
  mounted() {
    console.log(this.topList)
  }
}
</script>
<style lang="stylus" scoped>
  .toplist
    background : red
    position : fixed
    z-index : 1000
</style>

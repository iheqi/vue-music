<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="iconfont back-icon">&#xe60a;</i>
      </div>

      <div class="switches-wrapper">
        <switches @switch='switchItem' :currentIndex='currentIndex' :switches='switches'></switches>
      </div>

      <div class="play-btn">
        <i class="play-icon"></i>
      </div>

      <div class="list-wrapper" ref="list-wrapper">
        <div v-show="currentIndex===0" class="song-list-wrapper">
          <song-list :songs='favoriteList' @openPlayer="selectSong"></song-list>
        </div>

        <div class="song-list-wrapper" v-show="currentIndex===1" ref="song-list-wrapper">
          <song-list :songs='playHistory' @openPlayer="selectSong"></song-list>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import Switches from '@/components/switches/Switches'
import { mapState, mapActions } from 'vuex'
import SongList from '@/components/song-list/SongList'
import SongModel from '@/providers/SongModel'
import Bscroll from 'better-scroll'

export default {
  name: 'User',
  data () {
    return {
      currentIndex: 0,
      switches: [{name: '我喜欢的'}, {name: '最近听的'}]
    }
  },
  components: {
    Switches,
    SongList
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index
      setTimeout(() => {      // 页面事先隐藏时，scroll已经计算好了，显示时需要刷新一下
        this.scroll.refresh()
      }, 20)
    },
    selectSong(song) {
      this.insertSong(new SongModel(song))
    },
    ...mapActions(['insertSong']),
    back() {
      this.$router.back()
    }
  },
  computed: {
    ...mapState(['favoriteList', 'playHistory'])
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.scroll = new Bscroll(this.$refs['song-list-wrapper'], {
          click: true
        })
      }, 1000)
    })
  }
}
</script>


<style lang="stylus" scoped>
@import '~styles/variables'
  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translateX(100%)
    .back
      position absolute
      top: .1rem
      left: .1rem
      z-index: 50
      .back-icon
        display: block
        padding: .2rem
        font-size: .44rem
        color: $color-theme
    .switches-wrapper
      margin: .2rem 0 .6rem 0
    
    .list-wrapper
      position: absolute
      top: 1.3rem
      bottom: 0
      width: 100%
      overflow: hidden
      .song-list-wrapper
        height: 100%
</style>

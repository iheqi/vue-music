<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="iconfont back-icon">&#xe60a;</i>
      </div>

      <div class="switches-wrapper">
        <switches @switch='switchItem' :currentIndex='currentIndex' :switches='switches'></switches>
      </div>

      <div class="list-wrapper" ref="list-wrapper">
        <div v-show="currentIndex===0" class="song-list-wrapper">
          <div class="play-wrapper" v-show="favoriteList.length" @click="randomPlay">
            <div class="play">
              <span class="iconfont play-icon">&#xe63a;</span>
              <span class="text">随机播放全部</span>
            </div>
          </div>

          <song-list :songs='favoriteList' @openPlayer="selectSong" :operator='true'></song-list>
        </div>

        <div class="song-list-wrapper" v-show="currentIndex===1" ref="song-list-wrapper">
          <song-list :songs='playHistory' @openPlayer="selectSong"></song-list>
        </div>
      </div>

      <div class="no-result-wrapper">
        <no-result v-show="noResult" :title="noResultTitle"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from '@/components/switches/Switches'
import { mapState, mapActions, mapMutations } from 'vuex'
import SongList from '@/components/song-list/SongList'
import SongModel from '@/providers/SongModel'
import Bscroll from 'better-scroll'
import NoResult from '@/components/no-result/NoResult'

export default {
  name: 'User',
  data() {
    return {
      currentIndex: 0,
      switches: [{name: '我喜欢的'}, {name: '最近听的'}]
    }
  },
  components: {
    Switches,
    SongList,
    NoResult
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index
      setTimeout(() => { // 页面事先隐藏时，scroll已经计算好了，显示时需要刷新一下
        this.scroll.refresh()
      }, 20)
    },
    selectSong(song) {
      this.insertSong(new SongModel(song))
    },
    ...mapActions(['insertSong', 'selectPlay']),
    ...mapMutations(['randomMode']),
    back() {
      this.$router.back()
    },

    randomPlay() {
      let songs = []
      for (let song of this.favoriteList) {
        songs.push(new SongModel(song))
      }
      let index = Math.floor(this.favoriteList.length / 2)
      this.selectPlay({
        list: songs,
        index
      })
      this.randomMode()
    }
  },
  computed: {
    ...mapState(['playlist', 'favoriteList', 'playHistory', 'mode']),
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultTitle() {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '你还没有听过歌曲'
      }
    }
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
        .play-wrapper
          width: 100%
          z-index : 9
          .play
            width: 2.7rem
            height : .64rem
            margin : 0 auto
            text-align: center
            line-height : .64rem
            border: 1px solid $color-theme
            color: $color-theme
            border-radius: 2rem
            .play-icon
              font-size: $font-size-large-x
            .text
              display: inline-block
              vertical-align: middle
              padding-bottom : .2rem
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>

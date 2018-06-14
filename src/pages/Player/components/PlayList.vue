<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click='hide'>
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="header">
            <i class="mode iconfont" v-html="iconMode" @click="setMode"></i>
            <p class="text" v-html="modeText"></p>
            <i class="clear iconfont" @click="showConfirm">&#xe72f;</i>
          </h1>
        </div>

        <div class="list-content" ref="content">
          <transition-group name="list" tag="ul">
            <li class="item" v-for="(item, index) of playlist" 
              :key="item.id" 
              @click="selectItem(item, index)"
              ref="liItem"
            >
              <i class="current iconfont" v-html="getCurrentIcon(item)"></i>
              <p class="text">{{item.name}}</p>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i class="iconfont icon-like" v-html="getFavoriteIcon(item)"></i>
              </span>

              <span class="delete" @click.stop="deleteOne(item)">
                <i class="iconfont icon-d">&#xe620;</i>
              </span>
            </li>
          </transition-group>
        </div>

        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="iconfont icon-add">&#xe620;</i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>

        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>

        <confirm ref="confirm" @confirm='confirmClear'></confirm>
        <add-song ref="addSong"></add-song>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Bscroll from 'better-scroll'
import Confirm from '@/components/confirm/Confirm'
import { playMixin } from '@/providers/mixins'
import AddSong from '@/components/add-song/AddSong'

export default {
  name: 'PlayList',
  mixins: [playMixin],
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {        // 解决换歌后无法滚动
        this.scrollToCurrent(this.currentSong)
        setTimeout(() => {
          this.scroll.refresh()
        }, 2000)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    getCurrentIcon(item) {
      if (item.id === this.currentSong.id) {
        return '&#xe63a;'
      }
      return ''
    },
    selectItem(item, index) {
       this.setCurrentIndex(index)
    },  
    ...mapMutations(['setCurrentIndex', 'setMode']),
    ...mapActions(['deleteSong', 'clearPlayList']),
    scrollToCurrent(currentSong) {             // 滚动当前歌曲在顶部
      const index = this.playlist.findIndex((song) => {
        return currentSong.id === song.id
      })
      setTimeout(() => {
        this.scroll.scrollToElement(this.$refs.liItem[index], 500)
      }, 100)
    },
    deleteOne(item) {
      this.deleteSong(item)
      if (this.playlist.length === 0) {    // 解决删没了歌曲
        this.hide()
      }
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    confirmClear() {
      this.clearPlayList()
      this.hide()
    },
    addSong() {
      this.$refs.addSong.show()
    } 
  },
  computed: {
    
    modeText() {
      let modeText = '顺序播放'
      switch (this.mode) {
        case 1: 
          modeText = '顺序播放'
          break
        case 2:
          modeText = '列表循环'
          break
        case 3:
          modeText = '单曲循环'
          break
        case 4:
          modeText = '随机播放'
      }
      return modeText
    },
    ...mapState(['mode', 'playlist']),
     
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.content, {
      click: true
    })
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      this.scrollToCurrent(newSong)
    }
  },
  components: {
    Confirm,
    AddSong
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables';
@import '~styles/mixins';

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper       // 这是防止背景也跟着变换
        transform: translate3d(0, 100%, 0)
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: .4rem .6rem .2rem .4rem
        .header
          display: flex
          align-items: center
          .mode
            margin-right: .2rem
            font-size: .6rem
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
            ellipsis()
          .clear
            font-size : $font-size-large-x
            color: $color-text-d
      .list-content
        max-height: 4.8rem
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: .8rem
          padding: 0 .6rem 0 .4rem
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
            // font-size : 0
            // transform : scaleY(0)
          .current
            flex: 0 0 .4rem
            width: .4rem
            font-size: $font-size-medium-x
            color: $color-theme-d
            margin-right : .1rem
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-d
            ellipsis()
            
          .like
            margin-right: .1rem
            font-size: $font-size-small-s
            color: $color-theme
            font-weight : 1000
            .icon-like
              color: $color-sub-theme
              font-size : $font-size-large-x
          .delete
            font-size: $font-size-small
            color: $color-theme
            .icon-d
              font-size : $font-size-large-x
              
      .list-operate
        width: 3rem
        margin: .4rem auto .4rem auto
        .add
          display: flex
          align-items: center
          padding: .16rem .32rem
          border: 1px solid $color-text-l
          border-radius: 2rem
          color: $color-text-l
          .icon-add
            margin-right: .1rem
            font-size: $font-size-small
            transform : rotate(45deg)
          .text
            font-size: $font-size-medium
      .list-close
        text-align: center
        line-height: 1rem
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>

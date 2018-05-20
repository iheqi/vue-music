<template>
  <div class="playlist" v-show="showFlag" @click='hide'>
    <div class="list-wrapper">
      <div class="list-header">
        <h1 class="header">
          <i class="mode iconfont" v-html="iconMode"></i>
          <p class="text" v-html="modeText"></p>
          <i class="clear iconfont">&#xe72f;</i>
        </h1>
      </div>

      <div class="list-content">
        <ul>
          <li class="item">
            <i class="current"></i>
            <p class="text"></p>
            <span class="like">
              <i class="iconfont icon-like">&#xe612;</i>
            </span>

            <span class="delete">
              <i class="iconfont icon-d">&#xe620;</i>
            </span>
          </li>
        </ul>
      </div>

      <div class="list-operate">
        <div class="add">
          <i class="iconfont icon-add">&#xe620;</i>
          <span class="text">添加歌曲到队列</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PlayList',
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  },
  computed: {
    iconMode() {
      let iconMode = '&#xe649;'
      switch (this.mode) {
        case 1: 
          iconMode = '&#xe649;'
          break
        case 2:
          iconMode = '&#xe721;'
          break
        case 3:
          iconMode = '&#xe613;'
      }
      return iconMode
    },
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
      }
      return modeText
    },
    ...mapState(['mode'])  
  },
  
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables';
  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
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
          .current
            flex: 0 0 .4rem
            width: .4rem
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-d
          .like
            margin-right: .3rem
            font-size: $font-size-small
            color: $color-theme
            .icon-like
              color: $color-sub-theme
              font-size : $font-size-large-x
          .delete
            font-size: $font-size-small
            color: $color-theme
            .icon-d
              font-size : $font-size-large-x
              
      .list-operate
        width: 2.8rem
        margin: .4rem auto .6rem auto
        .add
          display: flex
          align-items: center
          padding: .16rem .32rem
          border: 1px solid $color-text-l
          border-radius: 2rem
          color: $color-text-l
          .icon-add
            margin-right: .1rem
            font-size: $font-size-small-s
            transform : rotate(45deg)
          .text
            font-size: $font-size-small
</style>

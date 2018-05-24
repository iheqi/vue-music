<template>
  <transition name="toast">
    <div class="toast" v-show="showFlag" @click.stop="hide">
      <div class="toast-content">
        <i class="iconfont">&#xe61b;</i>
        <span>{{text}}</span>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  props: {
    text: {
      type: String,
      default: '1首歌曲已经添加到播放队列'
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.duration)
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~styles/variables';
  .toast
    position: fixed
    top: 0
    width: 100%
    z-index: 500
    background: $color-dialog-background
    &.toast-enter-active, &.toast-leave-active
      transition: all 0.3s
    &.toast-enter, &.toast-leave-to
      transform: translate3d(0, -100%, 0)
    .toast-content
      text-align: center
      padding: .4rem 0
      
      .text
        font-size: $font-size-medium
        color: $color-text
</style>


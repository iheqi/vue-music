<template>
  <transition :name="position">
    <div class="toast" :class="position" v-show="showFlag" @click.stop="hide">
      <div class="toast-content">
        <i v-show='icon' class="iconfont">&#xe61b;</i>
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
    },
    icon: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'top'
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
    width: 100%
    z-index: 500
    background: $color-dialog-background

    .toast-content
      text-align: center
      padding: .4rem 0

      .text
        font-size: $font-size-medium
        color: $color-text
  .top
    top: 0
    &.top-enter-active, &.top-leave-active
      transition: all 0.3s
    &.top-enter, &.top-leave-to
      transform: translate3d(0, -100%, 0)
  .bottom
    bottom: 0
    &.bottom-enter-active, &.bottom-leave-active
      transition: all 0.3s
    &.bottom-enter, &.bottom-leave-to
      transform: translate3d(0, 100%, 0)
</style>

<template>
  <transition name="confirm">
    <div class="confirm" v-show="showConfirm">
      <div class="confirm-wrapper">
        <div class="content">

          <p class="text">{{text}}</p>

          <div class="operate">
            <div class="operate-btn border-top  left" @click="hide()">取消</div>
            <div class="operate-btn border-top" @click="confirm">清空</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    text: {
      default: '确定清空？'
    }
  },
  data() {
    return {
      showConfirm: false // 自身维护显示与隐藏
    }
  },
  methods: {
    show() { // 提供接口
      this.showConfirm = true
    },
    hide() {
      this.showConfirm = false
    },
    confirm() {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/variables"

  .confirm
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 300
    background-color: $color-background-d
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 60%
      border-radius: .2rem
      background: $color-highlight-background

      .content      // 用于显示时动画，如果直接写在wrapper会先偏移再缩放（不知为何）
        animation: confirm-zoom 0.3s

        .text
          padding: .4rem .3rem
          line-height: .41rem
          text-align: center
          font-size: $font-size-large
          color: $color-text-l
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex : 1
            line-height : .41rem
            color: $color-text-d
            padding : .2rem 0
            border-top: 1px solid $color-background-d
            &.left
              border-right: 1px solid $color-background-d

  /* .confirm-leave-active
    animation: confirm-fadein 0.3s
    transition : all 0.3s

  @keyframes confirm-fadein
    0%
      opacity: 1
    100%
      opacity: 0 */

  @keyframes confirm-zoom
    0%
      transform: scale(0)
      opacity: 0
    100%
      transform: scale(1)
      opacity: 1
</style>

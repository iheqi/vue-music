<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>  <!-- 黄色条 -->

      <div class="progress-btn-wrapper" ref="progressBtn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      default: 0
    }
  },
  watch: {
    percent(newVal) {
      console.log(newVal)
      if (newVal >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - 16   // clientWidth: width + padding
        const offsetWidth = newVal * barWidth
        this.$refs.progress.style.width = offsetWidth + 'px'

        // 小球的移动
        this.$refs.progressBtn.style['transform'] = `translateX(${offsetWidth}px)`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'
    .progress-bar
      height: .6rem
      .bar-inner
        position: relative
        top: 13px
        height: 4px
        background: rgba(0, 0, 0, 0.3)
        .progress
          position: absolute
          height: 100%
          background: $color-theme  /* 黄色条，默认为进度0 */
        .progress-btn-wrapper
          position: absolute
          left: -8px
          top: -13px
          width: 30px
          height: 30px
          .progress-btn
            position: relative
            top: 7px
            left: 7px
            box-sizing: border-box
            width: .32rem
            height: .32rem
            border: 3px solid $color-text
            border-radius: 50%
            background: $color-theme
</style>


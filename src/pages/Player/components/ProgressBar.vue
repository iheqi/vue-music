<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>  <!-- 黄色条 -->

      <div 
        class="progress-btn-wrapper" 
        ref="progressBtn"
        @touchstart='progressTouchStart'
        @touchmove='progressTouchMove'
        @touchend='progressTouchEnd'
      >
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
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(ev) {
      this.touch.initiated = true
      this.touch.startX = ev.touches[0].pageX             // 触摸点
      this.touch.left = this.$refs.progress.clientWidth  // 目前进度
    },
    progressTouchMove(ev) {
      if (!this.touch.initiated) {
        return 
      }
      const deltaX = ev.touches[0].pageX - this.touch.startX  // 触摸距离
      const finalWidth = Math.max(0, this.touch.left + deltaX)  // 最终进度
      const offsetWidth = Math.min(finalWidth,  this.$refs.progressBar.clientWidth - 16)  // 不超过总长度
      this.setProgress(offsetWidth)
      this.progressTime()  //  为了滑动时能显示时间，不用 percentChange 是因为触发太多的东西
    },
    progressTouchEnd() {
      this.touch.initiated = false
      this.percentChange()
    },
    setProgress(offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style['transform'] = `translateX(${offsetWidth}px)` // 小球的移动
    },
    percentChange() {
      const barWidth = this.$refs.progressBar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      //this.$emit('percentChange', percent)
      this.bus.$emit('percentChange', percent)
    },
    progressTime() {
      const barWidth = this.$refs.progressBar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      this.bus.$emit('progressTime', percent)
    },
    progressClick(ev) {
      this.setProgress(ev.offsetX)  // 相对于元素的偏移量
      this.percentChange()
    },
    touchStatus() {        // 给normalPlayer的接口
      return this.touch.initiated
    }
  },
  watch: {
    percent(newVal) {
      if (newVal >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - 16   // clientWidth: width + padding
        const offsetWidth = newVal * barWidth
        this.setProgress(offsetWidth)
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


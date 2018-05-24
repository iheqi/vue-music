<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back">
        <i class="iconfont back-icon">&#xe60a;</i>
      </div>

      <div class="switches-wrapper">
        <switches @switch='switchItem' :currentIndex='currentIndex' :switches='switches'></switches>
      </div>

      <div class="play-btn">
        <i class="play-icon"></i>
      </div>

      <div class="list-wrapper">

      </div>
    </div>
  </transition>
</template>


<script>
import Switches from '@/components/switches/Switches'

export default {
  name: 'User',
  data () {
    return {
      currentIndex: 0,
      switches: [{name: '我喜欢的'}, {name: '最近听的'}]
    }
  },
  components: {
    Switches
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index
    }
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
</style>

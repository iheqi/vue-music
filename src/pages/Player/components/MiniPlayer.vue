<template>
  <div>
    <div class="mini-player">
      mini播放器
    </div>
  </div>
</template>
<script>
export default {
  name: 'MiniPlayer',
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 1.2rem
      background: $color-highlight-background
</style>

<template>
  <div class="middle">
    <div class="middle-l">
      <div class="cd-wrapper">
        <div class="cd">
          <img class="image" :src="currentSong.img">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Lyric',
  props: {
    currentSong: null
  },
  methods: {
    back() {

    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
    .middle
      position: fixed
      width: 100%
      top: 1.6rem
      bottom: 3.4rem
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            position: relative
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%
</style>

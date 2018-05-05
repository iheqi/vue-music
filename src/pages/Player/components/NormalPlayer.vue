<template>
  <transition name='normal'>
    <div class="normal-player">
      <div class="background">
        <img width="100%" height="100%" src="" alt="">
      </div>

      <div class="top">
        <player-header :currentSong='currentSong'></player-header>
      </div>

      <div>
        <lyric :currentSong='currentSong'></lyric>
      </div>
      
      <div class="bottom">
        <operators></operators>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import PlayerHeader from './PlayerHeader'
import Lyric from './Lyric'
import Operators from './Operators'

export default {
  name: 'NormalPlayer',

  computed: {
    ...mapGetters(['currentSong'])
  },
  components: {
    PlayerHeader,
    Lyric,
    Operators
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl';
    .normal-enter-active, .normal-leave-active
      transition : all .3s cubic-bezier(.86, .18, .82, 1.32)

    .normal-enter, .normal-leave-to
      opacity : 0
      transform : translateY(100px)

      
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        bottom : 0
        right : 0
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
</style>

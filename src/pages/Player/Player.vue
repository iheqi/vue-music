<template>
  <div class="player">
    <normal-player v-show="fullScreen"></normal-player>
    <mini-player v-show="!fullScreen"></mini-player>
  </div>
</template>

<script>
import NormalPlayer from './components/NormalPlayer'
import MiniPlayer from './components/MiniPlayer'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer
  },
  computed: {
    ...mapState(['fullScreen', 'playlist']),
  }
}
</script>

<style lang="stylus" scoped>

</style>

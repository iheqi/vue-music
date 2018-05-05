<template>
  <div class="operators">
    <div class="icon i-left">
      <i class="iconfont">&#xe649;</i>
    </div>
    <div class="icon i-left">
      <i class="iconfont">&#xe610;</i>
    </div>
    <div class="icon i-center">
      <i class="iconfont" v-html='ifPlaying' @click='togglePlay'></i>
    </div>
    <div class="icon i-right">
      <i class="iconfont">&#xe611;</i>
    </div>
    <div class="icon i-right">
      <i class="iconfont">&#xe612;</i>
    </div>
    
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from  'vuex'

export default {
  name: 'Operators',
  methods: {
    ...mapMutations(['setPlaying']),
    togglePlay () {
      this.setPlaying(!this.playing)
    },

  },
  computed: {
    ...mapState(['playing']),
    ifPlaying() {
      return this.playing ? '&#xe600;' : '&#xe63a;'
    }
  },

}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl';
  
    .operators
      position: absolute
      bottom: 50px
      width: 100%
      display: flex
      align-items: center
      .icon
        flex: 1
        color: $color-theme
        i
          font-size: .55rem
      .i-left
        text-align: right
      .i-center
        padding: 0 20px
        text-align: center
      .i-right
        text-align: left
        
</style>

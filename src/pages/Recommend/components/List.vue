<template>
  <div class="recommend-list" ref="wrapper">
    <div>
      <h1 class="list-title">热门歌单推荐</h1>

      <ul>
        <li 
          class="song-item" 
          v-for="disc of discList" 
          :key="disc.dissid"
          @click="selectItem(disc)"
        >
          <div class="icon">
            <img v-lazy="disc.imgurl" width="60" height="60">
          </div>

          <div class="text">
            <h2 class="author">{{disc.creator.name}}</h2>
            <p class="desc">{{disc.dissname}}</p>
          </div>
        </li>
      </ul>
      <div v-show="ifLoading">
          <loading></loading>
      </div>
    </div>
  </div>


</template>

<script>
import Loading from '@/components/loading/Loading'
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex' 

export default {
  name: 'RecommendList',
  props: {
    discList: Array,
  },
  components: {
    Loading
  },
  computed: {
    ifLoading () {
      return !this.discList.length
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      })
    }) 
    
  },
  methods: {
    selectItem(disc) {
      console.log(disc)
      this.setDisc(disc)
      this.$router.push('/disc/' + disc.dissid)
    },
    ...mapMutations(['setDisc'])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables.styl"
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .song-item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px    /* flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto */
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction : column
          flex : 1
          line-height : .4rems
          overflow: hidden
          font-size: $font-size-medium
          .author
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
            
</style>

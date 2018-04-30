<template>
  <div class="list-view" ref='wrapper'>
    <ul>
      <li v-for="singers of groups" :key="singers.letter" class="list-group">
        <h2 class="singers-title">{{singers.letter}}</h2>
        <ul>
          <li v-for="singer of singers.items" :key="singer.id" class="singer-item">
            <img class="singer-avatar" v-lazy="singer.avatar">
            <span class="singer-name">{{singer.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    
  </div>
</template>
<script>
import Bscroll from 'better-scroll'

export default {
  name: 'ListView',
  props: {
    groups: {
      type: Array,
      default: []
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper)
  }  
}
</script>
<style lang="stylus" scoped>
  @import "~styles/variables.styl"
    .list-view
      width: 100%
      height: 100%
      overflow: hidden
      background: $color-background
      .list-group
        padding-bottom: .6rem
        .singers-title
          height: .6rem
          line-height: .6rem
          padding-left: .4rem
          font-size: $font-size-small
          color: $color-text-l
          background: $color-highlight-background
        .singer-item
          display : flex
          align-items : center
          padding: .4rem 0 0 .6rem
          .singer-avatar
            width: 1rem
            height: 1rem
            border-radius: 50%
          .singer-name
            margin-left: .4rem
            color: $color-text-l
            font-size: $font-size-medium
</style>

<template>
  <div>
    <ul class="song-list">
      <li v-for="(song, i) of songs" :key="song.id" class="item" @click='openPlayer(song, i)'>
        <div class="rank" v-show="rank">
          <span :class="getRankClass(i)">
            {{ getRankText(i) }}
          </span>
        </div>
        <div class="content">
          <h2 class="song-name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SongList',
  props: {
    songs: Array,
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`
    },
    openPlayer(item, i) {
      this.$emit('openPlayer', item, i)
    },
    getRankClass(i) {
      if (i < 3) {
        return `icon icon${i}`
      } else {
        return 'text'
      }
    },
    getRankText(i) {
      if (i > 2) {
        return i + 1
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
@import '~styles/mixins'

  .song-list
    background : $color-background
    padding-bottom: 5.2rem  // 解决滚不到底部
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 1.28rem
      font-size: $font-size-medium
      margin-left : .6rem
      .rank
        width : .5rem
        height : .5rem
        margin-right : .6rem
        text-align : center
        .icon
          display : inline-block
          width: .5rem
          height : .5rem
          &.icon0
            background : url('~@/assets/imgs/first@2x.png')
            background-size : cover
          &.icon1
            background : url('~@/assets/imgs/second@2x.png')
            background-size : cover
          &.icon2
            background : url('~@/assets/imgs/third@2x.png')
            background-size : cover
        .text
          color : $color-theme
          font-size : $font-size-medium-x
      .content
        flex: 1
        line-height: .4rem
        overflow : hidden
        .name
          color: $color-text
          ellipsis()
        .desc
          margin-top: .1rem
          color: $color-text-d
          ellipsis()
</style>

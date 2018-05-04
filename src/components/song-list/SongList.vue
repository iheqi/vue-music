<template>
  <div>
    <ul class="song-list">
      <li v-for="(song, i) of songs" :key="song.id" class="item" @click='openPlayer(song, i)'>
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
  },
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`
    },
    openPlayer(item, i) {
      this.$emit('openPlayer', item, i)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .song-list
    background : $color-background
    padding-top : .4rem
    
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 1.28rem
      font-size: $font-size-medium
      margin-left : .6rem
      .content
        flex: 1
        line-height: .4rem
        .name
          color: $color-text
        .desc
          margin-top: .1rem
          color: $color-text-d
</style>

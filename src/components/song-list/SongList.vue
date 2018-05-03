<template>
  <div class="song-list">
    <ul>
      <li v-for="song of songs" :key="song.id" class="item">
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
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .song-list
    margin-top : .4rem
    background : $color-background    
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
          margin-top: 4px
          color: $color-text-d
</style>

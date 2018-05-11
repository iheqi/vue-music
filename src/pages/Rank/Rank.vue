<template>
  <div class="rank">
    <div class="toplist">
      rank
      <ul>
        <li class="item">
          <div class="icon">
            <img src="" width="100" height="100">
          </div>

          <ul class="songlist">
            <li class="song">
              <span></span>
              <span></span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getToplist } from '@/providers/rank.js'

export default {
  name: 'Rank',
  mounted() {
    getToplist().then((res) => {
      console.log(res)
    })
  }
}

</script>

<style lang="stylus" scoped>
  @import '~styles/variables'
  @import '~styles/mixins'
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 .4rem
        padding-top: .4rem
        height: 2rem
        .icon
          flex: 0 0 2rem
          width: 2rem
          height: 2rem
        .songlist
          flex: 1
          display: flex
          justify-content: center
          align-items : center
          padding: 0 .4rem
          height: 2rem
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            ellipsis()
            line-height: 26px

</style>


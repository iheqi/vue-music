<template>
    <div class="rank">
      <div class="toplist" ref="wrapper">
        <ul class="wrapper-content">
          <li class="item" v-for="item of topList" :key="item.id" @click="selectItem(item)">
            <div class="icon">
              <img src="" width="100" height="100" v-lazy='item.picUrl'>
            </div>

            <ul class="songlist">
              <li class="song" v-for="(song, i) of item.songList" :key="i">
                <span>{{i + 1}}</span>
                <span>{{song.songname}}-{{song.singername}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <router-view></router-view>
      <loading v-show="!topList.length"></loading>
    </div>
    
</template>
<script>
import { getTopList } from '@/providers/rank.js'
import Bscroll from 'better-scroll'
import Loading from '@/components/loading/Loading'
import { mapMutations } from 'vuex'

export default {
  name: 'Rank',
  data () {
    return {
      topList: []
    }
  },
  mounted() {
    this.getTopList()
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    getTopList() {
      getTopList().then((res) => {
        if (res.code === 0) {
          console.log(res.data)
          this.topList = res.data.topList
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        path: '/rank/' + item.id 
      })
      this.setTopList(item)
    },
    ...mapMutations(['setTopList'])
  },
  components: {
    Loading,
  },
}

</script>

<style lang="stylus" scoped>
  @import '~styles/variables'
  @import '~styles/mixins'
    .toplist
      width: 100%
      top: 1.76rem
      bottom: 0
      overflow: hidden
      .wrapper-content
        padding-bottom : 1.6rem
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
            flex-direction : column
            justify-content: center
            padding: 0 .4rem
            height: 2rem
            overflow: hidden
            background: $color-highlight-background
            color: $color-text-d
            font-size: $font-size-small
            .song
              ellipsis()
              line-height: .52rem

</style>


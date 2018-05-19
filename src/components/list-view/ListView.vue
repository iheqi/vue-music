<template>
  <div class="list-view" ref='wrapper'>
    <ul>
      <li v-for="singers of groups" :key="singers.letter" class="list-group"  :ref="singers.letter">
        <h2 class="singers-title">{{singers.letter}}</h2>
        <ul>
          <li 
            v-for="singer of singers.items" 
            :key="singer.id" 
            class="singer-item"
            @click="selectSinger(singer)"
          >
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
import { mapMutations } from 'vuex'

export default {
  name: 'ListView',
  props: {
    groups: {
      type: Array,
      default: []
    },
    letter: String
  },
  data () {
    return {
      listHeight: [],
    }
  },
  computed: {
    listHeightCopy () {
      return this.listHeight
    }
  },
  methods: {
    ...mapMutations(['setSinger']),
    selectSinger(singer) {
      this.$emit('select', singer)
      this.setSinger(singer)
    },
    calculateHeight() {
      const list = document.querySelectorAll('.list-group')
      // this.listHeight = []         // 离开后不会清空，导致重复推入，这里手动清空
      let height = 0
      this.listHeight.push(height)
      for (let li of list) {
        height += li.offsetHeight
        this.listHeight.push(height)
      }
      console.log(this.listHeight)
    },
    scrollAlpha() {

      let scrollTop = -this.scroll.y
      // 判断其滚动到哪一位置
      let list =  this.listHeight   
      for (let i = 0; i < list.length - 1; i++) {
        let height1 = list[i]
        let height2 = list[i + 1]
        if (scrollTop >= height1 && scrollTop < height2) {
          this.$emit('scrollList', i)      // 这样算有点慢，当滚动过快时不准确,所以再绑定一个滚动停止事件来调用
          console.log('i', i)
        }
      }
    },
  },
  /* activated () {
    setTimeout(() => {
      this.calculateHeight()
    }, 100)
       // mounted只有第一次才获取得到（），computed又获取不到dom
  }, */

  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
        probeType: 2
      })
      this.scroll.on('scroll', this.scrollAlpha)
      this.scroll.on('scrollEnd', this.scrollAlpha)
    })
    //  this.calculateHeight()
  },
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter][0]  // 因为获取v-for中的元素得到的会是一个元素数组，
        this.scroll.scrollToElement(element)        // 就像getElementsByTagName那样，所有用下标获到真正的元素
      }
    }
  },  
}
</script>
<style lang="stylus" scoped>
  @import "~styles/variables.styl"
    .list-view
      position : absolute
      top : 1.76rem
      bottom : 0
      left : 0
      right : 0
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

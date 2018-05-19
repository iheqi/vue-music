<template>
    <ul class="list" v-show="singers.length">
      <li class="item" v-for="item of letters" :key="item"
        @click='handleLetterClick'
        @touchstart='handleTouchStart'
        @touchmove='handleTouchMove'
        @touchend='handleTouchEnd'
        :ref="item"
        :class="{ active: item == selectLetter }"
      >
        {{item}}
      </li>
    </ul>
</template>
<script>
export default {
  name: 'Alphabet',
  props: {
    singers: {
      type: Array,
      default: []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null,
      selectLetter: (this.letters&&this.index) ? this.letters[this.index] : "热门"
    }
  },
  computed: {
    letters () {
      const letters = []
      for (let singer of this.singers) {
        letters.push(singer.letter)
      }
      return letters
    }
  },
  watch: {
    index () {
      this.selectLetter = this.letters[this.index]
    }
  },

  methods: {
    handleLetterClick (el) {
      let letter = el.target.innerText 
      this.selectLetter = letter
      this.$emit('clickLetter', letter)
    },
    // touch事件系列（p399）
    handleTouchStart () {
      this.touchStatus = true
    },
    // 这里画个图就明了
    handleTouchMove (ev) {
      if (this.touchStatus) {                          // 设置在这里才能处理事件
        if (this.timer) {                              // 函数节流
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // const startY = this.$refs['A'][0].offsetTop    // offsetTop（p321）第一个字母的偏移量
          const touchY = ev.touches[0].clientY - 88           // clientY相对窗口顶部的高度（p370），减去头部的高度
          const index = Math.floor((touchY - this.startY) / 20)         // 代表第几个字母
          
          if (index >= 0 && index <= this.letters.length) {      // 边界处理，再触发
            this.$emit('clickLetter', this.letters[index])
            this.selectLetter = this.letters[index]
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false      
    },

  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl';
  .list
    position : fixed
    top : 50%
    transform : translateY(-50%)
    right : 0
    display : flex
    flex-direction : column
    justify-content : center
    width : .4rem
    background: $color-background-d
    font-family: Helvetica
    border-radius: .2rem
    padding: .1rem 0
    .item
      text-align : center
      height : $font-size-small
      color: $color-text-l
      font-size: $font-size-small
      overflow : hidden
      margin: .08rem 0
    .active
      color : $color-theme
</style>

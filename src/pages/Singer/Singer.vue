<template>
  <div>
    <list-view
      :groups='singers'
      :letter='letter'
      @select="selectSinger"
      @scrollList="handleScroll"
      ref="listView"
    ></list-view>
    <alphabet
      :singers='singers'
      @clickLetter='handleLetterClick'
      :index='index'
    ></alphabet>
    <router-view></router-view>
  </div>

</template>
<script>
import { getSingerList, normalizeSinger } from '@/providers/singer'
import ListView from '@/components/list-view/ListView'
import Alphabet from './components/Alphabet'
import { mapMutations } from 'vuex'

export default {
  name: 'Singer',
  data() {
    return {
      singers: [],
      letter: '', // 传到list
      index: 0
    }
  },
  components: {
    ListView,
    Alphabet
  },

  methods: {
    handleLetterClick(letter) {
      this.letter = letter
    },
    getSingerData() {
      getSingerList().then((res) => {
        if (res.code === 0) {
          this.singers = res.data.list
        }
        this.singers = normalizeSinger(res.data.list)
        this.listViewInit()
      })
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handleScroll(i) {
      this.index = i
    },
    ...mapMutations(['setSinger']),
    listViewInit() { // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      this.$nextTick(() => { // 这才是正确的用法
        let listView = this.$refs.listView
        listView.calculateHeight()
      })
    }
  },
  mounted() {
    this.getSingerData()
  }
}
</script>

<style lang="stylus" scoped>

</style>

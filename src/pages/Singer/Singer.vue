<template>
  <div>
    <list-view
      :groups='singers'
      :letter='letter' 
      @select="selectSinger"
      @scrollList="handleScroll"
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
import SingerModel from '@/providers/SingerModel'
import ListView from '@/components/list-view/ListView'
import Alphabet from './components/Alphabet'
import { mapMutations } from 'vuex'

export default {
  name: 'Singer',
  data () {
    return {
      singers: [],
      letter: '',        // 传到list
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
      })
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handleScroll(i) {
      console.log("singer", i)
      this.index = i
    },
    ...mapMutations(['setSinger'])
  },
  mounted () {
    this.getSingerData()
  }
}
</script>

<style lang="stylus" scoped>

</style>


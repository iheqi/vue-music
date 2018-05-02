<template>
  <div>
    <list-view :groups='singers' :letter='letter' @select="selectSinger"></list-view>
    <alphabet :singers='singers' @clickLetter='handleLetterClick'></alphabet>
    <router-view></router-view>
  </div>
 
</template>
<script>
import { getSingerList } from '@/providers/singer'
import SingerModel from '@/providers/SingerModel'
import ListView from '@/components/list-view/ListView'
import Alphabet from './components/Alphabet'
import { mapMutations } from 'vuex'

export default {
  name: 'Singer',
  data () {
    return {
      singers: [],
      letter: ''        // 传到list
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
        this.singers = this.normalizeSinger(res.data.list)
      })
    },
    normalizeSinger(list) {
      let singers = {
        hotSingers: {
          letter: '热门',
          items: []
        }
      }
        
      list.forEach((item, index) => {
        if (index > 0 && index < 10) {
          singers.hotSingers.items.push(new SingerModel({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!singers[key]) {
          singers[key] = {
            letter: key,
            items: []
          }
        }

        singers[key].items.push(new SingerModel({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })

      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in singers) {
        let val = singers[key]
        if (val.letter.match(/[a-zA-Z]/g)) {
          ret.push(val)
        } else if (val.letter === '热门') {
            hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.letter.charCodeAt(0) - b.letter.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
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


import { mapActions, mapState, mapMutations } from 'vuex'


export const playMixin = {
  computed: {
    iconMode() {
      let iconMode = '&#xe649;'
      switch (this.mode) {
        case 1: 
          iconMode = '&#xe649;'
          break
        case 2:
          iconMode = '&#xe721;'
          break
        case 3:
          iconMode = '&#xe613;'
      }
      return iconMode
    },
  },
}

export const searchMixin = {
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapState(['searchHistory'])
  },
  methods: {
    
    ...mapActions(['setSearchHistory', 'deleteSearchHistory']),
    queryChange(query) {
      this.query = query
    },
    saveHistory() {
      this.setSearchHistory(this.query)
    },
    deleteOne(query) {
      this.deleteSearchHistory(query)
    },
    addQuery(key) {                        // 点击热门搜索的关键词时
      this.$refs.searchBox.setQuery(key)   // 组件上的方法即公共接口，可以这样调用子组件方法（组件一定要获取对啊，fuck）
    },                                     // 子组件调用父组件则是：this.$parent
  }

}
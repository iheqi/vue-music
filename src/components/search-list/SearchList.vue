<template>
  <div class="search-list" v-show="searches && searches.length">
    <transition-group name="list" tag="ul">
      <li class="search-item" v-for="item in searches" :key="item" @click="selectItem(item)">
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="iconfont delete">&#xe620;</i>
        </span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'SearchList',
  props: {
    searches: {
        type: Array,
        default() {
          return [1,2,3]
        }
    }
  },
  methods: {
    selectItem(item) {             // 派发事件，不做过多的业务逻辑
      this.$emit('select', item)
    },
    deleteOne(item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"

  .search-list
    .search-item
      display : flex
      align-items : center
      height : .8rem
      overflow : hidden
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
        text-indent : .1rem
      .icon
        padding : .1rem
        .delete
          font-size: $font-size-medium
          color: $color-text-d
</style>

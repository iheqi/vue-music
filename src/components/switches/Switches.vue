<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item, index) of switches"
      :key="index"
      :class="{'active': index === currentIndex}"
      @click="switchItem(index)"
    >
      <span>
        {{item.name}}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default() {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/variables'
  .switches
    display: flex
    align-items: center
    width: 4.8rem
    margin: 0 auto
    border: 1px solid $color-highlight-background
    border-radius: .1rem
    .switch-item
      flex: 1
      padding: 8px
      text-align: center
      font-size: $font-size-medium
      color: $color-text-d
      &.active
        background: $color-highlight-background
        color: $color-text

</style>

<template>
  <div class="m-header">
      <div class="icon"></div>
      <h1 class="text">Chicken Music</h1>
      <router-link to="/user" tag="div" class="user">
        <i class="iconfont user-icon">&#xe72a;</i>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'MHeader'
}
</script>
<style lang="stylus" scoped>
  @import '~styles/variables.styl'
      .m-header
        height : .88rem
        text-align : center
        color : $color-theme
        .icon
          width : .6rem
          height : .6rem
          display : inline-block
          background : url('~@/assets/imgs/logo@2x.png')
          background-size : .6rem .6rem
          margin-right : .18rem
          margin-top : .12rem
        .text
          display : inline-block
          font-size : $font-size-large
          vertical-align : top
          line-height : .88rem
        .user
          position : absolute
          top : 0
          right : 0
          .user-icon
            display : block
            padding : .2rem
            font-size : .5rem

</style>

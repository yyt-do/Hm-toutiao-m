<template>
  <div id="app">
    <!-- 一级路由出口
    keep-alive仅对该路由出口渲染的组件有效 -->
    <!-- 组件缓存 -->
    <keep-alive :include="cachPage">
    <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{}
  },
  computed:{
    ...mapState(['cachPage'])
  }

}
</script>
<style lang="less">

</style>

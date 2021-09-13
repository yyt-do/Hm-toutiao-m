<template>
  <div class="search_history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories',[])">全部删除</span>
        <span style="margin-left:10px" @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell
    v-for="(history,index) in searchHistories"
    :key="index"
    :title="history"
    @click="onDelete(index,history)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearcHistory',
  props:{
    searchHistories:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      isDeleteShow:false,
    }
  },
  methods: {
    onDelete(index,history){
      // 删除状态
      if(this.isDeleteShow){
        return this.searchHistories.splice(index,1)
      }
      // 非删除状态,触发搜索方法
      this.$emit('search',history)
    }
  },
}
</script>

<style scoped>
</style>

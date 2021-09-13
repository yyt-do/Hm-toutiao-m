<template>
  <div class="search_suggestion">
    <van-cell 
    v-for="(item,index) in suggestion" 
    :key="index"  
    icon="search"
    @click="$emit('search',item)">
      <div slot="title" v-html="hightlight(item)"></div>
    </van-cell>
    
  </div>
</template>

<script>
import {getSearchSuggest} from '@/api/search.js'
// 引入防抖节流模块
import {debounce} from 'lodash'
export default {
  props:{
    searchText:{
      type:String,
      required:true
    }
  },
  name:'SearchSuggestion',
  data() {
    return {
      suggestion:[]
    }
  },
  watch:{
    // 属性名：要监视的数据名称
    // 完整写法
    // 数据发生变化执行handle函数
    searchText:{
      // 使用防抖函数控制申请次数，提高性能
       handler:debounce( async function(){
        const res = await getSearchSuggest(this.searchText)
        this.suggestion = res.data.data.options
        console.log(res);
      },300),
      // 改回调会在监听开始时立即调用
      immediate:true
    }
  },
  methods: {
    hightlight(str){
      // console.log(str);
      // RegExp 正则构造函数
      // 参数1：字符串
      // 参数2：匹配表达式
      // 返回值正则对象
     return  str.replace(new RegExp(this.searchText,'gi'),
     `<span style="color:red">${this.searchText}</span>`)
    }
  },
}
</script>

<style scoped></style>

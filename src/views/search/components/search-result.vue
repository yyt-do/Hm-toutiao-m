<template>
  <div class="search_result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      perPage:10,  // 每页大小
      page:1 //页码
    }
  },
  methods: {
   async onLoad() {
      // 请求数据
      const res = await getSearchResult({
        page:this.page,
        per_page:this.perPage,
        q:this.searchText
      })
      console.log(res);
      this.list.push(...res.data.data.results)
      // 关闭加载
      this.loading = false
     
      //数据放到本地
      // 判断是否还有数据
      // 如果有就加载下一页数据，没有就把fininsh设置为true，关闭加载更多
      if(res.data.data.results.length){
        this.page++
      }else{
       this.finished = true
      }
    }
  }
}
</script>

<style scoped></style>

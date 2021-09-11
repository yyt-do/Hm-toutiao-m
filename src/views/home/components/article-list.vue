<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="success_text"
      :success-duration="500"
      v-model="ispulldownloading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        />
        <!-- <van-cell
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '../../../api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
      ArticleItem
    },
  // 接收父组件的传值
  props: {
    channels: {
      type: Object,
      required: true
    },
    
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null, //获取下一页数据的时间戳
      ispulldownloading: false, // 控制下啦刷新状态
      success_text: ''
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 获取数据
      const res = await getArticles({
        channel_id: this.channels.id,
        timestamp: Date.now() || this.timestamp,
        with_top: 1
      })
      this.articles.push(...res.data.data.results)
      this.loading = false // 设置本次的加载状态结束，他才可以判断是否需要加载下一次，否则就会一直卡在这里
      if (res.data.data.results.length) {
        this.timestamp = res.data.data.pre_timestamp
      }
    },
    async onRefresh() {
      const res = await getArticles({
        channel_id: this.channels.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.articles.unshift(...res.data.data.results) //往数组头部追加数据
      this.success_text = `成功加载${res.data.data.results.length}条数据`
      this.ispulldownloading = false // 数据更新成功，关闭加载
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow: auto;
}
</style>

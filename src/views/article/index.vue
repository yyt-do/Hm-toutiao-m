<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 标题 -->
    <h1 class="title">{{article.title}}</h1>
    <van-cell  center class="user_info">
      <div slot="title" class="name">{{article.aut_name}}</div>
      <van-image
        slot="icon"
        round
        fit="cover"
        :src="article.aut_photo"
        class="avatar"
      />
      <div slot="label" class="public_date">{{article.pubdate|relativeTime}}</div>
      <van-button 
      round
      size="small"
      :type="article.is_followed?'default':'info'"
      class="follow_btn"
      :icon="article.is_followed?'':'plus'"
      >{{article.is_followed?'已关注':'关注'}}</van-button>
    </van-cell>
  <!-- 正文 -->
  <div class="markdown-body" v-html="article.content">
  </div>
  </div>
</template>

<script>
import day from '@/utils/day.js'
import {getArticleByID} from '@/api/article'
// 在组件中获取动态路由参数:
// 方式一: this.$route.params.xxxx
// 方式二:props传参,推荐使用
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type:[String,Number,Object],
      required: true
    }
  },
  data() {
    return {
      article:{}, // 文章详情
    }
  },
  created(){
    this.loadArticle()
  },
  methods: {
    async loadArticle(){
      const res = await getArticleByID(this.articleId)
      this.article = res.data.data
      console.log(this.article);
    }
  },
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  padding: 14px;
  color: #3a3a33;
  background-color: #fff;
  margin: 0;
}
.user_info{
.name{
  font-size: 11px;
  color: #3a3a33;
}
.public_date{
  font-size: 11px;
  color: #b4b4b4;
}
.avatar{
  width: 35px;
  height: 35px;
  margin-right: 8px;
}
.follow_btn{
  width: 85px;
  height: 29px;
}
}
.markdown-body{
  padding: 14px;
  background-color: #fff;
}
</style>

<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 标题 -->
    <div class="article_wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center class="user_info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          slot="icon"
          round
          fit="cover"
          :src="article.aut_photo"
          class="avatar"
        />
        <div slot="label" class="public_date">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button
          round
          size="small"
          :type="article.is_followed ? 'default' : 'info'"
          class="follow_btn"
          :icon="article.is_followed ? '' : 'plus'"
          :loading="isFollowloading"
          @click="onFollow(article.aut_id)"
          >{{ article.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>
      <!-- 正文 -->
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>
      <!-- 评论列表 -->
      <commnet-list
        :source="articleId"
        :list="Commnetlist"
        :isReplayShow="isReplayShow"
        @update-total-count="totalCommnetCount = $event"
        @repaly-click="onReplayClick"
      ></commnet-list>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom_box">
      <van-button
        class="comment_btn"
        type="default"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon
        name="comment-o"
        :badge="totalCommnetCount"
        color="#777"
      ></van-icon>
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? '#ff8344' : '#777'"
        @click="onCollect()"
      ></van-icon>
      <van-icon
        :name="article.attitude == 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude == 1 ? 'red' : '#777'"
      ></van-icon>
      <van-icon name="share" color="#777"></van-icon>
    </div>
    <!-- 发布评论-->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <post-comment
        :target="articleId"
        @post-success="onpostsuccess"
      ></post-comment>
    </van-popup>
    <!-- 评论回复 -->
    <van-popup v-model="isReplayShow" position="bottom">
      <!-- 这里使用v-if是为了让组件随着弹出层的显示进行渲染和销毁，
    防止加载过的组件不重新渲染导致数据不会重新渲染的问题 -->
      <comment-repaly
        v-if="isReplayShow"
        :replaycomment="replaycomment"
        @close="isReplayShow = $event"
        :article-id="articleId"
      ></comment-repaly>
    </van-popup>
  </div>
</template>

<script>
import CommentRepaly from './components/comment-replay.vue'
import PostComment from './components/post-comment.vue'
import CommnetList from './components/comment-list.vue'
import day from '@/utils/day.js'
import { ImagePreview } from 'vant'
import { getArticleByID, addCollect, deleteCollect } from '@/api/article'
import { addFlow, deleteFlow } from '@/api/user'
// 在组件中获取动态路由参数:
// 方式一: this.$route.params.xxxx
// 方式二:props传参,推荐使用
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommnetList,
    PostComment,
    CommentRepaly
  },
  data() {
    return {
      article: {}, // 文章详情
      isFollowloading: false, // 添加loading 防止慢速网络用户多次触发
      isPostShow: false, //评论弹出层
      Commnetlist: [], // 评论数据列表
      totalCommnetCount: '', //评论数量
      isReplayShow: false, //恢复弹出层
      replaycomment: [] //回复评论数组
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      const res = await getArticleByID(this.articleId)
      this.article = res.data.data
      console.log(this.article)
      const articleContent = this.$refs['article-content']
      // 数据改变影响视图更新(DOM数据)不是立即的
      // 所以如果需要在修改数据之后马上操作该数据影响的试图DOM,需要把这个代码放到
      // this.$nextTick中
      this.$nextTick(() => {
        this.HandlepereviewImage()
      })
    },
    // 处理图片预览
    HandlepereviewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        // 注册点击事件,调用预览方法
        img.onclick = function() {
          ImagePreview({
            images: imgPaths, // 预览图片路径类表
            startPosition: index //起始图片位置
          })
        }
      })
    },
    // 关注
    async onFollow(id) {
      //  console.log(123);
      this.isFollowloading = true //开启loading
      // 已关注,取消关注
      if (this.article.is_followed) {
        await deleteFlow(id)
        this.article.is_followed = false
      } else {
        // 没有关注,添加关注
        const res = await addFlow(id)
        console.log(res)
        this.article.is_followed = true
      }
      this.isFollowloading = false //开启loading
      // this.article.is_followed = !this.article.is_followed
    },
    // 收藏
    async onCollect() {
      //  console.log(123);
      // this.isFollowloading = true //开启loading
      // 已收藏,取消收藏
      if (this.article.is_collected) {
        const res = await deleteCollect(this.articleId)
        //  console.log(res);
        this.article.is_collected = false
      } else {
        // 没有收藏,添加收藏
        const res = await addCollect(this.articleId)
        console.log(res)
        this.article.is_collected = true
      }
      this.$toast.success(`${this.article.is_collected ? '成功' : '取消'}收藏`)
      // this.isFollowloading = false //开启loading
      // this.article.is_followed = !this.article.is_followed
    },
    // 接收评论信息
    onpostsuccess(data) {
      // console.log(data);
      this.Commnetlist.unshift(data)
      this.isPostShow = false
      this.totalCommnetCount++
    },
    onReplayClick(comment) {
      console.log(comment)
      this.replaycomment = comment
      this.isReplayShow = true
    }
  }
}
</script>

<style scoped lang="less">
.article_wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 45px;
  overflow-y: auto;
}
.title {
  font-size: 20px;
  padding: 14px;
  color: #3a3a33;
  background-color: #fff;
  margin: 0;
}
.user_info {
  .name {
    font-size: 11px;
    color: #3a3a33;
  }
  .public_date {
    font-size: 11px;
    color: #b4b4b4;
  }
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .follow_btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
// 底部区域
.article-bottom_box {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-top: 1px solid #d8d8d8;
}
.comment_btn {
  width: 150px;
}
</style>

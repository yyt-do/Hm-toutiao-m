<template>
  <div class="comment_repaly">
    <van-nav-bar
      class="repaly_bar"
      :title="replaycomment.reply_count + '条回复'"
    >
      <van-icon 
      slot="left" 
      name="close" 
      style="color:#000"
      @click="$emit('close',false)"
      ></van-icon>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="replaycomment"> </comment-item>
    <!-- 所有评论回复 -->
   <van-cell title="所有回复"/>
      <!-- 评论回复列表 -->
    <commnet-list 
    :source="replaycomment.com_id"
    type="c"
    :list="commnelist"
    ></commnet-list>
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
    </div>
    <!-- 发布回复 -->
       <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
    <post-comment
        :target="replaycomment.com_id"
        :article-id="articleId"
        @post-success="onsuccess"
      ></post-comment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommnetList from './comment-list.vue'
import PostComment from './post-comment.vue'
export default {
  name: 'CommentRepaly',
  components: {
    CommentItem,
    CommnetList,
    PostComment
  },
  props: {
    replaycomment: {
      type: Object,
      required: true
    },
      articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      isPostShow:false,
      commnelist:[] // 评论的评论类表
    }
  },
  methods: {
    onsuccess(comment){
      // 将发布成功的评论放到评论类表顶部
      this.commnelist.unshift(comment)
      // 更新评论数量
      this.replaycomment.reply_count++
      // 关闭弹出层
      this.isPostShow = false
    }
  },
}
</script>

<style scoped lang="less">
.comment_repaly {
  .repaly_bar {
    color: #000;
    background-color: #fff;
    /deep/ .van-nav-bar__content {
      background-color: #fff;
    }
    /deep/ .van-icon {
      color: #000;
    }
    /deep/ .van-nav-bar__title {
      color: #000;
    }
  }
  .comment_btn{
    width: 100%;
    height: 40px;
  }
}
</style>

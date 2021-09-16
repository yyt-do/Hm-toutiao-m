<template>
  <div class="comment_item_container">
    <van-cell class="comment_item" title="123">
      <van-image
        class="avater"
        fit="cover"
        round
        slot="icon"
        :src="comment.aut_photo"
      />
      <div slot="title">
        <div class="title_wrap">
          <div class="name">{{ comment.aut_name }}</div>
          <div class="like_wrap">
            <van-icon
              :name="comment.is_liking ? 'good-job' : 'good-job-o'"
              class="like_icon"
              :class="{ liked: comment.is_liking }"
            ></van-icon>
            <span class="like_num">{{ comment.like_count }}</span>
          </div>
        </div>
        <div class="content">{{ comment.content }}</div>
        <div style="display:flex">
          <span class="pubdate">{{ comment.pubdate | dateTime }}</span>
          <van-button 
          class="reply_btn" 
          round size="mini" 
          @click="$emit('replay-click',comment)"
            >{{ comment.reply_count }}回复</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: [Number, String, Object],
      required: true
    },
    // isReplayShow:{
    //    type: Boolean,
    //   required: true
    // }
  },
  data() {
    return {}
  },
  methods: {
   
  },
}
</script>

<style scoped lang="less">
.avater {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}
.name {
  font-size: 14px;
  color: #406599;
}
.content {
  font-size: 16px;
  color: #222;
}
.pubdate {
  font-size: 10px;
}
.title_wrap {
  display: flex;
  justify-content: space-between;
}
.reply_btn {
  margin-left: 8px;
}
.liked{
  color:tomato
}
</style>

<template>
  <div class="post_comment">
    <van-field
      v-model.trim="message"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button 
    type="default" 
    size="mini" 
    class="post_btn" 
    @click="onPost"
    :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComments } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    // 发布评论
    async onPost() {
      this.$toast.loading({
        message:'发布中',
        fobidClick:true
      })
      const res = await addComments({
        target: this.target,
        content: this.message,
        art_id: this.articleId ? this.articleId.toString():null 
      })
      console.log(res);
      this.$emit('post-success',res.data.data.new_obj)
      this.$toast.success('发布成功')
      this.message= ''
    }
  }
}
</script>

<style scoped lang="less">
.post_comment {
  display: flex;
  align-items: center;
  padding: 14px;
  .post_btn {
    width: 40px;
  }
}
</style>

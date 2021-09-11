<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type == 3" class="cover-wrap">
        <div class="cover-wrap-item" v-for="(img, index) in article.cover.images"
            :key="index">
          <van-image
            width="116"
            height="73"
            fit="cover"
            :src="img"
          ></van-image>
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate|relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type == 1"
      fit="cover"
      slot="default"
      :src="article.cover.images[0]"
      class="right_cover"
    />
  </van-cell>
</template>

<script>
import day from '@/utils/day.js'
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #333339;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 20px;
  }
  .right_cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-item{
      flex: 1;
      height: 73px;
      //排除最后一个元素的cover-wrap-item ,&表示cover-wrap-item
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item{
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap{
    font-size: 12px;
    color: #b4b4b4;
    span{
      margin-right: 10px;
    }
  }
  
}
</style>

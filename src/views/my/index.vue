<template>
  <div>
    <van-cell-group>
  <van-cell title="单元格" value="内容" center>
  <van-image
  width="50"
  height="50"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
  round
  fit="cover"
  slot="icon"
/>
<div slot="title">昵称</div>
<van-button>编辑资料</van-button>
  </van-cell>
  <van-grid>
  <van-grid-item text="文字">
    <div slot="text">
      <div class="span">123</div>
      <div class="text">关注</div>
    </div>
  </van-grid-item>
  <van-grid-item  text="文字">
    <div slot="text">
      <div class="span">123</div>
      <div class="text">关注</div>
    </div>
  </van-grid-item>
  <van-grid-item  text="文字">
    <div slot="text">
      <div class="span">123</div>
      <div class="text">关注</div>
    </div>
  </van-grid-item>
  <van-grid-item  text="文字">
    <div slot="text">
      <div class="span">123</div>
      <div class="text">关注</div>
    </div>
  </van-grid-item>
</van-grid>
</van-cell-group>
<van-grid :column-num="2">
  <van-grid-item icon="star-o" text="文字" />
  <van-grid-item icon="browsing-history-o" text="文字" />
</van-grid>
<van-cell title="消息通知" is-link to="/" />
<van-cell title="小智同学" is-link to="" />
<van-cell title="退出登录" to=""  class="out_login"/>
  </div>
</template>

<script>
export default {
  name: 'myindex',
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
.out_login{
  text-align: center;
}
</style>

<template>
  <div class="my_container">
    <van-cell-group class="my_info">
      <van-cell
        title="单元格"
        value="内容"
        center
        class="base_info"
        :border="false"
      >
        <van-image
          class="avatar"
          width="50"
          height="50"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          round
          fit="cover"
          slot="icon"
        />
        <div slot="title" class="name">昵称</div>
        <van-button class="update-btn" round size="mini">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data_info">
        <van-grid-item text="文字" class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data_info_item">
          <div slot="text" class="text_wrap">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-grid 
    :column-num="2"
    class="nav_grid"
    >
      <van-grid-item 
      class="nav_grid_item"
      icon-prefix="toutiao" 
      icon="shoucang" 
      text="收藏" />
      <van-grid-item
      class="nav_grid_item"
      icon-prefix="toutiao" 
      icon="lishi" 
      text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="" />
    <van-cell title="退出登录" to="" class="out_login" />
  </div>
</template>

<script>
export default {
  name: 'myindex',
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.out_login {
  text-align: center;
}
.my_container {
  .my_info {
    background: url('./banner.png') no-repeat;
    .base_info {
      background-color: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      // padding: 38px auto 11px;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        font-size: 10px;
        color: #666;
        height: 16px;
      }
    }
    .data_info {
      .data_info_item {
        height: 65px;
        color: #fff;
        .text_wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .nav_grid{
     .nav_grid_item{
       height: 70px;
     }
  }
}
</style>

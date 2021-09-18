<template>
  <div class="my_container">
    <!-- 已登录 -->
    <van-cell-group class="my_info" v-if="user">
      <van-cell
        center
        class="base_info"
        :border="false"
      >
        <van-image
          class="avatar"
          width="50"
          height="50"
          :src="currentUser.photo"
          round
          fit="cover"
          slot="icon"
        />
        <div slot="title" class="name">{{currentUser.name}}</div>
        <van-button class="update-btn" round size="mini" @click="$router.push('/user/profile')">编辑资料</van-button>
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
    <!-- 未登录 -->
    <div class="not-login" v-else>
      <div class="mobile" @click="lgout"></div>
      <div class="text">点击登录</div>
    </div>
    <van-grid :column-num="2" class="nav_grid mb-4">
      <van-grid-item
        class="nav_grid_item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav_grid_item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" class="mb-4" />
    <van-cell title="小智同学" is-link to="" class="mb-4" />
    <van-cell
      title="退出登录"
      class="out_login"
      v-if="user"
      @click="onlogin"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import{getcurrentUser} from '../../api/user'
export default {
  name: 'myindex',
  data() {
    return {
      currentUser:''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created(){
    this.loadCurrentUser()
  },
  methods: {
    // 获取登录用户信息
    async loadCurrentUser(){
    const res = await getcurrentUser()
    console.log(res);
    this.currentUser =res.data.data
    },
    // 用户退出提示框
    onlogin() {
      this.$dialog.confirm({
        title: '退出提示',
        message: '是否确认退出'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser',null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 用户登录
    lgout(){
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.out_login {
  text-align: center;
  color: #f07b53;
}
.mb-4 {
  margin-bottom: 4px;
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
  .nav_grid {
    .nav_grid_item {
      height: 70px;
    }
  }
  // 未登录
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url('./banner.png') no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    .mobile {
      background: url('./mobile.png') no-repeat;
      background-size: cover;
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>

<template>
  <div class="home-container">
    <!-- 搜索导航栏 -->
    <van-nav-bar>
      <van-button
        slot="title"
        icon="search"
        type="info"
        round
        class="search_btn"
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 文章频道类表 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        :title="item.name"
        v-for="(item, index) in channels"
        :key="index"
        class="tab-item"
      >
        <article-list :channels="item"></article-list>
      </van-tab>
      <!-- 汉堡按钮定位把列表最后的位置给挡住了，解决办法就是在最后添加一个元素 -->
      <div slot="nav-right" style="width:23px; flex-shrink:0"></div>
      <div slot="nav-right" class="wap-nav-wrap">
        <van-icon name="wap-nav" @click="isChanenlEidtShow = true"></van-icon>
      </div>
    </van-tabs>
    <!-- 弹出面板 -->
    <van-popup
      v-model="isChanenlEidtShow"
      position="bottom"
      class="chanenl-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height:100%"
    >
    <channel-edit 
    :user-channels="channels"
    @close = "isChanenlEidtShow = false"
    @update-active="active = $event"
    :active="active"
    ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue' 
import { mapState } from 'vuex'
import {getItem} from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      isChanenlEidtShow: false, //是否展示弹出层
      active: 0,
      channels: ''
    }
  },
  created() {
    this.loadUserChanel()
  },
   computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadUserChanel() {
      // 登录
      if(this.user){
    const res = await getUserChannels()
      console.log(res)
      this.channels = res.data.data.channels
      }else{
        // 未登录
          const localChannels = getItem('user-channels')
        if (localChannels) {
          // 使用本地存储的频道列表
          this.channels = localChannels
        } else {
          // 没有就使用默认推荐的频道列表
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        }
      }
  
    },
    // onupdateActive(index){
    //   console.log(index);
    //   this.active = index
    // }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search_btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
  }
  // // 弹出层css
  // .chanenl-edit-popup{
  //   height: 100%;
  // }
  .wap-nav-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 0;
    height: 43px;
    width: 33px;
    background-color: #fff;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
    &:before {
      content: '';
      width: 1px;
      height: 43px;
      background: url('./line.png') no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
.channel-tabs {
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    width: 15px !important;
    height: 3px;
    background-color: #3196fa;
    bottom: 20px;
  }
}
</style>

<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title" center :border="false" class="channel-title">
        我的频道
      </div>
      <van-button type="danger" plain round size="mini" @click="isedit">
        {{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        :class="{ isactive: index == active }"
        :icon="isEdit && index != 0 ? 'clear' : ''"
        @click="onUserChannelClick(index,channel)"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" center :border="false" class="channel-title">
        频道推荐
      </div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { 
  getAllChannels, 
  AddChannels, 
  DeleteChannels 
  } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allchannels: [], //所有频道类表
      isEdit: false // 图标的显示与隐藏
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道
    recommendChannels() {
      // 所有频道-已有频道
      // filter 方法：根据方法返回的布尔值来返回数组
      return this.allchannels.filter(channel => {
        //判断channel是否属于用户频道
        return !this.userChannels.find(userChannel => {
          //满足条件
          return userChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    async loadAllChannels() {
      const res = await getAllChannels()
      this.allchannels = res.data.data.channels
      //  console.log(this.allchannels);
    },
    // 添加频道
    async onAdd(channel) {
      this.userChannels.push(channel)
      if (this.user) {
        const res = await AddChannels({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
        console.log(res)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    // 编辑频道
    isedit() {
      this.isEdit = !this.isEdit
    },
    onUserChannelClick(index,channel) {
      if (this.isEdit && index != 0) {
        // 编辑状态
        this.deleteChannel(index,channel)
      } else {
        // 非编辑状态
        this.switchChannel(index)
      }
    },
    async deleteChannel(index,channel) {
      console.log(channel)
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        console.log(channel.id);
        const res = await DeleteChannels(channel.id)
        console.log(res)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel(index) {
      // console.log('切换')
      this.$emit('update-active', index)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
}
.channel-title {
  font-size: 16px;
  color: #333;
}
.grid-item {
  width: 80px;
  height: 43px;
  // background-color: #f4f5f6;
  /deep/.van-grid-item__content {
    font-size: 14px;
    color: #222;
    border-radius: 10px;
    background-color: #f4f5f6;
  }
  /deep/.van-grid-item__content--surround::after {
    border-width: 0;
  }
}
/deep/.van-grid-item__content {
  position: relative;
  .van-grid-item__icon {
    position: absolute;
    top: -10px;
    right: -5px;
    font-size: 18px;
    color: #ccc;
  }
  .van-grid-item__text {
    margin-top: 0 !important;
  }
}
.isactive {
  /deep/.van-grid-item__text {
    color: red;
  }
}
</style>

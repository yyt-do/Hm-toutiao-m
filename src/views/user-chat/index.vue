<template>
  <div class="user-chat">
    <!-- 头部导航 -->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" />
    <!-- 消息列表 -->
    <van-cell-group class="message_wrapper" ref="msg-list">
      <van-cell :title="item.msg" v-for="(item, index) in msg" :key="index" />
    </van-cell-group>
    <!-- 消息发送录入模块 -->
    <van-cell-group class="send_mes_wrap">
      <van-field v-model="message" placeholder="请输入消息" />
      <van-button type="info" size="small" class="send_btn" @click="onSend"
        >发送</van-button
      >
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'userChat',
  data() {
    return {
      message: '',
      scoket: null, // websocket对象
      msg: getItem('chat') || [] //消息列表
    }
  },
  created() {
    // 建立连接
    const socket = io('http://118.24.62.36:8888')
    this.socket = socket
    socket.on('connect', function() {
      console.log('连接成功')
    })
    socket.on('disconnect', function() {
      console.log('断开连接')
    })
    // 接收消息
    socket.on('message', data => {
      // console.log(data)
      this.msg.push(data)
    })
    // 发送消息
    // soket.emit('消息类型','内容')
    // 接收消息
    // socket.on('消息类型',function(data){})
    // this.scrollBottom()
  },
  mounted() {
    this.scrollBottom()
  },
  watch: {
    message() {
      setItem('chat', this.msg)
      // 如果在操作数据之后要操作数据影响的DOM,需要把相关方法放进this.$nextTick(()=>{}
       // 数据改变影响视图更新不是立即的
      this.$nextTick(()=>{
        this.scrollBottom()
      })
    }
   
  },
  methods: {
    onSend() {
      // console.log(this.message);
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.msg.push(data)
      this.message = ''
    },
    scrollBottom() {
      const msgList = this.$refs['msg-list']
      msgList.scrollTop = msgList.scrollHeight
      console.log(msgList.scrollHeight)
    }
  }
}
</script>

<style scoped lang="less">
.user-chat {
  .send_mes_wrap {
    display: flex;
    align-items: center;
    padding: 0 14px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .send_btn {
    flex: none;
  }
  .message_wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 44px;
    top: 46px;
    overflow-y: auto;
  }
}
</style>

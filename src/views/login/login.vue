<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <!-- 基于vant的表单验证 -->

    <van-form
    @submit="onlogin"
    :show-error="false"
    :show-error-message="false"
    @failed="onFailed"
    ref="login-form"
    >
      <van-field
        v-model="user.mobile"
        label="账号"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入账号"
        :rules="ruleform.mobile"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        icon-prefix="toutiao"
        clearable
        label="密码"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="ruleform.code"
        name="code"

      >
        <template #button>
           <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button  v-else size="mini" type="primary" round @click.prevent="onsendmsg" :loading="isSendSmsLoading">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
      <van-button type="info" block>登录</van-button>
    </div>
    </van-form>
    
  </div>
</template>

<script>
import { login,sendSms } from '@/api/user.js'

export default {
  data() {
    return {
      user: {
        mobile: '13000000000',
        code: '246810'
      },
       isCountDownShow: false, // 控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false, // 发送验证码按钮的 loading 状态
      ruleform:{
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    onClickLeft() {
      Toast('返回')
    },
    async onlogin() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration:0 // 展示时长，当值为0时，totst不消失
      })
      try {
         const res = await login(this.user)
      console.log(res)
     
      if(res.status==201){
      this.$toast.success('登录成功')
         // 将后端返回的信息存到容器中
      this.$store.commit('setUser',res.data.data)
      this.$store.commit('removeCachpage','layoutIndex')
      this.$router.push('/my')
      // 登陆成功，返回原来页面
      this.$router.push(this.$route.query.redirect||'/')
      }
     
      } catch (error) {
        console.log(error);
        this.$toast.fail('登录失败')
      }
    },
    onFailed(error){
      // console.log(error);
      if(error.errors[0]){
        this.$toast({
          message:error.errors[0].message,
          position:'top'
        })
      }
    },
    // 发送验证码
   async onsendmsg(){
        try {
        // 校验手机号码
      await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
        await sendSms(this.user.mobile)
        // 短信发出去了，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
        // 倒计时结束 -> 隐藏倒计时，显示发送按钮（监视倒计时的 finish 事件处理）
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false
    }
    
  }
}
</script>

<style scoped>
.login-btn-wrap {
  padding: 26px 16px;
}
</style>

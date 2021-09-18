<template>
  <div class="update_photo">
    <van-nav-bar
      title="修改头像"
      left-arrow
      @click-left="$emit('close')"
      right-text="确认"
      @click-right="onConfirm"
    />
    <img :src="image" alt="" class="avater_img" />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'updatePhoto',
  props: {
    file: {
      required: true
    }
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.file)
    }
  },
  methods: {
    async onConfirm() {
      // console.log('onConfirm');
      // 由于后台要求的是multipart/form-data数据类型
      // 则一定要提交Formdata数据类型,不能提交{}
      const fd = new FormData()
      fd.append('photo',this.file)
      try {
        const res = await updateUserPhoto(fd)
        console.log(res)
        // 更新成功，修改父组件，关闭弹出层
        // console.log(res.data.data.name)
        this.$emit('update-photo', this.image)
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (err) {}
    }
  }
}
</script>

<style scoped lang="less">
.update_photo {
  .avater_img {
    width: 100%;
  }
}
</style>

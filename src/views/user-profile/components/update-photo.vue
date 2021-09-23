<template>
  <div class="update_photo">
    <van-nav-bar
      title="修改头像"
      left-arrow
      @click-left="$emit('close')"
      right-text="确认"
      @click-right="onConfirm"
    />
    <img :src="image" alt="" class="avater_img" ref="image" />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'updatePhoto',
  props: {
    file: {
      required: true
    }
  },
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: ''
    }
  },
  mounted() {
    // 获取DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    console.log(this.cropper)
  },
  methods: {
    getCroppedCanvas() {
    return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    },
    async onConfirm() {
      // console.log('onConfirm');
      // 由于后台要求的是multipart/form-data数据类型
      // 则一定要提交Formdata数据类型,不能提交{}
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      try {
        const res = await updateUserPhoto(fd)
        console.log(res)
        // 更新成功，修改父组件，关闭弹出层
        // console.log(res.data.data.name)
        this.$emit('update-photo', window.URL.createObjectURL(file))
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
  img {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>

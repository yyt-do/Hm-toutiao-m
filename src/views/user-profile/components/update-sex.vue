<template>
  <div class="update_sex">
    <van-picker
      title="修改性别"
      show-toolbar
      :default-index="defaultIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name:'updateSex',
   props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex:this.value
    }
  },
    methods: {
   async onConfirm() {
     console.log(123);
      try {
        const res = await updateUserProfile({
          gender: this.defaultIndex
        })
        // 更新成功，修改父组件，关闭弹出层
        console.log(res)
        this.$emit('input',this.defaultIndex)
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (err) {
      }
    },
    onChange(picker, value, index) {
      this.defaultIndex = index
    }
  }
}
</script>

<style scoped></style>

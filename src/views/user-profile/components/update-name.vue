<template>
  <div class="update_name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onCofirm"
    />
    <div class="name_filed">
      <van-field
        v-model="localname"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localname: this.value
    }
  },
  methods: {
    async onCofirm() {
      try {
        const res = await updateUserProfile({
          name: this.localname
        })
        // 更新成功，修改父组件，关闭弹出层
        // console.log(res.data.data.name)
        this.$emit('input',this.localname)
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (err) {
        if(err && err.response && err.response.status ===409){
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.update_name {
  .name_filed {
    margin: 10px;
  }
}
</style>

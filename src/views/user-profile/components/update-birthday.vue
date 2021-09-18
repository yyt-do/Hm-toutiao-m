<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onCofirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateBirthday',
    props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
    methods: {
    async onCofirm() {
      // console.log('确定')
      const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      console.log(birthday);
      try {
        const res = await updateUserProfile({
          birthday
        })
        // console.log(res);
        // 更新成功，修改父组件，关闭弹出层
        this.$emit('input',birthday)
        this.$toast.success('修改成功')
        this.$emit('close')
      } catch (err) {
      }
    }
  }
}
</script>

<style scoped></style>

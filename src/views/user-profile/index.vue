<template>
  <div class="user_profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell title="头像" is-link center>
      <input 
        type="file" 
        hidden ref="file"
        @change="onchange"
      />
      <van-image
        width="30"
        height="30"
        fit="cover"
        :src="userinfo.photo"
        round
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userinfo.name"
      @click="isEditNameshow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="userinfo.gender == 0 ? '男' : '女'"
      @click="isEditSexshow=true"
    />
    <van-cell 
    title="生日" 
    is-link 
    :value="userinfo.birthday"
    @click="isEditBirthdayshow=true"
    />
    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditNameshow"
      position="bottom"
      :style="{ height: '100%' }"
      v-if="isEditNameshow"
    >
    <!-- 当传递给子组件的值既要使用又要修改时，例如这里的name,
    这种情况我们可以使用v-model简写
    :name="userinfo.name"
    @updataname="$event" -->
   <!-- v-model="userinfo.name"默认传递一个名字叫value的数据 -->
   <!-- :value="userinfo.name"
   默认监听input事件 
   @input="$event" -->
      <update-name 
        @close="isEditNameshow=false"
        v-model="userinfo.name"
      ></update-name>

    <!-- 编辑性别 -->  
    </van-popup>
    <!-- 编辑性别 -->
     <van-popup
      v-model="isEditSexshow"
      position="bottom"
      :style="{ height: '50%' }"
      v-if="isEditSexshow"
    >
    <update-sex
    @close="isEditSexshow=false"
    v-model="userinfo.gender"
    ></update-sex>
    </van-popup>
      <!-- 编辑生日 -->
     <van-popup
      v-model="isEditBirthdayshow"
      position="bottom"
      :style="{ height: '50%' }"
      v-if="isEditBirthdayshow"
    >
    <update-birthday
    @close="isEditBirthdayshow=false"
    v-model="userinfo.birthday"
    ></update-birthday>
    </van-popup>
    <!-- 编辑头像 -->
     <van-popup
      v-model="isEditPhotoshow"
      position="bottom"
      :style="{ height: '100%' }"
      v-if="isEditPhotoshow"
    >
    <update-photo
    :file="previewImage "
    @update-photo="userinfo.photo=$event"
    @close="isEditPhotoshow=false"
    ></update-photo>
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import updateSex from './components/update-sex.vue'
import updateBirthday from './components/update-birthday.vue'
import updatePhoto from './components/update-photo'
export default {
  name: 'userProfile',
  components: {
    UpdateName,
    updateSex,
    updateBirthday,
    updatePhoto
  },
  data() {
    return {
      userinfo: {}, //用户资料
      isEditNameshow: false,
      isEditSexshow:false,
      isEditBirthdayshow:false,
      isEditPhotoshow:false,
      previewImage:null //图片预览路劲

    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      const res = await getUserProfile()
      this.userinfo = res.data.data
      console.log(this.userinfo)
    },
    // updatename(name){
    //   // console.log(name);
    //   this.isEditNameshow = false
    //   this.userinfo.name=name
    // }
    // 选择图片方法
    onchange(){
      // 展示弹出层
      this.isEditPhotoshow = true
      // 在弹出层预览图片
      this.previewImage = this.$refs.file.files[0]
      // this.previewImage = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(this.previewImage );
      // 为了解决相同文件不触发change事件，这里需要手动清空file里面的value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user_profile {
  /deep/.van-nav-bar__content {
    background-color: #fff;
  }
  /deep/.van-nav-bar__content .van-nav-bar__title {
    color: #000;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
  /deep/.van-nav-bar .van-icon {
    color: #000;
}
}
</style>

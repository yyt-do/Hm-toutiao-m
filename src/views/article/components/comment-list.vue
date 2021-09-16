<template>
  <div class="comment_list">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <comment-item 
  v-for="(item,index) in list" 
  :key="index" 
  :comment="item"
  @replay-click="$emit('repaly-click',$event)"
  >
  </comment-item>
  <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content" /> -->
</van-list>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import {getComments} from '@/api/comment'
export default {
  props:{
    source:{
      type:[Number,String,Object],
      required:true
    },
    list:{
      type:Array,
      // 数组或者对象必须通过函数返回
      default:function(){
        return []
      }
    },
    // 评论类型
    type:{
      type:String,
      default:'a'
    }
    // isReplayShow:{
    //   type: Boolean,
    //   required: true
    // }
  },
  components:{
    CommentItem
  },
  name:'CommnetList',
  data () {
    return {
      loading: false,
      finished: false,
      offset:null,
      limit:10,
    }
  },
    methods: {
  async  onLoad() {
      // 请求数据
      const res = await getComments({
        type:this.type,
        source:this.source.toString(),
        offset:this.offset,
        limit:this.limit,
      })
    // console.log(res.data.data.results);
    console.log(res);
    this.$emit('update-total-count',res.data.data.total_count)
    this.list.push(...res.data.data.results)
    console.log(this.list);
    // 将本次的loading关闭
    this.loading =false
    // 如果有数据，更新下一页的页码
    if(res.data.data.results.length){
      // console.log(res.data.data.results);
      this.offset = res.data.data.last_id
    }else{
      // 如果没有，将finshed设为true
       this.finished = true
       console.log(12344);
    }
  //  this.finished = true
    }
  }
}
</script>

<style  scoped>

</style>

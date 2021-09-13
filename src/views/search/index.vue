<template>
  <div class="search_container">
    <!-- 搜索栏 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="$router.back()"
      @focus="isResultShow = false"
    />
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 搜索历史-->
    <search-history 
    v-else 
    :search-histories="searchHistories"
    @search="onSearch"
    @update-histories="searchHistories=$event"
    ></search-history>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistory } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data() {
    return {
      searchText: '', //搜索数据
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistories: [] // 搜索历史数据
    }
  },
  created() {
    this.loadSearchHistory()
  },
  watch:{
    searchHistories(){
      setItem('search-histories', this.searchHistories)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch(searchText) {
      // console.log(searchText)
      // 把输入框设置为你要输入的文本
      this.searchText = searchText
      // 去除搜索历史重复项
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 把最新的历史记录数据放到顶部
      this.searchHistories.unshift(searchText)
      // 数据持久化
      // 如果用户已登录，则把搜索历史记录存储到线上
      // 提示：只要我们调用获取搜索结果的接口，后端会自动存储用户的搜索记录
      // 如果没有登录，则把搜索记录存储在本地
      // setItem('search-histories', this.searchHistories)
      // 展示收索结果
      this.isResultShow = true
    },
    async loadSearchHistory() {
      // 因为后台接口只存储4条数据,所以我们这里让返回的历史记录和本地的历史记录合并到一起
      const loadHistories = getItem('search-histories') || []
      if (this.user) {
        const res = await getSearchHistory()
        console.log(res.data.data.keywords)
      // 合并数组:[...数组1,...数组2]
      // Set转为数组:[...new Set([])]
      // 去重并转为数组: [...new Set([...loadHistories,...res.data.data.keywords])]
        this.searchHistories = [...new Set([...loadHistories,...res.data.data.keywords])]
      }
      console.log(this.searchHistories);
      // this.searchHistories = loadHistories
    }
  }
}
</script>

<style scoped></style>

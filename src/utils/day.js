// 初始化day.js
import Vue from 'vue'
import dayjs from 'dayjs'
// 引入处理相对时间
import rTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
// 配置使用处理相对时间
dayjs.extend(rTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')
// 把处理相对时间的代码包装为全局过滤器
// 然后哪个组件使用就引入
// 所谓的过滤器其实就是一个可以在模板中使用的函数而已
// 使用：{{xxxx|过滤器名字}}
//管道符前面的内容作为参数传递给过滤器函数，返回值渲染到模板中
Vue.filter('relativeTime',value => {
  return dayjs(value).from(dayjs())
})
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import ElementUI from 'element-ui'; //引入ui插件
import 'element-ui/lib/theme-chalk/index.css'; //引入ui插件样式
import util from './common/util'; //导入公用函数
import config from './common/config'; //导入设置
import '@/assets/fonts/iconfont.css'; //字体样式
import  * as Echarts from 'echarts'
import Bus from  './eventbus/eventBus'
import mainComponentsParameters from './components/mainComponentsParameters.vue'
import gearBoxRunParameters from './components/gearBoxRunParameters.vue'
// main.js
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts

window.echarts = require('echarts');
Vue.prototype.echarts = Echarts

Vue.use(Echarts)

Vue.use(Bus)

Vue.use(ElementUI); //使用ui插件

//全局引入自定义函数
Vue.prototype.Util = util;
//全局引入设置
Vue.prototype.Config = config;
Vue.prototype.PublicPath = process.env.VUE_APP_PUBLIC_PATH;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

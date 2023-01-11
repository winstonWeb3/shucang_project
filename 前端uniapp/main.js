import App from './App'
import request from './common/api.js'
import sendUploadFile from './common/api.js'
import config from "./common/config.js"
import { showToast,utilTime,utilDate,utilCountDown } from '@/util/index.js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// #ifndef VUE3
import Vue from 'vue'
// 请求包
Vue.prototype.$request=request
Vue.prototype.$sendUploadFile=sendUploadFile
// 配置
Vue.prototype.$config = config;
Vue.prototype.$showToast = showToast;
Vue.prototype.$utilTime = utilTime;
Vue.prototype.$utilDate = utilDate;
Vue.prototype.$utilCountDown = utilCountDown;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
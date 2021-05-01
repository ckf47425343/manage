import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts';

Vue.use(VueAxios, axios)
Vue.use(echarts)
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.config.productionTip = false
//axios拦截器，在发起请求之前执行
//nodejs跨域请求，post参数必须进行序列化，否则即使在后台允许跨域，后台无法接收请求
Vue.prototype.baseUrl='http://119.23.66.217:3000'
// Vue.prototype.baseUrl='http://127.0.0.1:3000'

// axios.defaults.baseURL='http://127.0.0.1:10001'


axios.interceptors.request.use(config => {

  //处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    //重新赋值config.data
    config.data = paramsString.slice(0, -1);

  }

  //必须返回config
  return config;
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

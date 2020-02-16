import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios';//引入axios组件
import VueCookie from 'vue-cookie'; 
import moment from 'moment';
//引入jquery
import $ from "jquery"
//mock假数据
import "./mock/index.js";
Vue.config.productionTip = false
//
axios.defaults.withCredentials=true;  //跨域保存session有用
axios.defaults.baseURL = "http://localhost:9000"; //打包的时候直接删掉，默认基础路径在这里配置、、
// 服务器地址、http://localhost:9000/users/register
//将 axios 赋值给 Vue，方便在子组件里面使用
Vue.prototype.$reqs = axios;
Vue.use(ViewUI);
Vue.use(VueCookie);
// Vue.use($);
Vue.prototype.$moment = moment;
// Vue.use(moment);
// Vue.use(require('vue-moment'));
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)


axios.interceptors.request.use(config => {
  if(store.state.Authorization){
  config.headers.common['access-token']=store.state.Authorization
  }
  return config;
  }, error => {
  return Promise.reject(error);
  })
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#hello')

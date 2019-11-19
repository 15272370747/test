// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import setAxios from './setAxios'
setAxios();
import {store} from './store/store'

 //配置公共的axios
  Axios.defaults.baseURL = '/lvdi'
  Vue.prototype.$axios = Axios
 Axios.defaults.headers.common['token'] = localStorage.getItem("setToken");
 Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
new Vue({
  el: '#app',
  router,
   store,
  components: { App },
  template: '<App/>',
  data:{
      Bus: new Vue({})
    }
})

import axios from 'axios'
import router from './router/index'
import store from './store/store'

export default function setAxios() {
    //http请求拦截
    axios.interceptors.request.use(
        config => {
            console.log(config)       
            if(localStorage.getItem("setToken")!= null && localStorage.getItem("setToken")!= ''){
               config.headers['token'] = `${localStorage.getItem("setToken")}`
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        });
    
    //响应拦截
    axios.interceptors.response.use(
        res => {
            console.log(res)
            // if (res.status == 401) { //这里是判断后台的token是否过期
            //     localStorage.removeItem("setToken"); //如果过期则清除前端的token并跳转到登录页
            //     window.location.href='#/login';
            // }else if (res.config.headers.token) { // 判断token是否存在，如果存在说明需要更新token
            //     localStorage.setItem('setToken', res.config.headers.token) // 覆盖原来的token(默认一天刷新一次)
            // }
            return res;
        },error => {
            console.log(error)
            if(error.response.status === 401) {
                //localStorage.removeItem("setToken");
                localStorage.clear();
                window.location.href='#/login';
            } else if (error.response.status === 500) {
                // 服务器错误
                // do something
                return Promise.reject(error.response.data)
            }
            // 返回 response 里的错误信息
            return Promise.reject(error.response.data)
        }) 
}
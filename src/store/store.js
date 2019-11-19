import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state :{
        show : false,
        name : "首页",
        tab : false,
        token : "",
        btnR : false
    },
    getters :{
        show : function (state){
            return state.show;
        },
        getName : function (state){
            return state.name;
        },
        tab : function (state){
            return state.tab;
        },
        btnR : function (state){
            return state.btnR;
        },
        token : function (state) {
            return state.token;
        }
    },
    mutations :{
        //存储token
        setToken(state,token){
            state.token = token;
        },
        changeShow : function (state) {
            state.show = true;
        },
        backShow : function (state) {
            state.show = false;
        },
        changeName : function(state,name){
            state.name = name;
        },
        changeTab : function(state){
            state.tab = false;
        },
        backTab : function(state){
            state.tab = true;
        },
        changeBtnR : function(state){
            state.btnR = false;
        },
        backBtnR : function(state){
            state.btnR = true;
        }
    }
})
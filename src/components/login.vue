<template>
 <div class="box">
           <dl>
               <dd class="dForm">
                 <div class="divCont">
              <input type="text" class="input1 user" placeholder="用户名" v-model="uesrname">
                 </div>
                    <span class="title">
						{{name}}
					</span>
               </dd>
               <dd class="dForm">
                 <div class="divCont">
                   <input type="text" class="input1 passw" placeholder="密码" v-model="password">
                  </div>
                   <span class="title">
                       {{psw}}
                    </span>
               </dd>
               <dd class="ddBtn">
                   <button @click="passw">登录</button>
               </dd>
            </dl>

    </div>
</template>
<script>
  import qs from 'qs';
  export default{
         name:"Home",
         data(){
             return{
                 uesrname:"",
                 name:"",
                 password:"",
                 psw:"",
                 // imgSrc:require('../assets/login_write_ok.gif')
             }
         },
         methods:{
             passw(){
                 if(this.uesrname == ""){
                     this.name = "用户名不能为空";
                 }else if(this.password == ""){
                     this.psw = "密码不能为空";
                 }else{
                       this.$axios({
                                          method:"post",
                                          url:"/lvdi_AndroidController.do?userLogin",
                                          data:qs.stringify({
                                              name:this.uesrname,
                                              psw:this.password,
                                              flag:'435120'
                                          })
                                      }).then(res=>{
                                          console.log(res)
                                          console.log(res.data)
                                          if(res.data){
                                              localStorage.setItem('ale',0);
                                              Indicator.close();
                                              //把对象转换成字符串
                                              let userinfo = { username: this.username}
                                              //let userinfo = { username: this.username, password: this.password}
                                              // 把userinfo存到localStorage里
                                              localStorage.setItem('userinfo', JSON.stringify(userinfo))
                                              localStorage.setItem("userID",res.data.id);
                                              localStorage.setItem("groupId",res.data.groupid);
                                              //菜单权限
                                              localStorage.setItem("rights",JSON.stringify(res.data.rights));

                                              //将token存储在vuex里面
                                              this.$store.commit("setToken",res.headers.token);
                                              localStorage.setItem("setToken",res.headers.token);

                                              //跳转到路由
                                              // this.$root.Bus.$emit('eventName', 'index')
                                              this.$router.push({name :'index'})
                                              this.$router.go(0); //刷新
                                              Indicator.close();
                                              console.log(localStorage)
                                          }else{
                                              Indicator.close();
                                              alert('登陆失败');
                                              this.$router.push({name :"login"})
                                          }
                                      }).catch(err=>{
                                          console.log(err)
                                      })
                 }
             }
         },

     }
</script>

<style>
   .box{
          border: 1px solid #189F92;
          width:420px;
          height: 420px;
         margin: 0 auto;
          border-radius: 2%;
          display: flex;
          justify-content: center;
           align-items: center;
      }
      .dForm{
        margin: auto;
      }
      .divCont{
        border: 1px solid rgb(220, 222, 224);
        width: 340px;
        height:50px;
        margin-top: 30px;
        border-radius: 3px;

      }
      .input1{
          border: none;
          width: 306px;
          height: 48px;
          outline: none

      }
      .ddBtn{
        margin: auto;
      }
      .ddBtn button{
          width:340px;
          height: 48px;
          margin-top:20px;
           background-color: #189F92;
           border-radius: 3px;
          -moz-border-radius:3px;
          -webkit-border-radius:3px;
          border: none;
          color: white;
          font-weight: 400;
          cursor: pointer;
          font-size:16px ;

      }
</style>

<template>
    <div class="login">
        <div><input  type="text" placeholder="用户名" v-model="loginForm.username"/></div>
        <div><input  type="text" placeholder="密码" v-model="loginForm.password"/></div>
        <div><input  type="text" placeholder="验证码" v-model="loginForm.verifyCode"/></div>
        <div><button @click="login">登陆</button></div>
    </div>
</template>
<script src="//cdn.bootcss.com/vue-resource/1.0.3/vue-resource.js" type="text/javascript" charset="utf-8"></script>
<script src="../../public/js/gVerify.js" type="text/javascript" charset="utf-8"></script>
<script>
import { mapMutations } from 'vuex';

export default {
  data() {
      return {
        loginForm:{
          username: '',
          password: '',
          verifyCode: '',
          verifyId: 2095463
        },
        userToken:''
      }
  },
  name: 'Login',
  props: {
    user: String
  },
  methods:{
    ...mapMutations(['changeLogin']),
    login:function(){
      var _this=this
      if(_this.loginForm.username==''||_this.loginForm.password==''){
        alert('账号密码不能为空')
      }else{
        _this.$http({
          method : "post",
          url:"/api",
          data:_this.loginForm
        }).then((res)=>{
          _this.userToken=res.data.data.accessToken
          _this.changeLogin({Authorization:_this.userToken})
          this.$router.push({path:'/home'})
          alert('登陆成功')
        }).catch(error=>{
          if(error.response.status==401){
            localStorage.removeItem('Authorization');
            this.$router.push({path:'/login'});
          }else{
            alert('账号或密码错误')
          }
        })
      }
    }
  }
}
</script>

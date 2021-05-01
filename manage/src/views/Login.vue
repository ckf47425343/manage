<template>
  <div class="login">
      <Buddle> 
        <div class="content_box">
      <div class="register_box login_box">
       <el-form  
      :model="loginInfo"
       status-icon
      :rules="rules"
      ref="loginInfo"
    >
      <el-form-item   prop="email">
        <el-input
          placeholder="请输入邮箱"
          v-model="loginInfo.email"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="loginInfo.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
         <el-form-item>
       <el-button type="primary"  class="register_btn"  @click="submitForm('loginInfo')">登录</el-button>
     </el-form-item>
       <el-form-item>
       <el-button type="primary"  class="register_btn"  @click="goPage()">注册</el-button>
     </el-form-item>
    </el-form>
      </div>
     
    </div>

      </Buddle>
  </div>
</template>
 
<script>
import '../assets/less/register.less'
import Buddle from '../components/Buddle.vue'
 export default {
  name: "Register",
  components:{
    Buddle
  },
  data() {
    return {
      loginInfo: {
        email: "",
        password: "",
      },
      rules: {
        email: [{ validator: this.vaildEmail, trigger: "blur" }],
        password:[{validator:this.vaildPassWord,trigger:'blur'}],
      },
    };
  },
  methods: {
    vaildEmail(rule, value, callback) {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      //验证邮箱
      setTimeout(() => {
        //邮箱验证正则表达式
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(value)) {
          return callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      }, 1000);
    },
    //验证密码
    vaildPassWord(rule, value, callback) {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }

      //验证密码的正则表达式
      let reg = /^[A-Za-z]\w{5,15}$/;
      if (!reg.test(value)) {
        return callback(new Error("输入的密码格式不正确"));
      } else {
        return callback();
      }
    },
  
    submitForm(formName){
      console.log(this.baseUrl)
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios({
            method: 'POST',
            url:this.baseUrl+'/login',
            data: {
              //用户邮箱
              email: this.loginInfo.email,
              //用户密码
              password: this.loginInfo.password,
            }
          }).then(res => {
            console.log('res ==> ', res);
          if(res.data.status==1030){
          
          this.$message({
          message:res.data.msg,
          type: 'success'
          });
          let token=''
          for(let key in res.data.data){
            
           this.$cookies.set(key, res.data.data[key],res.data.time);
            
          }

          setTimeout(()=>{
            this.$router.push({name:'Main'})
          },1000)
         
          }else if(res.data.status==1032){
           this.$message({
              message:res.data.msg,
              type:'error'
            })
          
          setTimeout(()=>{
             return this.$router.push({name:'Register'})
          },1000)
          
          }
          else{
            this.$message({
              message:res.data.msg,
              type:'error'
          })
          
          }
           
          }).catch(err => {
            console.log('err ==> ', err);
          })
          } 
        });
     
    },
    goPage(){
      this.$router.push({name:'Register'})
    }
    
  },
  
};
</script>

<style lang="less" scoped>
    
</style>
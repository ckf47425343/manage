<template>
  <div class="register">
  <Buddle>
        <div class="content_box">
      
      
      <div class="register_box">
       <el-form  
      :model="registerInfo"
      status-icon
      :rules="rules"
      ref="registerInfo"
      
    >
      <el-form-item   prop="email">
        <el-input
          placeholder="请输入邮箱"
          v-model="registerInfo.email"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="registerInfo.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item   prop="repassword">
        <el-input placeholder="再次输入密码" type="password" autocomplete="off" v-model="registerInfo.repassword"></el-input>
      </el-form-item>
      <el-form-item prop="vaildcode" class="clearfix">
        
        <el-input class="fl input_code" placeholder="请输入验证码" autocomplete="off" v-model="registerInfo.vaildcode"></el-input>
        <el-button class="fr send_btn "  :disabled="isSend" @click="sendCode">{{text}}</el-button>
       
      </el-form-item>
       <el-form-item>
       <el-button type="primary"  class="register_btn"  @click="submitForm('registerInfo')">注册</el-button>
     </el-form-item>
    </el-form>
    
     

      </div>
    </div>
  </Buddle>

  
  </div>
</template>


<script>

 import Buddle from '../components/Buddle.vue'
 import '../assets/less/register.less'
export default {
  name: "Register",
  components:{
    Buddle
  },
  data() {
    return {
      registerInfo: {
        email: "",
        password: "",
        repassword: "",
        vaildcode: "",
      },
      rules: {
        email: [{ validator: this.vaildEmail, trigger: "blur" }],
        password:[{validator:this.vaildPassWord,trigger:'blur'}],
        repassword:[{validator:this.vaildRePassWord,trigger:'blur'}],
        vaildcode:[{validator:this.vaildCode,trigger:'blur'}]
      },
      text:'获取验证码',
      isSend:false,
      codeId:''
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
    vaildRePassWord(rule, value, callback) {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (!(value==this.registerInfo.password)){
        return callback(new Error("密码输入不一致"));
      } else {
        return callback();
      }
    },
    vaildCode(rule,value,callback){
     if(!value){
         return callback(new Error("验证码不能为空"))
     }
      //验证码正则表达式6位数字
      let reg = /^\d{6}$/;
    if(!reg.test(value)){
       return callback(new Error("验证码的格式不正确"))
    }else{
        return callback()
    }
    },
    sendCode(){
     let value=this.registerInfo.email
     if(!value){
       return
     }
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!reg.test(value)){
       return
    }
      this.isSend=true
      this.text="5s"
      let time=5
      let timer=setInterval(()=>{
      time--
      this.text=time+"s"
      if(time<0){
        this.text='获取验证码'
        clearInterval(timer)
        this.isSend=false
        return
      }
      },1000)
     this.axios({
         method:'POST',
         url:this.baseUrl+'/email',
         data:{
           email:this.registerInfo.email,
         }
      }).then(res=>{
         console.log("res==>",res)
        if(res.data.status==1010){
          this.codeId=res.data.cid
        }
      }).catch(err=>{
         console.log("err==>",err)
      })
      
    },
     
    submitForm(formName){
       if(!this.codeId){
       return  this.$message({
          message:'先发送验证码',
          type: 'warning'
        });
       }
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios({
            method: 'POST',
            url: this.baseUrl+'/register',
            data: {
              //用户邮箱
              email: this.registerInfo.email,
              //用户密码
              password: this.registerInfo.password,
              //验证码
              vaildcode:this.registerInfo.vaildcode,
              //验证码codeId
              codeId:this.codeId
            }
          }).then(res => {
            // console.log('res ==> ', res);
            if(res.data.status==1000){


              this.$message({
                 message:res.data.msg,
                 type:'success'
              })
            setTimeout(()=>{
            this.$router.push({name:'Login'})
            },1000)
             
            }
            if(res.data.status==1001){
                this.$message({
                  message:res.data.msg,
                  type:'error'
                })
            }
            if(res.data.status==1002){
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
     
    }
  },
  
};
</script>

<style lang="less" scoped>
</style>
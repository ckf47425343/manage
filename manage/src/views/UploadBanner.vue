<template>
  <div class="upload-banner">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动主题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="imgSrc">
        <UploadFile
          :imgSrc="ruleForm.imgSrc"
          :size="300"
          @upload="uploadVal($event)"
        >
        </UploadFile>
      </el-form-item>
      <el-form-item label="活动状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="上线"></el-radio>
          <el-radio label="下线"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadFile from "../components/UploadFile.vue";
export default {
  name: "UploadBanner",
  data() {
    return {
      ruleForm: {
        title: "",
        imgSrc: "",
        status: "",
        desc: "",
        imgType:""
      },
      rules: {
        title: [{ required:true, message: "请输入活动主题", trigger: "blur" }],
        imgSrc: [
          { required:true, message: "请选择活动区域", trigger: "change" },
        ],
        status: [
          {
       
            required:true,
            message: "请选择状态",
            trigger: "change",
          },
        ],

        desc: [{ required:true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    uploadVal(e) {
      console.log(e);
      this.ruleForm.imgSrc = e.base64;
      this.ruleForm.imgType=e.type
    },
    submitForm(formName) {


      this.$refs[formName].validate((valid) => {
        if (valid) {
       let bannerData=Object.assign({},this.ruleForm)
   
       bannerData.imgSrc=bannerData.imgSrc.replace(/data:image\/[a-z]+;base64,/,'')  
           console.log("bannerData==>",bannerData)
       this.axios({
            method:'POST',
            url:this.baseUrl+"/uploadBanner",
            data:bannerData,
            headers:{
                token:document.cookie
            }
        }).then(result=>{
            if(result.data.status==1034){
          this.$message({
              message:result.data.msg,
              type:'error'
          })

          setTimeout(function(){
              this.$router.push({name:'Login'})
          },2000)
        }  
        
          if(result.data.status==1300){
              this.$message({
                  message:result.data.msg,
                  type:'success'
              })

            setTimeout(()=>{
                this.$router.push({name:'AdvertisingList'})
            })
        
        
              
          }
          else{
              this.$message({
                  message:result.data.msg,
                  type:'error'
              })
          }
        })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log("resetForm");
      this.$refs[formName].resetFields();
    },
  },
  components: {
    UploadFile,
  },
};
</script>

<style lang="less" scoped>
.el-form {
  padding: 20px 0px;
}
</style>

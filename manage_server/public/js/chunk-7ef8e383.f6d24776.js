(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ef8e383"],{"329a":function(e,r,t){},ae33:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"upload-banner"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"活动主题",prop:"title"}},[t("el-input",{model:{value:e.ruleForm.title,callback:function(r){e.$set(e.ruleForm,"title",r)},expression:"ruleForm.title"}})],1),t("el-form-item",{attrs:{label:"上传图片",prop:"imgSrc"}},[t("UploadFile",{attrs:{imgSrc:e.ruleForm.imgSrc,size:300},on:{upload:function(r){return e.uploadVal(r)}}})],1),t("el-form-item",{attrs:{label:"活动状态",prop:"status"}},[t("el-radio-group",{model:{value:e.ruleForm.status,callback:function(r){e.$set(e.ruleForm,"status",r)},expression:"ruleForm.status"}},[t("el-radio",{attrs:{label:"上线"}}),t("el-radio",{attrs:{label:"下线"}})],1)],1),t("el-form-item",{attrs:{label:"活动描述",prop:"desc"}},[t("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.desc,callback:function(r){e.$set(e.ruleForm,"desc",r)},expression:"ruleForm.desc"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("提交")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)},a=[],o=(t("ac1f"),t("5319"),t("8a99")),l={name:"UploadBanner",data:function(){return{ruleForm:{title:"",imgSrc:"",status:"",desc:"",imgType:""},rules:{title:[{required:!0,message:"请输入活动主题",trigger:"blur"}],imgSrc:[{required:!0,message:"请选择活动区域",trigger:"change"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]}}},methods:{uploadVal:function(e){console.log(e),this.ruleForm.imgSrc=e.base64,this.ruleForm.imgType=e.type},submitForm:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var t=Object.assign({},r.ruleForm);t.imgSrc=t.imgSrc.replace(/data:image\/[a-z]+;base64,/,""),console.log("bannerData==>",t),r.axios({method:"POST",url:r.baseUrl+"/uploadBanner",data:t,headers:{token:document.cookie}}).then((function(e){1034==e.data.status&&(r.$message({message:e.data.msg,type:"error"}),setTimeout((function(){this.$router.push({name:"Login"})}),2e3)),1300==e.data.status?(r.$message({message:e.data.msg,type:"success"}),setTimeout((function(){r.$router.push({name:"AdvertisingList"})}))):r.$message({message:e.data.msg,type:"error"})}))}))},resetForm:function(e){console.log("resetForm"),this.$refs[e].resetFields()}},components:{UploadFile:o["a"]}},i=l,u=(t("c219"),t("2877")),n=Object(u["a"])(i,s,a,!1,null,"4ab9e3fd",null);r["default"]=n.exports},c219:function(e,r,t){"use strict";t("329a")}}]);
//# sourceMappingURL=chunk-7ef8e383.f6d24776.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-237ba19f"],{"4a2b":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"user_manage"},[t("div",{staticClass:"container"},[t("header",[t("div",{staticClass:"left_box"},[t("div",{staticClass:"avatar"},[t("div",{staticClass:"upload_file"},[t("UploadFile",{attrs:{imgSrc:e.imgSrc,size:500},on:{upload:e.upload}})],1),t("img",{attrs:{src:e.userInfo.avatar,alt:""}})]),t("div",{staticClass:"nick_input "},[t("el-input",{staticClass:"user_name",attrs:{readonly:e.isOpen},model:{value:e.userInfo.nickName,callback:function(a){e.$set(e.userInfo,"nickName",a)},expression:"userInfo.nickName"}}),t("i",{staticClass:"el-icon-edit",on:{click:function(a){return e.changeNick(e.isOpen)}}})],1),t("div",{staticClass:"user_age left_box_item"},[t("i",{staticClass:"iconfont iconshangjiaruzhu"}),t("span",[e._v(" "+e._s(e.userInfo.storetime)+"年 ")])])]),t("div",{staticClass:"right_box"},[t("div",{staticClass:"right_box_item"},[t("i",{staticClass:"iconfont icondianzan"}),t("span",[e._v("点赞"+e._s(e.userInfo.like_count))])]),t("div",{staticClass:"right_box_item"},[t("i",{staticClass:"iconfont icondingdan"}),t("span",[e._v("订单"+e._s(e.userInfo.order_count))])]),t("div",{staticClass:"right_box_item"},[t("i",{staticClass:"iconfont iconRectangleCopy"}),t("span",[e._v("发布"+e._s(e.userInfo.post_count))])])])])])])},n=[];t("ac1f"),t("5319");function i(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}var o=t("8a99"),r=(t("a610"),i({components:{UploadFile:o["a"]},name:"UserManage",data:function(){return{copyData:"",isOpen:!0,userId:"",imgSrc:"",userInfo:{nickName:"",avatar:"",sex:"男",store_age:0,like_count:0,order_count:0,post_count:0}}},created:function(){this.userId=this.$route.params.userId,this.getUserInfo()},methods:{changeNick:function(e){var a=this;if(e&&(this.copyData=this.userInfo.nickName),this.isOpen=!e,this.isOpen){if(console.log(this.userInfo.nickName),this.copyData===this.userInfo.nickName)return void console.log("sss");var t={};t.nickName=this.userInfo.nickName,this.axios({method:"POST",url:this.baseUrl+"/updateUserInfo",data:t,headers:{token:document.cookie}}).then((function(e){1034==e.data.status&&(a.$message({message:"请先登录",type:"error"}),a.$router.push({name:"Login"})),1050==e.data.status&&a.$message({message:e.data.msg,type:"success"})}))}},getUserInfo:function(){var e=this;document.cookie||(this.$message({message:"请先登录",type:"danger"}),setTimeout((function(){e.$router.push({name:"Login"})}),1)),this.axios({method:"GET",url:this.baseUrl+"/getUerInfo",headers:{token:document.cookie}}).then((function(a){var t=a.data.url,s=a.data.result;s.storetime=parseInt((new Date-new Date(s.createdAt))/31536e6),s.avatar=t+"/"+s.avatar,Object.assign(e.userInfo,s),console.log("result==>",s)}))},upload:function(e){var a=this;this.userInfo.avatar=e.base64;var t=/data:image\/[a-z]+;base64/,s={};s.type=e.type,s.avatar=e.base64.replace(t,""),this.axios({method:"POST",url:this.baseUrl+"/updateUserInfo",data:s,headers:{token:document.cookie}}).then((function(e){console.log("result==>",e),1034==e.data.status&&(a.$message({message:"请先登录",type:"error"}),a.$router.push({name:"Login"})),1050==e.data.status&&(a.userInfo.avatar=e.data.url+"/"+e.data.result)})).catch((function(e){console.log("error==>",e)})),console.log("event==>",e)}}},"components",{UploadFile:o["a"]})),c=r,u=t("2877"),l=Object(u["a"])(c,s,n,!1,null,"4a6fe41a",null);a["default"]=l.exports},a610:function(e,a,t){}}]);
//# sourceMappingURL=chunk-237ba19f.cd5c624d.js.map
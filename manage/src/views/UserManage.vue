<template>
  <div class="user_manage">
    <div class="container">
      <header>
        <!-- 左边盒子 -->
        <div class="left_box">
          <div class="avatar">
            <div class="upload_file">
              <UploadFile
                :imgSrc="imgSrc"
                :size="500"
                @upload="upload"
              ></UploadFile>
            </div>
            <img :src="userInfo.avatar" alt="" />
          </div>

          <div class="nick_input ">
            <el-input
              v-model="userInfo.nickName"
            
              :readonly="isOpen"
              class="user_name"
            ></el-input>
            <i class="el-icon-edit" @click="changeNick(isOpen)"></i>
          </div>

          <div class="user_age left_box_item">
            <i class="iconfont iconshangjiaruzhu"></i>
            <span> {{ userInfo.storetime }}年 </span>
          </div>
        </div>
        <!-- 右边盒子 -->
        <div class="right_box">
          <div class="right_box_item">
            <i class="iconfont icondianzan"></i>
            <span>点赞{{ userInfo.like_count }}</span>
          </div>
          <div class="right_box_item">
            <i class="iconfont icondingdan"></i>
            <span>订单{{ userInfo.order_count }}</span>
          </div>
          <div class="right_box_item">
            <i class="iconfont iconRectangleCopy"></i>
            <span>发布{{ userInfo.post_count }}</span>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import UploadFile from "../components/UploadFile.vue";
import "../assets/less/user_manage.less";

export default {
  components: { UploadFile },
  name: "UserManage",
  data() {
    return {
      copyData:'',
      isOpen:true,
      userId: "",
      imgSrc: "",
      userInfo: {
        nickName: "",
        avatar: "",
        sex: "男",
        store_age: 0,
        like_count: 0,
        order_count: 0,
        post_count: 0,
      },
    };
  },
  created() {
    this.userId = this.$route.params.userId;

    //    return
    this.getUserInfo();
  },
  methods: {
    changeNick(isOpen) {
   
    if(isOpen){
        this.copyData=this.userInfo.nickName
    }
   
      this.isOpen = !isOpen;
     

      if (this.isOpen) {
        console.log(this.userInfo.nickName);
        if(this.copyData===this.userInfo.nickName){
            console.log('sss')
           return
        }

         let data={}

         data.nickName=this.userInfo.nickName

        this.axios({
            method:'POST',
            url:this.baseUrl+'/updateUserInfo',
            data,
            headers:{
             token:document.cookie
            }
        }).then(result=>{
             if (result.data.status == 1034) {
            this.$message({
              message: "请先登录",
              type: "error",
            });
            this.$router.push({name:'Login'})
          }
            if(result.data.status==1050){
                this.$message({
                    message:result.data.msg,
                    type:'success'
                })
            }
          
        })
      }
    },

    //获取用户信息
    getUserInfo() {
      if (!document.cookie) {
        this.$message({
          message: "请先登录",
          type: "danger",
        });

        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 1);
      }

      this.axios({
        method: "GET",
        url: this.baseUrl + "/getUerInfo",
        headers: {
          token: document.cookie,
        },
      }).then((result) => {
        let url = result.data.url;
        let data = result.data.result;

        data.storetime = parseInt(
          (new Date() - new Date(data.createdAt)) /
            (1 * 365 * 24 * 60 * 60 * 1000)
        );

        data.avatar = url + "/" + data.avatar;

        Object.assign(this.userInfo, data);
        console.log("result==>", data);
      });
    },
    //上传图片

    upload(event) {
      //    console.log(event)
      this.userInfo.avatar = event.base64;

      let regExp = /data:image\/[a-z]+;base64/;
      let data = {};
      data.type = event.type;

      data.avatar = event.base64.replace(regExp, "");

      this.axios({
        method: "POST",
        url: this.baseUrl + "/updateUserInfo",
        data,
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          console.log("result==>", result);

          if (result.data.status == 1034) {
            this.$message({
              message: "请先登录",
              type: "error",
            });
            this.$router.push({name:'Login'})
          }
          if (result.data.status == 1050) {
            this.userInfo.avatar = result.data.url + "/" + result.data.result;
          }
        })
        .catch((error) => {
          console.log("error==>", error);
        });

      console.log("event==>", event);
    },
  },
//   watch:{
  
//     'userInfo.nickName'(newval,oldval){
     
//      console.log("newval==>",newval)
//      console.log("oldval==>",oldval)
//     }
  

//   },
 
  components: {
    UploadFile,
  },
};
</script>

<style lang="less" scoped></style>

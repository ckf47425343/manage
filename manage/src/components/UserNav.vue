<template>
  <div class="usernav clearfix">
   

    <router-link
      :to="{ name: 'UserManage', params: { userId: userInfoData.userId } }"
      class="left-box"
    >
      <img :src="userInfoData.avatar" class="auto-img" alt="" />
      <div class="nickname">{{ userInfoData.nickName }}</div>
    </router-link>

    <router-link :to="{name:'Login'}" class="right-box">
      <i class=""></i>
      <span>退出</span>
    </router-link>
  </div>
</template>

<script>
import "../assets/less/user_nav.less";
export default {
  name: "UserNav",

  data() {
    return {
      userInfoData: {},
    };
  },
  created() {
    
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.axios({
        method: "GET",
        url: this.baseUrl + "/getUerInfo",
        headers: {
          token: document.cookie,
        },
      }).then((result) => {
        if (result.data.status == 1034) {
          this.$message({
            message: result.data.msg,
            type: "error",
          });
          setTimeout(() => {
            return this.$router.push({ name: "Login" });
          }, 1);
        }

        if (result.data.status == 1040) {
          let data = result.data.result;
          let url = result.data.url;
          data.avatar = url + "/" + data.avatar;
          this.userInfoData = data;
       console.log(" data.avatar==>", data.avatar)
          console.log("data==>", data);
        }

        if (result.data.status == 1041) {
          this.$message({
            message: result.data.msg,
            error: "error",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>

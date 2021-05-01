<template>
  <div class="menulist">
    <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
       default-active="2-2"
    >
      <el-submenu  v-for="(item,index) in MenuListData"  :index="index+1+''" :key="index">
        <template slot="title">
          <i :class="'iconfont'+' '+item.icon "></i>
          <span slot="title">{{ item.title }}</span>
        </template>
        <el-menu-item
          :index="(index+1)+'-'+(i+1)"
          v-for="(t, i) in item.listItem"
          :key="i"
          @click="goPage(t.name)"
        >
          <span slot="title">{{ t.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import "../assets/less/menu_list.less";
export default {
  name: "MenuList",
  data() {
    return {
      MenuListData: [
        {
          id:"0",
          title: "首页",
          listItem: [{ title: "商品排名", name: "SaleCount" }],
          icon: "iconhome",
        },
        {
          
          id: "1",
          title: "商品管理",
          listItem: [{ title: "发布商品", name: "PostProduct" },{title:'商品列表',name:'ProductList'}],
          icon: "iconguanli",
        },
        // {
        //   id: "2",
        //   title: "广告导航",
        //   listItem: [{ title: "轮播上传", name: "UploadBanner" },{title:'广告列表',name:'AdvertisingList'}],
        //   icon: "iconactivity",
        // },
      ],
    };
  },
  created() {
  
  },
  methods: {
    
    goPage(name) {
     if(this.$route.name==name){
        return
      }
    
      this.$router.push({name})
    },
  },
};
</script>

<style lang="less" scoped>
</style>
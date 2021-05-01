<template>
  <div class="advertising_list">
    <div class="title">导航列表</div>
    <div class="search_area">
      <el-row class="demo-autocomplete">
        <el-col :span="6">
          <el-autocomplete
            class="inline-input"
             v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
        <el-col :span="2">
             <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>

    
    </div>
    <div class="list_area">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          :border="true"
          empty-text="暂无信息"
          align="center"
        >
          <el-table-column
            :show-overflow-tooltip="true"
            :resizable="true"
            prop="num"
            label="序号"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            :resizable="true"
            prop="imgSrc"
            label="图片"
            width="250"
            align="center"
          >
          <template slot-scope="scope">
            <img class="table_img" :src="scope.row.imgSrc" alt="" />
          </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            :resizable="true"
            prop="title"
            label="主题"
            width="250"
            align="center"
          >
          </el-table-column>
          <el-table-column align="center" prop="updatedAt" label="上传日期" width="250">
          </el-table-column>
          <el-table-column align="center" prop="opration" label="操作">
              <template slot-scope="scope">
              <div>
              <el-button type="primary" @click="goPage(scope.row.bid)" size="mini">
                <i class=" el-icon-view"></i>
              </el-button>
              <el-button type="warning" size="mini">
                <i class="el-icon-circle-plus" v-if="scope.row.status=='上线'"></i>
                <i class="el-icon-remove" v-else></i>
              </el-button>
              <el-button type="danger" @click="delete(scope.row.bid)" size="mini">
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
              </template>
          
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
       <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            :page-count="pagination.pageCount"
            :current-page="pagination.currentPage"
            @current-change="currentPage"
            >
        </el-pagination>
    </div>
  </div>
</template>

<script>
import "../assets/less/advertising_list.less";
import { utils } from "../assets/js/utils.js";
export default {
  name: "AdvertisingList",
  data() {
    return {
    
    restaurants: [],
    state: '',
    loadData:[],
    tableData: [

      ],
    pagination:{
        total:20,
        pageSize:5,
        pageCount:0,
        currentPage:1
    }
    };
    
  },
  created() {
      this.initData()
  },
  methods: {
    initData(){
     this.axios({
         method:'GET',
         url:this.baseUrl+'/getBannerAllData',
         headers:{
             token:document.cookie
         }
     }).then(result=>{
      
      if(result.data.status==1034){
          this.$message({
              message:result.data.msg,
              type:'error'
          })

          setTimeout(()=>{
              this.$router.push({name:'Login'})
          },2000)
      }
      
       let data=result.data.result
       let url=result.data.url
       let restaurants=[]
       let tableData=[]
       data.map((v)=>{
         restaurants.push({"value":v.title})
         
       })
       data.map((v,i)=>{
         v.num=i+1
         v.updatedAt= utils.formatDate(v.updatedAt, "yyyy-MM-dd hh:mm:ss")  
         v.imgSrc=url+'/'+v.imgSrc
         tableData.push(v)
       })
       console.log("tabData==>",tableData)
       this.restaurants=restaurants
       this.tableData=tableData
       console.log(this.restaurants)
     })

    },
    initSearchData() {},
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
      };
    },
  
   handleSelect(item) {
        console.log("item==>",item);
        console.log("state==>",this.state)
    },
    currentPage(e){
        console.log("e==>",e)
    },
     goPage(bid){
        this.$router.push({name:'UploadBanner',query:{bid}})
    }
  }
  }
</script>

<style lang="less" scoped></style>

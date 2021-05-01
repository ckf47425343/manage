<template>
  <div class="product_list">
    <div class="title">商品列表</div>
    <div class="filter_area">
      <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input
            v-model="searchCondition.name"
            placeholder="输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchCondition.type_id" placeholder="选择类型">
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :label="item.title"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchCondition.status" placeholder="选择状态">
            <el-option label="选择状态" value="-1"></el-option>
            <el-option label="上架" value="上架"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchCondition.updated_at"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="initSearchData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="list_data">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="num" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="img" label="图片" width="180" align="center">
          <template slot-scope="scope">
            <div class="img-box">
              <img class="auto_img" :src="scope.row.img" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="title" label="类型" width="120">
        </el-table-column>
        <el-table-column prop="price" label="价钱" width="120" align="right">
        </el-table-column>
         <el-table-column prop="sava_count" label="库存量" width="120" align="right">
        </el-table-column>

        <el-table-column prop="status" label="状态" width="80">
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间" width="180">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="viewProduct(scope.row.pid)">查看</el-button>
            <el-button
              type="warning"
              size="mini"
              v-if="scope.row.status == '下架'"
              @click="upDownSelf(scope.row, '上架')"
              >上架</el-button
            >
            <el-button
              type="info"
              size="mini"
              @click="upDownSelf(scope.row, '下架')"
              v-if="scope.row.status == '上架'"
              >下架</el-button
            >
            <el-button type="danger" size="mini" @click="removeProduct(scope.row.user_id,scope.row.pid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="toggle_page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagination.count"
        :total="pagination.total"
        :pager-count="pagination.pagerCount"
        :current-page="pagination.currentPage"
        @current-change="togglePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import "../assets/less/product_list.less";
import { utils } from "../assets/js/utils.js";
export default {
  name: "ProductList",
  data() {
    return {
      searchCondition: {
        name: "",
        type_id: "-1",
        status: "-1",
        updated_at: "",
      },
      typeData: [],
      tableData: [],
      //分页
      pagination: {
        //每页显示的条目数量
        count: 5,
        //总的条目数
        total: 5,
        //当前页数
        currentPage:1,
        //显示的页码数量
        pagerCount: 5,
        //偏移量
        offset: 0,
      },
    };
  },
  created() {
    this.getTypeData();
    this.initSearchData();
  },
  methods: {
    initSearchData() {
      this.search();
      this.getProductCount();
    },
    getTypeData() {
      this.axios({
        method: "GET",
        url: this.baseUrl + "/type",
       
      })
        .then((result) => {
          console.log("type==>", result);
          let data = result.data.result;
          data.unshift({ id: 0, typeId: "-1", title: "请选择类型" });

          console.log("data=>", data);
          this.typeData = data;
        })
        .catch((error) => {
          console.log("errot==>", error);
        });
    },

    //查找商品数据
    search() {
      let params = Object.assign(
        {},
        {
          count: this.pagination.count,
          offset: this.pagination.offset,
        },
        this.searchCondition
      );

      if (params.updated_at) {
        //获取时间
        let y = params.updated_at.getFullYear();
        let m = params.updated_at.getMonth() + 1;
        let d = params.updated_at.getDate();

        params.updated_at = `${y}-${m}-${d}`;
      }

      params.type_id = params.type_id == -1 ? "" : params.type_id;
      params.status = params.status == -1 ? "" : params.status;

      this.axios({
        method: "GET",
        url: this.baseUrl + "/search",
        params,
        headers:{
           token:document.cookie
        }
       
      })
        .then((result) => {
          console.log("product==>", result);
          if (result.data.status == 1070) {
            //  this.tableData=result.data.result
            let data = result.data.result;
            let url = result.data.url;
            data.map((v, i) => {
              v.num = i + 1;
              v.img = url + "/" + v.img;
              v.price=v.price+'元/斤'
              v.sava_count=v.save_count+'斤'
              v.updated_at = utils.formatDate(
                v.updated_at,
                "yyyy-MM-dd hh:mm:ss"
              );
            });

            this.tableData = data;
          }
        })
        .catch((err) => {});
    },
    //查找商品数量
    getProductCount() {
      let params = Object.assign({}, this.searchCondition);

      if (params.updated_at) {
        //获取时间
        let y = params.updated_at.getFullYear();
        let m = params.updated_at.getMonth() + 1;
        let d = params.updated_at.getDate();

        params.updated_at = `${y}-${m}-${d}`;
      }

      params.type_id = params.type_id == -1 ? "" : params.type_id;
      params.status = params.status == -1 ? "" : params.status;

      this.axios({
        method: "GET",
        url: this.baseUrl + "/count",
        params,
         headers:{
            token:document.cookie
          }
       
      })
        .then((result) => {
          if (result.data.status == 1080) {
            this.pagination.total=result.data.result[0].count
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //上下架
    upDownSelf(row, status) {
      this.axios({
        method: "POST",
        url: this.baseUrl + "/updown",
        data: {
          pid: row.pid,
          status,
        },
        headers:{
            token:document.cookie
          }
      })
        .then((result) => {
          if (result.data.status == 1090 && result.data.result[0] == 1) {
            row.status = status;
          } else {
            this.$message({
              message: result.data.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {});
    },
    //查看商品详情,可以浏览商品详情和修改商品
    viewProduct(pid){
      console.log("pid==>",pid)

    if(pid){
     this.$router.push({
       name:'PostProduct',
       query:{pid}
     })
    }
     
    },
      //删除商品
    removeProduct(user_id,pid){
    
    this.axios({
      method:'POST',
      url:this.baseUrl+'/remove',
      data:{
        user_id,
        pid
      },
      headers:{
        token:document.cookie
      }
    }).then(result=>{
       console.log(result)
    }).catch(error=>{
      console.log("error=======>")
    })
     
    },
    //切换页数
    togglePage(currentPage){
     this.pagination.offset=(currentPage-1)*this.pagination.count
     this.search()
    }  
    
     
  },
};
</script>

<style lang="less" scoped>
</style>
<template>
  <div class="sale_count">
    <div class="column">
      <ColumnChart :columnOption="columnOption" />
      
    </div>
    <div class="column">
    
      
    </div>
    <div class="column">
    
      
    </div>
    <div class="column">
    
      
    </div>
    <div class="column">
    
      
    </div>
    <div class="column">
    
      
    </div>
    <div class="column">
    
      
    </div>
    
  </div>
</template>

<script>
import   '../assets/less/sale_count.less'
import ColumnChart from "../components/ColumnChart.vue";
import { utils } from "../assets/js/utils.js";

export default {
  name: "SaleCount",
  created() {
    this.getProductCount();
   
  },
  data() {
    return {
    title:'product',
      columnOption: {
        legend: {},
        tooltip: {},

        dataset: {
          source: [
            ["product", "苹果", "羊肉", "红萝卜", "青菜", "菠萝"],
            ["1月", 43.3, 85.8, 93.7, 66.5, 59.4],
            ["2月", 83.1, 73.4, 55.1, 43.2, 54.5],
            ["3月", 86.4, 65.2, 82.5, 43.5, 45.8],
            ["4月", 72.4, 53.9, 39.1, 44.5, 66.4],
          ],
        },
        xAxis: { type: "category" },
      
        yAxis: {},

        series:[{type:'bar'},{type:'bar'},{type:'bar'},{type:'bar'}]
       
      },
    };
  },
  //获取柱状图的数据
  methods: {
    //获取商品数量
    getProductCount() {
      this.axios({
        method: "GET",
        url: this.baseUrl + "/count",
        params: {},
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
        if (result.data.status == 1080) {
          let count = result.data.result[0].count;
          this.getclomnData(count);
        }
      });
    },
    getclomnData(count) {
      console.log("test==>", count);
      let date = new Date();
      let start = date.getFullYear() + "-" + "1" + "-" + "1";
      let end =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.axios({
        method: "GET",
        url: this.baseUrl + "/search",
        params: {
          offset: 0,
          count,
          start,
          end,
        },
        headers: {
          token: document.cookie,
        },
      }).then((result) => {
        if (result.data.status == 1034) {
          this.$message({
            message: "请先登录",
            type: "error",
          });
          return this.$router.push({ name: "Login" });
        }
        if (result.data.status == 1070) {
          let data = result.data.result;

          if(data.length<=0){
             return  
          }
          // let source=JSON.parse( JSON.stringify(this.columnOption.dataset.source))
          let source = [];
          let series=[]
          let date = new Date();
          let currentMonth = date.getMonth() + 1;
          
          for (let index = 0; index <= currentMonth; index++) {
            let arr = [];
            if (index==0) {
              arr.push(this.title);
              data.map((v) => {
                arr.push(v.name);
              });
            } else {
              arr.push(index + "月");
              series.push({ type: "bar" })

              data.map((v) => {
              
              if(new Date(v.updated_at).getMonth()+1==index){
        
                  arr.push(Number(v.sale_count))
              }else{
                  arr.push(10)
              }
              });
            }

            source.push(arr);
          }
          let dataset={source}

          this.columnOption.dataset=dataset
          this.columnOption.series=series
        }
      });
    },
  },

  components: {
    ColumnChart,
  },
};
</script>

<style lang="less" scoped>
 


</style>

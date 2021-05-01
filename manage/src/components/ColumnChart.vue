<template>
  <div class="column_chart">

  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    props:{
       columnOption:{
            type:Object,
            default(){
                return{
                    
                }
            }
        }
    },
    name:'ColumnChart',
    data() {
        return {
             
        }
     },
     mounted() {
    // 基于准备好的dom，初始化echarts实例
    setTimeout(()=>{
    var myChart = echarts.init(document.querySelector(".column_chart"));
    this.columnOption && myChart.setOption(this.columnOption);
    },1000)
    
     },
    }
</script>

<style lang="less" scoped>
 .column_chart{
     width: 100%;
     height: 100%
 }
</style>

<template>
  <div>
    <Appbar></Appbar>
    <el-table
      :data="tableData"
      height="400"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nums"
        label="集数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="play"
        label="播放量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="score"
        label="评分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="label"
        label="类型">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import Appbar from '../components/Appbar.vue'
//  // 引入基本模板
//  let echarts = require('echarts/lib/echarts');
//  // 引入柱状图组件
//  require("echarts/lib/chart/bar");
//  // 引入提示框和title组件
//  require('echarts/lib/component/tooltip')
//  require('echarts/lib/component/title')
  export default {
    components: {Appbar},
    data (){
      return {
        timex:this.$route.params.id,
        tableData:[]
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('/test.php?type=time&value='+this.timex, null, json=>{
          json.forEach((item,index)=> {
            this.tableData.push({
              name:item["name"],
              nums:item["nums"],
              play:item["play"],
              score:item["score"],
              label:item["label"]
            });
          });
        });
      }
    }
  }

</script>

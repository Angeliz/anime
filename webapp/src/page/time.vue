<template>
  <div>
    <Appbar></Appbar>
    <el-row >
      <el-col  :md="11" >
        <div class="grid-content bg-purple">
          <div id="xChart" style="width: 100%;height: 500px;" ></div>
        </div>
      </el-col>
      <el-col  :md="12" >
        <div class="grid-content bg-purple">
          <div id="playChart" style="width: 100%;height: 500px;" ></div>
        </div>
      </el-col>
    </el-row>

    <!--<el-row >-->
      <!--<el-col  :md="12" >-->
        <!--<div class="grid-content bg-purple">-->
          <!--<div id="labelChart" style="width: 100%;height: 500px;"></div>-->
        <!--</div>-->
      <!--</el-col>-->
      <!--<el-col  :md="12" >-->
        <!--<div class="grid-content bg-purple-light">-->
          <!--<div id="scoreChart" style="width: 100%;height: 500px;"></div>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->
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
    </el-table >
  </div>
</template>
<script>
  import Appbar from '../components/Appbar.vue'
//  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
//  // 引入柱状图组件
  require("echarts/lib/chart/bar");
//  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
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
        this.tableData=[];
        this.$api.get('/test.php?type=time&value=all',null,r=>{
          let sumPlay=0;
          let xTime=0;
          r.forEach((item,index)=>{
            sumPlay=sumPlay+parseInt(item["sum(play)"]);
            if(item["time"]===this.timex){
              xTime=parseInt(item["sum(play)"]);
            }
          });
          let xChart = echarts.init(document.getElementById('xChart'));
          xChart.showLoading();
          let xOption={
            title : {
              text: '播放量占比',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
              {
                name: '播放量（万）',
                type: 'pie',
                radius : '55%',
                data:[
                  {value:xTime, name:this.$route.params.id},
                  {value:sumPlay, name:'其他'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          xChart.hideLoading();
          xChart.setOption(xOption);
        });

        this.$api.get('/test.php?type=time&value='+this.$route.params.id, null, json=>{
          let playList=[];
          let playValue=[];

          //列表数据
          json.forEach((item,index)=> {
            this.tableData.push({
              name:item["name"],
              nums:item["nums"],
              play:item["play"],
              score:item["score"],
              label:item["slabel"]
            });
            if (index<10){
              playList.push(item["name"]);
              playValue.push(item["play"]);
            }
          });

          let playChart = echarts.init(document.getElementById('playChart'));
          playChart.showLoading();
          let playOption={
            title : {
              text: '当年播放量前10的动漫',
              x:'center'
            },
            xAxis: {
              type: 'category',
              data: playList,
              axisLabel:{
                interval: 0,
                rotate:40
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: playValue,
              type: 'bar'
            }]
          };
          playChart.hideLoading();
          playChart.setOption(playOption);
          playChart.on('click', (params) => {
            window.location.assign("#/self/"+params["name"]);
          });


        });
      }
    },
    watch: {
      '$route'(to, from) {
        console.log(to);
        console.log(from);
        console.log(this.$route.params.id);
      }
    }
  }

</script>

<template>
  <div>
    <Appbar></Appbar>
    <div id="timeChart" style="width:100%;height: 500px;"></div>
    <el-row >
      <el-col  :md="12" >
        <div class="grid-content bg-purple">
          <div id="labelChart" style="width: 100%;height: 500px;"></div>
        </div>
      </el-col>
      <el-col  :md="12" >
        <div class="grid-content bg-purple-light">
        </div>
      </el-col>
    </el-row>

    <el-row >
      <el-col  :md="12" >
        <div class="grid-content bg-purple">
          <div id="playChart" style="width: 100%;height: 500px;"></div>
        </div>
      </el-col>
      <el-col  :md="12" >
        <div class="grid-content bg-purple-light">
          <el-table
            :data="playData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="排名"
              width="50px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="play"
              label="播放量">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div style="height: 15px;"></div>
    <el-row >
      <el-col  :md="12" >
        <div class="grid-content bg-purple">
          <div id="scoreChart" style="width: 100%;height: 500px;"></div>
        </div>
      </el-col>
      <el-col  :md="12" >
        <div class="grid-content bg-purple-light">
          <el-table
            :data="scoreData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="排名"
              width="50px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="score"
              label="评分">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Appbar from '../components/Appbar.vue'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require("echarts/lib/chart/bar");
  require("echarts/lib/chart/pie");
  require("echarts/lib/chart/line");
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/toolbox')
  export default {
    components: {Appbar},
    data() {
      return {
        data:'',
        playData:[],
        scoreData:[]
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine() {
        let timeChart = echarts.init(document.getElementById('timeChart'));
        timeChart.showLoading();
        this.$api.get('/test.php?type=time&value=all', null, json=>{
          let xtime=[];
          let ytime=[];
          json.forEach(function (item,index) {
            if(item["time"].includes("19")||item["time"].includes("20")){
              xtime.push(item["time"]);
              ytime.push(parseInt(item["sum(play)"]))
            }
          });
          let timeOption = {
            title : {
              text: '各年份国漫播放量',
              x:'center'
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: 'category',
              data: xtime,
              axisTick: {
                alignWithLabel: true
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name:'播放总量(万)',
              data: ytime,
              type: 'bar'
            }]
          };
          timeChart.hideLoading();
          timeChart.setOption(timeOption);

          timeChart.on('click', (params) => {
            window.location.assign("#/time/"+params["name"]);
          });
        });

        let labelChart = echarts.init(document.getElementById('labelChart'));
        labelChart.showLoading();
        this.$api.get('/test.php?type=label&value=all', null, json=>{
          let label=[];
          let count=[];
          json.forEach(function (item,index) {
            if(parseInt(item["count"])>50){
              label.push(item["label"]);
              count.push({
                name:item['label'],
                value:parseInt(item["count"])

              });
            }
          });
          let labelOption = {
            title : {
              text: '各类型国漫数量',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : true,
            series : [
              {
                name:'国漫数量',
                type:'pie',
                roseType : 'area',
                data:count
              }
            ]
          };
          labelChart.hideLoading();
          labelChart.setOption(labelOption);
          labelChart.on('click', (params) => {
            window.location.assign("#/label/"+params["name"]);
          });
        });

        let playChart = echarts.init(document.getElementById('playChart'));
        playChart.showLoading();
        this.$api.get('/test.php?type=play&value=10', null, json=>{
          let name=[];
          let play=[];
          json.forEach((item,index)=> {
            name.push(item["name"]);
            play.push(item["play"]);
            index++;
            this.playData.push({
              id:index,
              name:item["name"],
              play:item["play"]
            })
          });
          let playOption = {
            title : {
              text: '播放量前10的动漫',
              x:'center'
            },
            xAxis: {
              type: 'category',
              data: name,
              axisLabel:{
                interval: 0,
                rotate:40
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: play,
              type: 'bar'
            }]
          };
          playChart.hideLoading();
          playChart.setOption(playOption);
          playChart.on('click', (params) => {
            window.location.assign("#/self/"+params["name"]);
          });
        });

        let scoreChart = echarts.init(document.getElementById('scoreChart'));
        scoreChart.showLoading();
        this.$api.get('/test.php?type=score&value=10', null, json=>{
          let name=[];
          let score=[];
          json.forEach((item,index)=> {
            name.push(item["name"]);
            score.push(item["score"]);
            index++;
            this.scoreData.push({
              id:index,
              name:item["name"],
              score:item["score"]
            })
          });
          let scoreOption = {
            title : {
              text: '评分前10的动漫',
              x:'center'
            },
            xAxis: {
              type: 'category',
              data: name,
              axisLabel:{
                interval: 0,
                rotate:40
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: score,
              type: 'line',
              symbol: 'triangle',
              symbolSize: 20,
              lineStyle: {
                normal: {
                  color: 'green',
                  width: 4,
                  type: 'dashed'
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: 'yellow',
                  color: 'blue'
                }
              }
            }]
          };
          scoreChart.hideLoading();
          scoreChart.setOption(scoreOption);
          scoreChart.on('click', (params) => {
            window.location.assign("#/self/"+params["name"]);
          });
        });
      }
    }
  }
</script>


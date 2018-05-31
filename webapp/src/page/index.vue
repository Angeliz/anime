<template>
  <div>
    <Appbar></Appbar>
    <div id="timeChart" style="width:100%;height: 600px;"></div>
  </div>
</template>
<script>
  import Appbar from '../components/Appbar.vue'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require("echarts/lib/chart/bar");
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    components: {Appbar},
    data() {
      return {
        data:''
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine() {
        let timeChart = echarts.init(document.getElementById('timeChart'));
        timeChart.showLoading();
        let xtime=[];
        let ytime=[];
        this.$api.get('/test.php?type=time&value=all', null, json=>{
          json.forEach(function (item,index) {
            if(item["time"].includes("19")||item["time"].includes("20")){
              xtime.push(item["time"]);
              ytime.push(parseInt(item["sum(play)"]))
            }
          });
          console.log(xtime);
          console.log(ytime);
          let timeOption = {
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
      }
    }
  }
</script>


<template>
  <div>
    <Appbar></Appbar>
    <el-row >
      <el-col  :md="6" >
        <div class="grid-content bg-purple">
          <div class="mdui-card" style="margin: 0 10px">
            <!-- 卡片的标题和副标题 -->
            <div class="mdui-card-primary">
              <div class="mdui-card-primary-title" >{{this.namex}}</div>
              <div class="mdui-card-primary-subtitle" >{{this.time}}</div>
            </div>
            <!-- 卡片的内容 -->
            <div class="mdui-card-content" v-for="i in list" >{{i}}</div>
          </div>
        </div>
      </el-col>
      <el-col  :md="8" >
        <div class="grid-content bg-purple-light">
          <div id="playChart" style="width: 100%;height: 500px;" ></div>
        </div>
      </el-col>
      <el-col  :md="9" >
        <div class="grid-content bg-purple-light">
          <div id="labelChart" style="width: 100%;height: 500px;" ></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Appbar from '../components/Appbar.vue'
  // 引入基本模板
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require("echarts/lib/chart/pie");
  require("echarts/lib/chart/radar");
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    components: {Appbar},
    data (){
      return {
        data:'',
        namex:this.$route.params.id,
        list:[],
        time:""
      }
    },
    created () {
      this.getData();
    },
    methods: {
      getData () {
//        this.list=[];
//        this.time="";
//        console.log(this.$route.params.id);
        this.$api.get('/test.php?type=self&value='+this.$route.params.id, null, json=>{
          var playChart = echarts.init(document.getElementById("playChart"));
          playChart.showLoading();
          var labelChart = echarts.init(document.getElementById("labelChart"));
          labelChart.showLoading();

          let playList=[];
          let labelList=[];
          let labelList0=[];
          let labelValue=[];

          json[0]["time"].includes("19")||json[0]["time"].includes("20")?this.time=json[0]["time"]:this.time="年份还未知哦";
          let nums="";
          let play="";
          let score="";
          let description="";
          json[0]["nums"]?nums="集数："+json[0]["nums"]:nums="集数：暂时没有数据哦";
          json[0]["play"]?play="播放量（万）："+json[0]["play"]:play="播放量（万）：暂时没有数据哦";
          json[0]["score"]?score="评分："+json[0]["score"]:score="评分：暂时没有数据哦";
          json[0]["description"]?description="简介："+json[0]["description"]:description="简介：暂时没有数据哦";
          this.list.push(nums);
          this.list.push(play);
          this.list.push(score);
          this.list.push(description);

          playList.push({
            name:"tencent",
            value:parseInt(json[0]["tplay"])

          });
          playList.push({
            name:"bilibili",
            value:parseInt(json[0]["bplay"])

          });
          playList.push({
            name:"iqiyi",
            value:parseInt(json[0]["iplay"])
          });
          let playOption = {
            title : {
              text: '播放比例',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : true,
            series : [
              {
                name:'播放量',
                type:'pie',
                roseType : 'area',
                data:playList
              }
            ]
          };

          playChart.hideLoading();
          playChart.setOption(playOption);

          let label=json[0]["label"].split("，");
          for(let i=0;i<label.length;i++){
            let ob={
              name: label[i],
              max:3
            };
            let index=labelList0.indexOf(label[i]);
//            let index=JSON.stringify(labelList).indexOf(JSON.stringify(ob));
            if(index<0){
              labelList.push(ob);
              labelList0.push(label[i]);
              labelValue.push(1);
            }else{
              labelValue[index]++;
            }
          }
          let labelOption = {
            title : {
              text: '类型',
              x:'center'
            },
            radar: {
              name: {
                textStyle: {
                  color: 'white',
                  backgroundColor: "black",
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              indicator: labelList
            },
            series: [{
              type: 'radar',
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data : [
                {
                  value : labelValue,
                  name : labelList
                }
              ]
            }]
          };
          labelChart.hideLoading();
          labelChart.setOption(labelOption);
//          labelChart.on('click', (params) => {
//
//          });
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

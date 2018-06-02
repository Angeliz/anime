<template>
  <div>
    <Appbar></Appbar>
    <el-row >
      <el-col  :md="6" >
        <div class="grid-content bg-purple">
          <div class="mdui-card" style="margin: 0 10px">
            <!-- 卡片的标题和副标题 -->
            <div class="mdui-card-primary">
              <div class="mdui-card-primary-title">{{this.namex}}</div>
              <div class="mdui-card-primary-subtitle">{{this.time}}</div>
            </div>
            <!-- 卡片的内容 -->
            <div class="mdui-card-content" v-for="i in list">{{i}}</div>
            <!-- 卡片的按钮 -->
            <!--<div class="mdui-card-actions">-->
              <!--<button class="mdui-btn mdui-ripple">action 1</button>-->
            <!--</div>-->

          </div>
        </div>
      </el-col>
      <el-col  :md="18" ><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
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
        namex:this.$route.params.id,
        list:[],
        time:"",
//        labelList:[]
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('/test.php?type=self&value='+this.namex, null, json=>{
          json[0]["time"].includes("19")||json[0]["time"].includes("20")?this.time=json[0]["time"]:this.time="年份还未知哦";
          let nums="";
          let play="";
          let score="";
          let actor="";
          let description="";
          json[0]["nums"]?nums="集数："+json[0]["nums"]:nums="集数：暂时没有数据哦";
          json[0]["play"]?play="播放量（万）："+json[0]["play"]:play="播放量（万）：暂时没有数据哦";
          json[0]["score"]?score="评分："+json[0]["score"]:score="评分：暂时没有数据哦";
          json[0]["actor"]?actor="配音："+json[0]["actor"]:actor="配音：暂时没有数据哦";
          json[0]["description"]?description="简介："+json[0]["description"]:description="简介：暂时没有数据哦";
          this.list.push(nums);
          this.list.push(play);
          this.list.push(score);
          this.list.push(actor);
          this.list.push(description);
        });
      }
    }
  }

</script>

<template>
  <div style="margin-bottom: 10px">
    <div class="mdui-toolbar mdui-color-black mdui-container-fluid" style="height: 61px">
      <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">menu</i></a>
      <a href="javascript:;" class="mdui-typo-title">Angeliz</a>
      <div class="mdui-toolbar-spacer"></div>
      <div class="mdui-col-md-5" style="margin: auto 0">
        <div class="mdui-textfield mdui-textfield-expandable mdui-float-right ">
          <button class="mdui-textfield-icon mdui-btn mdui-btn-icon" mdui-tooltip="{content: '查询'}"><i class="mdui-icon material-icons">search</i></button>
          <input class="mdui-textfield-input mdui-text-color-white" type="text" placeholder="名称、类型、年份" v-model="input" @keyup.enter="search"/>
          <button class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">close</i></button>
        </div>
      </div>
      <a href="https://github.com/Angeliz/anime" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: '查看 Github'}">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" class="mdui-icon" style="width: 24px;height:24px;">
              <path fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff" d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5
        c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1
        c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4
        c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7
        c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5
        c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"></path>
            </svg>
      </a>
    </div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color='black'
      text-color="#fff"
      active-text-color="#E91E63"
      router = true>
      <el-menu-item index="/index" style="font-size: 15px;width: 130px;text-align: center;">首页</el-menu-item>
      <!--<el-menu-item index="/surprise" style="font-size: 15px;width: 130px;text-align: center">彩蛋</el-menu-item>-->
      <el-menu-item index="/introduce" style="font-size: 15px;width: 130px;text-align: center">关于本站</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: this.$route.path,
        input:''
      };
    },
    methods:{
      search(){
        if(this.input.includes("19")||this.input.includes("20")){
          window.location.assign("#/time/"+this.input);
        }else {
          let labelList=[ "周边",
            "益智",
            "青春",
            "亲子",
            "番剧",
            "Cosplay",
            "真人",
            "原创",
            "传媒大学作品",
            "短片",
            "搞笑",
            "热血",
            "励志",
            "国漫",
            "ACG",
            "特别版",
            "动作",
            "冒险",
            "剧情",
            "悬疑",
            "科幻",
            "战斗",
            "声控",
            "动态漫",
            "都市",
            "治愈",
            "竞技",
            "出品",
            "奇幻",
            "猎奇",
            "日常",
            "童话",
            "教育",
            "魔幻",
            "漫改",
            "武侠",
            "古风",
            "经典",
            "历史",
            "战争",
            "古代",
            "时泪",
            "致郁",
            "少儿",
            "怀旧",
            "电影版",
            "恋爱",
            "校园",
            "儿童益智",
            "玄幻",
            "同人",
            "惊悚",
            "侦探",
            "神话",
            "神魔",
            "TV版",
            "7-13",
            "宠物",
            "机战",
            "魔法",
            "萌系",
            "言情",
            "LOLI",
            "14-17",
            "电影学院作品",
            "推理",
            "泡面",
            "特摄",
            "动画电影",
            "少女",
            "未来",
            "音乐",
            "体育",
            "偶像",
            "百合",
            "智斗",
            "游戏改",
            "后宫",
            "催泪",
            "OVA版",
            "装逼",
            "基腐",
            "剧场版",
            "运动",
            "萝莉",
            "儿童搞笑",
            "少年",
            "少儿经典",
            "社团",
            "布袋戏",
            "美食" ];
          if(labelList.includes(this.input)){
            window.location.assign("#/label/"+this.input);
          }else {
            window.location.assign("#/self/"+this.input);
          }
        }
      }
    }
  }
</script>


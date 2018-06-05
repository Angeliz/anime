<template>
  <div style="margin-bottom: 10px">
    <div class="mdui-toolbar mdui-color-black mdui-container-fluid" style="height: 61px">
      <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">menu</i></a>
      <a href="javascript:;" class="mdui-typo-title">Angeliz</a>
      <div class="mdui-toolbar-spacer"></div>
      <div class="mdui-col-md-5">
        <div class="mdui-textfield mdui-textfield-expandable mdui-float-right ">
          <button class="mdui-textfield-icon mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></button>
          <input class="mdui-textfield-input mdui-text-color-white" type="text" placeholder="年份、番剧名" v-model="input" @keyup.enter="search"/>
          <button class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">close</i></button>
        </div>
      </div>
    </div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color='black'
      text-color="#fff"
      active-text-color="#2196F3"
      router = true>
      <el-menu-item index="/" style="font-size: 15px;width: 130px;text-align: center;">首页</el-menu-item>
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
//          window.location.replace("#/time/"+this.input);
          window.location.assign("#/time/"+this.input);
//          window.location.href="http://www.angeliz.info/#/time/"+this.input;
        }else {
//          window.location.replace("#/self/"+this.input);
          window.location.assign("#/self/"+this.input);
//          window.location.href="http://www.angeliz.info/#/self/"+this.input;
        }
      }
    }
  }
</script>


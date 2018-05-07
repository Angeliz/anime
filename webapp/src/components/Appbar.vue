<template>
  <div
    :default-active="activeIndex"
    class="mdui-appbar"
    router = true>
    <div class="mdui-toolbar mdui-color-black mdui-container-fluid">
      <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">menu</i></a>
      <a href="javascript:;" class="mdui-typo-title">Angeliz</a>
      <div class="mdui-toolbar-spacer"></div>
      <!--<a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></a>-->
      <div class="mdui-col-md-5">
        <div class="mdui-textfield mdui-textfield-expandable mdui-float-right ">
          <button class="mdui-textfield-icon mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></button>
          <input class="mdui-textfield-input mdui-text-color-white" type="text" placeholder="Search" />
          <button class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">close</i></button>
        </div>
      </div>

      <!--<a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">refresh</i></a>-->
      <!--<a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">more_vert</i></a>-->
    </div>
    <div class="mdui-tab mdui-color-black" mdui-tab>
      <a href="#/anime" class="mdui-ripple mdui-ripple-white">首页</a>
      <a href="#/anime/introduce" class="mdui-ripple mdui-ripple-white">关于本站</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: this.$route.path
    }
  }
}
</script>

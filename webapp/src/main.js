// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueRouter from 'vue-router'

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false

// 按需引入element组件
import {  Menu,Submenu,MenuItem, Row,Col, Container,Header,Aside,Main,Footer, Card, Button, Select, Tabs,TabPane, Tag, Input,Icon, Table,TableColumn} from 'element-ui'
//element
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)

Vue.component(Card.name, Card)

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)

Vue.component(Tag.name, Tag)

Vue.component(Input.name, Input)
Vue.component(Icon.name, Icon)

Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // VueRouter,
  router,
  components: { App },
  template: '<App/>'
});

//公共css文件

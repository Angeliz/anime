import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import OtherIndex from '@/otherpage/index'
// import PoetCatalog from '@/page/poetcatalog'
// import PoetRelation from '@/page/poetrelation'
// import PoetWay from '@/page/poetway'
// import PoetCard from '@/page/poetcard'
// import PoetInfo from '@/page/poetinfo'
// import PoemInfo from '@/page/poeminfo'
// import PoemCard from '@/page/poemcard'
import Self from '@/page/self'
import Time from '@/page/time'
import Introduce from '@/page/introduce'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: OtherIndex
    // },
    {
      path: '/',
      component: Index
    // }, {
    //   path: '/poetcatalog',
    //   component: PoetCatalog
    // },{
    //   path: '/poetrelation',
    //   component: PoetRelation
    // },{
    //   path: '/poetcard',
    //   component: PoetCard
    // },{
    //   path: '/poetinfo/:id',
    //   component: PoetInfo
    // },{
    //   path: '/poetway',
    //   component: PoetWay
    // },{
    //   path: '/poemcard',
    //   component: PoemCard
    // },{
    //   path: '/poeminfo/:id',
    //   component: PoemInfo
    },{
      path: '/self/:id',
      component: Self
    },{
      path: '/time/:id',
      component: Time
    },{
      path: '/introduce',
      component: Introduce
    }
  ]
})

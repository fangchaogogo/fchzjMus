import Vue from 'vue'
import Router from 'vue-router'
import MucList from '../components/mucList/mucList'
import Classify from '../components/class/class'
import Search from '../components/search/search'
import ClassList from '../components/classList/classList'
// import Detail from '../components/mucDetail/mucDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MucList
    },
    {
      path: '/class',
      component: Classify
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/classList',
      component: ClassList
    }
  ]
})

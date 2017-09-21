// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Common from './common/js/common';
import Icon from 'vue-awesome/components/Icon'
import Swiper from 'wc-swiper';
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import './common/css/reset.css'
import './common/css/set_screen.css'
import 'wc-swiper/style.css'
// or import all icons if you don't care about bundle size
Vue.component('icon', Icon);
Vue.use(Common);
Vue.use(Swiper);

/* Register component with one of 2 methods */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

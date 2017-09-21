<template>
  <transition name="move">
    <div v-show="boo" class="mucList-content">
      <div class="mucList-bg"></div>
      <div class="banner-box">
        <v-banner></v-banner>
      </div>
      <v-rec @playMuc="playMuc"></v-rec>
    </div>
  </transition>
</template>

<script>
  import $ from '../../../static/js/jq'
  import Banner from '../banner/banner'
  import Rec from '../rec/rec'
//  let err_code = 22000;
  export default {
    data () {
      return {
        mucList: {},
        boo: false
      };
    },
    mounted () {
      this.$emit('setNav', 0);
      this.boo = true;
    },
    methods: {
      playMuc (item, playList, index) {
        this.$emit('playMuc', item, playList, index);
      }
    },
    components: {
//      'v-header': Header,
      'v-banner': Banner,
      'v-rec': Rec
    }
  };
</script>

<style scoped>
  .mucList-content{
    position:relative;
    transition:all .5s;
    z-index:2;
  }
  .banner-box{
    background:rgba(0,0,0,.7);
    padding:30px 0;
  }
  .move-enter-to,.move-leave-active{
    left:0;
  }
  .move-enter,.move-leave-to{
    left:100%;
  }
</style>

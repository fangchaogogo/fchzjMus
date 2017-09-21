<template>
  <div id="app">
    <v-header @getSearch="getSearch" ref="header"></v-header>
      <router-view @playMuc="playMuc" @setNav="setNav" @openClassList="openClassList" ref="mucList"></router-view>
    <div class="contrl-box">
      <v-play ref="playContrl"></v-play>
    </div>
  </div>
</template>

<script>
  import Header from './components/header/header';
  import Vue from 'vue';
  import Play from './components/playContrl/playContrl'
  export default {
    data () {
      return {};
    },
    methods: {
      setNav (index) {
        this.$refs.header.setNav(index);
      },
      getSearch (item, playList) {
        this.$refs.mucList.setMucList(item, playList);
      },
      openClassList (type, title) {
        let that = this;
        setTimeout(function() {
          that.$refs.mucList.classList(type, title);
        },500);
      },
      playMuc (item, playList, index) {
        this.$refs.playContrl.playMuc(item, playList, index);
      }
    },
    components: {
      'v-header': Header,
      'v-play': Play
    }
  }
</script>

<style>
  div.hide-scroll{
    position:fixed !important;
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .app-bg{
    background:rgba(0,0,0,.5);
  }
  .mucList-bg{
    position:fixed;
    width:100%;
    /*height:100%;*/
    top:0;
    left:0;
    bottom:0;
    z-index:-1;
    background:url('http://pic1.win4000.com/mobile/f/53ba6bdc0a052.jpg');
    background-size:100% 100%;
  }
  .loading-bg{
    position:fixed;
    width:100%;
    top:50px;
    bottom:70px;
    background:#000;
    transition:all .5s;
    z-index:-1;
  }
  .contrl-box{
    width:100%;
    height:70px;
    position:fixed;
    bottom:0;
    z-index:11;
    /*background:red;*/
  }
  .move-enter-to,.move-leave-active{
    left:0;
  }
  .move-enter,.move-leave-active{
    left:100%;
  }
  .message-box,.loading-box{
    position:fixed;
    width:100%;
    height:100%;
    z-index:100;
    top:0;
    left:0;
    display:none;
  }
  .message,.loading{
    position:absolute;
    width:100%;
    height:100%;
    z-index:100;
    background:rgba(0,0,0,.2);
  }
  .mes{
    width:150px;
    height:80px;
    border-radius:5px;
    text-align:center;
    line-height:80px;
    font-size:18px;
    color:#fff;
    background:rgba(0,0,0,.5);
    position:absolute;
    left:50%;
    margin-left:-75px;
    top:30%;
  }
  .load{
    width:60px;
    height:60px;
    position:absolute;
    left:50%;
    margin-left:-30px;
    top:35%;
  }
</style>

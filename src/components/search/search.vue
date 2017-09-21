<template>
  <div>
    <transition name="move">
      <div v-show="boo" class="muc-box search-box">
        <div class="mucList-bg"></div>
        <div class="title">
          <router-link to="/">
            <div class="back">
              <img src="../../../static/images/back3.png" width="100%" height="100%" alt="">
            </div>
          </router-link>
          搜索结果
        </div>
        <div class="muc-list-box">
          <div @click="play(item, k)" v-for="(item, k) in mucList" :key="k" class="muc-list">
            <div class="muc-title">{{item.songname}}</div>
            <div class="author">{{item.artistname}}</div>
          </div>
          <div v-if="playList.length>0" style="width:100%;height:60px;"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Play from '../playContrl/playContrl'
  export default {
    data () {
      return {
        boo: false,
        mucList: {},
        playList: []
      };
    },
    mounted () {
      this.boo = true;
    },
    methods: {
      setMucList (item, playList) {
        this.mucList = item;
        this.playList = playList;
      },
      play (item, k) {
        item.song_id = item.songid;
        this.$emit('playMuc', item, this.playList, k);
      }
    },
    components: {
      'v-play':Play
    }
  };
</script>

<style scoped>
  .muc-box{
    position:absolute;
    width:100%;
    top:0px;
    transition:all .5s;
    z-index:3;
    /*background:url('../../../static/images/bg2.png');*/
  }
  .title{
    height:50px;
    width:100%;
    color:#fff;
    position:relative;
    text-align:center;
    font-size:18px;
    line-height:50px;
    font-weight:700;
    background:#333;
  }
  .back{
    width:30px;
    height:30px;
    position:absolute;
    top:10px;
    left:10px;
  }
  .play-contrl{
    position:fixed;
    bottom:0;
    height:70px;
    width:100%;
  }
  .muc-list{
    background:rgba(0,0,0,.5);
    margin-bottom:10px;
  }
  .muc-title{
    font-size:16px;
    line-height:40px;
    color:#fff;
    padding-left:30px;
  }
  .author{
    font-size:14px;
    color:#ccc;
    line-height:30px;
    padding-left:20px;
  }
  .move-enter-to,.move-leave-active{
    left:0;
  }
  .move-enter,.move-leave-active{
    left:100%;
  }
</style>

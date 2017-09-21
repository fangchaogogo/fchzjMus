<template>
  <div class="rec-bg">
    <div class="rec-title">
      <div>{{title}}</div>
    </div>
    <div class="rec-list-box">
      <div @click="playMuc(item,k)" v-for="(item, k) in recList" :key="k" class="rec-list clear-fix">
        <div class="img-box">
          <img :src="item.pic_small" width="100%" height="100%" alt="">
        </div>
        <div class="rec-list-right">
          <div class="muc-title">{{item.title}}</div>
          <div class="author">{{item.author}}</div>
          <div class="muc-des">{{item.album_title}}</div>
        </div>
      </div>
    </div>
    <div style="width:100%;height:65px;"></div>
  </div>
</template>

<script>
  let err_code = 22000;
  export default {
    data () {
      return {
        recList: {},
        playList: [],
        title: '今日推荐'
      };
    },
    created () {
      let that = this;
      this.getAjax({
        method: 'baidu.ting.song.getRecommandSongList',
        song_id: 877578,
        num: 50
      }, function(data) {
        if(data.error_code === err_code) {
          that.recList = data.result.list;
          for(let index in that.recList) {
            that.playList.push(that.recList[index].song_id);
          }
//          console.log(that.recList);
        }
        that.hideLoad();
      });
    },
    methods: {
      playMuc (item, k) {
        this.$emit('playMuc', item, this.playList, k);
      },
      setMucList (item, playList) {
        this.recList = item;
        this.playList = playList;
//        console.log(this.recList);
      }
    }
  };
</script>

<style scoped>
  .rec-bg{
    background:rgba(0,0,0,.2);
  }
  .rec-title{
    font-size:16px;
    line-height:50px;
    padding-left:20px;
    color:#fff;
  }
  .rec-list{
    width:100%;
    height:100px;
    background:rgba(0,0,0,.4);
    font-size:16px;
    margin-bottom:5px;
  }
  .img-box{
    width:80px;
    height:80px;
    position:relative;
    float:left;
    top:10px;
    left:10px;
  }
  .img-box img{
    display:block;
    border-radius:5px;
  }
  .rec-list-right{
    overflow:hidden;
    height:100px;
    color:#fff;
  }
  .muc-title{
    padding-left:20px;
    /*line-height:px;*/
    padding-top:10px;
    width:220px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .author{
    font-size:14px;
    color:#ccc;
    padding-left:30px;
    line-height:40px;
  }
  .muc-des{
    padding-left:20px;
    width:220px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size:14px;
    color:#ccc;
    line-height:20px;
  }
</style>

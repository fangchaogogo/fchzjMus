<template>
  <div>
    <div>
      <div class="contrl-box clear-fix">
        <div @click="openDetail" class="contrl-left">
          <img :src="imgUrl" width="100%" height="100%" alt="">
        </div>
        <div class="contrl-right clear-fix">
          <div class="muc-info">
            <div class="muc-title">{{title}}</div>
            <div class="muc-author">{{author}}</div>
          </div>
          <div class="btn-box clear-fix">
            <div @click="prev" class="prev">
              <img src="../../../static/images/prev.png" width="100%" height="100%" alt="">
            </div>
            <div v-if="toggleBoo" @click="pause" class="play">
              <img src="../../../static/images/play.png" width="100%" height="100%" alt="">
            </div>
            <div v-else @click="start" class="play">
              <img src="../../../static/images/play2.png" width="100%" height="100%" alt="">
            </div>
            <div @click="next" class="next">
              <img src="../../../static/images/next.png" width="100%" height="100%" alt="">
            </div>
            <audio id="play" :src="url" style="position:absolute;left:0;top:0;z-index:-1;" autoplay ref="audio"></audio>
          </div>
        </div>
      </div>
    </div>
    <transition name="move">
      <v-detail v-show="boo" ref="detail"></v-detail>
    </transition>
  </div>
</template>

<script>
  import $ from '../../../static/js/jq';
  import Vue from 'vue';
  import Detail from '../mucDetail/mucDetail'
  let err_code = 22000;
  export default {
    data () {
      return {
        boo: false,
        mucInfo: {},
        imgUrl: 'http://www.fchany.com/app/images/x1.png',
        url: '',
        toggleBoo: true,
        title: '',
        author: '',
        playList: [],
        index: 0
      };
    },
    mounted () {
      let audio = document.querySelector('#play')
      let that = this;
      audio.ontimeupdate = function (e) {
        that.$refs.detail.setLrc(this.currentTime);
      }
    },
    methods: {
      playMuc (item, playList, index) {
        if(item.song_id == this.songid) {
          return;
        }
        this.index = index;
//        console.log(item);
        this.playList = playList;
//        console.log(playList);
        this.toggleBoo = false;
        this.songid = item.song_id
        this.getInfo(this.songid);
      },
      getInfo (id) {
        let that = this;
        this.getAjax({
          method: 'baidu.ting.song.play',
          songid: id
        }, function (data) {
//          console.log(data);
          if (data.error_code === err_code) {
            that.mucInfo = data;
//            console.log(that.mucInfo);
            that.url = that.mucInfo.bitrate.file_link;
            that.title = data.songinfo.title;
            that.author = data.songinfo.author;
            that.imgUrl = data.songinfo.pic_small || 'http://www.fchany.com/app/images/x1.png';
//            this.$refs.detail.getInfo(this.playList[this.index]);
            setTimeout(function () {
              that.$refs.detail.getInfo(that.playList[that.index]);
            }, 1000)
          }
          that.hideLoad();
        })
      },
      pause () {
        if (this.url === "") {
          return;
        }
        this.toggleBoo = false;
        this.$refs.audio.play();
      },
      start () {
        if (this.url === "") {
          return;
        }
        this.toggleBoo = true;
        this.$refs.audio.pause();
      },
      next () {
        this.index++;
        if (this.index > this.playList.length - 1) {
          this.index = this.playList.length - 1;
          return;
        }
        this.toggleBoo = false;
        this.getInfo(this.playList[this.index]);
      },
      prev () {
        this.index--;
        if (this.index < 0) {
          this.index = 0;
          return;
        }
        this.toggleBoo = false;
        this.getInfo(this.playList[this.index]);
        let that = this;
      },
      openDetail () {
        if(this.playList[0]) {
          this.boo = !this.boo;
          if (this.boo) {
            $('.mucList-content').addClass("hide-scroll");
            $('.class-list-box').addClass("hide-scroll");
            $('.search-box').addClass("hide-scroll");
            this.$refs.detail.getInfo(this.playList[this.index]);
          }else{
            $('.mucList-content').removeClass("hide-scroll");
            $('.class-list-box').removeClass("hide-scroll");
            $('.search-box').removeClass("hide-scroll");
          }
        }
      }
    },
    components: {
      'v-detail': Detail
    }
  };
</script>

<style scoped>
  .contrl-box {
    width: 100%;
    height: 70px;
    background: rgba(0, 0, 0, .9);
    box-shadow:-10px -10px 40px rgba(0, 0, 0, .9);
  }

  .contrl-left {
    width: 60px;
    height: 60px;
    float: left;
    position: relative;
    left: 4px;
    top: 5px;
  }

  .contrl-left img {
    display: block;
    border-radius: 5px;
  }

  .contrl-right {
    overflow: hidden;
    height: 70px;
    font-size: 18px;
    color: #fff;
    position: relative;
  }

  .muc-info {
    width: 100px;
    height: 70px;
    margin-left: 20px;
  }

  .muc-title, .muc-author {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 35px;
  }

  .muc-author {
    font-size: 14px;
    color: #ccc;
  }

  .btn-box {
    position: absolute;
    top: 18px;
    right: 20px;
  }

  .btn-box > div {
    float: left;
    width: 35px;
    height: 35px;
    margin-left: 10px;
  }
</style>

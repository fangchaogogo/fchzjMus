<template>
  <div>
    <transition name="move">
      <div v-show="boo" class="class-list-box">
        <div class="mucList-bg"></div>
        <div v-if="mucList[0]" class="title">
          {{title}}
        </div>
        <div class="rec-bg">
          <div class="rec-list-box">
            <div @click="playMuc(item,k)" v-for="(item, k) in mucList" :key="k" class="rec-list clear-fix">
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
          <div v-if="mucList[0]" style="width:100%;height:65px;"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        boo: false,
        mucList: {},
        title: '',
        playList: []
      };
    },
    mounted () {
      this.boo = true;
      this.$emit('setNav', 1);
    },
    methods: {
      classList (type, title) {
        this.title = title;
        let that = this;
        this.getAjax({
          method: 'baidu.ting.billboard.billList',
          type: type,
          size: 100,
          offset: 0
        }, function(data) {
          that.mucList = data.song_list;
//          console.log(that.mucList);
          for(let index in that.mucList) {
            that.playList.push(that.mucList[index].song_id);
          }
          that.hideLoad();
        })
      },
      playMuc (item, k) {
        this.$emit('playMuc', item, this.playList, k);
      }
    }
  };
</script>

<style scoped>
  .class-list-box{
    transition:all .5s;
    position:absolute;
    background:red;
    z-index:1;
    width:100%;
  }
  .title{
    font-size:16px;
    line-height:50px;
    height:50px;
    padding-left:20px;
    color:#fff;
    background:rgba(0,0,0,.5);
  }

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

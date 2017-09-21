<template>
  <transition name="move">
    <div v-show="boo" class="class-box">
      <div class="mucList-bg"></div>
      <router-link to="/classList">
        <div @click="openClassList(item.type, item.title)" v-for="(item, k) in classList" class="class-list clear-fix">
          <div class="icon-box">
            <img :src="item.link" width="100%" height="100%" alt="">
          </div>
          <div class="list-right">
            <div class="title">{{item.title}}</div>
          </div>
        </div>
      </router-link>
      <div style="width:100%;height:65px;"></div>
    </div>
  </transition>
</template>

<script>
  let part = 'http://www.fchany.com/mucImg/';
  export default {
    data () {
      return {
        boo: false,
        classList: [
          {title: '新歌榜',type: 1, link: part + '1.png'},{title: '热歌榜',type: 2, link:  part + '2.png'},{title: '摇滚榜',type: 11, link: part + '3.png'},{title: '爵士',type: 12, link: part + '4.png'},{title: '流行',type: 16, link: part + '5.png'},{title: '欧美金曲榜',type: 21, link: part + '6.png'},{title: '经典老歌榜',type: 22, link: part + '7.png'},{title: '情歌对唱榜',type: 23, link: part + '8.png'},{title: '影视金曲榜',type: 24, link: part + '9.png'},{title: '网络歌曲榜',type: 25, link: part + '10.png'}
        ]
      };
    },
    mounted () {
      this.boo = true;
      this.$emit('setNav', 1);
    },
    methods: {
      openClassList (type, title) {
        this.$emit('openClassList', type, title);
      }
    }
  };
</script>

<style scoped>
  .class-box {
    position: relative;
    transition: all .5s;
    background-size:100% 100%;
  }
  .move-enter-to, .move-leave-active {
    left: 0;
  }

  .move-enter, .move-leave-to {
    left: 100%;
  }
  .class-list{
    height:70px;
    width:100%;
    background:rgba(0,0,0,.5);
    margin-bottom:5px;
  }
  .icon-box{
    float:left;
    width:50px;
    height:50px;
    position:relative;
    top:10px;
    left:20px;
  }
  .icon-box img{
    display:block;
    border-radius:5px;
    transform: scale(1.2);
  }
  .list-right{
    overflow:hidden;
    height:70px;
  }
  .title{
    margin-left:40px;
    font-size:18px;
    font-weight:700;
    line-height:70px;
    color:#eee;
  }
</style>

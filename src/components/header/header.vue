<template>
  <div>
    <div class="header-box clear-fix">
      <div v-for="(item, k) in headerList" :key="">
        <router-link :to="item.link">
          <div :class="{active:index === k}" class="header-list">
            {{item.title}}
          </div>
        </router-link>
      </div>
      <div class="search-box">
        <router-link to="/search">
          <div @click="search" class="search-btn"></div>
        </router-link>
        <input type="text" v-model="searchStr" class="search-inp">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        headerList: [
          {
            title: '乐库',
            link: '/'
          },
          {
            title: '分类',
            link: '/class'
          }
        ],
        index: 0,
        searchStr: '',
        mucList: {},
        playList: []
      };
    },
    methods: {
      setNav (index) {
        this.index = index;
      },
      search () {
        let that = this;
        this.getAjax({
          method: 'baidu.ting.search.catalogSug',
          query: this.searchStr
        }, function(data) {
          that.mucList = data.song;
//          console.log(data.song);
          for(let index in that.mucList) {
            that.playList.push(that.mucList[index].songid);
          }
          that.$emit('getSearch', that.mucList, that.playList);
        })
      }
    }
  };
</script>

<style scoped>
  .header-box {
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-weight:700;
    line-height: 50px;
    box-sizing:border-box;
    background:rgba(0,0,0,.5) url('http://pic1.win4000.com/mobile/f/53ba6bdc0a052.jpg');
    background-size:100% 100%;
    position:relative;
    z-index:10;
  }
  .header-list{
    color: #fff !important;
    float:left;
    padding:0 20px;
    text-align:center;
  }
  .search-box{
    overflow:hidden;
    height:40px;
    background:rgba(0,0,0,.5);
    position:relative;
    top:5px;
    border-radius:20px;
  }
  .search-btn{
    position:absolute;
    width:40px;
    height:40px;
    top:0px;
    left:10px;
    z-index:2;
  }
  .search-inp{
    display:block;
    position:relative;
    top:4px;
    width:80%;
    margin:0 auto;
    line-height:30px;
    font-size:15px;
    color:#fff;
    border-radius:15px;
    padding-left:30px;
    box-sizing:border-box;
    background:rgba(255,255,255,.2) url('http://www.fchany.com/mucImg/search.png') no-repeat;
    background-size:30px 28px;
    background-position:0px 3px;
  }
  div.active{
    background:rgba(0,0,0,.4);
  }
</style>

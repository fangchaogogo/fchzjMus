<template>
  <div>
    <div @click="play(item.song_id)" v-for="(item,k) in mucList" style="height:50px;" :key="k">
      {{item.album_title}}
    </div>
    <audio controls :src="url" style="width:100px;height:50px;background:red;"></audio>
  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'

  export default {
    data() {
      return {
        mucList: {},
        mucInfo: {},
        url: ''
      };
    },
    mounted() {
      let that = this;
      this.getAjax({
        method: 'baidu.ting.billboard.billList',
        type: 1,
        offset: 0,
        size: 10
      }, function(data) {
//        console.log(data);
        that.mucList = data.song_list;
        console.log(that.mucList);
      });
    },
    components: {
      PullTo
    },
    methods: {
      play(id) {
        let that = this;
        this.getAjax({
          method: 'baidu.ting.song.play',
          songid: id
        }, function(data) {
        console.log(data);
          that.mucInfo = data;
          console.log(that.mucInfo);
          that.url = data.bitrate.file_link;
        });
      },
      refresh(loaded) {
        setTimeout(() => {
          this.dataList.reverse();
          loaded('fail');
        }, 2000);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

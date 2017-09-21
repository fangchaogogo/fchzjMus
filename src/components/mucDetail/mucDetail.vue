<template>
  <div>
    <div class="detail-box">
      <div class="mucList-bg"></div>
      <div class="detail-title clear-fix">
        <div class="title">歌曲信息</div>
        <div class="lrc-box">
          <div class="lrc-content">
            <div :class="{active:k === index}" v-for="(item, k) in lrcList" class="lrc-text">
              <div :class="{mucTitle:k===0}">{{item[1]}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from '../../../static/js/jq'
  export default {
    data () {
      return {
        mucInfo: {},
        songid: 0,
        index: 0,
        lrc: '',
        lrcList: [],
        top: 80
      };
    },
    methods: {
      getInfo (index) {
        this.top = 80;
        this.index = 0;
        this.songid = index;
        let that = this;
        this.getAjax({
          method: 'baidu.ting.song.lry',
          songid: that.songid
        }, function (data) {
          that.hideLoad();
//          console.log(data);
          if (data.error_code) {
            that.lrcList = [];
            that.showMes('未查询到歌词!');
          } else {
            that.lrcList = that.getText(data.lrcContent);
//            console.log('a')
          }
          // ,22001
        })
        $('.lrc-content').css({
          top: '80px'
        })
      },
      getText (text) {
        var lines = text.split('\n'), pattern = /\[\d{2}:\d{2}.\d{2}\]/g, result = [];
        let boo = false;
        let index = 0;
        while (!pattern.test(lines[0])) {
          index ++;
          if(index >= 10) {
            this.showMes('未查询到歌词!');
            this.lrcList = [];
            boo = true;
            break;
          }
          lines = lines.slice(1);
        }
        if(boo) {
          return [];
        }
        lines[lines.length - 1].length === 0 && lines.pop();
        try {
          lines.forEach(function (v) {
            var time = v.match(pattern),
              value = v.replace(pattern, '');
            time.forEach(function (v1, i1, a1) {
              var t = v1.slice(1, -1).split(':');
              result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
            });
          });
          result.sort(function (a, b) {
            return a[0] - b[0];
          });
          let newResult = []
          for (let i = 0; i < result.length; i++) {
            if (!$.trim(result[i][1]) == '') {
              newResult.push(result[i]);
            }
          }
          return newResult;
        } catch (e) {
          this.showMes('未查询到歌词!');
        }
      },
      setLrc (time) {
        //遍历所有歌词，看哪句歌词的时间与当然时间吻合
        for (var i = this.lrcList.length - 1; i >= 0; i--) {
          if (time > this.lrcList[i][0]) {
            this.index = i;
            if (this.index > 2) {
              let top = this.top - ((this.index - 2) * 40);
              if ($('.lrc-content').position().top == top) {
                return;
              } else {
                $('.lrc-content').css({
                  top: top + 'px'
                })
              }

            }
            break;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .detail-box {
    position: fixed;
    transition: all .5s;
    width: 100%;
    top: 0;
    bottom: 70px;
    background: red;
    z-index: 10;
    color: #fff;
  }

  .detail-title {
    position: relative;
    height: 50px;
    width: 100%;
    background: rgba(0, 0, 0, .5);
  }

  .title {
    text-align: center;
    font-size: 18px;
    color: #fff;
    line-height: 50px;
  }

  .lrc-box {
    position: fixed;
    top: 50px;
    bottom: 70px;
    background: rgba(0, 0, 0, .3);
    width: 100%;
    z-index: 10;
    overflow: hidden;
  }

  .lrc-content {
    position: relative;
    transition: all .5s;
    top: 80px;
    padding: 0 20px;
  }

  .lrc-text {
    font-size: 16px;
    line-height: 20px;
    height:40px;
    color: #f0f0f0;
    text-align: center;
    transition: all .3s;
  }

  div.active {
    font-size: 18px;
    color: green;
    font-weight: 700;
  }

  div.mucTitle {
    font-size: 25px !important;
  }
</style>

/**
 * Created by Administrator on 2017/8/3 0003.
 */
import $ from '../../../static/js/jq';
export default {
  install (Vue, options) {
    Vue.prototype.getAjax = function (data, succ) {
      $('.loading-box').show();
      let part = 'http://tingapi.ting.baidu.com/v1/restserver/ting';
      $.ajax({
        url: part,
        dataType: 'jsonp',
        jsonpCallback: "callback",
        data: data,
        timeout: 10000,
        success: succ,
        error: function(xhr, err) {
          $('.loading-box').hide();
          if(err == 'timeout') {
            setMes('请求超时!');
          } else{
            setMes('服务器异常!');
          }
        },
        complete: function() {
          setTimeout(function() {
            $('.loading-box').hide();
          },500)
        }
      })
      function setMes(str) {
        $('.message-box').show().find(".mes").text(str);
        setTimeout(function() {
          $('.message-box').hide();
        }, 1500)
      }
    }
    Vue.prototype.showMes = function (str) {
      $('.message-box').show().find(".mes").text(str);
      setTimeout(function() {
        $('.message-box').hide();
      }, 1500)
    }
    Vue.prototype.showLoad = function () {
      $('.loading-box').show();
    }
    Vue.prototype.hideLoad = function () {
      $('.loading-box').hide();
    }
  }
};

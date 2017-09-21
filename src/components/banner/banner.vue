<template>
  <div>
    <wc-swiper v-if="imgList.length!=0">
      <wc-slide v-for="(item, k) in imgList" :key="k">
        <img :src="item" width="100%" alt="">
      </wc-slide>
    </wc-swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imgList: []
      };
    },
    mounted () {
      this.imgList = [
        'http://business.cdn.qianqian.com/qianqian/pic/bos_client_1505810377587d7fc1d81e3471d1be55e3cf9883f9.jpg',
        'http://business.cdn.qianqian.com/qianqian/pic/bos_client_15058118874b4c2adfc873ec5fca4dcee24f49799c.jpg',
        'http://business.cdn.qianqian.com/qianqian/pic/bos_client_1505469879060f2e44c5d2514f6afa966d0895ad5c.jpg',
        'http://business.cdn.qianqian.com/qianqian/pic/bos_client_1505461455ff48cb956a9f3d34e1b1afeeb153463f.jpg'
      ]
    }
  };
</script>

<style scoped>

</style>

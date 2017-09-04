<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->

    <transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>

  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
	}
}
</script>

<style>
#app {
  font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*, :after, :before {
  box-sizing: border-box;
}
body {
  margin: 0px;
}
img {
  vertical-align: middle;
}
a {
  color: #337ab7;
  text-decoration: none;
}
.pull-right {
    float: right!important;
}
.hint {
    margin: 0;
    padding: 8px 0 0;
    font-size: 13px;
    color: #969696;
    clear: both;
}
.display_none {
  display: none!important;
}

  /* 逐浪时尚钢笔体 */
@font-face{
  font-family:'zFont0';
  src: url('http://orujvm65i.bkt.clouddn.com/font/zFont0.eot'); /* IE9 */
  src: url('http://orujvm65i.bkt.clouddn.com/font/zFont0.eot') format("embedded-opentype"), /* IE6-IE8 */
  url('http://orujvm65i.bkt.clouddn.com/font/zFont0.woff') format("woff"), /* chrome、firefox */
  url('http://orujvm65i.bkt.clouddn.com/font/zFont0.ttf') format("truetype"); /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
  font-style: normal; font-weight: normal;
}
/* 潘婉琼字体 */
@font-face{font-family:'zFont1';
  src: url('http://orujvm65i.bkt.clouddn.com/font/zFont1.ttf');
  font-style: assets; font-weight: normal;
}
/* 多米手写体 */
@font-face{font-family:'zFont2';
  src: url('http://orujvm65i.bkt.clouddn.com/font/zFont2.ttf');
  font-style: normal; font-weight: normal;
}


</style>

<template>
  <div class="container setting">

    <div class="el-row">
      <!-- 侧边栏设置栏目 -->
      <div class="aside">
          <el-menu router :default-active="$route.path" class="el-menu-setting" @select="handleSelect">
            <el-menu-item index="/setting/basic"><i class="el-icon-setting"></i>基础设置</el-menu-item>
            <el-menu-item index="/setting/profile"><i class="el-icon-information"></i>个人资料</el-menu-item>
            <el-menu-item index="/setting/account"><i class="el-icon-menu"></i>账号管理</el-menu-item>
          </el-menu>
      </div>

      <div class="el-col-16 el-col-offset-8 main">

        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>

      </div> <!-- end main -->

    </div> <!-- end row -->
  </div> <!-- end container -->
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  }, // end methods
}
</script>

<style scoped>
.main {
  /* border: 1px solid red; */
}

/* edit for elementui */
.el-menu-setting {
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.el-menu-setting .is-active {
  background: #f0f0f0;
}
/* elementui */

/* NOTE: 宽度设置为了960px */
.container {
  width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}
.setting{
  /* padding-top: 15px; */
}
.el-row {
  margin-left: -15px;
  margin-right: -15px;
}
.setting .aside {
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 86px 0 0;
  padding: 0 0 30px;
  width: 280px;
  overflow: auto;
}
.setting .main {
  padding-left: 0;
}


/* .el-form-item {
  margin-top: 40px;
} */
</style>

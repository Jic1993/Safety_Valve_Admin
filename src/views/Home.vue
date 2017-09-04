<template>
  <div>
    <div class="header fixed-top">
    <el-menu router :default-active="$route.path" class="el-menu-home" mode="horizontal" @select="handleSelect">
        <a class="logo" href="./">
          <img src="../assets/logo.png" alt="logo">
          <!-- <span class="logo-text">江苏特检</span> -->
        </a>
        <el-menu-item index="/apply"><i class="el-icon-edit"></i>新增委托单</el-menu-item>

        <el-submenu index="/report">
          <template slot="title" style="bordr-bottom:0px"><i class="el-icon-document"></i>报告管理</template>
          <!-- <el-menu-item index="/reporttest">add</el-menu-item> -->
          <!-- <el-menu-item index="/report">台账</el-menu-item> -->
          <el-menu-item index="report-1">
            <a href="./backend/api/report/excel1/" target="_blank">浏览报告</a>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/user"><i class="el-icon-menu"></i>用户管理</el-menu-item>

        <div class="user" v-on:mouseenter="triggerUserMenu"  v-on:mouseleave="triggerUserMenu">
          <div class="el-dropdown" @command="handleCommand">
            <span class="el-dropdown-title">
                {{ user.name }}
                <i class="el-icon-arrow-down" style="font-size:12px"></i>
            </span>
            <div class="el-dropdown-menu" :style="userMenuStyle">
              <el-dropdown-item>
                <a href="./#/setting">
                  <i class="el-icon-setting el-icon--right"></i>设置
                </a>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <a href="./#/login">
                <i class="el-icon-upload2 el-icon--right" style="transform:rotate(90deg);"></i>退出
                </a>
              </el-dropdown-item>
            </div>
          </div>
        </div>
        <!-- end user -->

        <div class="role pull-right">
          <el-tag type="primary">{{ roleMapTable[user.role] }}：</el-tag>
        </div>

    </el-menu>
    </div> <!-- end header -->

    <!-- <div class="view1"> -->
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <!-- </div> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      // activeIndex: '/apply',
      user: undefined,
      userMenuStyle: {display:'none', position: 'absolute', top: '100%', margin:'0'},
      userMenuSeen: true,
      roleMapTable: {
        issuer: '签发人',
        reviewer: '审核人',
        typer: '录入员',
        tester: '校验员',
        administrator: '管理员'
      },
    };
  },
  methods: {
    // 退出
    logout: function () {
      this.$confirm('确认退出吗?', '提示', {type: 'warning'})
        .then(  ()    => {this.$router.push('/login');} )
        .catch( error => {console.log(error)} );
    },
    triggerUserMenu() {
      let display = this.userMenuStyle.display;
      this.userMenuStyle = display=='none'?
                          {position: 'absolute', top: '100%', margin:'0'}:
                          {display:'none', position: 'absolute', top: '100%', margin:'0'};
    },
    handleCommand(cmd) {
      console.log('dropdown cmd: ', cmd);
      // this.activeIndex = undefined;
      this.$router.push(cmd);
    },
    handleSelect(key, keyPath) {
      console.log('key: ', key, ' path: ', keyPath);
      // this.$router.push({ path: key });
    },
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.user = user;
      console.log('HOME user: ', this.user);
    }
    console.log('route info: ', this.$router)
  }
}
</script>

<style scoped>
/* NOTE: 主体部分宽度设置为了1260px */
.header {
  width: 1260px;
  margin: 0 auto;
  min-height: 60px;
}
.fixed-top {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1024;
}
.el-menu-home {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.el-menu-item:hover {
    border-bottom: 0px solid transparent;
}
.role {
  line-height: 60px;
  margin-right: 10px;
}
.user {
  float: right;
  margin-right: 35px;
  line-height: 60px;
  cursor: pointer;
}
.user:hover {
  background: #eef1f6;
}
.el-dropdown-title {
  padding: 0 10px;
}
.el-dropdown-menu {
  min-width: 95px;
}
.el-dropdown-menu i {
  margin-right: 10px;
}
.el-dropdown-menu a {
  display: block;
  color: #48576a;
}

.logo {
    float: left;
    height: 60px;
    line-height: 60px;
    /* padding-top: 15px; */
    /* text-decoration: none; */
}
.view {
  width: 1260px;
  margin: 0 auto;
  margin-top: 70px;
}


.logo img {
    width: 150px;
    height: 32px;
    margin-top: -8px;
}
.logo-text {
  color: #9b9b9c;
  color: rgb(72, 87, 106);
  font-size: 25px;
  font-family: '华文新魏';
  /* font-weight: bold; */
  margin-left: -6px;
}
</style>

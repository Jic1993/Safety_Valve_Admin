<template>
  <div>
    <div class="header fixed-top">
    <el-menu router :default-active="$route.path" class="el-menu-home" mode="horizontal" @select="handleSelect">
        <a class="logo" href="./">
          <img src="../assets/logo.png" alt="logo">
          <!-- <span class="logo-text">江苏特检</span> -->
        </a>
        <el-menu-item index="/apply" v-show="menuVisible['apply']"><i class="el-icon-plus"></i>新增委托单</el-menu-item>

        <el-submenu index="/report" v-show="menuVisible['report']">
          <template slot="title" style="bordr-bottom:0px"><i class="el-icon-document"></i>报告管理</template>
          <!-- <el-menu-item index="/reporttest">add</el-menu-item> -->
          <!-- <el-menu-item index="/report">台账</el-menu-item> -->
          <el-menu-item index="report-1">
            <a href="./backend/api/report/excel1/" target="_blank">浏览报告</a>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/user"  v-show="menuVisible['user']"><i class="el-icon-menu"></i>用户管理</el-menu-item>

        <el-menu-item index="/review" v-show="menuVisible['review']"><i class="el-icon-edit"></i>审核</el-menu-item>
        <el-menu-item index="/issue"  v-show="menuVisible['issue']"><i class="el-icon-check"></i>签发</el-menu-item>

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
              <el-dropdown-item>
                <a v-on:click="helpDialogVisible = true">
                  <i class="el-icon-star-on el-icon--right"></i>帮助
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

    <!-- 使用说明 -->
    <el-dialog title="使用说明" :visible.sync="helpDialogVisible" class="help-dialog">
      <ul>
        <li>
          录入
          <ol>
            <li>录入员填写安全阀校验的委托申请单，并点击<b>添加</b>；</li>
            <li>然后在右侧的派发栏中点击<b>派发任务</b>，系统会自动生成《校验委托申请单》的Excel文件。
                这步之后校验员界面中才能看到待校验的任务列表数据。</li>
          </ol>
        </li>
        <li>
          校验
          <ul>
            <li>
            校验员在待校验的任务列表中点击一行，表示选中该校验任务开始校验，等校验完成，并填入所有校验数据后，点击<b>结束本次任务</b>，则校验完成。
            </li>
          </ul>
        </li>
        <li>
          送审
          <ul>
            <li>
            每当完成一个校验后，在录入员界面的送审栏中就可以看到已经检验完成的任务数据，选择并点击<b>提交送审</b>，这步之后审核人界面才能看到该待审核的校验任务数据。
            </li>
          </ul>
        </li>
        <li>
          审核
          <ul>
            <li>
              选择要通过的校验记录，并点击<b>批量审核</b>，此时后台自动生成相应的《校验记录》Excel文档。
            </li>
          </ul>
        </li>
        <li>
          签发
          <ul>
            <li>
              选择要通过的校验记录，并点击<b>批量签发</b>，此时后台自动生成相应的《校验报告》EXCEL文档，并且将该校验记录写入《校验台帐》Excel文档
            </li>
          </ul>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="helpDialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>
    <!-- end 使用说明 -->


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
      menuVisible: {
        'apply':  false,
        'report': false,
        'user':   false,
        'review': false,
        'issue':  false,
      },
      helpDialogVisible: false,
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
    setMenuVisible(role) {
      this.menuVisible = {
        'apply' : role=='typer'||role=='administrator',
        'report': role=='typer'||role=='administrator',
        'user'  : role=='administrator',
        'review': role=='reviewer'||role=='administrator',
        'issue' : role=='issuer'||role=='administrator',
      }
    }
  }, // end methods
  created() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.user = user;
      console.log('HOME user: ', this.user);
      this.setMenuVisible(this.user.role);
    }
    // console.log('route info: ', this.$router);
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
.help-dialog li{
  font-size: 16px;
  /* color:#3194d0; */
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

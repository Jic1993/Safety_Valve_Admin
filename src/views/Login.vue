<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="login-container">
      <img src="../assets/logo.png" alt="logo">
      <h3 class="title">安全阀校验系统</h3>

      <el-form-item label="" prop="username">
        <el-autocomplete v-model="loginForm.username" :fetch-suggestions="querySearch" placeholder="用户名" @select="handleSelect" style="width:100%"></el-autocomplete>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter="submit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" :loading="loginFormLoading" style="width:100%">登陆</el-button>
      </el-form-item>
    </el-form>
    <span class="copyright">© 2017 JSSEI</span>
  </div>
</template>

<script>
import { login, getUser } from '@/api/api';
export default {
  data() {
    return {
      state1: '',
      users: [
        { value: '01（签发人 老钱）', username: '01', password: '111111' },
        { value: '02（审核人 老沈）', username: '02', password: '222222' },
        { value: '03（录入员 小路）', username: '03', password: '333333' },
        { value: '05（校验员 大桥）', username: '05', password: '555555' },
        { value: '06（校验员 小桥）', username: '06', password: '666666' },
      ],
      roleMapTable: {
        issuer: '签发人',
        reviewer: '审核人',
        typer: '录入员',
        tester: '校验员',
        administrator: '管理员'
      },
      loginFormLoading: false,
      loginForm: {
        username: undefined,
        password: undefined,
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let users = this.users;
      // let results = queryString ? users.filter(this.createFilter(queryString)) : users;

      getUser()
        .then(response => {
          console.log('response getUser: ', response);
          this.users = response.data;
          this.users.map((e)=>{
            e.value = e.username+'（'+this.roleMapTable[e.role]+' '+e.name+'）';
          });
          console.log('response getUser: ', this.users);
          let results = this.users;
          // 调用 callback 返回建议列表的数据
          cb(results);
        })
        .catch(error => {
            console.log(error);
        });
    },
    createFilter(queryString) {
      return (user) => {
        return (user.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
      this.loginForm.username = item.username;
      this.loginForm.password = item.password;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginFormLoading = true;
          let params = { username: this.loginForm.username, password: this.loginForm.password };
          login(params)
            .then(response => {
              console.log('Login response: ', response);
              let { code, msg , data} = response;
              if (code !== 200) {
                this.$message({ message: msg, type: 'error' });
              } else {
                let user = {username: data.username, name: data.name, role: data.role, remark: data.remark};
                let setting = data.setting;
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('setting', setting);

                this.$message({ message: msg, type: 'success' });
                switch(data.role) {
                  case 'tester':
                    this.$router.push({ path: '/test' }); break;
                  case 'typer':
                    this.$router.push({ path: '/apply' }); break;
                  case 'reviewer':
                    this.$router.push({ path: '/review' }); break;
                  case 'issuer':
                    this.$router.push({ path: '/issue' }); break;
                  case 'administrator':
                    this.$router.push({ path: '/user' }); break;
                  default:
                    console.log('wait');
                }
              }
              this.loginFormLoading = false;
            })
            .catch(error => { console.log(error); });
        } else {
          return false;
        }
      });
    },
  }, // end methods
};
</script>

<style scoped>
.login {
    height: 100%;
    min-height: 750px;
    text-align: center;
    font-size: 14px;
    /* background: #f9fafb; */
}
.login-container {
  border-radius: 5px;
  margin: 0px auto;
  width: 400px;
  padding: 50px 50px 25px 50px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  margin: 100px auto 0;
}
.title {
  /* margin: 0px auto 40px auto; */
  /* text-align: center; */
  color: rgba(72, 87, 106, 0.78);
}
.copyright {
  color: #ababab;
}
.remember {
  margin: 0px 0px 35px 0px;
}

</style>

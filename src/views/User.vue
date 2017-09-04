<template>

  <div>
  <el-row :gutter="10" type="flex">

    <el-col :span="12">
    <div style="display:block">
      <span style="font-family:zFont0">或许我不是最好，但我会做到更好！</span>
      <span style="font-family:zFont1">或许我不是最好，但我会做到更好！</span>
      <span style="font-family:zFont2">或许我不是最好，但我会做到更好！</span>
    </div>
    <el-form :model="userForm" :rules="rules" ref="userForm" v-loading="userFormLoading" label-width="140px" label-position="left" class="userForm">

      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="userForm.username" placeholder="如：03"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="text" v-model="userForm.password" placeholder="如：33333"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
      <el-input type="text" v-model="userForm.name" @blur="handleNamePreview(0)" placeholder="如：张无忌"></el-input>
      <div class="pull-right" style="margin:8px 0;">
        <div v-loading="elecSigLoading" class="pull-right">
        <canvas @click="handleNamePreview(1)" id="elecSigCanvas" width="120" height="40" style="border:1px solid #d3d3d3;float:right">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        </div>
        <span class="hint ">电子签名预览：（点击切换字体）</span>
      </div>
      </el-form-item>

      <el-form-item label="" prop="elecSig">
        <el-input type="text" v-model="userForm.elecSig" class="display_none"></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择用户角色">
          <el-option label="签发人" value="issuer"></el-option>
          <el-option label="审核人" value="reviewer"></el-option>
          <el-option label="录入员" value="typer"></el-option>
          <el-option label="校验员" value="tester"></el-option>
          <el-option label="管理员" value="administrator"></el-option>
        </el-select>
      </el-form-item>

        <!-- <el-form-item label-width="0px">  -->
          <el-button type="primary" @click="submitForm('userForm')">{{ submitBtnText=='add'?'添加':'修改' }}</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        <!-- </el-form-item> -->
    </el-form>
    </el-col>


    <el-col :span="12">

      <el-table :data="userTable" border highlight-current-row v-loading="userTableLoading" @row-click="handleRowClick" style="width:100%;" height="650">

        <el-table-column
          v-for="col in userTableCols"
          :key="col.id"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :fixed="col.fixed"
        >
        </el-table-column>
        <!-- <el-table-column label="操作" fixed="right" width="70">
          <template scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/api';
export default {
  data() {
    return {
      user: undefined,
      userFormLoading: false,
      submitBtnText: 'add',
      userForm: {
        username: undefined,
        password: undefined,
        role: undefined,
        name: undefined,
        elecSig: undefined,
        fontidx: 0,
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择用户角色', trigger: 'change' }
        ],
      },
      roleMapTable: {
        issuer: '签发人',
        reviewer: '审核人',
        typer: '录入员',
        tester: '校验员',
        administrator: '管理员'
      },

      fonts: ['zFont0', 'zFont1', 'zFont2'],
      elecSigLoading: false,

      userTableLoading: false,
      userTable: [],
      userTableCols: [
        { id: 1,  prop: 'username', label: '用户名' },
        { id: 2,  prop: 'password', label: '密码' },
        { id: 3,  prop: 'name', label: '姓名' },
        { id: 4,  prop: 'role_zhCN', label: '角色' },
      ],
    };
  },
  methods: {
    // handle input blur 事件, 并根据传入值改变电子签名字体style
    handleNamePreview(val) {
      if(!this.userForm.name) return;
      this.elecSigLoading = true;
      this.userForm.fontidx = (this.userForm.fontidx+val) % this.fonts.length;
      let param = {
        font: this.fonts[ this.userForm.fontidx ],
        name: this.userForm.name,
      };
      console.log('elecSigPreview param is: ', param);
      this.elecSigPreview(param);
      this.elecSigLoading = false;
    },
    // 根据传入的参数生成电子签名预览
    elecSigPreview(param) {
      let {font, name} = param;
      let c=document.getElementById("elecSigCanvas");
      let ctx=c.getContext("2d");
      ctx.clearRect(0, 0, 120, 40);
      ctx.font = "32px "+font;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(name,60,20);
      console.log('name width: ', ctx.measureText(name).width)
      let image = c.toDataURL("image/png")  //注意toDataURL是canvas对象方法
      console.log('base64 data: ', image);
      // 修改隐藏域input
      this.userForm.elecSig = image;
    },
    clearNamePreview() {
      let c=document.getElementById("elecSigCanvas");
      let ctx=c.getContext("2d");
      ctx.clearRect(0, 0, 120, 40);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            username: this.userForm.username,
            password: this.userForm.password,
            name:     this.userForm.name,
            elecSig:  this.userForm.elecSig,
            role:     this.userForm.role,
            remark:   JSON.stringify({fontidx: this.userForm.fontidx}),
            action:   this.submitBtnText
          };
          console.log('updateUser param: ', param);
          updateUser(param)
            .then(response => {
              console.log('response updateUser: ', response);
              let { code, msg } = response;
              if (code !== 200) {
                this.$message({ message: msg, type: 'error' });
              } else {

                this.resetForm('userForm');

                this.loadUserTable();
                this.$message({ message: msg, type: 'success' });
              }
            })
            .catch(error => { console.log(error); });
        } else {
          return false;
        }
      });
  },
  // Table中选中一行后 事件
  handleRowClick(row, event, column){
    console.log('handleRowClick: ', row);
    this.submitBtnText = 'edit';
    this.userForm = Object.assign({}, row);
    this.fontidx  = row.fontidx;
    this.handleNamePreview(0);
  },
  resetForm(formName) {
      this.$refs[formName].resetFields();
      this.submitBtnText = 'add';
      this.clearNamePreview();
    },
  loadUserTable() {
    this.userTableLoading = true;
      getUser()
        .then(response => {
          console.log('response getUser: ', response);
          this.userTable = response.data;
          this.userTable.map((e)=>{
            e.role_zhCN = this.roleMapTable[e.role];
            e.fontidx   = (JSON.parse(e.remark||'{"fontidx":0}')).fontidx;
          });
          console.log('response userTable: ', this.userTable);
          this.userTableLoading = false;
        })
        .catch(error => {
            console.log(error);
        });
  }

  }, // end methods
  created() {
    this.$message({
      showClose: true,
      message: '温馨提示：请耐心等待字体加载完成~',
      duration: 4500
    });

    this.loadUserTable();
  }
}
</script>

<style scoped>

</style>

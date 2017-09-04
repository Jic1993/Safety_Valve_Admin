<template>

  <!-- 个人信息设置 -->
  <el-form :model="profileForm" :rules="rules" ref="profileForm" v-loading="profileFormLoading" label-width="150px" label-position="left" class="profileForm">
    <div style="display:block">
      <span style="font-family:zFont0">或许我不是最好，但我会做到更好！</span>
      <span style="font-family:zFont1">或许我不是最好，但我会做到更好！</span>
      <span style="font-family:zFont2">或许我不是最好，但我会做到更好！</span>
    </div>
    <el-form-item label="姓名" prop="name">
      <el-input type="text" v-model="profileForm.name" @blur="handleNamePreview(0)" ></el-input>
      <el-input type="text" v-model="profileForm.elecSig" class="display_none"></el-input>
      <div class="pull-right" style="margin:8px 0;">
        <div v-loading="elecSigLoading" class="pull-right">
        <canvas @click="handleNamePreview(1)" id="elecSigCanvas" width="120" height="40" style="border:1px solid #d3d3d3;float:right">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        </div>
        <span class="hint ">电子签名预览：（点击切换字体）</span>
      </div>
    </el-form-item>


    <el-button type="primary" @click="submitForm('profileForm')">保存</el-button>

  </el-form>
</template>

<script>
import { getProfile, updateProfile } from '@/api/api';
export default {
  data() {
    return {
      user: undefined,
      profileFormLoading: false,
      profileForm: {
        name: undefined,
        elecSig: undefined,
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
      },

      fonts: ['zFont0', 'zFont1', 'zFont2'],
      fontidx: 0,
      elecSigLoading: false,
    };
  },
  methods: {
    // handle input blur 事件, 并根据传入值改变电子签名字体style
    handleNamePreview(val) {
      if(!this.profileForm.name) return;
      this.elecSigLoading = true;
      this.fontidx = (this.fontidx+val) % this.fonts.length;
      let param = {
        font: this.fonts[ this.fontidx ],
        name: this.profileForm.name,
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
      this.profileForm.elecSig = image;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            username: this.user.username,
            name:     this.profileForm.name,
            elecSig:  this.profileForm.elecSig,
            remark:   JSON.stringify({fontidx: this.fontidx}),
          };
          console.log('updateProfile param: ', param);
          updateProfile(param)
            .then(response => {
              console.log('response updateProfile: ', response);
              let { code, msg } = response;
              if (code !== 200) {
                this.$message({ message: msg, type: 'error' });
              } else {
                let user = {username: param.username, name: param.name, role: this.user.role, remark: param.remark};
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$message({ message: msg, type: 'success' });
              }
            })
            .catch(error => { console.log(error); });
        } else {
          return false;
        }
      });
  },
  loadProfileForm() {
    this.profileFormLoading = true;
      let param = {username: this.user.username, name: this.user.name};
      getProfile(param)
        .then(response => {
          console.log('response getProfile: ', response);
          let data = response.data.remark || undefined;

          this.profileFormLoading = false;
        })
        .catch(error => {
            console.log(error);
        });
  }

  }, // end methods

  created() {
    this.$message({
      showClose: true,
      message: '温馨提示：请耐心等待字体加载完成。若字体加载失败，可以尝试刷新一下网页~',
      duration: 4500
    });

    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.user = user;
      console.log('Profile user: ', this.user);
    } else {
      this.$router.push({ path: '/login' });
    }

    this.profileForm.name = this.user.name;
    // if(this.user.remark){
    //   this.fontidx = (JSON.parse(this.user.remark)).fontidx;
    // }
  },
  mounted() {
    if(this.user.remark){
      this.fontidx = (JSON.parse(this.user.remark)).fontidx;
      this.elecSigLoading = true;
      setTimeout(()=>{
        // alert(1);
        this.handleNamePreview(0);
        this.elecSigLoading = false;
      },1500);
    }
  },
}
</script>

<style scoped>



.main .el-form-item {
  margin-bottom: 0px;
  /* margin-top: 0px; */
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}


/* .el-form-item {
  margin-top: 40px;
} */
</style>

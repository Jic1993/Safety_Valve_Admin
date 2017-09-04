<template>

  <el-form :model="accountForm" :rules="rules" ref="accountForm" label-width="150px" label-position="left" class="accountForm">
    功能开发中...
  </el-form>

</template>

<script>
export default {
  data() {
    return {
      accountForm: {
        name: undefined,
        elecSig: undefined,
      },
      fonts: ['ZoomlaXingtiJ3','zFont2'],
      curfont: 0,
      rules: {},
    };
  },
  methods: {
    // handle input blur 事件, 并根据传入值改变电子签名字体style
    handleNamePreview(val) {
      if(!this.accountForm.name) return;
      this.curfont = (this.curfont+val) % this.fonts.length;
      let param = {
        font: this.fonts[ this.curfont ],
        name: this.accountForm.name,
      };
      console.log('param is: ', param);
      this.elecSigPreview(param);
    },
    // 改变电子签名字体style
    changeFont() {
      if(!this.accountForm.name) return;
      this.curfont = (++this.curfont) % this.fonts.length;
      let param = {
        font: this.fonts[ this.curfont ],
        name: this.accountForm.name,
      };
      console.log('change: ', param);
      this.elecSigPreview(param);
    },

    // 电子签名预览
    elecSigPreview(param) {
      let {font, name} = param;
      let c=document.getElementById("elecSigCanvas");
      let ctx=c.getContext("2d");
      ctx.clearRect(0, 0, 120, 40);
      ctx.font = "32px "+font;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(name,60,20);

      console.log(ctx.measureText(name).width)

      let image = c.toDataURL("image/png")  //注意toDataURL是canvas对象方法
      console.log(image);
      this.accountForm.elecSig = image;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            setting: JSON.stringify(this.basicForm)
          };
          console.log(params);
          updateSetting(params)
            .then(response => {
              console.log('response: ', response);
              let { code, msg } = response;
              if (code !== 200) {
                this.$message({ message: msg, type: 'error' });
              } else {
                this.$message({ message: msg, type: 'success' });
              }
            })
            .catch(error => { console.log(error); });
        } else {
          return false;
        }
      });
  },
  getSetting() {
    this.basicFormLoading = true;
      getSetting()
        .then(response => {
          console.log('response: ', response);
          let data = response.data.remark || undefined;
          if (data) {
            //解析json对象
            console.log('setting: ', data);
            let setting = JSON.parse(data);
            this.basicForm = setting;
            this.rid_preview = this.getRid(this.basicForm.rid_prefix);
          }
          this.basicFormLoading = false;
        })
        .catch(error => {
            console.log(error);
        });
  }

  }, // end methods

  created() {
    // this.getSetting();
  },
}
</script>

<style scoped>
/* .el-form-item {
  margin-top: 40px;
} */
</style>

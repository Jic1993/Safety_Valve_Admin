<template>

  <el-form :model="basicForm" :rules="rules" ref="basicForm" v-loading="basicFormLoading" label-width="150px" label-position="left" class="basicForm">

    <el-row>
      <el-form-item label="校验机构核准证号" prop="approval_number">
        <el-input type="text" v-model="basicForm.approval_number"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="执行标准" prop="implement_std">
        <el-input type="textarea" v-model="basicForm.implement_std"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="报告编号前缀" prop="rid_prefix">
        <el-input type="text" v-model="basicForm.rid_prefix" @change="prefixChange" placeholder="ZJG-AF-"></el-input>
        <p class="pull-right hint">报告编号预览： {{ rid_preview }} </p>
      </el-form-item>
    </el-row>

      <!-- <el-form-item label-width="0px">  -->
        <el-button type="primary" @click="submitForm('basicForm')">保存</el-button>
        <!-- <el-button @click="resetForm('basicForm')">重置</el-button> -->
      <!-- </el-form-item> -->

  </el-form>

</template>

<script>
import { getBasic, updateBasic } from '@/api/api'

export default {
  data() {
    return {
      basicForm: {
        approval_number: undefined,
        implement_std: undefined,
        rid_prefix: undefined,
      },
      rules: {
        approval_number: [
          { required: true, message: '请输入机构核准证号', trigger: 'blur' }
        ],
        implement_std: [
          { required: true, message: '请输入执行标准', trigger: 'blur' }
        ],
        rid_prefix: [
          { required: true, message: '请输入报告编号前缀', trigger: 'blur' }
        ],
      }, //end rules
      rid_preview: '',
      basicFormLoading: false,
    };
  },
  methods: {
    prefixChange(val) {
      this.rid_preview = this.getRid(val);
    },
    // 返回完整报告编号
    getRid(prefix) {
      return prefix + new Date().getFullYear() + '-00000001';
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            setting: JSON.stringify(this.basicForm)
          };
          console.log('update updateBasic param: ', param);
          updateBasic(param)
            .then(response => {
              console.log('response updateBasic: ', response);
              let { code, msg } = response;
              if (code !== 200) {
                this.$message({ message: msg, type: 'error' });
              } else {
                let setting = param.setting;
                sessionStorage.setItem('setting', setting);

                this.$message({ message: msg, type: 'success' });
              }
            })
            .catch(error => { console.log(error); });
        } else {
          return false;
        }
      });
    },
    loadBasicForm() {
      this.basicFormLoading = true;
        getBasic()
          .then(response => {
            console.log('response getBasic: ', response);
            let setting = JSON.parse(response.data.remark) || undefined;
            if (setting) {
              console.log('setting: ', setting);
              this.basicForm = setting;
              this.rid_preview = this.getRid(this.basicForm.rid_prefix);
            }
            this.basicFormLoading = false;
          })
          .catch(error => {
              console.log(error);
          });
          console.log(1212)
    }
  }, //end methods

  created() {
    this.loadBasicForm();
  },
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
  margin-top: 0px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}
.hint {
    margin: 0;
    padding: 8px 0 0;
    font-size: 13px;
    color: #969696;
    clear: both;
}
</style>

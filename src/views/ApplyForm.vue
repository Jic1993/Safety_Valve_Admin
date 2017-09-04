<template>
  <div class="apply-form">
    <el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="80px" class="el-form-apply">

      <el-row>
        <el-col :span="10">
          <el-form-item label="委托单编号" prop="id" label-width="90px">
            <el-input type="text" v-model="applyForm.id" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="受理时间" prop="accept_date">
            <el-date-picker :editable="false" :clearable="false" type="datetime" placeholder="选择日期" v-model="applyForm.accept_date" @change="acceptDateChange" size="small"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="单位名称" prop="company_name" :show-message="false">
            <el-input type="text" v-model="applyForm.company_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="单位地址" prop="addr">
            <el-input type="text" v-model="applyForm.addr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="8">
          <el-form-item label="联系人" prop="contact_person" :show-message="false">
            <el-input type="text" v-model="applyForm.contact_person"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="联系电话" prop="contact_number" :show-message="false">
            <el-input type="text" v-model="applyForm.contact_number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮编" prop="post_code" label-width="50px">
            <el-input type="text" v-model="applyForm.post_code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="9">
          <el-form-item label="设备名称" prop="device_name">
            <el-input type="text" v-model="applyForm.device_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="新阀" prop="isnew" label-width="42px">
            <el-switch on-text="是" off-text="否" v-model="applyForm.isnew" on-value="Y" off-value="N"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="进口阀" prop="isimported" label-width="65px">
            <el-switch on-text="是" off-text="否" v-model="applyForm.isimported" on-value="Y" off-value="N"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="要求修理" prop="ismaintenance">
            <el-switch on-text="是" off-text="否" v-model="applyForm.ismaintenance" on-value="Y" off-value="N"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item label="阀门制造单位" prop="manufacture_company" label-width="100px">
        <el-input type="text" v-model="applyForm.manufacture_company"></el-input>
      </el-form-item>

      <el-form-item label="制造许可证编号" prop="manufacture_license_number" label-width="110px">
        <el-input type="text" v-model="applyForm.manufacture_license_number"></el-input>
      </el-form-item>


      <el-row>
        <el-col :span="6">
          <el-form-item label="阀门类型" prop="safety_valve_type">
            <el-input type="text" v-model="applyForm.safety_valve_type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="阀门型号" prop="safety_valve_code">
            <el-input type="text" v-model="applyForm.safety_valve_code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="安装部位" prop="install_location">
            <el-input type="text" v-model="applyForm.install_location"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="工作介质" prop="working_medium">
            <el-input type="text" v-model="applyForm.working_medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="公称通径" prop="nominal_diameter">
            <el-input type="text" v-model="applyForm.nominal_diameter">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="阀座口径" prop="seat_diameter">
            <el-input type="text" v-model="applyForm.seat_diameter">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="要求整定压力" prop="rset_pressure" label-width="110px" :show-message="false">
            <el-input type="text" v-model="applyForm.rset_pressure" @blur="rsetPressureBlur">
              <template slot="append">MPa</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密封试验压力" prop="seal_test_pressure" label-width="110px" :show-message="false">
            <el-input type="text" v-model="applyForm.seal_test_pressure" readonly>
              <template slot="append">MPa</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="实际工作压力" prop="working_pressure" label-width="100px">
            <el-input type="text" v-model="applyForm.working_pressure">
              <template slot="append">MPa</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="压力级别范围" prop="pressure_range" label-width="110px">
            <el-input type="text" v-model="applyForm.pressure_range">
              <template slot="append">MPa</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7">
          <el-form-item label="校验方式" prop="test_method">
            <el-input type="text" v-model="applyForm.test_method"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="校验介质" prop="test_medium">
            <el-input type="text" v-model="applyForm.test_medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="校验介质温度" prop="test_medium_temp" label-width="100px">
            <el-input type="text" v-model="applyForm.test_medium_temp"></el-input>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row>
        <el-col :span="12">
          <el-form-item label="产品编号" prop="product_number">
            <el-input type="text" v-model="applyForm.product_number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备注册代码" prop="device_code" label-width="110px">
            <el-input type="text" v-model="applyForm.device_code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="10">
          <el-form-item label="出厂日期" prop="manufacture_date">
            <el-date-picker style="width:130px" type="date" placeholder="选择出厂日期" v-model="applyForm.manufacture_date" size="small"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="预约取阀日期" prop="appointment_date" label-width="110px">
            <el-date-picker :editable="false" type="datetime" :picker-options="datePickerOptions" placeholder="选择日期" v-model="applyForm.appointment_date" size="small"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-tooltip content="请在设置中修改" placement="top-end" effect="dark">
        <el-col :span="10">
          <el-form-item label="执行标准" prop="implement_std" :show-message="false">
            <el-input type="textarea" v-model="applyForm.implement_std" readonly></el-input>
          </el-form-item>
        </el-col>
        </el-tooltip>

        <el-col :span="14">
          <el-form-item label="相同校验任务个数" prop="task_num" label-width="140px">
            <el-input-number v-model="applyForm.task_num" :min="1" :max="1000"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-tooltip content="请在设置中修改" placement="top-end" effect="dark">
        <el-col :span="12">
          <el-form-item label="校验机构核准证号" prop="approval_number" label-width="135px">
            <el-input type="text" v-model="applyForm.approval_number" readonly></el-input>
          </el-form-item>
        </el-col>
        </el-tooltip>

        <el-col :span="12">
         <el-form-item style="float:right;padding-right:10px">
          <el-button type="primary" @click="submitForm('applyForm')">新增任务</el-button>
          <el-button @click="resetForm('applyForm')">重置</el-button>
         </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import { addApply } from '../api/api';
import util from '../utilities/formatDate';
import Bus from '../utilities/bus'
export default {
  name: 'TaskForm',
  data() {
    return {
      ridPrefix: undefined,
      applyForm: {
        id: undefined,
        accept_date: new Date(),
        company_name: undefined,
        addr: undefined,
        contact_person: undefined,
        contact_number: undefined,
        post_code: 215600,
        device_name: undefined,
        isnew: 'N',
        isimported: 'N',
        ismaintenance: 'N',
        manufacture_company: undefined,
        manufacture_license_number: undefined,
        safety_valve_type: '弹簧式',
        safety_valve_code: undefined,
        install_location: undefined,
        working_medium: undefined,
        nominal_diameter: undefined,
        seat_diameter: undefined,
        rset_pressure: undefined,
        seal_test_pressure: undefined,
        working_pressure: undefined,
        pressure_range: undefined,
        test_method: '校验装置',
        test_medium: '空气',
        test_medium_temp: '常温',
        product_number: undefined,
        device_code: undefined,
        manufacture_date: undefined,
        appointment_date: new Date().getTime() + 5*24*3600*1000,
        implement_std: undefined,
        approval_number: undefined,
        task_num: 1,
      },
      rules: {
        company_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        accept_date: [
          // { type: 'date', required: true, message: '请选择受理日期', trigger: 'change' }
        ],
        contact_person: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contact_number: [
          { required: true, message: '请输入联系电话'},
          // { type: 'number', message: '请输入联系电话'}
        ],
        rset_pressure: [
          { required: true, message: '请输入要求整定压力', trigger: 'blur' }
        ],
        // addr: [
        //   { required: true, message: '请填写地址', trigger: 'blur' }
        // ]
      },
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 8.64e7;
        }
      },
    };
  },
  methods: {
    acceptDateChange(val) {
      console.log('old accept_date: ', val);
      console.log('after new Date(): ', new Date(val));
      this.applyForm.appointment_date = new Date(val).getTime() + 5*24*3600*1000;
      console.log('new appointment_date: ', this.applyForm.appointment_date);
    },
    rsetPressureBlur(event) {
      let val = event.target.value;
      console.log('rsetPressure value: ', event.target.value||undefined);
      if(val) {
        this.applyForm.seal_test_pressure = (val*0.9).toFixed(2);
        this.applyForm.rset_pressure = (val*1).toFixed(2);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.applyForm.accept_date = util.formatDate.format(new Date(this.applyForm.accept_date),'yyyy-MM-dd hh:mm:ss');
          this.applyForm.appointment_date = util.formatDate.format(new Date(this.applyForm.appointment_date),'yyyy-MM-dd hh:mm:ss');

          // var param = this.applyForm;
          var param = Object.assign({}, this.applyForm);
          console.log('submitForm param: ', param);

          addApply(param)
            .then(response => {
              console.log('response addApply: ', response);
              let { code, msg , data} = response;
              if (code !== 200) {
                this.$message({ message: msg, type: 'error' });
              } else {
                this.$message({ message: msg, type: 'success' });
                this.$refs['applyForm'].resetFields();
                param.id = data.insertId;
                Bus.$emit('reloadApplyTab', param);
              }
            })
            .catch(error => { console.log(error); });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }, // end methods

  created() {
    let setting = JSON.parse(sessionStorage.getItem('setting'));
    if (setting) {
      console.log('setting: ', setting);
      this.applyForm.approval_number = setting.approval_number;
      this.applyForm.implement_std = setting.implement_std;
      this.ridPrefix = setting.rid_prefix;
    }

    Bus.$on('row', row => {
      console.log('accept: ', row);
      this.applyForm = row;
    });
  }
}

</script>

<style scoped>
/* .el-col {
    margin-top: -13px;
}
.el-row:first-child {
    margin-top: 10px;
} */

.apply-form {
  background: rgba(255,236,208,0.55);
  background: #f9fafb;
  border-radius: 5px;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>

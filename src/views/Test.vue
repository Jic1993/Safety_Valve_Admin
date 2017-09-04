<template>
  <div class="view">
    <!--header-->
    <nav class="test-header">
      <div class="test-header-info">
        <span>
          <i class="el-icon-time el-icon--right"></i>
          {{ time }}
        </span>
        <span>
          <i class="el-icon-circle-check el-icon--right"></i> 检验员：
          {{ user.name }}
        </span>

        <div class="pull-right">
          <el-button type="primary" @click="logout">退出</el-button>
        </div>
      </div>
    </nav>
    <!-- end header-->


    <!-- body -->
    <div class="test-body">
      <el-row :gutter="10" type="flex">
        <!-- 校验结果提交表单 左半部分-->
        <el-col :span="12" class="test-form">

          <el-form :model="showInfoForm" ref="showInfoForm" label-width="68px">

            <el-row :gutter="5">
              <!-- 正在校验的安全阀信息 -->
              <el-col :span="15">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="编号" prop="test_id" label-width="40px">
                      <el-input v-model="showInfoForm.test_id" readonly size="small">2121</el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="13">
                    <el-form-item label="公称通径" prop="nominal_diameter">
                      <el-input v-model="showInfoForm.nominal_diameter" readonly size="small">
                        <template slot="append">mm</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="tight">
                    <el-form-item label="要求整定压力" prop="rset_pressure" label-width="100px">
                      <el-input v-model="showInfoForm.rset_pressure" readonly size="small">
                        <template slot="append">MPa</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col class="tight">
                    <el-form-item label="密封试验压力" prop="seal_test_pressure" label-width="100px">
                      <el-input v-model="showInfoForm.seal_test_pressure" readonly size="small">
                        <template slot="append">MPa</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="4" class="tight">
                    <el-form-item label="" prop="isnew" label-width="0px">
                      <!-- `checked` 为 true 或 false -->
                      <el-checkbox v-model="showInfoForm.isnew" onclick="return false;">新阀</el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="tight">
                    <el-form-item label="" prop="ismaintenance" label-width="5px">
                      <el-checkbox v-model="showInfoForm.ismaintenance" onclick="return false;">修理</el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16" class="tight">
                    <el-form-item label="取阀日期" prop="appointment_date" label-width="80px">
                      <el-input v-model="showInfoForm.appointment_date" readonly size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col class="tight">
                    <el-form-item label="实时压力" prop="real_time_pressure">
                      <el-input v-model="showInfoForm.real_time_pressure">
                        <template slot="append">MPa</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-col>

              <!-- 通道选择 channel select -->
              <el-col :span="9" class="test-channel">
                <el-form-item label="" prop="channel" label-width="0">
                  <span style="display:block">通道选择</span>

                  <!-- <ol style="list-style:none;margin:0px;padding:0px;">
                    <li>
                      <el-switch v-model="channel1" on-color="#13ce66" @change="channelChange" width="55">
                      </el-switch>
                      <span>1通道0- 0.5MPa</span>
                    </li>
                    <li>
                      <el-switch v-model="channel2" on-color="#13ce66" width="55">
                      </el-switch>
                      <span>2通道0- 1.5MPa</span>
                    </li>
                    <li>
                      <el-switch v-model="channel3" on-color="#13ce66" width="55">
                      </el-switch>
                      <span>3通道0- 4.5MPa</span>
                    </li>
                    <li>
                      <el-switch v-model="channel4" on-color="#13ce66" width="55">
                      </el-switch>
                      <span>4通道0-13.5MPa</span>
                    </li>
                    <li>
                      <el-switch v-model="channel5" on-color="#13ce66" width="55">
                      </el-switch>
                      <span>5通道0-40.5MPa</span>
                    </li>
                  </ol> -->
                  <!-- <el-radio-group v-model="showInfoForm.channel">
                    <el-radio label="1">1通道0- 0.5MPa</el-radio>
                    <el-radio label="2">2通道0- 1.5MPa</el-radio>
                    <el-radio label="3">3通道0- 4.5MPa</el-radio>
                    <el-radio label="4">4通道0-13.5MPa</el-radio>
                    <el-radio label="5">5通道0-40.5MPa</el-radio>
                  </el-radio-group> -->

                  <el-radio-group v-model="showInfoForm.channel">
                    <ol style="list-style:none;margin:0px;padding:0px;">
                      <li>
                        <el-switch v-model="chanSwitch1" on-value="1" off-value="0" on-color="" @change="channelChange" class="channel-switch"></el-switch>
                        <el-radio label="1" class="channel-radio" onclick="return false;">第1通道0-&nbsp;&nbsp;0.5MPa</el-radio>
                      </li>
                      <li>
                        <el-switch v-model="chanSwitch2" on-value="2" off-value="0" on-color="" @change="channelChange" class="channel-switch"></el-switch>
                        <el-radio label="2" class="channel-radio" onclick="return false;">第2通道0-&nbsp;&nbsp;1.5MPa</el-radio>
                      </li>
                      <li>
                        <el-switch v-model="chanSwitch3" on-value="3" off-value="0" on-color="" @change="channelChange" class="channel-switch"></el-switch>
                        <el-radio label="3" class="channel-radio" onclick="return false;">第3通道0-&nbsp;&nbsp;4.5MPa</el-radio>
                      </li>
                      <li>
                        <el-switch v-model="chanSwitch4" on-value="4" off-value="0" on-color="" @change="channelChange" class="channel-switch"></el-switch>
                        <el-radio label="4" class="channel-radio" onclick="return false;">第4通道0-13.5MPa</el-radio>
                      </li>
                      <li>
                        <el-switch v-model="chanSwitch5" on-value="5" off-value="0" on-color="" @change="channelChange" class="channel-switch"></el-switch>
                        <el-radio label="5" class="channel-radio" onclick="return false;">第5通道0-40.5MPa</el-radio>
                      </li>
                    </ol>
                  </el-radio-group>

                </el-form-item>
              </el-col> <!-- end 通道选择 channel select -->

            </el-row>
          </el-form>

        <el-tabs v-model="activeTabName" @tab-click="handleTabClick" type="border-card">
          <el-tab-pane label="整定压力调校与测试" name="pressureTestTab">
            <!-- 调校按钮 -->
            <el-col :span="4" class="test_btn">
              <el-row>
                <el-button style=" width:70px;" type="primary" v-bind:disabled="disableTestBtn" @click="startTesting" size="large">调校</el-button>
              </el-row>
              <el-row>
                <el-button style="width:70px;height:100px;white-space:normal" type="primary" v-bind:disabled="disableReviewBtn" @click="startReviewing" size="large">{{ reviewBtnText }}</el-button>
              </el-row>
              <el-row>
                <el-button style="width:70px;" type="danger" @click="resetForm">重置</el-button>
              </el-row>
            </el-col>
            <!-- end 调校按钮 -->

            <!-- 整定压力测试提交表单 -->
            <el-form :model="setPressureForm" :rules="rules" ref="setPressureForm" label-width="70px" class="el-col-20">

              <el-form-item style="display:none">
                <el-input v-model="setPressureForm.test_id" type="hidden"></el-input>
              </el-form-item>

              <el-form-item label="整定压力">
                <el-col :span="12">
                  <el-input>
                    <template slot="append">MPa</template>
                  </el-input>
                </el-col>
                <el-col :span="12" style="line-height:normal;text-align:center">
                  <span>合格范围(MPa)</span><br>
                  <span style="font-size:20px;color:red">{{ qualified_range||'~' }}</span>
                </el-col>
              </el-form-item>

              <el-row>
                <el-row class="el-col-12">
                  <el-form-item label="第一次" prop="set_pressure1" :show-message="false">
                    <el-input v-model.number="setPressureForm.set_pressure1" @blur="setAvgPressure">
                      <template slot="append">MPa</template>
                    </el-input>
                      <!-- <el-button type="primary" @click.native="todo">第一次确认</el-button>   -->
                  </el-form-item>
                  <el-form-item label="第二次" prop="set_pressure2" :show-message="false">
                    <el-input v-model.number="setPressureForm.set_pressure2" @blur="setAvgPressure">
                      <template slot="append">MPa</template>
                    </el-input>
                    <!-- <el-button type="primary" @click.native="todo">第二次确认</el-button> -->
                  </el-form-item>
                  <el-form-item label="第三次" prop="set_pressure3" :show-message="false">
                    <el-input v-model.number="setPressureForm.set_pressure3" @blur="setAvgPressure">
                      <template slot="append">MPa</template>
                    </el-input>
                    <!-- <el-button type="primary" @click.native="todo">第三次确认</el-button> -->
                  </el-form-item>
                </el-row>

                <el-form-item label="平均值" prop="set_pressure" class="el-col-12">
                  <el-row>
                    <el-input v-model.number="setPressureForm.set_pressure" readonly>
                      <template slot="append">MPa</template>
                    </el-input>
                  </el-row>
                  <el-row style="margin-top:50px">
                    <el-button style="height:65px" type="primary" v-bind:disabled="disableSubmitBtn" @click="setPressureSubmit('setPressureForm')" v-loading="submitBtnLoading">结束本次任务</el-button>
                  </el-row>
                </el-form-item>
              </el-row>
            </el-form>
            <!-- end 整定压力测试提交表单 -->

          </el-tab-pane>

          <el-tab-pane label="密封性能测试" name="sealTestTab">此功能还在开发中...</el-tab-pane>
        </el-tabs>

      </el-col> <!-- end 校验结果提交表单 左半部分-->


        <!-- 校验任务列表切换tabs 右半部份-->
        <el-col :span="12">
          <el-tabs v-model="activeTabName1" @tab-click="handleTabClick1" type="border-card">
            <!-- 待校验的任务列表tab -->
            <el-tab-pane label="待校验的任务列表" name="unfinishedTab">
              <el-table :data="unFinishedTable" highlight-current-row v-loading="unFinishedLoading" @row-click="handleRowClick" style="width: 100%" height="600">
                <el-table-column
                  v-for="col in unFinishedCols"
                  :key="col.id"
                  :prop="col.prop"
                  :label="col.label"
                  :width="col.width||150"
                  :fixed="col.fixed"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- 已完成的任务列表tab -->
            <el-tab-pane label="已完成的任务列表" name="finishedTab">此功还能在开发中...</el-tab-pane>
          </el-tabs>
        </el-col> <!-- end 校验任务列表切换tabs 右半部份-->

      </el-row>
    </div> <!-- end body -->
  </div>  <!-- end div-->
</template>

<script>
import axios from 'axios';
import util from '../utilities/formatDate';
import { getTestList, setPressure } from '../api/api';

export default {
  name: 'Test',
  data() {
    return {
      user: {},
      time: new Date().toLocaleString(),
      disableTestBtn:   true,
      disableReviewBtn: true,
      disableSubmitBtn: true,
      reviewBtnText: '复核',
      submitBtnLoading: false,
      setPressureForm: {
          set_pressure: undefined,
          set_pressure1: undefined,
          set_pressure2: undefined,
          set_pressure3: undefined,
      },
      rules: {
        set_pressure: [
          { required: true, message: '请输入整定压力'},
          // { type: 'string', message: '整定压力必须为数字值'}
        ],
        set_pressure1: [
          { required: true, message: '请输入整定压力'},
          { type: 'number', message: '整定压力必须为数字值'}
        ],
        set_pressure2: [
          { required: true, message: '请输入整定压力'},
          { type: 'number', message: '整定压力必须为数字值'}
        ],
        set_pressure3: [
          { required: true, message: '请输入整定压力'},
          { type: 'number', message: '整定压力必须为数字值'}
        ],
      },
      showInfoForm: {
        test_id: undefined,
        rset_pressure: undefined,
        nominal_diameter: undefined,
        seal_test_pressure: undefined,
        real_time_pressure: undefined,
        channel: undefined,
        isnew: undefined,
        ismaintenance: undefined,
        appointment_date: undefined,
      },
      qualified_range: undefined,
      // 通道选择开关
      chanSwitch1: undefined,
      chanSwitch2: undefined,
      chanSwitch3: undefined,
      chanSwitch4: undefined,
      chanSwitch5: undefined,
      pRangeArr: [0, 0.5, 1.5, 4.5, 13.5, 40.5], //压力表量程范围数组
      activeTabName: 'pressureTestTab',
      activeTabName1: 'unfinishedTab',
      unFinishedLoading: false,
      unFinishedTable: [],
      unFinishedCols: [
        { id: 34, prop: 'test_id', label: '校验报告编号' },
        { id: 35, prop: 'test_result', label: '校验结果' },
        { id: 36, prop: 'tester_name', label: '校验人' },

        { id: 21, prop: 'rset_pressure', label: '要求整定压力' },
        { id: 22, prop: 'seal_test_pressure', label: '密封试验压力' },
        { id: 23, prop: 'working_pressure', label: '工作压力' },
        { id: 24, prop: 'pressure_range', label: '压力级别范围' },
        { id: 25, prop: 'test_method', label: '校验方式' },
        { id: 26, prop: 'test_medium', label: '校验介质' },
        { id: 27, prop: 'test_medium_temp', label: '校验介质温度' },

        { id: 37, prop: 'set_pressure', label: '整定压力MPa' },
        { id: 38, prop: 'set_pressure1', label: '第一次整定压力MPa', width: 170 },
        { id: 39, prop: 'set_pressure2', label: '第二次整定压力MPa', width: 170 },
        { id: 40, prop: 'set_pressure3', label: '第三次整定压力MPa', width: 170 },
        { id: 41, prop: 'maintenance_situation', label: '维修情况说明' },
        { id: 42, prop: 'formated_test_date', label: '校验日期', width: 150 },
        { id: 43, prop: 'formated_next_test_date', label: '下次校验日期', width: 150 },
        { id: 44, prop: 'formated_review_date', label: '审核日期', width: 150 },
        { id: 45, prop: 'reviewer_name', label: '审核人' },
        { id: 46, prop: 'formated_issue_date', label: '签发日期', width: 150 },
        { id: 47, prop: 'issuer_name', label: '签发人' },
        { id: 48, prop: 'formated_report_date', label: '生成报告日期', width: 150 },

        { id: 1,  prop: 'id', label: '委托编号' },
        { id: 2,  prop: 'task_num', label: '任务数量' },
        { id: 3,  prop: 'assigned', label: '是否已派发' },
        { id: 4,  prop: 'formated_accept_date', label: '受理时间', width: 150 },
        { id: 5,  prop: 'company_name', label: '单位名称' },
        { id: 6,  prop: 'addr', label: '单位地址' },
        { id: 7,  prop: 'contact_person', label: '联系人' },
        { id: 8,  prop: 'contact_number', label: '联系电话' },
        { id: 9,  prop: 'post_code', label: '邮编' },
        { id: 10, prop: 'isnew', label: '新阀' },
        { id: 11, prop: 'isimported', label: '进口阀' },
        { id: 12, prop: 'ismaintenance', label: '修理' },
        { id: 13, prop: 'manufacture_company', label: '阀门制造单位' },
        { id: 14, prop: 'manufacture_license_number', label: '制造许可证编号', width: 140 },
        { id: 15, prop: 'safety_valve_type', label: '安全阀类型' },
        { id: 16, prop: 'safety_valve_code', label: '安全阀型号' },
        { id: 17, prop: 'install_location', label: '安装位置' },
        { id: 18, prop: 'working_medium', label: '工作介质' },
        { id: 19, prop: 'nominal_diameter', label: '公称通径' },
        { id: 20, prop: 'seat_diameter', label: '阀座口径' },
        { id: 28, prop: 'device_code', label: '设备注册代码' },
        { id: 29, prop: 'product_number', label: '产品编号' },
        { id: 30, prop: 'formated_manufacture_date', label: '出厂日期', width: 150 },
        { id: 31, prop: 'formated_appointment_date', label: '预约取阀日期', width: 150 },
        { id: 32, prop: 'implement_std', label: '执行标准', width: 150 },
        { id: 33, prop: 'approval_number', label: '校验机构核准证号', width: 150 },
      ],
    };
  },
  methods: {
    // 退出
    logout: function () {
      this.$confirm('确认退出吗?', '提示', {type: 'warning'})
        .then(  ()    => {this.$router.push('/login');} )
        .catch( error => {console.log(error)} );
    },
    displayTime() {
      this.time = new Date().toLocaleString();
    },
    // 通道选择
    channelChange(val) {
      console.log(val);
      for( let i=1; i<=5; ++i) {
        this['chanSwitch'+i] = '0';
      }
      this['chanSwitch'+val] = val;
      this.showInfoForm.channel = val;
    },
    // 二分查找 确定通道
    bSearch(arr, start, end, find) {
      if(start > end) return start;
      let mid = parseInt((start+end)/2);
      let midVal = arr[mid];
      if(find<midVal) {
        return this.bSearch(arr, start, mid-1, find);
      } else if(find>midVal) {
        return this.bSearch(arr, mid+1, end, find);
      } else {
        return mid+1;
      }
    },
    // 自动设置Channel, 参数为要求整定压力`rset_pressure`
    autoSetChannel(val) {
      // 压力表最大量程数组 [0, 0.5, 1.5, 4.5, 13.5, 40.5]
      let arr = this.pRangeArr;
      let idx = this.bSearch( arr, 0, arr.length-1 , val)+'';
      this.channelChange(idx);
      this['chanSwitch'+idx] = idx;
    },
    // 开始调校 Button事件
    startTesting() {
      this.$refs['setPressureForm'].resetFields();
      this.reviewBtnText = '复核第一次';
      this.disableReviewBtn = false;
      this.disableSubmitBtn = true;
    },
    // 复核 Button事件
    startReviewing(event) {
      console.log(event.target.innerText);
      let text = event.target.innerText;
      let tmp  = parseFloat(this.showInfoForm.rset_pressure);
      switch(text) {
        case '复核第一次':
          this.reviewBtnText = '复核第二次';
          this.setPressureForm.set_pressure1 = tmp;
          break;
        case '复核第二次':
          this.reviewBtnText = '复核第三次';
          this.setPressureForm.set_pressure2 = tmp;
          break;
        case '复核第三次':
          // this.reviewBtnText = '复核第三次';
          this.setPressureForm.set_pressure3 = tmp;
          this.setAvgPressure();
          this.disableSubmitBtn = false;
          break;
        default:
      }
    },
    // 根据三次测试得到的整定压力，设置平均值
    setAvgPressure(event){
      // this.setPressureForm.set_pressure1 = parseFloat( (parseFloat(this.setPressureForm.set_pressure1).toFixed(2)) );
      if(this.setPressureForm.set_pressure1&&this.setPressureForm.set_pressure2&&this.setPressureForm.set_pressure3) {
        let arr = [this.setPressureForm.set_pressure1, this.setPressureForm.set_pressure2, this.setPressureForm.set_pressure3];
        this.setPressureForm.set_pressure = this.getAvg(arr).toFixed(2);
      } else {
        this.setPressureForm.set_pressure = undefined;
      }
    },
    // 计算平均值
    getAvg(arr) {
      return arr.reduce( (x,y)=>x+y ) / arr.length;
    },
    // Table中选中一行后 事件
    handleRowClick(row, event, column){
      console.log('handleRowClick: ', row);
      // 清除表单 以及 disable button
      this.resetForm();

      // this.showInfoForm = Object.assign({}, row);
      this.showInfoForm.test_id = row.test_id;
      this.showInfoForm.nominal_diameter = row.nominal_diameter;
      this.showInfoForm.rset_pressure = row.rset_pressure;
      this.showInfoForm.seal_test_pressure = row.seal_test_pressure;
      this.showInfoForm.appointment_date = row.formated_appointment_date;
      // this.showInfoForm.appointment_date = row.appointment_date?util.formatDate.format(new Date(row.appointment_date),'yyyy-MM-dd'):undefined;
      this.showInfoForm.isnew = row.isnew=='Y'?true:false;
      this.showInfoForm.ismaintenance = row.ismaintenance=='Y'?true:false;
      // 计算合格压力范围
      let tmp = parseFloat( this.showInfoForm.rset_pressure );
      let lower = (tmp - tmp*0.03).toFixed(3);
      let upper = (tmp + tmp*0.03).toFixed(3);
      this.qualified_range = lower + '~' + upper;
      this.autoSetChannel(this.showInfoForm.rset_pressure);

      this.disableTestBtn = false;
    },
    // 提交整定压力校验结果
    setPressureSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.showInfoForm.test_id) {
            this.$message({ message: '请先在待校验列表中选择一个校验任务', type: 'error' });
            return false;
          }
          let nowDate = new Date();
          let test_date = util.formatDate.format(nowDate,'yyyy-MM-dd hh:mm:ss');
          let next_test_date = nowDate.setFullYear(nowDate.getFullYear()+1);
          next_test_date = util.formatDate.format(new Date(next_test_date),'yyyy-MM-dd hh:mm:ss');
          console.log('date: ', test_date, next_test_date);

          var param = {  tester_name:    this.user.name,
                         test_result:    '合格',
                         test_date:      test_date,
                         next_test_date: next_test_date,
                         test_id:        this.showInfoForm.test_id,
                         set_pressure:   this.setPressureForm.set_pressure,
                         set_pressure1:  this.setPressureForm.set_pressure1,
                         set_pressure2:  this.setPressureForm.set_pressure2,
                         set_pressure3:  this.setPressureForm.set_pressure3,
                        };
          console.log('setPressure Param: ', param);
          setPressure(param)
            .then(response => {
              console.log('response setPressure: ', response);
              let { code, msg , data} = response;
              if (code !== 200) {
                this.$message({ message: msg, type: 'error' });
              } else {
                this.$message({ message: msg, type: 'success' });
                this.resetForm();
								this.loadUnFinishedTable();
              }
            })
            .catch(error => {
                console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this['chanSwitch'+this.showInfoForm.channel] = '0';
      this.reviewBtnText    = '复核';
      this.disableTestBtn   = true;
      this.disableReviewBtn = true;
      this.disableSubmitBtn = true;
      this.qualified_range  = undefined;
      this.$refs['setPressureForm'].resetFields();
      this.$refs['showInfoForm'].resetFields();
      // this.$refs[formName].resetFields();
    },
    // Tab 切换
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    handleTabClick1(tab, event) {
      console.log(tab, event);
    },
    // 获取待校验任务列表
    loadUnFinishedTable() {
      this.unFinishedLoading = true;
      let param = { role: 'tester' };
      getTestList(param)
        .then(response => {
          console.log('response getTestList: ',response);
          this.unFinishedTable = response.data;
          // if(!response.data.length) this.testTableCols = this.testTableCols.slice(0,9);
          this.unFinishedLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.$message({ message: '服务器暂时无法连接-_-', type: 'error', showClose: true, duration: 0 });
        });
    },
  },

  created() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.user = user;
      console.log('user: ', this.user);
    }
    this.loadUnFinishedTable();
  },
  mounted() {
    // 显示时间
    setInterval(()=>this.displayTime(), 1000);
  }
}
</script>

<style scoped>
.view {
  max-width: 1080px;
  height: 720px;
  margin: 0 auto;
  border: 1px solid red;
}
.test-header {
  height: 40px;
  color: #48576a;
  line-height: 40px;
}

.test-form {
  background: rgba(255,255,206,0.55);
  background: #f9fafb;
}
.test-channel {
  background: rgba(255,255,206,0.55);
  background: #eef1f6;
}
ol li {
  /* margin-top: 10px; */
  margin-bottom: 15px;
}
.channel-switch {
  z-index: 0;
}
/* .tight {
    margin-top: -13px;
} */
/* .el-form-item {
  margin-bottom: 10px;
} */
/* .el-row:first-child {
    margin-top: 10px;
} */
.channel-radio {
  margin-left:-19px;
  vertical-align:bottom;
  cursor:default;
}
.test_btn .el-row {
  margin-bottom: 19px;
}
</style>

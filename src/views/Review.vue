<template>
  <div>
  <!--工具条-->
  <el-row :span="24" class="toolbar">
    <el-button type="primary" @click="reviewBtn" :disabled="this.selected.length===0">批量审核</el-button>
  </el-row>
  <!-- 表格 -->
  <el-table :data="testTable" border highlight-current-row v-loading="testLoading" @selection-change="handleSelectionChange" style="width:100%;" height="700">
    <!-- 选择列 -->
    <el-table-column type="selection" width="55"></el-table-column>
    <!-- 数据列 -->
    <el-table-column
      v-for="col in testTableCols"
      :key="col.id"
      :prop="col.prop"
      :label="col.label"
      :width="col.width||130"
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
  </div>
</template>

<script>
import { getTestList, reviewTest } from '@/api/api';
import util from '../utilities/formatDate';

export default {
  name: 'review',
  data() {
    return {
      user: undefined,
      testTable: [],
      testLoading: false,
      selected: [], //列表中选中的行
      testTableCols: [
        { id: 34, prop: 'test_id', label: '校验报告编号' },
        { id: 35, prop: 'test_result', label: '校验结果' },
        { id: 36, prop: 'tester_name', label: '校验人' },
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
        { id: 21, prop: 'rset_pressure', label: '要求整定压力' },
        { id: 22, prop: 'seal_test_pressure', label: '密封试验压力' },
        { id: 23, prop: 'working_pressure', label: '工作压力' },
        { id: 24, prop: 'pressure_range', label: '压力级别范围' },
        { id: 25, prop: 'test_method', label: '校验方式' },
        { id: 26, prop: 'test_medium', label: '校验介质' },
        { id: 27, prop: 'test_medium_temp', label: '校验介质温度' },
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
    handleSelectionChange(sel) {
      this.selected = sel;
      console.log('sel: ', sel);
    },
    // 审核Button 事件
    reviewBtn() {
      let ids = this.selected.map(item => item.test_id).toString();
      let param = {ids: '('+ids+')', name: this.user.name};
      reviewTest(param)
        .then(response => {
          console.log('response reviewTest: ', response);
          let { code, msg } = response;
          if (code !== 200) {
            this.$message({ message: msg, type: 'error' });
          } else {
            this.$message({ message: msg, type: 'success' });
            this.loadTestTable();
          }
        })
        .catch(error => { console.log(error); });
    },
    handleEdit(index, row) {
      console.log(index, row);
      //
      Bus.$emit('row', row);
    },
    handleDelete(index, row) {
      // row.splice(index, 1);
      console.log(index, row);
    },
    // 获取表格数据
    loadTestTable() {
      this.testLoading = true;
      let param = { role: 'reviewer' };
      getTestList(param)
        .then(response => {
          console.log('response getTestList: ',response);
          this.testTable = response.data;
          if(!response.data.length) this.testTableCols = this.testTableCols.slice(0,9);
          this.testLoading = false;
        })
        .catch(error => {
          console.log('ERROR: ', error);
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
    this.loadTestTable();
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
        <!--工具条 Button-->
        <el-row :span="24" class="toolbar">
          <el-button type="primary" @click="assignBtn" :disabled="this.selected.length===0"> {{ msg }}派发任务</el-button>
        </el-row>
        <!-- 表格数据 -->
        <el-table :data="applyTable" border highlight-current-row v-loading="applyLoading" @selection-change="selectChange" style="width:100%;" height="650">

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="col in applyTableCols"
            :key="col.id"
            :prop="col.prop"
            :label="col.label"
            :width="col.width||150"
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
import { assignTask, getApplyList } from '@/api/api';
import util from '@/utilities/formatDate';

export default {
  name: 'Tab',
  props: ['msg'],
  data() {
    return {
      activeTabName: 'assignTab',
      applyTable: [],
      applyLoading: false,
      selected: [], //列表中选中的行
      applyTableCols: [
        { id: 1,  prop: 'id', label: '编号', width: 100 },
        { id: 2,  prop: 'company_name', label: '单位名称', width: 200 },
        { id: 3,  prop: 'addr', label: '单位地址', width: 100 },
        { id: 4,  prop: 'contact_person', label: '联系人' },
        { id: 5,  prop: 'contact_number', label: '联系电话' },
        { id: 6,  prop: 'post_code', label: '邮编' },
        { id: 7,  prop: 'isnew', label: '新阀'},
        { id: 8,  prop: 'isimported', label: '进口阀'},
        { id: 9,  prop: 'ismaintenance', label: '修理'},
        { id: 10, prop: 'safety_valve_code', label: '安全阀型号' },
        { id: 11, prop: 'safety_valve_type', label: '安全阀类型' },
        { id: 12, prop: 'install_location', label: '安装位置' },
        { id: 13, prop: 'working_medium', label: '工作介质' },
        { id: 14, prop: 'nominal_diameter', label: '公称通径'},
        { id: 15, prop: 'seat_diameter', label: '阀座口径'},
        { id: 16, prop: 'rset_pressure', label: '要求整定压力' },
        { id: 17, prop: 'seal_test_pressure', label: '密封试验压力' },
        { id: 18, prop: 'working_pressure', label: '工作压力' },
        { id: 19, prop: 'pressure_range', label: '压力级别范围' },
        { id: 20, prop: 'test_method', label: '校验方式' },
        { id: 21, prop: 'test_medium', label: '校验介质' },
        { id: 22, prop: 'test_medium_temp', label: '校验介质温度' },
        { id: 23, prop: 'product_number', label: '产品编号' },
        { id: 24, prop: 'device_code', label: '设备注册代码' },
        { id: 25, prop: 'manufacture_date', label: '出厂日期' },
        { id: 26, prop: 'appointment_date', label: '预约取阀日期' },
        { id: 27, prop: 'implement_std', label: '执行标准' },
        { id: 28, prop: 'approval_number', label: '校验机构核准证号' },
        { id: 29, prop: 'task_num', label: '相同校验任务数量' },
      ],
    };
  },
  methods: {

    selectChange: function (sel) {
      this.selected = sel;
    },
    // 派发任务Button 事件
    assignBtn() {
      let ids = this.selected.map(item => item.id).toString();
      let param = {ids: '('+ids+')'};
      assignTask(param)
        .then(response => {
          console.log('response assignTask: ', response);
          let { code, msg } = response;
          if (code !== 200) {
            this.$message({ message: msg, type: 'error' });
          } else {
            this.$message({ message: msg, type: 'success' });
            this.loadApplyTable();
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
    // 获取委托（申请）单 数据
    loadApplyTable() {
      this.applysLoading = true;
      getApplyList()
        .then(response => {
          console.log('response getApply',response);
          let { data } = response;
          this.applyTable = data;
          this.applyLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.$message({ message: '服务器暂时无法连接-_-', type: 'error', showClose: true, duration: 0 });
        });
    },
  },

  created() {
    console.log('Tab says: ', this.msg);
    // this.msg = 'other';
    this.loadApplyTable();

  }

}
</script>

<style scoped>

</style>

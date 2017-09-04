<template>
  <div>
    <el-row :gutter="10" type="flex">
      <el-button plain type="info"  @click="hideBtn" :icon="hideBtnIcon" size="mini"></el-button>
      <el-col :span="12" :style="apply1">
        <ApplyForm></ApplyForm>
      </el-col>
      <el-col :span="12" :style="apply2">
        <ApplyList></ApplyList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ApplyForm from '@/views/ApplyForm'
import ApplyList from '@/views/ApplyList'

export default {
  name: 'task',
  components: {
    ApplyForm,
    ApplyList
  },
  data() {
    return {
      apply1: undefined,
      apply2: undefined,
      closed:  false,
      hideBtnIcon: 'd-arrow-left',
    }
  },
  methods: {
    hideBtn() {
      if(this.closed){
        this.apply1 = undefined;
        this.apply2 = undefined;
        this.hideBtnIcon = 'd-arrow-left';
      } else {
        this.apply1 = { display: 'none' };
        this.apply2 = { width: '100%' };
        this.hideBtnIcon = 'd-arrow-right';
      }
      this.closed = !this.closed;
    },
  },
}
</script>


<style scoped>

.el-col {
  /* border: 1px solid red; */
  max-height: 800px;
}

</style>

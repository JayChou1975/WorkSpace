<template>
  <div class="nav">
    <h1>海上风电场运行状态监测系统</h1>
    <div class="picker">
      <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      <el-date-picker
          v-model="value1"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周">
      </el-date-picker>
      <el-date-picker
          v-model="value2"
          type="month"
          placeholder="选择月">
      </el-date-picker>
      <div style="width:100px;display:flex;justify-content: space-between;">
        <img style="width:15px;height:15px;" src="../assets/circle1.png" alt=""/>
        <img style="width:15px;height:15px;" src="../assets/circle1.png" alt=""/>
        <img style="width:15px;height:15px;" src="../assets/circle1.png" alt=""/>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>

<style>
.nav {
  width:100vw;
}

h1{
  width:420px;
  margin:20px auto;
}

.picker{
  border:1px solid #bfa;
  width:90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}
</style>

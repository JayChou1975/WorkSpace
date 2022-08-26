<template>
  <div class="nav">
    <h1>{{msg}}</h1>
    <div class="picker">

      <el-select v-model="wfValue" placeholder="请选择风场" style="width:280px;text-align: center;">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <el-date-picker
          v-model="dateValue"
          value-format='yyyy-MM-dd'
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          >
      </el-date-picker>

      <el-date-picker
          v-model="weekValue"
          type="week"
          value-format='yyyy-MM-dd'
          format="yyyy 第 WW 周"
          placeholder="选择周">
      </el-date-picker>

      <el-date-picker
          v-model="monthValue"
          type="month"
          value-format='yyyy-MM-dd'
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
  name: 'chooseBar',
  components: {},
  props:{
    msg:String,
  },
  data() {
    return {
      options: [{
        value: '1',
        label: '全场'
      }, {
        value: 'Bl',
        label: '龙源江苏如东潮间带试验风电场'
      }, {
        value: 'Cf',
        label: '华能国际江苏如东八仙角海上风电场'
      }, {
        value: 'Dn',
        label: '中船海装江苏如东H3'
      }, {
        value: 'EH',
        label: '协鑫江苏如东H15'
      }, {
        value: 'EJ',
        label: '协鑫江苏如东H13'
      },{
        value: 'FC',
        label: '江苏新能江苏如东H2'
      }],
      wfValue: '',
      dateValue:'',
      weekValue:'',
      monthValue:'',
    }
  },
  watch:{
    wfValue(newValue,oldValue){
      this.sendWf(newValue)
    },
    dateValue(newValue,oldValue){
      if(newValue === null) return
      this.weekValue = ''
      this.monthValue = ''
      this.sendDateRange(newValue)
    },
    weekValue(newValue,oldValue){
      if(newValue === null) return
      this.dateValue = ''
      this.monthValue = ''
      this.sendWeek(newValue)
    },
    monthValue(newValue,oldValue){
      if(newValue === null) return
      this.weekValue = ''
      this.dateValue = ''
      this.sendMonth(newValue)
    },
  },
  methods:{
    sendWf(val) {

      this.$emit('sendWf', val);
    },
    sendDateRange(val){

      this.$emit('sendDateRange', val);
    },
    sendWeek(val){
      this.$emit('sendWeek', val);
    },
    sendMonth(val){
      this.$emit('sendMonth', val);
    },
  }
}
</script>

<style>
.nav {
  width:100%;
}

h1{
  width:500px;
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

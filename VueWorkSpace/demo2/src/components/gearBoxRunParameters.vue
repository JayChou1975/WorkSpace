<template>
  <div>
    <h1 align="center">齿轮箱运行参数</h1>

    <el-divider></el-divider>

    <h2>【齿轮箱关键参数统计时间段内最大值】</h2>

    <el-divider></el-divider>
     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="maxValueTime"
      label=" "
      width="140">
    </el-table-column>
    <el-table-column
      prop="OilTemp"
      label="齿轮箱油温（℃）"
      width="140">
    </el-table-column>
    <el-table-column
      prop="inputTemp"
      label="齿轮箱进口温度（℃）"
      width="170">
    </el-table-column>
    <el-table-column
      prop="frontTemp"
      label="齿轮箱高速轴前端温度（℃）"
      width="220">
    </el-table-column>
    <el-table-column
      prop="backTemp"
      label="齿轮箱高速轴后端温度（℃）"
      width="220">
    </el-table-column>
    <el-table-column
      prop="inputPressure"
      label="齿轮箱进口压力（bar）"
      width="200">
    </el-table-column>
    <el-table-column
      prop="pumpPressure"
      label="齿轮箱油泵出口压力（bar）"
      width="200">

    </el-table-column>
     </el-table>
    
    <el-divider></el-divider>

    <div id="main" class="main_container"></div>
  </div>
</template>


<script>

export default {
  name: 'gearBoxRunParameters',
  components: {

  },
  data() {
    return {
        tableData: [
        {
        maxValueTime: '值',
        OilTemp: 46.7,
        inputTemp: 47.3,
        frontTemp: 69.5,
        backTemp: 66.7,
        inputPressure:2.3,
        pumpPressure: 10.5
        },
        {
        maxValueTime: '最大值出现时间',
        OilTemp: '2022-03-10 05:35:39',
        inputTemp: '2022-03-10 05:35:39',
        frontTemp: '2022-03-10 05:35:39',
        backTemp: '2022-03-10 05:35:39',
        inputPressure:'2022-03-10 05:35:39',
        pumpPressure: '2022-03-10 05:35:39'
        }
        ]
    }
  },
  computed:{

  },
    mounted(){
    this.initCharts()
  },
  methods:{
    initCharts(){

  var myChart = this.$echarts.init(document.getElementById("main"))
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      })
    }
  },
  watch:{

  }

}


</script>

<style>
.nav {
  width:100vw;
}

.h1{
  width:600px;
  margin:20px auto;
}


.main_container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}


</style>

<template>
  <div>
    <h1 align="center">齿轮箱运行参数</h1>

    <el-divider></el-divider>

    <h2>【齿轮箱关键参数统计时间段内最大值】</h2>

    <template>
      <el-divider></el-divider>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="maxValueTime" label=" " width="140">
        </el-table-column>
        <el-table-column prop="oilTemp" label="齿轮箱油温（℃）" width="140">
        </el-table-column>
        <el-table-column prop="inputTemp" label="齿轮箱进口温度（℃）" width="170">
        </el-table-column>
        <el-table-column prop="frontTemp" label="齿轮箱高速轴前端温度（℃）" width="220">
        </el-table-column>
        <el-table-column prop="backTemp" label="齿轮箱高速轴后端温度（℃）" width="220">
        </el-table-column>
        <el-table-column prop="inputPressure" label="齿轮箱进口压力（bar）" width="200">
        </el-table-column>
        <el-table-column prop="pumpPressure" label="齿轮箱油泵出口压力（bar）" width="200">

        </el-table-column>
      </el-table>
    </template>

    <el-divider></el-divider>
    <!-- echarts -->
    <div id="chartLineBox" style="width: 90%;height: 70vh;"> </div>


    <el-divider></el-divider>
    <!-- echarts -->
    <div id="chartLineBox2" style="width: 90%;height: 70vh;"> </div>


  </div>
</template>


<script>
import axios from 'axios'
import { number } from 'echarts'
import { Loading } from 'element-ui';
export default {
  name: 'gearBoxRunParameters',
  components: {

  },
  data() {
    return {
      oilTempArr: [],     //齿轮箱油池温度，B00761
      inputTempArr: [],   //齿轮箱油进口油温，B00771
      frontTempArr: [],   //齿轮箱高速轴后端温度，B00721
      endTempArr: [],     //齿轮箱高速轴后端温度，B00731
      dateArr: [],
      avePow: [],         //60s平均有功功率，A00211
      aveSpe: [],          //60s平均风速，B01122
      inputPre: [],        //齿轮箱进口压力，B00782
      pumpPre: [],         //齿轮箱油泵出口压力,B00792
      tableData: [
        {
          maxValueTime: '值',
          oilTemp: 46.7,
          inputTemp: 47.3,
          frontTemp: 69.5,
          backTemp: 66.7,
          inputPressure: 2.3,
          pumpPressure: 10.5
        },
        {
          maxValueTime: '最大值出现时间',
          oilTemp: '2022-03-10 05:35:39',
          inputTemp: '2022-03-10 05:35:39',
          frontTemp: '2022-03-10 05:35:39',
          backTemp: '2022-03-10 05:35:39',
          inputPressure: '2022-03-10 05:35:39',
          pumpPressure: '2022-03-10 05:35:39'
        }],
    }
  },
  computed: {

  },
  mounted() {
    this.dataGet()
  },
  methods: {

    async dataGet(url) {
      let loadingInstance = Loading.service({ fullscreen: true });
      var url = "http://192.168.190.147:15000/hzfd-phm/scada-history/offline/20220701000000/20220801000000/CfAA/";

      //  B00761,B00771,B00721,B00731,A00211

      var urlCopy = url + "B00761,B00771,B00721,B00731,A00211,B01122,B00782,B00792"
      const res1 = await axios.get(urlCopy)
      const data1 = res1.data.data
      res1.data.data.sort((a, b) => {
        return Number(a.TIME.split(" ")[0].split("-").join("") + a.TIME.split(" ")[1].split(":").join("")) - Number(b.TIME.split(" ")[0].split("-").join("") + b.TIME.split(" ")[1].split(":").join(""))
      })
      data1.map((item, index) => {
        this.oilTempArr.push(item.B00761)   //齿轮箱进口油温
        this.inputTempArr.push(item.B00771) //齿轮箱进口油温
        this.frontTempArr.push(item.B00721) //齿轮箱高速轴前端温度
        this.endTempArr.push(item.B00731)    //齿轮箱高速轴后端温度
        this.avePow.push(item.A00211)       //60s平均有功功率
        this.aveSpe.push(item.B01122)       //60s平均风速
        this.inputPre.push(item.B00782)     //齿轮箱进口压力
        this.pumpPre.push(item.B00792)      //齿轮箱油泵出口压力
        this.dateArr.push(item.TIME)        //获取日期
      })


    /*
      // //获取齿轮箱油池温度
      // var urlCopy = url + "B00761"
      // console.log(urlCopy)
      // const res1 = await axios.get(urlCopy)
      // const data1 = res1.data.data
      // res1.data.data.sort((a, b) => {
      //   return Number(a.TIME.split(" ")[0].split("-").join("") + a.TIME.split(" ")[1].split(":").join("")) - Number(b.TIME.split(" ")[0].split("-").join("") + b.TIME.split(" ")[1].split(":").join(""))
      // })
      // data1.map((item, index) => {
      //   this.oilTempArr.push(item.B00761)
      // })

      //   //获取齿轮箱进口油温
      // urlCopy = url + "B00771"
      // console.log(urlCopy)
      // const res2 = await axios.get(urlCopy)
      // res2.data.data.sort((a, b) => {
      //   return Number(a.TIME.split(" ")[0].split("-").join("") + a.TIME.split(" ")[1].split(":").join("")) - Number(b.TIME.split(" ")[0].split("-").join("") + b.TIME.split(" ")[1].split(":").join(""))
      // })
      // const data2 = res2.data.data
      // data2.map((item, index) => {
      //   this.inputTempArr.push(item.B00771)
      // })

      //   //获取齿轮箱高速轴前端温度
      // urlCopy = url + "B00721"
      // console.log(urlCopy)
      // const res3 = await axios.get(urlCopy)
      // res3.data.data.sort((a, b) => {
      //   return Number(a.TIME.split(" ")[0].split("-").join("") + a.TIME.split(" ")[1].split(":").join("")) - Number(b.TIME.split(" ")[0].split("-").join("") + b.TIME.split(" ")[1].split(":").join(""))
      // })
      // const data3 = res3.data.data
      // data3.map((item, index) => {
      //   this.frontTempArr.push(item.B00721)
      // })

      // //获取齿轮箱高速轴后端端温度
      // urlCopy = url + "B00731"
      // console.log(urlCopy)
      // const res4 = await axios.get(urlCopy)
      // res4.data.data.sort((a, b) => {
      //   return Number(a.TIME.split(" ")[0].split("-").join("") + a.TIME.split(" ")[1].split(":").join("")) - Number(b.TIME.split(" ")[0].split("-").join("") + b.TIME.split(" ")[1].split(":").join(""))
      // })
      // const data4 = res4.data.data
      // data4.map((item, index) => {
      //   this.endTempArr.push(item.B00731)
      // })

      // // console.log(res4)

      //  this.dateArr.push(item.TIME) //获取日期
      // data4.map((item, index) => {
      //   // console.log(item.B00761)
      //   var date = item.TIME
      //   this.dateArr.push(item.TIME)
      // })

      //   urlCopy = url + "A00211"
      // console.log(urlCopy)
      // const res5 = await axios.get(urlCopy)
      // res5.data.data.sort((a, b) => {
      //   return Number(a.TIME.split(" ")[0].split("-").join("") + a.TIME.split(" ")[1].split(":").join("")) - Number(b.TIME.split(" ")[0].split("-").join("") + b.TIME.split(" ")[1].split(":").join(""))
      // })
      // const data5 = res5.data.data
      // data5.map((item, index) => {
      //   this.avePow.push(item.A00211)
      // })

      // console.log(this.avePow)
*/
      this.initCharts(loadingInstance)
    },


    initCharts(loadingInstance) {

      // 表1 温度表
      this.chartLine = echarts.init(document.getElementById('chartLineBox'));
      // 指定图表的配置项和数据
      var option = {
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
            start: 40,
            end: 45
          }
        ],
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data: ['齿轮箱油池温度', '齿轮箱进口油温', '齿轮箱高速轴前端温度', '齿轮箱高速轴后端温度']
        },
        color: ['#0066cc', '#ff9933', '#00994c', 'ff0000'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白

          //  data: ['2019-1-1', '2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1',],
          data: this.dateArr,
          name: '时间',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#FA6F53',
            }
          }
        },
        yAxis: {
          name: '温度(℃)',
          nameTextStyle: {
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#FA6F53',
            }
          },
          type: 'value',
          scale: true
        },
        series: [
          {
            name: '齿轮箱油池温度',
            //  data:  [220, 232, 201, 234, 290, 230, 220],
            data: this.oilTempArr,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#0066cc',
              }
            },
          },
          {
            name: '齿轮箱进口油温',
            data: this.inputTempArr,
            type: 'line',
            lineStyle: {
              normal: {
                color: '#ff9933',
              }
            },
          },
          {
            name: '齿轮箱高速轴前端温度',
            data: this.frontTempArr,
            type: 'line',
            lineStyle: {
              normal: {
                color: '#00994c',
              }
            },
          },
          {
            name: '齿轮箱高速轴后端温度',
            data: this.endTempArr,
            type: 'line',
            lineStyle: {
              normal: {
                color: '#ff0000',
              }
            },
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);


      //表2 60s平均有功功率
      this.chartLine = echarts.init(document.getElementById('chartLineBox2'));
      option = {
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
            start: 40,
            end: 45
          }
        ],
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data: ['60s平均有功功率']
        },
        color: ['#0066cc'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白

          data: this.dateArr,
          name: '时间',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#FA6F53',
            }
          }
        },
        yAxis: {
          name: '60s平均有功功率(KW)',
          min: function (value) {//取最小值向下取整为最小刻度
            return Math.floor(value.min)
          },
          max: function (value) {//取最大值向上取整为最大刻度
            return Math.ceil(value.max)
          },

          nameTextStyle: {
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#FA6F53',
            }
          },
          type: 'value',
          scale: true
        },
        series: [
          {
            name: '60s平均有功功率',
            data: this.avePow,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#0066cc',
              }
            },
          }

        ]
      };
      this.chartLine.setOption(option);

      //表3 60s平均风速


      //表4 齿轮箱进口压力&齿轮箱油泵出口压力


      loadingInstance.close();
    }
  },
  watch: {

  }

}


</script>

<style>
.nav {
  width: 100vw;
}

.h1 {
  width: 600px;
  margin: 20px auto;
}


.main_container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

#chartLineBox {
  width: 100%;
  height: 500px;
  margin: 0 auto;
}

#chartLineBox2 {
  width: 100%;
  height: 500px;
  margin: 30 auto;
}
</style>


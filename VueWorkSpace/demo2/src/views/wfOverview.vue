<template>
  <div class="nav">
    <chooseBar msg="海上风电场运行状态监测总览" @sendWf="sendWf" @sendDateRange="sendDateRange" @sendWeek="sendWeek" @sendMonth="sendMonth"/>
    <el-divider></el-divider>
    <div v-for="item in wfLists" :key="item.id" style="width:90%;height:350px;margin: 0 auto;">
      <div class="wfOverview">
        <div class="Overview">
          <div class="title">{{item.WfName}}风场概览</div>
          <div style="display: flex;justify-content: space-evenly">
            <img src="../assets/1.png" alt="" style="width: 240px;height:240px; transform: translateY(-10px)" />
<!--            <div style="background-image:url('../assets/1.png'); background-repeat:no-repeat;width: 240px;height:240px;padding:0 10px;"></div>-->
            <el-descriptions border style="width: 350px;height:250px" :column=1>
              <el-descriptions-item content-class-name="my-content">
                <template slot="label">风场装机容量</template>
                {{ item.capacity }}
              </el-descriptions-item>
              <el-descriptions-item content-class-name="my-content">
                <template slot="label">风场装机台数</template>
                {{ item.count }}
              </el-descriptions-item>
              <el-descriptions-item content-class-name="my-content">
                <template slot="label">统计时间段全场总发电量</template>
                {{ item.totalElectricity }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div class="defaultCondition">
          <div style="display: flex;flex-direction: column;align-items: center;">
            <div class="title">全场 SCADA 故障分布情况</div>
            <div :id="item.WfId" style="width: 320px;height:230px;border: 1px solid black;"></div>
          </div>
          <div style="margin-left: 10px;">
            <div class="title">全场故障 top5</div>
            <el-descriptions class="margin-top" size="normal" border style="width: 300px;" :column=1>
              <el-descriptions-item>
                <template slot="label">风场装机容量</template>
                {{ item.capacity }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">风场装机台数</template>
                {{ item.count }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">统计时间段全场总发电量</template>
                {{ item.totalElectricity }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">风场装机容量</template>
                {{ item.capacity }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">风场装机容量</template>
                {{ item.capacity }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
      <el-divider style="width:90%;"></el-divider>
    </div>
  </div>
</template>

<script>
import chooseBar from "@/components/chooseBar";
import * as echarts from 'echarts';
import axios from "axios";

export default {
  name: 'wfOverview',
  components: {
    chooseBar
  },
  data() {
    return {
      url : 'http://192.168.190.147:15000/hzfd-phm/scada-history/offline/',
      wfValue: '1',
      startDateValue:'',
      endDateValue:'',
      weekValue:'',
      monthValue:'',

      wfLists:[
        {
          capacity:'10MW',
          count:'2台',
          WTGId:['AA','AB'],
          WfId:'Bl',
          WfName:'龙源江苏如东潮间带试验风电场',
          totalElectricity:'',
          default:[
              {
                value:5,
                name:"齿轮箱"
              },
              {
                value:6,
                name:"发电机"
              },
              {
                value:2,
                name:"变频器"
              },
              {
                value:2,
                name:"主轴"
              }
          ]
        },
        {
          capacity:'100MW',
          count:'20台',
          WfId:'Cf',
          WTGId: //['AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT'],
          ['AA','AB','AC','AD','AE','AF','AG','AH','AI','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT'],
          WfName:'华能国际江苏如东八仙角海上风电场',
          totalElectricity:'100GWh',
          default:[
            {
              value:5,
              name:"齿轮箱"
            },
            {
              value:6,
              name:"发电机"
            },
            {
              value:2,
              name:"变频器"
            },
            {
              value:2,
              name:"主轴"
            }
          ]
        },
        {
          capacity:'400MW',
          count:'80台',
          WfId:'Dn',
          WfName:'中船海装江苏如东H3',
          WTGId:['AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ',
                 'BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN','BO','BP','BQ','BR','BS','BT','BU','BV','BW','BX','BY','BZ',
                 'CA','CB','CC','CD','CE','CF','CG','CH','CI','CJ','CK','CL','CM','CN','CO','CP','CQ','CR','CS','CT','CU','CV','CW','CX','CY','CZ',
                 'DA','DB'],
          totalElectricity:'100GWh',
          default:[
            {
              value:6,
              name:"齿轮箱"
            },
            {
              value:2,
              name:"发电机"
            },
            {
              value:7,
              name:"变频器"
            },
            {
              value:1,
              name:"主轴"
            }
          ]
        },
        {
          capacity:'200MW',
          count:'40台',
          WfId:'EH',
          WfName:'协鑫江苏如东H15',
          WTGId: ['AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ',
                  'BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN'],
          totalElectricity:'100GWh',
          default:[
            {
              value:5,
              name:"齿轮箱"
            },
            {
              value:4,
              name:"发电机"
            },
            {
              value:5,
              name:"变频器"
            },
            {
              value:4,
              name:"主轴"
            }
          ]
        },
      ],
    }
  },
  mounted(){
    this.initDefaultPir()
  },
  methods:{
    async getDefaultTop5(wf){
      //http://192.168.190.147:15000/hzfd-phm/scada-history/offline/20200110000000/20220611235900/AAAA/B01352

      // let url1 = 'http://192.168.190.147:15000/hzfd-phm/scada-history/offline/20210801000000/20210802235900/CfAC/A00121'
      // const res1 = await axios.get(url1)
      // console.log(res1)
      //
      // let url  = 'http://192.168.190.147:15000/hzfd-phm/scada-history/offline/20210801000000/20210802235900/CfAD/A00121'
      // const res = await axios.get(url)
      // console.log(res)

      // let c
      // const time = res.data.data.map(item =>{
      //   let a = item.TIME.split(" ")[0].split("-").join("")
      //   let b = item.TIME.split(" ")[1].split(":").join("")
      //   c = a+b
      //   return Number(c)
      // })
      if(wf === '1'){ //全场数据
        for(let item of this.wfLists){
          let totalElec = 0
          for(let i of item.WTGId){
            let url = this.url + this.startDateValue + '000000/' + this.endDateValue + '235900/' + item.WfId + i + '/A00121'
            const res = await axios.get(url)
            console.log(item.WfId + i)
            console.log(res.data)
            const elec = res.data.data.map(item => item['A00121'])
            //console.log(elec)
            elec.sort((a,b)=>{
              return a-b
            })
            //console.log(elec[elec.length-1] - elec[0])
            totalElec += elec[elec.length-1] - elec[0]
          }
          item.totalElectricity = totalElec.toFixed(4) + "GWH"
        }
      }else {
        for(let item of this.wfLists){
          if(item.WfId === wf) {
            let totalElec = 0
            for(let i of item.WTGId){
              let url = this.url + this.startDateValue + '000000/' + this.endDateValue + '235900/' + item.WfId + i + '/A00121'
              const res = await axios.get(url)
              console.log(item.WfId + i)
              console.log(res.data)
              const elec = res.data.data.map(item => item['A00121'])
              //console.log(elec)
              elec.sort((a,b)=>{
                return a-b
              })
              //console.log(elec[elec.length-1] - elec[0])
              totalElec += elec[elec.length-1] - elec[0]
            }
            item.totalElectricity = totalElec.toFixed(4) + "GWH"
          }
        }
      }

    },

    sendWf(val) {
     // console.log("+++"+val)
      this.wfValue = val
    },
    sendDateRange(val) {
      //console.log("+++")
     // console.log(val)
      this.startDateValue = val[0].split("-").join("")
      this.endDateValue = val[1].split("-").join("")
      this.getDefaultTop5(this.wfValue)
    },
    sendWeek(val) {
     // console.log("+++")
     // console.log(val)
      this.weekValue = val
    },
    sendMonth(val) {
     // console.log("+++")
     // console.log(val)
      this.monthValue = val
    },

    initDefaultPir(){
      for(let i of this.wfLists){
        let chartDom = document.getElementById(i.WfId);
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            top:'middle'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '90%',
              center: ['33%', '50%'],
              label:{
                show:false
              },
              data: i.default
              //[
              //   { value: 1048, name: 'Search Engine' },
              //   { value: 735, name: 'Direct' },
              //   { value: 580, name: 'Email' },
              //   { value: 484, name: 'Union Ads' },
              //   { value: 300, name: 'Video Ads' }
              //],

            }
          ]
        };

        option && myChart.setOption(option);
      }
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

.wfOverview{
  width:1500px;
  display: flex;
  height: 290px;
  align-items: center;
  margin:0 auto;
  border: 1px solid #bfa;
}

.Overview{
  width:750px;
  height:285px;

  margin-left: 15px;
}

.defaultCondition{

  width:650px;
  height:285px;
  display: flex;
}

.title{
  width:320px;
  text-align:center;
  margin:10px auto;
}

.my-content {
  text-align: center;
  height: 77px;
  width:150px;
}
</style>

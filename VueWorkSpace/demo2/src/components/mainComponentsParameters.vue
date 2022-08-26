<template>
  <div>
     <chooseBar msg="海上风电场主要零部件运行参数" @sendWf="sendWf" @sendDateRange="sendDateRange" @sendWeek="sendWeek" @sendMonth="sendMonth"/>
     <el-divider></el-divider>
    <el-collapse v-model="activeName" accordion class="collapse" style="border:2px solid black;">

      <el-collapse-item title="变桨" name="1" >
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>

      <el-collapse-item title="主轴承" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>

      <el-collapse-item title="齿轮箱" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>

      <el-collapse-item title="发电机" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>

      <el-collapse-item title="变频器" name="5" >
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>

      <el-collapse-item title="主控" name="6">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>

      <el-collapse-item title="偏航" name="7">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>

      <el-collapse-item title="液压" name="8">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>

      <el-collapse-item title="塔筒" name="9">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>

      <el-collapse-item title="箱变" name="10">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>

      <el-collapse-item title="基础" name="11">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>

    </el-collapse>

  </div>
</template>






<script>
// @ is an alias to /src
import chooseBar from "@/components/chooseBar";

export default {
  name: 'mainComponentsParameters',
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
  methods:{
    sendWf(val) {
      this.wfValue = val
    },
    sendDateRange(val) {
      this.startDateValue = val[0].split("-").join("")
      this.endDateValue = val[1].split("-").join("")
      this.getDefaultTop5(this.wfValue)
    },
    sendWeek(val) {
      this.weekValue = val
    },
    sendMonth(val) {
      this.monthValue = val
    },
  }
}
</script>

<style>
.nav {
  width:100vw;
}

h1{
  width:500px;
  margin:20px auto;
}

.picker{
  border:1px solid rgb(0, 0, 0);
  width:90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}

.collapse{
  margin:200px auto;
  width:90%;
  display: flex;
  flex-direction:column;
  justify-content: left;
  align-items: left;
  margin: 0 auto;
}

</style>

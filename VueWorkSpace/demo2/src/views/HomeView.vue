<template>
  <div class="nav">
    <HelloWorld msg=""/>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
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

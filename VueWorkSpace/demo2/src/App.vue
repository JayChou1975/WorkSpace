<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import wfOverview from "@/views/wfOverview";
import localData from "./components/data.json"
export default {
  components: {
    wfOverview,
    localData
  },
  data() {
    return {
    };
  },
  methods: {},
  mounted() {},
  watch: {
  },
};
</script>

<style>
*{
  margin:0;
  padding:0;
}

#app{
  width:100%;
}
</style>

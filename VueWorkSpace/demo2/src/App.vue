<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import wfOverview from "@/views/wfOverview";

export default {
  components: {
    wfOverview
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

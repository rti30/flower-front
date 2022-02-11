<template>
  <div>
    <flower-news />
  </div>
</template>

<script>
//import { mapActions } from "vuex";
import FlowerNews from "@/components/main/FlowerNews.vue";

export default {
  name: "App",
  components: {
    FlowerNews,
  },
  data() {
    return {
      news: null,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

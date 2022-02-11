<template>
  <flower-E404></flower-E404>
</template>

<script>
import FlowerE404 from "@/components/main/FlowerE404.vue";
export default {
  name: "E404",
  $head() {
    return {
      title: "Страница не найдена",
    };
  },
  components: {
    FlowerE404,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
</style>
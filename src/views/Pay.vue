<template>
  <flower-pay></flower-pay>
</template>

<script>
import FlowerPay from "@/components/main/FlowerPay.vue";
export default {
  name: "pay",
  $head() {
    return {
      title: "Оплата",
    };
  },
  components: {
    FlowerPay,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
</style>
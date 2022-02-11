<template>
  <div>
    <div
      v-if="!cart.length"
      class="subtitle"
    >Корзина пуста</div>
    <flower-cart v-else></flower-cart>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FlowerCart from "@/components/main/FlowerCart.vue";
export default {
  name: "cart",
  $head() {
    return {
      title: "Корзина",
    };
  },
  components: {
    FlowerCart,
  },
  data() {
    return {};
  },
  computed: {
    //...mapGetters("product", { products: "products" }),
    ...mapGetters("cart", {
      cart: "cart",
    }),
  },
  methods: {
    ...mapActions("anyParams", { changeHeader: "changeHeaderStatus" }),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader(false);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader(true);
    next();
  },
};
</script>

<style lang="scss">
</style>
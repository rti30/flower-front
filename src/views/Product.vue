<template>
  <div class="page">
    <flower-product
      v-if="hasProduct && !awaitGetProduct"
      :product="product"
    ></flower-product>
    <div v-else-if="awaitGetProduct">Данный о продукте загружаются</div>
    <flower-e404 v-else title="Продукт не найден"></flower-e404>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FlowerProduct from "@/components/main/FlowerProduct";
import FlowerE404 from "@/components/main/FlowerE404";
export default {
  name: "product",
  components: {
    FlowerProduct,
    FlowerE404,
  },

  $head() {
    return {
      title: "Flower",
    };
  },
  data() {
    return {
      awaitGetProduct: false,
    };
  },
  computed: {
    ...mapGetters("product", { current: "product" }),
    id() {
      return this.$route.params.id;
    },

    product() {
      return this.current(this.id);
    },
    hasProduct() {
      return this.product !== undefined;
    },
  },
  methods: {
    ...mapActions("product", { getProduct: "getOneProductById" }),
  },
  async mounted() {
    if (!this.hasProduct && !this.awaitGetProduct) {
      this.awaitGetProduct = true;
      await this.getProduct({ id: this.id });
      this.awaitGetProduct = false;
    }
  },
};
</script>

<style lang="scss">
</style>
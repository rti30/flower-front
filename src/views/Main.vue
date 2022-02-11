<template>
  <div>
    <section class="news">
      <div class="content-width">
        <flower-news></flower-news>
      </div>
    </section>
    <flower-category></flower-category>
    <section class="hit">
      <div class="content-width">
        <h2 class="hit__title title title--black">Хиты продаж</h2>
        <slider-block :data="getCategoryHit"> </slider-block>
      </div>
    </section>
    <flower-season></flower-season>
    <section class="new">
      <div class="content-width">
        <h2 class="new__title title title--black">Новинки</h2>
        <slider-block :data="getCategoryNew"> </slider-block>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FlowerCategory from "@/components/main/FlowerCategory.vue";
import FlowerNews from "@/components/main/FlowerNews.vue";
import SliderBlock from "@/components/main/SliderBlock.vue";
import FlowerSeason from "@/components/main/FlowerSeason.vue";

export default {
  name: "mainPage",
  $head() {
    return {
      title: "FLOWER - Магазин цветов",
    };
  },
  components: {
    FlowerCategory,
    FlowerNews,
    SliderBlock,
    FlowerSeason,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("product", { products: "products" }),
    getCategoryHit() {
      return this.products?.filter((product) => {
        return Object.values(product.tags)?.includes("Хит продаж");
      });
    },
    getCategoryNew() {
      return this.products?.filter((product) => {
        return Object.values(product.tags)?.includes("Новинка");
      });
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.hit,
.new,
.catalog {
  // .hit__title
  background-color: $c-Light;
  border-radius: calcSize(17, 38, $minWidth, $maxWidth);
  overflow: hidden;
  padding: 5px 0px 2px 5px;
}
</style>
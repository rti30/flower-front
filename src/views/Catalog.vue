<template>
  <div>
    <div v-if="
        filterActive &&
        (!awaitGetProduct || !awaitSearch) &&
        !filterProducts.length
      ">
      Нет товаров, удовлетворяющих условиям фильра в данной категории
    </div>
    <flower-catalog
      v-else-if="show && show.length && !awaitGetProduct"
      :products="show"
    ></flower-catalog>

    <div v-else-if="awaitGetProduct || awaitSearch">Продукты загружаются</div>
    <flower-e404
      v-else
      title="Продукты не найдены"
    ></flower-e404>
    <flower-category></flower-category>
    <flower-filter></flower-filter>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FlowerCatalog from "@/components/main/FlowerCatalog.vue";
import FlowerCategory from "@/components/main/FlowerCategory.vue";
import FlowerFilter from "@/components/ui/FlowerFilter.vue";
import FlowerE404 from "@/components/main/FlowerE404";
export default {
  name: "catalog",
  $head() {
    return {
      title: "Каталог",
    };
  },
  components: {
    FlowerCatalog,
    FlowerCategory,
    FlowerFilter,
    FlowerE404,
  },
  data() {
    return {
      awaitGetProduct: false,
    };
  },
  computed: {
    ...mapGetters("product", { loadedProducts: "products" }),
    ...mapGetters("like", { readyLikesLoad: "readyLoad" }),
    ...mapGetters("filter", {
      filterProducts: "filterItems",
      filterActive: "filterActive",
      searchProducts: "products",
      awaitSearch: "awaitSerch", //! дополнительный параметр из модуля поиска, т.к. страница может стартовать из поисковой строки по ссылке, этот случай обрабатывает router
    }),
    ...mapGetters("like", { likesProducts: "likesProducts" }),
    currentParams() {
      return this.$route?.params;
    },
    categoryName() {
      return this.currentParams?.category;
    },
    tagName() {
      return this.currentParams?.tag;
    },
    searchParam() {
      return this.currentParams?.search;
    },
    likesParam() {
      return this.currentParams?.likes;
    },

    categories() {
      return this.loadedProducts?.filter((product) => {
        return Object.values(product.categories)?.includes(this.categoryName);
      });
    },
    tags() {
      return this.loadedProducts?.filter((product) => {
        return Object.values(product.tags)?.includes(this.tagName);
      });
    },

    products() {
      return this.categoryName
        ? this.categories
        : this.searchParam
        ? this.searchProducts
        : this.tagName
        ? this.tags
        : this.likesParam
        ? this.likesProducts
        : null;
    },
    show() {
      return this.filterProducts.length && this.filterActive
        ? this.filterProducts
        : this.products;
    },
  },
  methods: {
    ...mapActions("product", {
      productsByTag: "getByTagName",
      productsByCategory: "getByCategoryName",
    }),
    ...mapActions("filter", {
      setFilterData: "setData",
      cancelFilter: "cancel",
      goSearch: "goSearch",
      /// setSearch: "setSearch",
    }),
    ...mapActions("like", {
      getLikesProducts: "getLikesProducts",
    }),
    async getProducts() {
      if (this.categoryName && !this.awaitGetProduct) {
        this.awaitGetProduct = true;
        await this.productsByCategory({
          critical: false,
          messege: "",
          param: this.categoryName,
        });
        this.awaitGetProduct = false;
      } else if (this.tagName && !this.awaitGetProduct) {
        this.awaitGetProduct = true;
        await this.productsByTag({
          critical: false,
          messege: "",
          param: this.tagName,
        });
        this.awaitGetProduct = false;
      } else if (this.searchParam && !this.awaitGetProduct) {
        this.awaitGetProduct = true;
        //  this.setSearch(this.searchParam); //! Перенесено в роутер, т.к. нужно перехватывать раньше
        await this.goSearch;
        this.awaitGetProduct = false;
      } else if (this.likesParam && !this.awaitGetProduct) {
        this.awaitGetProduct = true;
        await this.readyLikesLoad;
        console.log("11111111111111111");
        await this.getLikesProducts();
        this.awaitGetProduct = false;
      }

      this.setFilterData(this.products); //Установаливаем текщие продуты в store/фильтер
    },
  },

  watch: {
    currentParams: function () {
      console.log(
        this.categoryName,
        this.tagName,
        this.searchParam,
        this.likesParam
      );
      this.getProducts();
    },
  },
  mounted() {
    this.getProducts();
  },

  beforeRouteLeave(to, from, next) {
    //очищаем фильтер перед выходом
    this.setFilterData([]);
    this.cancelFilter();
    next();
  },
};
</script>

<style lang="scss">
</style>
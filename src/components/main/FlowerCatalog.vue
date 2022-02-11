<template>
  <section
    class="catalog to"
    data-scrl="catalog"
  >
    <div class="content-width">
      <h2 class="catalog__title title title--black">Каталог</h2>
      <div class="catalog__wrapper">
        <item-card
          v-for="item in productsOnPage"
          :key="item.id"
          :item="item"
          class="category__card"
        >
        </item-card>
      </div>
      <ul class="pagination auxiliary--white">
        <li
          @click="changePage(i)"
          v-for="i in getPaginationCount"
          :key="i"
          class="pagination__link scrll"
          data-scrl="catalog"
        >
          {{ i }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import ItemCard from "@/components/main/ItemCard.vue";

import animate from "@/assets/js/libs/animate.js"; //! Можно пользоваться нативным скроллом, но хочу побробовать прикрутить код, который написал в начале изучения js
import scrollInit from "@/assets/js/libs/scrollToRTI.js";
export default {
  name: "FlowerCatalog",

  components: { ItemCard },
  props: {
    products: Array,
  },
  data() {
    return {
      pageCountItem: 6,
      //  productsOnPage: [],
      page: 1,
    };
  },
  computed: {
    getPaginationCount() {
      return this.products?.length
        ? Math.ceil(this.products.length / this.pageCountItem)
        : 1;
    },
    productsOnPage() {
      return this.products?.slice(
        this.startIndex,
        this.startIndex + this.pageCountItem
      );
    },
    startIndex() {
      return this.pageCountItem * (this.page - 1);
    },
  },
  methods: {
    changePage(i) {
      this.page = i;
      scrollInit(animate);
    },
  },
  mounted() {
    scrollInit(animate);
  },
};
</script>

<style lang="scss">
.catalog {
  // .category__title
  background-color: $c-Light;
  margin-bottom: calcSize(5, 10, $minWidth, $maxWidth);

  &__title {
  }

  // .category__wrapper

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
    margin-bottom: 10px;
    @media (min-width: $width768 +px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  // .category__card

  &__card {
  }
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  //color: $c-Light;
  // .pagination__link

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: calcSize(15, 35, $minWidth, $maxWidth);
    height: calcSize(15, 35, $minWidth, $maxWidth);
    border-radius: 50%;
    background-color: $c-Dark;
    &:not(:last-child) {
      margin-right: 5px;
    }
    &:hover {
      color: $c-Gray;
    }
  }
}
</style>

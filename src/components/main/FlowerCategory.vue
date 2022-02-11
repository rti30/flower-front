<template>
  <section class="category">
    <div class="content-width">
      <h2 class="category__title title">Категории</h2>
      <div class="category__wrapper">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-item"
        >
          <div class="category-item__image img-object-fit">
            <router-link :to="{
                name: 'category',
                params: { category: category.category_name },
              }">
              <img
                v-lazy="{
                  src: `${serverUrl}/${category.category_img}`,
                  loading: '',
                  error: '',
                }"
                :alt="category.category_name"
              />
            </router-link>
            <div class="category-item__title subtitle">
              {{ category.category_name }}
            </div>
            <div class="category-item__description text2">
              {{ category.description_ }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("anyParams", { apiUrl: "apiUrl" }),
    ...mapGetters("anyParams", { serverUrl: "serverUrl" }),
    ...mapGetters("category", { categories: "categories" }),
  },
  methods: {
    //  ...mapActions("category", { getCategories: "getCategories" }),
  },
  mounted() {
    // this.getCategories({ critical: false });
  },
};
</script>

<style lang="scss">
.category {
  // .category__title
  margin-bottom: calcSize(5, 10, $minWidth, $maxWidth);
  // .category__wrapper
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
    @media (min-width: $width768 +px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  // .category__card

  &__card {
  }
}

.category-item {
  position: relative;
  z-index: 1;
  border-radius: 5%;
  overflow: hidden;
  cursor: pointer;
  text-shadow: -1px 0px 10px #c5ce57;

  &__image {
    height: calcSizeH(240, 535, 640, 1000);
    min-height: 240px;
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
    img {
      transition: all 1s ease-out;
    }
  }

  &__title {
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__description {
    padding: 5px 0px 2px 5px;
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    max-height: 45%;
    overflow: auto;
    //transform: translate(-50%, 0);
  }
}

/* .category {
  ///height: calcSize(150, 150, $minWidth, $maxWidth);
  position: relative;
  z-index: 1;
  border-radius: 5%;
  overflow: hidden;
  cursor: pointer;
  text-shadow: -1px 0px 10px #c5ce57;

  &__image {
    height: 100%;
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
    img {
      transition: all 1s ease-out;
    }
  }

  &__title {
  }

  &__description {
    padding: 5px 0px 2px 5px;
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    max-height: 45%;
    overflow: auto;
    //transform: translate(-50%, 0);
  }
} */
.img-object-fit {
}
</style>

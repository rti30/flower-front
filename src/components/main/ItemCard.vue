

<template>
  <!--  :autoplay="{ delay: 10000 }" -->
  <div v-if="item" class="item-card">
    <div class="item-card__image img-object-fit">
      <router-link :to="{ name: 'product', params: { id: item.id } }">
        <img
          v-lazy="{
            src: `${serverUrl}/${item.url[0]}`,
            loading: '',
            error: '',
          }"
          :alt="item.name"
      /></router-link>
      <add-cart class="icon-font__cart anim-icon" :id="item.id"></add-cart>
      <div v-show="item.discount !== 0" class="item-card__discont text">
        - {{ item.discount }}%
      </div>
    </div>

    <div class="item-card__tag tag-cart text2 text2">
      <span v-for="i in item.tags" :key="i">
        <router-link
          :to="{
            name: 'tag',
            params: { tag: i },
          }"
        >
          {{ i }}
        </router-link>
      </span>
    </div>

    <div class="item-card__price price-card">
      <span class="price-card__price text"
        >{{ (item.price * item.discount) / 100 + item.price }} &#8381;</span
      >
      <span
        v-if="item.discount !== 0"
        class="price-card__price price-card__price--discont auxiliary"
        >{{ item.price }} &#8381;</span
      >
    </div>
    <div class="item-card__name text">{{ item.name }}</div>
    <like-product
      class="icon-font__like anim-icon"
      :id="item.id"
    ></like-product>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

/* import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-fade/effect-fade.scss"; */
//import "swiper/components/scrollbar/scrollbar.scss";
import AddCart from "@/components/ui/AddCart.vue";
import LikeProduct from "@/components/ui/LikeProduct.vue";
export default {
  components: {
    AddCart,
    LikeProduct,
  },
  props: {
    item: { default: false },
  },

  computed: {
    ...mapGetters("anyParams", { serverUrl: "serverUrl" }),
  },
  methods: {
    ...mapActions("cart", { addToCart: "add" }),
  },
  mounted() {},
};
</script>


<style lang="scss">
@import "swiper/swiper.scss";
//@import "swiper/components/pagination/pagination.scss";
//@import "swiper/components/effect-fade/effect-fade.scss";

.swiper-pagination-bullet {
  display: inline-block;
  width: calcSize(30, 45, $minWidth, $maxWidth);
  height: calcSize(2, 3, $minWidth, $maxWidth);
  border-radius: 1px;
  background-color: #fff;
  background-color: $c-Light;
  &:not(:last-child) {
    margin: 0px calcSize(5, 10, $minWidth, $maxWidth) 0px 0px;
  }
  &-active {
  }
}
.item-card {
  position: relative;
  background-color: $c-Dark;
  // box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  //padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  padding-bottom: 15px;
  .icon-font__like {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
    text-shadow: 1px 1px 2px black, 0 0 1px rgb(255, 0, 0),
      0 0 0.2px rgb(68, 32, 32);
    font-size: calcSize(14, 23, $minWidth, $maxWidth);
    &:before {
      font-weight: 700;
      margin: 5px 0px 0px 5px;
    }
    &:hover:before {
      color: $c-Gray;
    }
    &.active:before {
      color: red;
    }
  }
  .icon-font__cart {
    &:before {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 2;
      cursor: pointer;
      transform: translate(0, 100%);
      padding: calcSize(3, 8, $minWidth, $maxWidth) 10px 0px 0px;
      font-size: calcSize(13, 20, $minWidth, $maxWidth);
      z-index: 2;
      cursor: pointer;
    }
    &:hover:before {
      color: $c-Gray;
    }
    &.active:before {
      color: red;
    }
  }

  &__slide {
    border-radius: $main-border-radius;
  }

  &__image {
    height: calcSize(125, 250, $minWidth, $maxWidth);
    margin-bottom: 5px;
    position: relative;
    z-index: 1;
    cursor: pointer;
    a {
      position: relative;
      z-index: 1;
      display: block;
      height: 100%;
    }
    //flex: 1 1 auto;
  }
  &__tag {
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    grid-column: 1fr;
    z-index: 2;
    cursor: pointer;
    span {
      padding: 2px 5px;
      white-space: nowrap;
      background-color: $c-Gray;
      border-radius: 8px;
      margin: 3px 3px 0px 3px;
      &:not(:last-child) {
        margin-bottom: 3px;
      }
      a:hover {
        color: $c-Dark;
      }
    }
  }
  // .item-card__discont
  &__discont {
    // margin-bottom: 5px;
    // padding: 0px 0px 5px 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: red;
    border-radius: 50%;
    width: calcSize(32, 72, $minWidth, $maxWidth);
    height: calcSize(32, 72, $minWidth, $maxWidth);
    display: flex;
    align-items: center;
    justify-content: center;

    //width: 100%;
  }
  // .item-card__price
  &__price {
    flex: 1 1 auto;
    margin-bottom: 5px;
    padding: 0px 0px 5px 5px;
    span {
      &:not(:last-child) {
        margin-right: calcSize(4, 7, $minWidth, $maxWidth);
      }
    }
  }
  // .item-card__name

  &__name {
    padding: 0px 5px 5px 5px;
  }
}
.price-card {
  position: relative;

  &__price {
    &--discont {
      text-decoration: line-through;
    }
  }
}
.img-object-fit {
}
</style>
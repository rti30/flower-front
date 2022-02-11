

<template>
  <!--  :autoplay="{ delay: 10000 }" -->
  <div class="slider-block">
    <slot></slot>
    <swiper
      :slidesPerView="getSlideView"
      :space-between="20"
      :freeMode="true"
      grabCursor
      navigation
      class="swiper-block"
    >
      <swiper-slide
        class="swiper-block__slide"
        v-for="item in data"
        :key="item.id"
      >
        <item-card :item="item"></item-card>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import ItemCard from "@/components/main/ItemCard.vue";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { mapGetters } from "vuex";
/* import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-fade/effect-fade.scss"; */
//import "swiper/components/scrollbar/scrollbar.scss";
SwiperCore.use([Navigation]);

export default {
  components: {
    Swiper,
    SwiperSlide,
    ItemCard,
  },
  props: {
    data: { default: [] },
  },
  data() {
    return {
      paralaxSwiperWidth: 0,
    };
  },
  computed: {
    ...mapGetters("anyParams", { minWidthParams: "minWidthParams" }),
    ...mapGetters("anyParams", { minWidth: "minWidth" }),
    getSlideView() {
      if (this.minWidth[this.minWidthParams.md2]) {
        return 3;
      } else {
        return 2;
      }
    },
  },
  methods: {},
  mounted() {
    const news = document.querySelectorAll(".swiper-block");
    news.forEach((block) => {
      const prevNav = block.querySelector(".swiper-button-prev");
      const nextNav = block.querySelector(".swiper-button-next");
      prevNav.classList.add(
        "icon-font__arrows",
        "news__navigation",
        "news__navigation--prev"
      );
      nextNav.classList.add(
        "icon-font__arrows",
        "news__navigation",
        "news__navigation--next"
      );
    });
  },
};
</script>


<style lang="scss">
@import "swiper/swiper.scss";
//@import "swiper/components/pagination/pagination.scss";
//@import "swiper/components/effect-fade/effect-fade.scss";

.slider-block {
  //margin: 0px 0px calcSize(7, 10, $minWidth, $maxWidth) 0px;
  margin-bottom: 15px;
  border-radius: $main-border-radius;
  overflow: hidden;
}

.swiper-block {
  // overflow: hidden;
  &__navigation {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 50%;
    background-color: hsla(0, 0%, 100%, 0.25);
    transition: all 0.4s linear;
    width: calcSize(15, 35, $minWidth, $maxWidth);
    height: calcSize(15, 35, $minWidth, $maxWidth);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calcSize(10, 20, $minWidth, $maxWidth);
    &:hover {
      color: $c-Dark;
      background-color: $c-Light;
    }
    &--prev {
      left: 0;
      &:before {
        transform: rotate(180deg);
      }
    }
    &--next {
      right: 0;
    }
  }
  .swiper-wrapper {
    // overflow: hidden;
    //  display: flex;
  }
  .swiper-pagination {
    bottom: calcSize(-7, -10, $minWidth, $maxWidth);
  }
  &__slide {
    height: auto;
  }
}

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
</style>

<template>
  <swiper
    effect="fade"
    grabCursor
    :pagination="{ dynamicBullets: true, dynamicMainBullets: 3 }"
    navigation
    loop
    :autoplay="{ delay: 10000 }"
    class="news-swiper"
  >
    <swiper-slide
      class="news-slide"
      v-for="slide in news"
      :key="slide.id"
    >
      <div class="news-slide__image img-object-fit">
        <img
          :src="`${serverUrl}/${slide.image_}`"
          alt="Новость"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
import SwiperCore, {
  Navigation,
  Parallax,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { mapGetters } from "vuex";
SwiperCore.use([Navigation, Parallax, Pagination, Autoplay, EffectFade]);

export default {
  //name: 'carrousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      paralaxSwiperWidth: 0,
    };
  },
  computed: {
    ...mapGetters("anyParams", { serverUrl: "serverUrl" }),
    ...mapGetters("news", { news: "news" }),
  },
  methods: {},
  mounted() {
    const news = document.querySelector(".news-swiper");
    const prevNav = news.querySelector(".swiper-button-prev");
    const nextNav = news.querySelector(".swiper-button-next");
    prevNav.classList.add(
      "icon-font__arrow",
      "news__navigation",
      "news__navigation--prev"
    );
    nextNav.classList.add(
      "icon-font__arrow",
      "news__navigation",
      "news__navigation--next"
    );
  },
};
</script>

<style lang="scss">
@import "swiper/swiper.scss";
@import "swiper/components/pagination/pagination.scss";
@import "swiper/components/effect-fade/effect-fade.scss";

.news {
  overflow: hidden;
  &__navigation {
    cursor: pointer;
    z-index: 2;
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
}
.news-swiper {
  margin: 0px 0px calcSize(7, 10, $minWidth, $maxWidth) 0px;

  &.swiper-container {
    overflow: visible;
  }
  position: relative;
  & .swiper-wrapper {
    overflow: hidden;
    border-radius: calcSize(17, 38, $minWidth, $maxWidth);
  }
  &
    .swiper-pagination.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    position: absolute;
    padding-top: 5px;
    bottom: 0;
    right: 50%;
    transform: translate(-50%, 100%);
  }
  & .swiper-pagination-bullet {
    display: inline-block;
    width: calcSize(30, 45, $minWidth, $maxWidth);
    height: calcSize(2, 3, $minWidth, $maxWidth);
    border-radius: 1px;
    background-color: #fff;
    background-color: $c-Light;
    &:not(:last-child) {
      margin: 0px calcSize(5, 10, $minWidth, $maxWidth) 0px 0px;
    }
  }
}
.news-slide {
  &__image {
    height: calcSize(100, 250, $minWidth, $maxWidth);
  }
}
</style>
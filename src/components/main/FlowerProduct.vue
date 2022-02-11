<template>
  <section class="product">
    <br />
    <div class="content-width">
      <div class="product__wrapper">
        <h2 class="product__title title">{{ product.name }}</h2>
        <swiper
          :loop="false"
          grabCursor
          :spaceBetween="10"
          :navigation="true"
          :thumbs="{ swiper: thumbsSwiper }"
          class="product__swiper"
        >
          <swiper-slide v-for="img in product.url" :key="img">
            <img :src="`${serverUrl}/${img}`" alt="product.name" />
          </swiper-slide>
        </swiper>

        <swiper
          @swiper="setThumbsSwiper"
          :loop="false"
          :spaceBetween="10"
          :slidesPerView="4"
          :watchSlidesProgress="true"
          :direction="firectionThumbs"
          class="product__thumbs"
        >
          <swiper-slide
            class="img-object-fit"
            v-for="img in product.url"
            :key="img"
          >
            <img :src="`${serverUrl}/${img}`" alt="product.name" />
          </swiper-slide>
        </swiper>
        <div class="product__rating">
          <star-rating
            class="product__start-r"
            v-model="currentRating"
            :numberOfStars="max"
            :showControl="false"
            :key="componentKey"
          />
          <div class="product__marks">
            <span class="product__label">Средняя оценка:</span>
            <span class="product__text">{{ ratingData.average }}</span>
            <span class="product__text">({{ ratingData.count }})</span>
          </div>
          <div v-if="currentRating !== null" class="product__current-mark">
            <span class="product__label">Ваша оценка:</span>
            <span class="product__text">{{ currentRating }}</span>
            <button
              type="button"
              class="product__button"
              :disabled="!canSendMark"
              @click="sendRating"
            >
              Отправить!
            </button>
          </div>
          <div class="product__old-mark">
            <span v-if="isLogin" class="product__label"
              >Ранее Вы оценили товар:</span
            >
            <span class="product__text auxiliary">{{ ratingData.mark }}</span>
          </div>
        </div>
        <div class="product__price-card text">
          <span class="product__label"> Цена:</span>
          <span class="product__price"
            >{{
              (product.price * product.discount) / 100 + product.price
            }}
            &#8381;</span
          >
          <span
            v-if="product.discount !== 0"
            class="product__price product__price-discont auxiliary"
            >{{ product.price }} &#8381;</span
          >
        </div>
        <div class="product__add subtitle">
          <add-cart class="product__add-cart" :id="product.id">{{
            addCartText
          }}</add-cart>
          <like-product
            class="product__add-like icon-font__like anim-icon"
            :id="product.id"
          ></like-product>
        </div>
        <div class="product__categories-card text">
          <span class="product__label"> Категории:</span>
          <span
            class="product__text product__link"
            v-for="category in product.categories"
            :key="category"
          >
            <router-link
              :to="{
                name: 'category',
                params: { category },
              }"
              >{{ category }}</router-link
            ></span
          >
        </div>
        <div class="product__tags-card text">
          <span class="product__label"> Тэги:</span>
          <span
            class="product__text product__link"
            v-for="tag in product.tags"
            :key="tag"
          >
            <router-link
              :to="{
                name: 'tag',
                params: { tag },
              }"
              >{{ tag }}</router-link
            ></span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);
import AddCart from "@/components/ui/AddCart.vue";
import LikeProduct from "@/components/ui/LikeProduct.vue";

import vue3starRatings from "vue3-star-ratings";
console.log(vue3starRatings);

export default {
  props: {
    product: Object,
  },
  components: {
    Swiper,
    SwiperSlide,
    StarRating: vue3starRatings,

    AddCart,
    LikeProduct,
  },
  data() {
    return {
      thumbsSwiper: null,
      currentRating: 0,
      step: 0.5,
      max: 5,
      componentKey: 0,

      ratingAction: {
        processingSendMark: false,
        processingGetMark: false,
      },

      ratingData: {
        mark: null,
        count: null,
        average: null,
      },
    };
  },
  computed: {
    ...mapGetters("anyParams", {
      serverUrl: "serverUrl",
      minWidthParams: "minWidthParams",
      minWidth: "minWidth",
    }),
    ...mapGetters("cart", { hasInCart: "has" }),
    ...mapGetters("user", { isLogin: "isLogin", readyAuth: "readyAuth" }),
    addCartText() {
      return this.hasInCart(this.product.id)
        ? "Удалить из корзины"
        : "Добавить в корзину";
    },
    firectionThumbs() {
      return this.minWidth[this.minWidthParams.md2] ? "vertical" : "horizontal";
    },
    canSendMark() {
      return (
        !this.ratingAction.processingSendMark &&
        !this.ratingAction.processingGetMark &&
        this.ratingData.mark !== this.currentRating
      );
    },
  },
  watch: {
    //! vue-star-rating не поддерживает ssr, взял первый попавшийся (vue3-star-rating), но он не поддерживет шаги по кликам на звёзды, только на контроллеры (шаг по умолчанию всегда 0.1).
    //! поэтому использую whatcher для задания собственных шагов.
    //! похоже разработчики не сделали связывание на отрисовку звёзд с v-model, поэтому я его перерендериваю изменением ключа (ценой адекватной анимации)
    //! Можно, конечно, запомнить прошлое состояние и добавить анимацию после перерендеринга... но это уже совсем другая история

    currentRating: function () {
      this.currentRating = Math.min(
        Math.max(
          this.step,
          Math.ceil(this.currentRating / this.step) * this.step
        ),
        this.max
      );
      this.componentKey++;
    },
  },
  methods: {
    ...mapActions("alerts", { newAlert: "add" }),
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    async getCountReviews() {
      console.log("Кол-во оценок товара с сервера");
      const { ok, body } = await this.$api.rating.getCount(this.product.id);
      if (ok && body) {
        const { count, average } = body;
        this.ratingData.count = count;
        this.ratingData.average = average;
      } else {
        //alert произошла ошибка, попробуйте снова
      }
    },
    async getUserReview() {
      if (!this.ratingAction.processingGetMark) {
        this.ratingAction.processingGetMark = true;
        await this.readyAuth;
        if (this.isLogin) {
          console.log("получение оценка пользователя");
          const { ok, body } = await this.$api.rating.getMark(this.product.id);
          if (ok && body) {
            const { mark } = body;
            this.ratingData.mark = mark;
          } else {
            //alert произошла ошибка, попробуйте снова
          }
        }
        this.ratingAction.processingGetMark = false;
      }
    },
    async sendRating() {
      if (!this.ratingAction.processingSendMark) {
        this.ratingAction.processingSendMark = true;
        await this.readyAuth;
        if (this.isLogin) {
          const { ok, body } = await this.$api.rating.add(
            this.product.id,
            this.currentRating
          );
          if (ok && body) {
            /// alert успешно
          } else {
            //alert произошла ошибка, попробуйте снова
          }
        } else {
          this.newAlert({
            text: `Для оценки товара, необходимо авторизоваться`,
            critical: false,
            type: "autorize",
          });
        }
        this.ratingAction.processingSendMark = false;
      }
    },
  },

  async mounted() {
    // Обновление товара в store (рейтинг берется из пропса product)
    this.getCountReviews(); // Получение кол-ва оценок
    // Получение оценки текущего пользователя
    this.getUserReview();
  },
};
</script>

<style lang="scss">
.product {
  &__wrapper {
    @media (min-width: $width768+px) {
      display: grid;
      grid-template-areas:
        "title title title"
        "thumbs swiper swiper"
        "rating rating rating"
        "price price price"
        "add-cart add-cart add-cart"
        "category category category"
        "tag tag tag";
    }
  }

  &__title {
    grid-area: title;
    text-align: center;
  }
  &__add {
    grid-area: add-cart;
    &.subtitle {
      margin: 0;
    }
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: $c-Dark;
    border-radius: $main-border-radius;
    z-index: 3;
    overflow: hidden;
    border: 2px solid transparent;
    border-color: $c-Light;
    @media (min-width: $width768+px) {
      position: static;
    }
  }
  &__add-cart {
    cursor: pointer;
    flex-grow: 1;
    text-align: center;
    padding: 10px 0;
  }
  &__add-like {
    cursor: pointer;
    border-left: 2px solid transparent;
    border-color: $c-Light;
    &.active:before {
      color: red;
    }
    padding: 0px 5px;
  }
  // .product__categories-card

  &__categories-card {
    grid-area: category;
    word-wrap: break-word;
  }

  // .product__label

  &__label {
    margin-right: 10px;
  }
  // .product__text
  &__link {
    word-wrap: break-word;
    &:not(:last-child) {
      margin-right: 5px;
      padding-right: 2px;
      border-right: $c-Light 2px solid;
    }
  }

  // .product__tags-card
  &__tags-card {
    grid-area: tag;
  }

  // .product__rating
  &__rating {
    grid-area: rating;
  }

  // .product__start-r
  &__start-r {
  }

  // .product__current-mark
  &__current-mark {
  }
  // .product__old-mark

  &__old-mark {
  }
  &__swiper {
    grid-area: swiper;
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    .swiper-wrapper {
      height: calcSize(150, 350, $minWidth, $maxWidth);
    }
    .swiper-slide {
      width: 100%;
    }
    @media (min-width: $width768+px) {
    }
  }
  &__thumbs {
    grid-area: thumbs;
    .swiper-wrapper {
      //  justify-content: center;
      height: calcSize(80, 150, $minWidth, $maxWidth);
    }
    .swiper-slide {
      border: 2px solid transparent;
    }
    .swiper-slide-thumb-active {
      border-color: $c-Light;
    }
  }
}
</style>

<template>
  <section
    :style="{ position: isFixed }"
    ref="header"
    class="header"
  >
    <div class="content-width">
      <div class="header__wrapper">
        <burger class="header__burger" />
        <router-link
          :to="{ name: 'main' }"
          class="icon-font__logo anim-icon anim-icon--logo"
        ></router-link>
        <div class="header__text">
          <h1 class="header__title title">
            <router-link :to="{ name: 'main' }">
              <span>f</span><span>l</span><span>o</span><span>w</span><span>e</span><span>r</span>
            </router-link>
          </h1>
          <span class="header__slogan">Магазин Цветов</span>
        </div>
        <search class="header__search"></search>
        <div class="header__icons anim-icon--title">
          <span
            @click="toggleSearch"
            class="header__icon-search font-icon icon-font__search anim-icon"
          ></span>
          <router-link
            :to="{ name: 'cart' }"
            class="header__icon-cart font-icon icon-font__cart anim-icon"
          ><span
              v-show="cart.length"
              class="icon-font__cart--count"
            >{{
              cart.length
            }}</span></router-link>
          <router-link
            :to="{ name: 'profile-info' }"
            class="header__icon-profile font-icon icon-font__profile anim-icon"
          >
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <div
    v-show="headerIsFixed"
    class="fake-header"
    :style="{ height: headerHeight + 'px' }"
  ></div>
  <navigation></navigation>
</template>

<script>
import Burger from "@/components/ui/Burger.vue";
import Search from "@/components/ui/Search.vue";
import Navigation from "@/components/ui/Navigation.vue";

import { mapGetters, mapActions } from "vuex";
import resize from "@/assets/js/libs/resize.js";
export default {
  name: "FlowerHeader",
  components: {
    Burger,
    Search,
    Navigation,
  },
  data() {
    return {
      headerNode: {},
    };
  },
  methods: {
    ...mapActions("anyParams", {
      toggleBurger: "toggleBurger",
      toggleSearch: "toggleSearch",
      changeHeaderHeight: "changeHeaderHeight",
    }),
  },
  computed: {
    ...mapGetters("cart", { cart: "productsInfo" }),
    ...mapGetters("anyParams", {
      headerHeight: "headerHeight",
      headerIsFixed: "headerIsFixed",
    }),
    isFixed() {
      return this.headerIsFixed ? "fixed" : "static";
    },
  },
  mounted() {
    //! Если header fixed ============================================
    if (this.headerIsFixed && process.isClient) {
      this.headerNode = this.$refs.header;
      this.changeHeaderHeight(this.headerNode.clientHeight);
      new resize(this.headerNode, () => {
        this.changeHeaderHeight(this.headerNode.clientHeight);
      });
    }
    //!================================================================
  },
  beforeUnmount() {
    //! toDo в mounted объявлен resize, его надо в глобальную область видимости и отключать тут:
    /*   resize.expand.removeEventListener("scroll", onScroll);
    resize.shrink.removeEventListener("scroll", onScroll); */
  },
};
</script>

<style lang="scss">
.fake-header {
  margin: 0;
}
.header {
  // .header__wrapper
  position: fixed;
  width: 100%;
  z-index: 20;
  margin: 0px 0px 10px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  padding: 3px 0px 3px 0px;
  background-color: $c-Gray;
  &__wrapper {
    display: grid;
    align-items: center;
    column-gap: calcSize(5, 7, $minWidth, $maxWidth);
    row-gap: 5px;
    grid-template-areas:
      "burger logo text icons"
      "search search search search";
    grid-template-columns: 1fr auto auto 2fr;
    //"burger burger burger burger";
    @media (min-width: $width768 + px) {
      grid-template-areas:
       /*  "burger logo search icons"
        "burger text search icons"; */ "burger logo text search icons";

      grid-template-columns: auto auto 1fr auto;
    }
  }

  // .header__content

  &__burger {
    margin-right: 3px;
    grid-area: burger;
  }
  // .header__logo

  &__text {
    margin-left: calcSize(2, 3, $minWidth, $maxWidth);
    grid-area: text;
  }

  &__logo {
    grid-area: logo;
    display: flex;
    align-items: center;
    color: $c-Light;
    &--center {
      justify-content: center;
    }
  }
  &__search {
    grid-area: search;
  }
  // .header__title

  &__title {
    a:hover {
      color: $c-Light;
      text-decoration: none;
    }
    span {
      transition: 0.3s;
      &:hover {
        text-shadow: 1px 1px 2px black, 0 0 1em rgb(255, 230, 0),
          0 0 0.2em rgb(251, 255, 0);
      }
    }
  }

  // .header__slogan

  &__slogan {
    line-height: 7px;
    font-size: calcSize(11, 23, $minWidth, $maxWidth);
  }

  // .header__icons

  &__icons {
    grid-area: icons;
    text-align: right;
    font-size: calcSize(20, 42, $minWidth, $maxWidth);
    & > .font-icon:not(:last-child):before {
      margin: 0px calcSize(5, 10, $minWidth, $maxWidth) 0px 0px;
    }
    &:hover,
    &:hover a {
      color: $c-Dark;
      .font-icon:hover {
        color: $c-Light;
        transition: 0.3s;
      }
    }
  }
  &__icon-search {
    @media (min-width: $width768 + px) {
      display: none;
    }
  }
  &__icon-cart {
    position: relative;
  }
}

.title {
}
</style>

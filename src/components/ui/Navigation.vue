<template>
  <!--     :style="{ height: getHeight + 'px', marginTop: headerHeight + 'px' }" -->
  <nav
    class="navigation"
    :class="{ active: burgerIsActive }"
    :style="{
      paddingBottom: headerHeight + 'px',
    }"
  >
    <div class="navigation__wrapper">
      <div class="navigation__content text2">
        <ul class="navigation__menu nav-menu">
          <li
            @click="toggleBurger"
            class="nav-menu__link"
          >
            <router-link
              class="icon-font__profile"
              :to="{ name: 'profile-info' }"
            >
              Аккаунт</router-link>
          </li>
          <li
            @click="toggleBurger"
            class="nav-menu__link"
          >
            <router-link
              class="icon-font__cart"
              :to="{ name: 'cart' }"
            >
              Корзина</router-link>
          </li>
          <li
            @click="toggleBurger"
            v-for="link in navCategory"
            :key="link.id"
            class="nav-menu__link"
          >
            <router-link :to="{
                name: 'category',
                params: { category: link.category_name },
              }">
              {{ link.category_name }}
            </router-link>
          </li>
        </ul>

        <spoiler
          :title="'Все категории...'"
          :titleClass="'nav-menu__link'"
        >
          <ul class="navigation__menu nav-menu">
            <li
              nav-menu__link
              v-for="link in categories"
              :key="link.id"
              class="nav-menu__link anim-spoiler"
              @click="toggleBurger"
            >
              <router-link :to="{
                  name: 'category',
                  params: { category: link.category_name },
                }">
                {{ link.category_name }}</router-link>
            </li>
          </ul>
        </spoiler>
      </div>
      <div
        @click="toggleBurger"
        class="navigation__close-area"
      ></div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spoiler from "@/components/ui/Spoiler.vue";
export default {
  props: {},
  components: {
    Spoiler,
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapGetters("anyParams", { burgerIsActive: "burgerIsActive" }),
    ...mapGetters("anyParams", { headerHeight: "headerHeight" }),
    ...mapGetters("category", { categories: "categories" }),
    getHeight() {
      return process.client
        ? document.documentElement.clientHeight - this.headerHeigh
        : 70;
      // return document.documentElement.clientHeight - this.headerHeight;
      // return 70;
    },

    navCategory() {
      // var self = this;
      return this.categories.filter((item) => {
        return (
          item.category_name === "Для сада" ||
          item.category_name === "Комнатные" ||
          item.category_name === "Орхидеи" ||
          item.category_name === "Розы" ||
          item.category_name === "Луковичные" ||
          item.category_name === "Саженцы"
        );
      });
    },
  },
  methods: {
    ...mapActions("anyParams", ["toggleBurger"]),
  },
};
</script>

<style lang="scss">
.navigation {
  transition: transform 0.3s linear;
  transform: translateX(-100%);
  overflow: auto;
  width: 100%;
  z-index: 10;
  position: fixed;
  height: 100vh;
  &.active {
    transform: translateX(0);
  }
  &__wrapper {
    position: relative;
    //top: 0;
    // left: 0;
    // height: 100%;
    // width: 100%;
    // overflow: auto;
  }
  &__close-area {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: $c-Dark;
    opacity: 0.9;
  }
  &__content {
    // height: 100vh;
    position: relative;
    min-height: 100vh;
    // top: 0;
    ///left: 0;
    width: 50%;
    z-index: 1;
    background-color: $c-Gray;
    //height: 100%;
  }
}

.navigation__menu {
  overflow: hidden;
  &:not(:last-child) {
    padding: 10px 0px 0px 0px;
  }
}
.navigation__content {
  .spoiler__button {
    padding: 5px 5px 10px 10px;
  }
}
.nav-menu {
  // .nav-menu__link

  &__link {
    transition: background 0.1s linear;
    a {
      display: block;
      padding: 5px 5px 10px 10px;
      color: $c-Light;
    }

    // &:not(:last-child) {
    //  }
    &:hover {
      background-color: $c-Dark;
    }
    &:before {
      padding-right: 4px;
    }
  }
}
</style>

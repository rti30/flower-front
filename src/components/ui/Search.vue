<template>
  <transition name="height-search">
    <form
      v-if="searchIsActive || minWidth[minWidthParams.md2]"
      @keydown.enter.prevent="false"
      class="search"
    >
      <router-link
        :to="{
          name: 'search',
          params: { search: search },
        }"
      >
        <span
          class="search__icon font-icon icon-font__search anim-icon--search"
          @click="goSearch"
        >
        </span>
      </router-link>
      <input
        type="search"
        class="search__input auxiliary"
        placeholder="Поиск по товарам..."
        @input="inputSearch"
        :value="valueSearch"
      />
      <span v-show="search !== ' '" @click="clear" class="search__clear"></span>
    </form>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: function () {
    return {
      // isActive: false, //! не для vuex. для vuex еще не написано с пропсами, нужно скопировать с бургера
      awaitSearch: false,
    };
  },
  computed: {
    ...mapGetters("anyParams", { searchIsActive: "searchIsActive" }),
    ...mapGetters("filter", { search: "search" }),
    ...mapGetters("anyParams", { minWidthParams: "minWidthParams" }),
    ...mapGetters("anyParams", { minWidth: "minWidth" }),
    valueSearch() {
      return this.search === " " ? "" : this.search; //! заглушка для заглушки, читать в склад/фильтер или склад/поиск (при байинднге с роутером возникала ошибка, небольшая заглушка)
    },
  },
  methods: {
    ...mapActions("filter", {
      inputSearch: "inputSearch",
      setSearchData: "setSearchData",
      goSearch: "goSearch",
    }),
    ...mapActions("product", { getByName: "getByName" }),
    clear() {
      this.inputSearch(false);
      this.setSearchData([]);
    },
  },
};
</script>

<style lang="scss">
.search {
  position: relative;
  height: calcSize(35, 65, $minWidth, $maxWidth);
  overflow: hidden;
  input[type="text"]::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  input[type="text"]::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  &__input {
    background-color: $c-Dark;
    color: $c-Light;
    border-radius: calcSize(20, 36, $minWidth, $maxWidth);
    padding: 0 calcSize(28, 41, $minWidth, $maxWidth) 0
      calcSize(32, 62, $minWidth, $maxWidth);
    width: 100%;
    height: 100%;
    &::placeholder {
      color: white;
      opacity: 0.8;
      font-weight: bolder;
    }
  }
  &__icon {
    position: absolute;
    display: block;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    padding: 0px 0px 0px 5px;
  }
  &__clear {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 50%;
    right: 5px;
    width: calcSize(17, 30, $minWidth, $maxWidth);
    height: calcSize(17, 30, $minWidth, $maxWidth);
    transform: translate(0, -50%);
    &:after {
      position: absolute;
      background-color: $c-Gray;
      border-radius: 4px;
      top: 50%;
      transform: translate(0, -50%) rotate(-45deg);
      content: "";
      width: 100%;
      height: 2px;
    }
    &:before {
      position: absolute;
      background-color: $c-Gray;
      border-radius: 4px;
      top: 50%;
      transform: translate(0, -50%) rotate(45deg);
      content: "";
      width: 100%;
      height: 2px;
    }
  }
}
</style>

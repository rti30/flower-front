<template>
  <div
    class="filter"
    :class="{ 'is-hidden': !filterShow }"
    :style="{
      top: headerHeight + 'px',
    }"
    :key="maxPrice"
  >
    <form class="filter__form">
      <h3 class="filter__subtitle subtitle">Скидки</h3>
      <div class="filter__discount">
        <input
          class="filter__checkbox"
          type="checkbox"
          @change="changeFilter({ name: 'discount' })"
          :checked="filterParams.discount"
        />
        <span class="filter__label text2">{{ getLabelDiscount }}</span>
      </div>
    </form>
    <h3 class="filter__subtitle subtitle">Цена:</h3>

    <ui-slider
      :min="0"
      :max="maxPrice"
      :start="filterParams.range.from"
      :end="filterParams.range.to"
      @sliderUpdate="rangeUpdate"
      @sliderChange="changeUpdate"
      class="filter__range"
    />
    <div class="filter__raw">
      <button type="button" class="filter__button button">
        <span class="button__text button__text--big" @click="apply()"
          >Применить</span
        >
      </button>
      <button type="button" class="filter__button button">
        <span class="button__text button__text--big" @click="cancel"
          >Отменить</span
        >
      </button>
      <div class="filter__price text2">
        <span class="filter__price-label">Фильтр цены:</span>
        <span class="filter__price-label filter__price-label--title">
          от {{ tempRangeFrom }} &#8381;</span
        >
        <span class="filter__price-label">до {{ tempRangeTo }} &#8381;</span>
      </div>
    </div>
    <div class="filter__close" @click="toggleFilter">X</div>
  </div>
  <div
    class="filter-show auxiliary"
    @click="toggleFilter"
    :style="{ top: headerHeight + 'px' }"
  >
    Показать Фильтр
  </div>
</template>

<script>
//import CustomSelect from "@/components/ui/CustomSelect.vue";
import UiSlider from "@/components/ui/UiSlider.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    /*     products: {
      type: Object,
      default: [],
    }, */
  },
  components: {
    UiSlider,
    //  CustomSelect,
  },

  created() {
    //Начальные значение для фильтра цен
    this.changeFilter({ name: "range", value: [0, this.maxPrice] });
  },
  methods: {
    ...mapActions("filter", {
      changeFilter: "changeFilter",
      apply: "apply",
      cancel: "cancel",
    }),
    ...mapActions("anyParams", ["toggleFilter"]),
    customSelect(e) {
      console.log(e);
    },
    rangeUpdate({ values }) {
      this.tempRangeFrom = values[0];
      this.tempRangeTo = values[1];
    },
    changeUpdate({ values }) {
      this.changeFilter({ name: "range", value: values });
    },
  },
  computed: {
    ...mapGetters("filter", {
      filterParams: "filterParams",
      maxPrice: "maxPrice",
    }),
    ...mapGetters("anyParams", {
      filterShow: "filterShow",
      headerHeight: "headerHeight",
    }),

    getLabelDiscount() {
      return this.filterParams.discount ? "Со скидкой" : "Без скидки";
    },
  },

  data() {
    return {
      /*       filterParams: {
        discount: false,
        categoryId: null,
        range: {
          from: null,
          to: null,
        },
      }, */
      tempRangeFrom: 0,
      tempRangeTo: 0,
    };
  },
};
</script>

<style lang="scss">
.filter {
  position: fixed;
  left: 0;
  z-index: 5;
  background: $c-Dark;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: calcSize(20, 40, $minWidth, $maxWidth);
  width: 50vw;
  max-height: calcSizeH(262, 1170, $minWidth, $maxWidth);
  overflow: auto;
  //border-radius: 0px 10% 10% 0;
  &.is-hidden {
    transform: translateX(-100%);
    overflow: visible;
  }

  &__raw {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 25%;
    justify-content: space-between;

    align-items: center;
  }

  // .filter__form

  &__form {
    position: relative;
  }
  &__select {
    margin-bottom: calcSize(10, 15, $minWidth, $maxWidth);
  }

  // .filter__subtitle

  &__subtitle {
  }
  &__discount {
    display: flex;
    align-items: center;
    margin-bottom: calcSize(10, 15, $minWidth, $maxWidth);
  }

  // .filter__checkbox

  &__checkbox {
    margin-right: calcSize(5, 8, $minWidth, $maxWidth);
    width: calcSize(15, 47, $minWidth, $maxWidth);
    height: calcSize(15, 47, $minWidth, $maxWidth);
    cursor: pointer;
  }

  // .filter__label

  &__label {
  }

  &__range {
    margin-bottom: calcSize(10, 15, $minWidth, $maxWidth);
  }
  &__button {
    /*  width: calcSize(110, 440, $minWidth, $maxWidth);
    height: calcSize(25, 100, $minWidth, $maxWidth); */
  }
  &__price-label {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 50%;
    white-space: pre;
    &--title {
      flex: 0 0 100%;
    }
  }
  &__close {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: $c-Dark;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 
    position: absolute;
    top: calcSize(10, 12, $minWidth, $maxWidth);
    right: calcSize(14, 56, $minWidth, $maxWidth); */
    cursor: pointer;
  }
}
.filter-show {
  writing-mode: vertical-lr;
  transform: rotate(-180deg);
  position: fixed;
  left: 0;
  padding-bottom: 20px;
}
</style>
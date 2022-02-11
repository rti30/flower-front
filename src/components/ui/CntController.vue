<template>
  <div class="controller">
    <button
      type="button"
      class="controller__btn controller__btn--decrease"
      :disabled="inProcessing(product.id)"
      @click="decrease()"
    >
      -
    </button>
    <input
      :value="product.count"
      @keyup.enter="inputValue"
      @blur="inputValue"
      autocomplete="off"
      type="text"
      class="controller__input"
      :disabled="inProcessing(product.id)"
    />
    <button
      @click="increase()"
      type="button"
      class="controller__btn controller__btn--increase"
      :disabled="inProcessing(product.id)"
    >
      +
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    product: { default: null },
    index: { default: null },
  },
  data: function () {
    return {
      // isActive: false, //! не для vuex. для vuex еще не написано с пропсами, нужно скопировать с бургера
    };
  },
  computed: {
    ...mapGetters("cart", { inProcessing: "inProcessing" }),
  },
  methods: {
    ...mapActions("cart", { changeCount: "changeCount" }),
    increase() {
      console.log();
      this.changeCount({
        id: this.product.id,
        max: this.product.maxCount,
        index: this.index,
        op: "increase",
        value: 1,
      });
    },
    decrease() {
      this.changeCount({
        id: this.product.id,
        max: this.product.maxCount,
        index: this.index,
        op: "decrease",
        value: 1,
      });
    },
    inputValue(e) {
      console.log(e);
      console.log(e.target.value);
      this.changeCount({
        id: this.product.id,
        op: "input",
        max: this.product.maxCount,
        index: this.index,
        value: e.target.value,
      });
      e.target.value = this.product.count;
    },
  },
};
</script>

<style lang="scss">
.controller {
  // .controller__btn--decrease
  display: flex;
  align-items: center;

  &__btn--decrease {
  }

  // .controller__input

  &__input {
    width: calcSize(50, 70, $minWidth, $maxWidth);
    height: calcSize(30, 32, $minWidth, $maxWidth);
    border: 3px solid #555;
    border-radius: 4px;
    padding: 3px 2px;
  }

  // .controller__btn

  &__btn {
    width: calcSize(50, 70, $minWidth, $maxWidth);
    height: calcSize(30, 32, $minWidth, $maxWidth);
  }

  // .controller__btn--increase

  &__btn--increase {
  }
}
.controller-btn {
}
</style>

<template>
  <div class="ui-slider"></div>
</template>

<script>
//import noUiSlider from "@/assets/js/libs/nouislider.min.js";
import noUiSlider from "no-ui-slider";

export default {
  props: {
    min: { default: 0 },
    max: { default: 100 },
    start: { default: 0 },
    end: { default: 100 },
  },
  data: () => ({
    min1111: 0,
  }),

  mounted() {
    const slider = document.querySelector(".ui-slider");

    noUiSlider.create(slider, {
      start: [this.start, this.end],
      range: {
        min: this.min,
        max: this.max,
      },
      connect: true,
      //tooltips: true,
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(value);
        },
      },
      //orientation: "vertical",

      //step: 150,

      // Handles start at ...
      //start: [1450, 2050, 2350, 3000],

      // ... must be at least 300 apart
      //margin: 300,

      // ... but no more than 600
      //limit: 600,

      // Display colored bars between handles

      // Put '0' at the bottom of the slider
      // direction: "rtl",
      //orientation: "vertical",

      // Move handle on tap, bars are draggable
      // behaviour: "tap-drag",
    });
    slider.noUiSlider.on("change.one", (values, handle) => {
      this.$emit("sliderChange", { values, handle });
      //   this.$emit("customSelected", this.selectedEl)
    });
    slider.noUiSlider.on("update", (values, handle) => {
      this.$emit("sliderUpdate", { values, handle });
    });
  },
  beforeUnmount() {
    //!Todo slider должен быть в глобальной области видимиости для очистки памяти
    //    slider.noUiSlider.off();
  },
};
</script>

<style lang="scss">
//@import "nouislider/dist/nouislider";
</style>

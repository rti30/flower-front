<template>
  <div
    @click="clickSelect"
    class="custom-select"
    :class="[{ open: isOpen }, classSelect]"
  >
    <div
      class="custom-select__button"
      :class="[
        classButton,
        { 'custom-select__default': defaultValue === selectedEl },
      ]"
    >
      {{ selectedEl }}
    </div>
    <ul v-if="isOpen">
      <!-- значение хранится в свойстве data-value -->
      <li class="custom-select__default" v-if="defaultValue">
        {{ defaultValue }}
      </li>
      <li v-for="item in selectData" :key="item.value">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>


<script>
/*  */
export default {
  props: {
    selectData: { default: [] },
    classSelect: { default: "" },
    classButton: { default: "" },
    defaultValue: "",
  },
  data: function () {
    return {
      isOpen: false,
      selectedEl: this.defaultValue,
    };
  },
  methods: {
    clickSelect(e) {
      if (e.target.tagName === "LI") {
        this.selectedEl = e.target.innerText;
        this.selectedEl === this.defaultValue
          ? this.$emit("customSelected", false)
          : this.$emit("customSelected", this.selectedEl);
      }
      this.isOpen = !this.isOpen;
    },
    /*   clickEl(item) {
      console.log("clickSelectEl");
      //this.selectedEl = item.name;
    }, */
  },
};
</script>

<style lang="scss">
$heightCustomSelect: calcSize(28, 72, $minWidth, $maxWidth);
//* Высота. (ширина, равна ширине родительского контейнера)
$allFontSize: calcSize(12, 42, $minWidth, $maxWidth);
//* Размер всего текста (или навесить класс на главный блок)
.custom-select {
  &__default {
    opacity: 0.5;
  }
  font-size: $allFontSize;
  background: white;
  position: relative;
  border: 2px groove #add8e6;
  cursor: pointer;
  width: 100%;
  height: $heightCustomSelect;
  &.open &__button:after {
    background-color: rgb(233, 19, 19);
    transform: rotate(-40deg);

    // opacity: 0;
  }
  &.open &__button:before {
    background-color: rgb(233, 19, 19);
    transform: translate(-70%, 0) rotate(40deg);
    // opacity: 0;
  }
  &__button {
    //width: 100%;
    height: 100%;
    padding: 5px;
    &:after,
    &:before {
      content: "";
      position: absolute;
      z-index: 6;
      top: calcSize(6, 26, $minWidth, $maxWidth);

      width: calcSize(10, 40, $minWidth, $maxWidth);
      height: 1px;
      background: #000;
      transition: all 0.3s ease 0s;
    }
    &:after {
      transform: rotate(40deg);
      right: 0;
    }
    &:before {
      right: 0;
      transform: translate(-73.9%, 0) rotate(-40deg);
    }
  }
  ul {
    position: absolute;
    z-index: 5;
    width: 100%;
    background: white;
    bottom: -5px;
    left: 0;
    transform: translate(0, 100%);
  }
  li {
    padding: 2px;
    cursor: pointer;
    border: 1px solid green;
  }
  li:hover {
    background-color: #7fffd4;
    border-right: 2px solid green;
  }
}
</style>
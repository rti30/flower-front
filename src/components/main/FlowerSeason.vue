
<template>
  <section
    ref="seasons"
    class="season"
  >
    <div class="content-width">
      <h2 class="season__tite title">Сезон цветения / созревания</h2>
      <div
        v-if="seasons.length"
        class="season__wrapper"
        @mouseover="isOver"
        @mouseout="isOut"
      >
        <div
          class="clip season__winter img-object-fit"
          data-season="4"
        >
          <img
            :src="`${serverUrl}/${winter.category_img}`"
            :alt="winter.category_name"
          />
          <div
            class="season__text subtitle season__text--bottom"
            data-season="4"
          >
            <router-link :to="{
                name: 'category',
                params: { category: winter.category_name },
              }">Зима
            </router-link>
          </div>
        </div>
        <div
          class="clip season__spring img-object-fit"
          data-season="1"
        >
          <img
            :src="`${serverUrl}/${spring.category_img}`"
            :alt="spring.category_name"
          />
          <div
            class="season__text subtitle season__text--left"
            data-season="1"
          >
            <router-link :to="{
                name: 'category',
                params: { category: spring.category_name },
              }">Весна
            </router-link>
          </div>
        </div>
        <div
          class="clip season__summer img-object-fit"
          data-season="2"
        >
          <img
            :src="`${serverUrl}/${summer.category_img}`"
            :alt="summer.category_name"
          />
          <div
            class="season__text subtitle season__text--right"
            data-season="2"
          >
            <router-link :to="{
                name: 'category',
                params: { category: summer.category_name },
              }">Летние
            </router-link>
          </div>
        </div>
        <div
          class="clip season__autumn img-object-fit"
          data-season="3"
        >
          <img
            v-lazy="{
              src: `${serverUrl}/${autumn.category_img}`,
              loading: '',
              error: '',
            }"
            :alt="autumn.category_name"
          />
          <div
            class="season__text subtitle season__text--top"
            data-season="3"
          >
            <router-link :to="{
                name: 'category',
                params: { category: autumn.category_name },
              }">
              Осень
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  //name: 'carrousel',
  data() {
    return {
      // items: this.$refs.seasons.querySelectorAll(".clip"),
    };
  },
  computed: {
    ...mapGetters("anyParams", { serverUrl: "serverUrl" }),
    ...mapGetters("category", { categories: "categories" }),

    items() {
      return this.$refs.seasons.querySelectorAll(".clip");
    },
    seasons() {
      // var self = this;
      return this.categories.filter((item) => {
        return (
          item.category_name === "Весна" ||
          item.category_name === "Осень" ||
          item.category_name === "Зима" ||
          item.category_name === "Летние"
        );
      });
    },
    spring() {
      return this.seasons.find((season) => {
        return season.category_name === "Весна";
      });
    },
    winter() {
      return this.seasons.find((season) => {
        return season.category_name === "Зима";
      });
    },
    autumn() {
      return this.seasons.find((season) => {
        return season.category_name === "Осень";
      });
    },
    summer() {
      return this.seasons.find((season) => {
        return season.category_name === "Летние";
      });
    },
  },
  methods: {
    isOver(e) {
      this.items.forEach((item) => {
        if (item.dataset.season === e.target.parentElement.dataset.season) {
          item.classList.add("active");
          item.classList.add("last-active");
        } else {
          item.classList.remove("active");
          item.classList.remove("last-active");
        }
      });
    },
    isOut() {
      this.items.forEach((item) => {
        item.classList.remove("active");
      });
    },
  },
  mounted() {},
};
</script>


<style lang="scss">
.season {
  &__wrapper {
    position: relative;
    height: calcSize(150, 460, $minWidth, $maxWidth);
    cursor: pointer;
  }

  &__winter {
    clip-path: polygon(50% 50%, 50% 50%, 100% 100%, 0 100%);
  }

  // .season__spring
  &__spring {
    // clip-path: polygon(0 0, 50% 50%, 100% 0, 0% 100%);
    clip-path: polygon(0 0, 50% 50%, 50% 50%, 0% 100%);
  }

  // .season__summer
  &__summer {
    //  clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0% 0);
    // clip-path: polygon(50% 50%, 100% 0%, 100% 100%, 100% 100%);
    clip-path: polygon(50% 50%, 100% 0%, 100% 100%, 50% 50%);
  }

  // .season__autumn
  &__autumn {
    //  clip-path: polygon(0 0, 100% 0, 100% 0, 50% 50%);
    clip-path: polygon(0 0, 100% 0, 50% 50%, 50% 50%);
  }

  // .season__text
  &__text {
    position: absolute;
    text-shadow: -1px 0px 10px #c5ce57;
  }
  // .season__text--right
  &__text--right {
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }
  // .season__text--top
  &__text--top {
    top: 0;
    right: 50%;
    transform: translate(50%, 0);
  }
  // .season__text--left
  &__text--left {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }
  // .season__text--bottom
  &__text--bottom {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
.clip {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all 0.4s;

  &.active {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
  &.last-active {
    z-index: 1;
  }
}
</style>
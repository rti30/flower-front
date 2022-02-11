<template>
  <div class="page">
    <flower-header></flower-header>
    <router-view v-slot="{ Component }">
      <transition
        name="anim-page"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <alert></alert>
  </div>
  <flower-footer></flower-footer>
</template>

<script>
import "@/assets/scss/style.scss";
import { mapGetters, mapActions } from "vuex";
import Alert from "@/components/ui/Alert.vue";
import FlowerFooter from "@/components/main/FlowerFooter.vue";
import FlowerHeader from "./components/main/FlowerHeader.vue";
export default {
  name: "App",
  components: {
    Alert,
    FlowerHeader,
    FlowerFooter,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("anyParams", {
      minWidthParams: "minWidthParams",
    }),
  },
  methods: {
    ...mapActions("anyParams", ["mediaQuery"]),
  },
  mounted() {
    const mediaValues = Object.values(this.minWidthParams);
    this.mediaQuery({
      array: mediaValues,
      op: "add",
      media: "min-width",
    });
  },

  beforeUnmount() {
    const mediaValues = Object.values(this.minWidthParams);
    this.mediaQuery({
      array: mediaValues,
      op: "delete",
      media: "min-width",
    });
  },
  watch: {},
};
</script>

<style lang="scss">
</style>

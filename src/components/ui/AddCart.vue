<template>
  <div @click="addToCart(id)" :class="{ active: hasInCart(id) }">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    id: {},
  },

  computed: {
    ...mapGetters("cart", { hasInCart: "has" }),
  },
  methods: {
    ...mapActions("cart", { addToCart: "add" }),
  },
};
</script>

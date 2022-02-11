<template>
  <div @click="addToLike(id)" :class="{ active: hasInLikes(id) }">
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
    ...mapGetters("like", { hasInLikes: "has" }),
  },
  methods: {
    ...mapActions("like", { addToLike: "add" }),
  },
};
</script>

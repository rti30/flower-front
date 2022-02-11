<template>
  <div class="alert text">
    <div
      class="alert__text"
      v-for="message in messages"
      :key="message.id"
    >
      {{ message.text }}
      <router-link
        :to="{
          name: 'login',
        }"
        v-if="(message.type = `autorize`)"
      >перейти</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    id: {},
  },

  computed: {
    ...mapGetters("alerts", { messages: "messages" }),
  },
  methods: {},
};
</script>

<style lang="scss">
.alert {
  position: fixed;
  top: 90%; /* 3 */

  transform: translate(0, -90%);
  display: flex;
  flex-direction: column;
  //align-items: right;
  justify-content: center;
  z-index: 500;
  width: 100%;

  // .alert__text
  &__text {
    padding: 20px;
    margin: 10px;
    border-radius: $main-border-radius;
    background-color: $c-Gray;
    text-align: center;
  }
}
</style>
<template>
  <section class="login-history">
    <table class="login-history__table">
      <caption class="login-history__title">
        История входов на сайт
      </caption>
      <tr class="login-history__row login-history__row--title">
        <th class="login-history__cell">ID устройства</th>
        <th class="login-history__cell">Время входа</th>
      </tr>
      <tr
        class="login-history__row"
        v-for="row in loginHistory"
        :key="row.time_created"
      >
        <td class="login-history__cell">{{ row.device_id }}</td>
        <td class="login-history__cell">{{ row.time_created }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "loginHistory",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", { loginHistory: "loginHistory" }),
  },
  methods: {
    ...mapActions("user", {
      getLoginHistory: "getLoginHistory",
    }),
  },

  mounted() {
    this.getLoginHistory();
  },
};
</script>

<style lang="scss">
.login-history {
  // .login-history__id
  &__table {
    border: 1px solid $c-Gray;
    width: 100%;
  }
  &__title {
  }
  &__row {
    width: 50%;
  }
  &__cell {
    border: 1px solid $c-Gray;
    padding: 5px;
  }
  &__title {
  }
  &__id {
  }
  // .login-history__time
  &__time {
  }
}
.title {
}
</style>
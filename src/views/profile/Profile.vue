<template>
  <div class="content-width">
    <section class="profile">
      <ul class="profile__menu subtitle">
        <li class="profile__link">
          <router-link :to="{ name: 'profile-info' }"> Профиль </router-link>
        </li>
        <li class="profile__link">
          <router-link :to="{ name: 'profile-orders' }">
            Мои заказы
          </router-link>
        </li>
        <li class="profile__link">
          <router-link :to="{
              name: 'likes',
              params: { likes: 'likes' }, //! Заглушка 'likes', не очень хорошо спроектирован универсальный модуль каталога
            }">
            Понравилось
          </router-link>
        </li>
        <li class="profile__link">
          <router-link :to="{ name: 'login-history' }">
            Истории входов на сайт
          </router-link>
        </li>
        <li
          class="profile__link"
          @click="logout"
        >Выйти</li>
      </ul>
      <div class="profile__page">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "profile",
  $head() {
    return {
      title: "FLOWER: Мой профиль",
    };
  },
  components: {},
  methods: {
    ...mapActions("user", {
      goOut: "logout",
    }),
    async logout() {
      const result = await this.goOut();
      if (result) {
        this.$router.push({ name: "main" });
      }
    },
  },
};
</script>
<style lang="scss">
.page {
}
.content-width {
}
.profile {
  // .profile__menu

  &__menu {
    display: flex;
    flex-wrap: wrap;
  }

  // .profile__link

  &__link {
    cursor: pointer;
    &:not(last-child) {
      margin-right: 5px;
      border-right: 2px solid $c-Light;
      padding-right: 5px;
    }
  }

  // .profile__page

  &__page {
  }
}
</style>

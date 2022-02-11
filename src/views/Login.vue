<template>
  <div class="content-width">
    <section class="sign-in text">
      <h2 class="sign-in__title subtitle">Авторизация</h2>
      <div class="sign-in__row">
        <span class="sign-in__label icon-font__profile"></span>
        <input
          v-model="userData.indentificator"
          class="sign-in__input"
          autocomplite="username"
          type="text"
          placeholder="Логин/e-mail"
        />
      </div>
      <div class="sign-in__row">
        <span class="sign-in__label icon-font__profile"></span>
        <input
          v-model="userData.password"
          class="sign-in__input"
          type="password"
          placeholder="Пароль"
        />
      </div>
      <!--  <div class="sign-in__warning">Пользователь не найден!</div> -->
      <button
        @click="post"
        type="button"
        class="sign-in__button button button--go"
      >
        Войти
      </button>
      <div class="sign-in__text">
        Еще не зарегистрировались?
        <router-link :to="{ name: 'registration' }">Зарегистрироватья!</router-link>
      </div>
      <span class="sign-in__close">
        <router-link :to="{ name: 'main' }">X</router-link>
      </span>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  $head() {
    return {
      title: "Авторизация",
    };
  },
  data() {
    return {
      userData: {
        indentificator: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", { login: "login" }),
    post() {
      this.login({
        userData: this.userData,
        critical: false,
        messege: "При попытке авторизации",
      }).then((res) => {
        if (res) {
          Object.keys(this.userData).forEach((key) => {
            this.userData[key] = "";
          });
          this.$router.push({ name: "main" });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.sign-in {
  height: 100vh;
  width: 100vw;
  background-color: $c-Dark;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // .sign-in__row
  &__row {
    margin: 5px;
    display: flex;
    align-items: center;
    padding: 5px;
  }
  // .sign-in__label
  &__label {
    height: 100%;
    color: $c-Dark;
    background-color: $c-Light;
  }

  // .sign-in__input

  &__input {
    height: 100%;
    background-color: $c-Light;
    color: $c-Dark;
  }

  // .sign-in__warning

  &__warning {
  }

  // .sign-in__button

  &__button {
  }
  &__close {
    position: absolute;
    top: 20%;
    right: 50px;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: $c-Gray;
    }
  }
}
</style>
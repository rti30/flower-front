<template>
  <div class="content-width">
    <section class="sign-up text">
      <div class="sign-up__wrrapper">
        <h2 class="sign-up__title subtitle">Регистрация</h2>
        <div class="sign-up__row">
          <span class="sign-up__label">Имя</span>
          <input
            class="sign-up__input"
            autocomplite="username"
            placeholder="Имя пользователя..."
            type="text"
            v-model="userData.name"
          />
        </div>
        <!--    <div class="sign-up__warning">Имя должно состоять из букв</div> -->

        <div class="sign-up__row">
          <span class="sign-up__label">Логин</span>
          <input
            class="sign-up__input"
            autocomplite="username"
            type="text"
            placeholder="Логин пользователя..."
            v-model="userData.login"
          />
        </div>
        <!--  <div class="sign-up__warning">
          Имя должно начинаться с буквы и состоять из букв и/или цифр
        </div> -->

        <div class="sign-up__row">
          <span class="sign-up__label">Эл. почта</span>
          <input
            class="sign-up__input"
            type="email"
            placeholder="e-mail..."
            v-model="userData.email"
          />
        </div>
        <!--  <div class="sign-up__warning">Неккоректный e-maill</div> -->

        <div class="sign-up__row">
          <span class="sign-up__label">Телефон</span>
          <input
            class="sign-up__input"
            type="tel"
            placeholder="номер телефона..."
            v-model="userData.phone"
          />
        </div>
        <!--      <div class="sign-up__warning">Неккоректный номер телефона</div> -->

        <div class="sign-up__row">
          <span class="sign-up__label">Пароль</span>
          <input
            class="sign-up__input"
            type="password"
            placeholder="пароль..."
            v-model="userData.password"
          />
        </div>
        <!--     <div class="sign-up__warning">
          Пароль дожен быть не менее 8 символов и состоять из спец. символов
        </div> -->

        <button
          type="button"
          class="sign-up__button button button--go"
          @click="post()"
        >
          Зарегистрироваться
        </button>
        <div class="sign-up__text">
          Уже зарегистрировались?
          <router-link :to="{ name: 'login' }">Войти!</router-link>
        </div>
      </div>
      <span class="sign-up__close">
        <router-link :to="{ name: 'main' }">X</router-link></span
      >
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "registration",
  $head() {
    return {
      title: "Регистрация",
    };
  },
  components: {},
  data() {
    return {
      userData: {
        name: "",
        login: "",
        email: "",
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", { registration: "registration" }),
    post() {
      this.registration({
        userData: this.userData,
        critical: false,
        messege: "При попытке регистрации, ",
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
%center {
  position: relative;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.sign-up {
  height: 100vh;
  background-color: $c-Dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__wrapper {
  }

  // .sign-up__row
  &__row {
    display: flex;
    align-items: center;
    height: calcSize(30, 40, $minWidth, $maxWidth);
    margin: 5px;
    padding: 5px;
  }
  // .sign-up__label
  &__label {
    height: 100%;
    color: $c-Dark;
    background-color: $c-Light;
    display: flex;
    align-items: center;
    //  justify-content: center;
    width: calcSize(90, 180, $minWidth, $maxWidth);
    border: 1px solid $c-Gray;
  }

  // .sign-up__input

  &__input {
    height: 100%;
    background-color: $c-Light;
    color: $c-Dark;
    width: 100%;
  }

  // .sign-up__warning

  &__warning {
  }

  // .sign-up__button

  &__button {
    @extend %center;
  }
  &__text {
    text-align: center;
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
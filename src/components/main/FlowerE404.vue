<template>
  <section class="e-404">
    <h2 class="e-404__title title">{{ title }}</h2>
    <div class="e-404__text subtitle">
      <router-link :to="{ name: 'main' }" class="e-404__link">
        Перейти на главную
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Страница не найдена",
    },
  },
};
</script>
<style lang="scss">
.e-404 {
  // .e-404__title
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100vh;
  row-gap: 50px;
  &__title {
  }

  // .e-404__text

  &__text {
  }

  // .e-404__link

  &__link {
    &:hover {
      color: $c-Gray;
    }
  }
}
</style>;

<template>
  <section class="order-history">
    <div class="order-history subtitle">История заказов</div>
    <div v-for="(order, i) in ordersHistory" :key="order.id">
      <table class="order-history__table" v-if="ordersHistory.length">
        <caption class="order-history__title">
          Заказ №
          {{
            i + 1
          }}
        </caption>
        <tr class="order-history__row order-history__row--title">
          <th class="order-history__cell">ID заказа</th>
          <th class="order-history__cell">Общая сумма</th>
          <th class="order-history__cell">Общая скидка</th>
        </tr>
        <tr class="order-history__row">
          <td class="order-history__cell">{{ order.id }}</td>
          <td class="order-history__cell">{{ order.total }}</td>
          <td class="order-history__cell">{{ order.discount }}</td>
        </tr>
        <tr class="order-history__row order-history__row--title">
          <th class="order-history__cell">Название продукта</th>
          <th class="order-history__cell">Кол-во</th>
          <th class="order-history__cell">Цена</th>
          <th class="order-history__cell">Цена со скидкой</th>
          <th class="order-history__cell">Промокод</th>
        </tr>
        <tr
          class="order-history__row"
          v-for="product in order.products"
          :key="product.name_product"
        >
          <td class="order-history__cell">{{ product.name_product }}</td>
          <td class="order-history__cell">{{ product.count_ }}</td>
          <td class="order-history__cell">{{ product.price }}</td>
          <td class="order-history__cell">
            {{ product.price_with_discount }}
          </td>
          <td class="order-history__cell">{{ product.promo_name }}</td>
        </tr>

        <tr class="order-history__row order-history__row--title">
          <th class="order-history__cell">Имя получателя</th>
          <th class="order-history__cell">Фамилия</th>
          <th class="order-history__cell">Телефон</th>
          <th class="order-history__cell">Эл. почта</th>
          <th class="order-history__cell">Адрес</th>
        </tr>

        <tr class="order-history__row">
          <td class="order-history__cell">{{ order.adressee.name_ }}</td>
          <td class="order-history__cell">{{ order.adressee.surname }}</td>
          <td class="order-history__cell">{{ order.adressee.telephone }}</td>
          <td class="order-history__cell">
            {{ order.adressee.email }}
          </td>
          <td class="order-history__cell">{{ order.adressee.adress }}</td>
        </tr>
      </table>
      <div v-else class="order-history__empty text">Нет заказов</div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "profileOrders",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", { ordersHistory: "ordersHistory" }),
  },
  methods: {
    ...mapActions("user", {
      getOrderHistory: "getOrderHistory",
    }),
  },

  mounted() {
    this.getOrderHistory();
  },
};
</script>

<style lang="scss">
.order-history {
  // .order-history__id
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
  // .order-history__time
  &__time {
  }
}
.title {
}
</style>
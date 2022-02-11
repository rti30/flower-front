<template >
  <section class="cart text">
    <div class="content-width">
      <div class="cart__body cart-sections">
        <div class="cart-section cart-sections__products section-product">
          <h3 class="cart__subtitle subtitle">Корзина</h3>
          <div class="section-product__info info-cart">
            <div
              v-show="!productsShow"
              class="info-cart__short text2"
            >
              <span class="info-cart__text">Товаров: </span>
              <span class="info-cart__count">{{ products.length }}</span>
              <span class="info-cart__text"> На сумму: </span>
              <span>{{ total }} &#8381;</span>
            </div>
            <div
              class="info-cart__trigger"
              @click="productsShow = !productsShow"
            >
              {{ triggerText }}
            </div>
            <div
              class="section__product-items cart-items"
              v-show="productsShow"
            >
              <div
                v-for="(product, i) in products"
                :key="product.id"
                class="cart-items__card cart-item"
              >
                <div class="cart-item__image img-object-fit">
                  <img
                    :src="`${serverUrl}/${product.url[0]}`"
                    :alt="product.name"
                  />
                </div>
                <!--                 <input
                  class="cart-item__checkbox"
                  type="checkbox"
                  @change="false"
                  :checked="true"
                /> -->
                <div class="cart-item__title">{{ product.name }}</div>
                <div class="cart-item__price-wrapper">
                  <div class="cart-item__price">
                    <span cart-item__text>Цена:
                      {{
                        product.price - (product.price * product.discount) / 100
                      }}
                      &#8381;</span>
                  </div>
                  <div
                    class="cart-item__price--old auxiliary"
                    v-if="product.discount !== 0"
                  >
                    <span cart-item__text>Прошлая цена: {{ product.price }} &#8381;</span>
                  </div>
                </div>
                <cnt-controller
                  class="cart-item__counter controller"
                  :product="product"
                  :index="i"
                ></cnt-controller>
                <div class="cart-item__promo">
                  <input
                    type="text"
                    class="cart-item__input input"
                    placeholder="Поле для Промо-кода"
                    @change="promoData[product.id] = $event.target.value"
                    :value="promoData[product.id]"
                  />
                  <button
                    class="button button--promo"
                    type="button"
                    @click="checkPromo(product.id)"
                  >
                    Применить
                  </button>
                </div>

                <div class="cart-item__left-product">
                  <span>Осталось: {{ product.maxCount }} шт.</span>
                </div>
                <div
                  v-show="product.maxCount > 0"
                  class="cart-item__null-product"
                >
                  Нет в наличии
                </div>
                <div
                  class="cart-item__delete auxiliary"
                  @click="remove(product.id)"
                >
                  Удалить
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-section cart-sections__delivery section-delivery">
          <h3 class="cart__subtitle subtitle">Способ доставки</h3>
          <div>В разработке</div>
          <!--     <div class="section-delivery__select">
            Выберете способ доставки...
          </div>
          <div class="section-delivery__wrapper">
            <div class="section-delivery__way">Либо курьером, либо ПВЗ</div>
            <div class="section-delivery__date">Дата доставки</div>
            <div class="section-delivery__label">Адрес доставки:</div>
            <input class="section-delivery__input" type="text" />
          </div> -->
        </div>
        <div class="cart-section cart-sections__payment section-payment">
          <h3 class="cart__subtitle subtitle">Способ оплаты</h3>
          <div>В разработке</div>
          <!--  <div class="section-payment__select">Выберете способ оплаты...</div>
          <div class="section-payment__way">Название спосба оплаты</div> -->
        </div>
        <div class="cart-section cart-sections__user-info user-info">
          <h3 class="cart__subtitle subtitle">Заполните данные</h3>
          <div
            v-for="adresseeItem in adresseeInfo"
            :key="adresseeItem.id"
            class="user-info__card"
          >
            <div class="user-info__label">{{ adresseeItem.name }}</div>
            <input
              :placeholder="adresseeItem.placeHolder"
              :type="adresseeItem.type"
              @input="
                changeAdressee({
                  name: adresseeItem.id,
                  value: $event.target.value,
                  validate: adresseeItem.pattern.test($event.target.value),
                  warning: adresseeItem.warning,
                })
              "
              class="user-info__input input input--adressee"
            />
            <div class="user-info__warning auxiliary">
              {{ warningField(adresseeItem.id) }}
            </div>
          </div>
        </div>
        <div class="cart-section cart-sections__total section-total">
          <h3 class="section-total__subtitle subtitle">Итого</h3>
          <div class="section-total__price subtitle">{{ total }} &#8381;</div>
          <div class="section-total__product auxiliary">
            <span>Товары, {{ products.length }} шт.</span><span>{{ totalPrice }} &#8381;</span>
          </div>
          <div class="section-total__discont auxiliary">
            <span>Ваша скидка:</span><span> {{ totalDiscount }} &#8381;</span>
          </div>
          <div class="section-total__delivery auxiliary">
            <span>Доставка</span><span>Бесплатно</span>
          </div>
          <div class="section-total__delivery total-delivery">
            <span class="total-delivery__name">Доставка:</span><span class="total-delivery__way">Самозабор</span>
          </div>
          <div class="section-total__date total-date">
            <span class="total-date__name">Дата</span><span class="total-date__text">-</span>
          </div>
          <div class="section-total__payment total-payment">
            <span class="total-payment__name">Оплата:</span>
            <span class="total-payment__way">Онлайн</span>
          </div>
          <div class="section-total__promo total-promo">
            <span class="total-promo__name">Помо:</span>
            <span
              class="total-promo__promo"
              v-for="(promo, i) in promoActive"
              :key="i"
            >{{ promo }}</span>
          </div>
          <button
            type="btn"
            class="section-total__btn button button--go"
            :disabled="!canOrder"
            @click="goPay"
          >
            Перейти к оплате
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CntController from "@/components/ui/CntController.vue";
export default {
  name: "FlowerCart",
  components: {
    CntController,
  },
  data() {
    return {
      adresseeInfo: [
        {
          id: "name",
          name: "Имя",
          placeHolder: "Введите имя...",
          type: "text",
          warning: "Неккоректно заполнено имя",
          pattern: /[a-zA-ZA-Яа-яЁё][a-zA-ZA-Яа-яЁё]/,
        },
        {
          id: "surname",
          name: "Фамилия",
          placeHolder: "Введите фамилию...",
          type: "text",
          warning: "Неккоректно заполнена Фамилия",
          pattern: /[a-zA-ZA-Яа-яЁё][a-zA-ZA-Яа-яЁё]/,
        },
        {
          id: "phone",
          name: "Контактный телефон",
          placeHolder: "Введите номер...",
          type: "text",
          warning: "Неккоректно заполнен телефон",
          pattern: /(\+?7|8)([0-9]{3})([0-9]{3})([0-9]{2})([0-9]{2})/,
        },
        {
          id: "adress",
          name: "Адрес доставки",
          placeHolder: "Введите адрес...",
          type: "text",
          warning: "Неккоректно заполнен адрес",
          pattern: /^[^/&]*$/,
        },

        {
          id: "email",
          name: "Электронная почта",
          placeHolder: "e-mail...",
          type: "email",
          warning: "Неккоректно заполнена эл.почта",
          pattern: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
        },
      ],
      productsShow: true,
      promoData: {},
    };
  },
  computed: {
    ...mapGetters("cart", {
      products: "productsInfo",
      cart: "cart",
      totalPrice: "totalPrice",
      totalDiscount: "totalDiscount",
      total: "total",
      readyCart: "readyCart",
      canOrder: "canOrder",
      productsId: "productsId",
      warningField: "warningField",
    }),
    ...mapGetters("user", { isLogin: "isLogin" }),
    ...mapGetters("anyParams", { serverUrl: "serverUrl" }),
    triggerText() {
      return this.productsShow ? "Свернуть" : "Развернуть";
    },
    promoActive() {
      return this.cart
        ?.filter((item) => item.promo)
        .map((item) => item.promo.name);
    },
  },

  methods: {
    ...mapActions("product", { getByProductsId: "getByProductsId" }),
    ...mapActions("cart", {
      remove: "remove",
      getPromoValue: "getPromoValue",
      changeAdressee: "changeAdressee",
      checkOrder: "checkOrder",
    }),
    async goPay() {
      const result = await this.checkOrder();
      if (result) {
        this.$router.push({ name: "pay" });
      }
    },

    checkPromo(productId) {
      console.log(this.promoData[productId]);
      console.dir(productId);
      if (this.promoData[productId] !== "" && this.promoData[productId]) {
        this.getPromoValue({ productId, promo: this.promoData[productId] });
      }
    },
  },

  async mounted() {
    await this.readyCart; // дожидаемся, если  корзина загружается с сервера
    if (this.productsId.length) {
      // Идём на сервер для забора свежих данных товаров, которые в корзине
      this.getByProductsId({ param: this.productsId });
    }

    let promises = this.cart.map((product) => {
      // Если промо сохранился в localStorage (или на сервере, там пока не сохраняется), то его надо отправить на проверку и снхронизировать с полем ввода
      if (product?.promo) {
        //this.promoData[product.id] = product.promo.name;
        this.getPromoValue({
          productId: product.id,
          promo: product.promo.name,
        });
        //    После этого цикла getPromoValue сам удалит неактивные промо
      }
    });
    await Promise.all(promises); //? нужна ли такая оптимизация ведь кол-во введенных промо всегда будем небольшим, или поставить await в прошлый цикл и сделать одним циклом
    this.cart
      .filter((product) => product?.promo)
      .forEach((product) => {
        this.promoData[product.id] = product.promo.name;
      });
  },
};
</script>

<style lang='scss'>
.cart {
  border-radius: $main-border-radius;
  background-color: $c-Light;
  color: $c-Dark;
  position: relative;
  .auxiliary {
    color: $c-Gray;
  }
  // .cart__body
  &__body {
    display: grid;
    grid-template-areas:
      "products"
      "delivery"
      "payment"
      "user-info"
      "total";
    @media (min-width: $width768 + px) {
      grid-template-areas:
        "products total"
        "delivery total"
        "payment total"
        "user-info total";
    }
  }

  // .cart__subtitle

  &__subtitle {
  }
}
.content-width {
}
.cart-sections {
  position: relative;

  // .cart-sections__products
  &__products {
    grid-area: products;
  }

  // .cart-sections__delivery

  &__delivery {
    grid-area: delivery;
  }

  // .cart-sections__payment

  &__payment {
    grid-area: payment;
  }

  // .cart-sections__user-info

  &__user-info {
    grid-area: user-info;
  }

  // .cart-sections__total

  &__total {
    grid-area: total;
    position: sticky;
    top: 0;
    align-self: start;
    @media (min-width: $width768+px) {
      grid-area: total;
      position: sticky;
      top: 0;
      //  align-self: start;
    }
  }
}
.cart-section {
  margin: 10px;
  padding: 5px;
  background-color: $c-Light;
  border-radius: $main-border-radius;
  // overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.section-product {
  // .section-product__info

  &__info {
  }
}
.subtitle {
}
.info-cart {
  display: grid;
  align-items: center;
  grid-template-areas:
    "short trigger"
    "cart-items cart-items";
  // .info-cart__body
  &__short {
    grid-area: short;
  }

  // .info-cart__count

  &__count {
  }

  // .info-cart__text

  &__text {
  }

  // .info-cart__trigger

  &__trigger {
    grid-area: trigger;
    text-align: right;
  }
}
.text2 {
}
.section {
  // .section__product-items

  &__product-items {
  }
}
.cart-items {
  grid-area: cart-items;

  // .cart-items__card

  &__card {
  }
}
.cart-item {
  display: grid;
  grid-template-areas:
    "cart-item-image cart-item-image cart-item-title"
    "cart-item-image cart-item-image cart-item-price"
    "cart-item-image cart-item-image cart-item-price"
    "cart-item-counter cart-item-counter cart-item-counter"
    "cart-item-promo cart-item-promo cart-item-promo"
    "cart-item-left cart-item-left cart-item-left"
    "cart-item-null cart-item-null cart-item-null"
    "cart-item-delete cart-item-delete cart-item-delete";
  @media (min-width: $width480 + px) {
    grid-template-areas:
      "cart-item-image cart-item-image cart-item-title"
      "cart-item-image cart-item-image cart-item-price"
      "cart-item-image cart-item-image cart-item-price"
      "cart-item-counter cart-item-counter cart-item-promo"
      "cart-item-left cart-item-left cart-item-left"
      "cart-item-null cart-item-null cart-item-null"
      "cart-item-delete cart-item-delete cart-item-delete";
  }

  justify-content: start;

  // .cart-item__image
  &__image {
    grid-area: cart-item-image;
    height: calcSizeH(150, 250, $minWidth, $maxWidth);
    width: calcSizeH(150, 250, $minWidth, $maxWidth);

    //150 // 250
  }

  /*   // .cart-item__checkbox
  &__checkbox {
    grid-area: cart-item-checkbox;
  } */
  // .cart-item__delete
  &__delete {
    cursor: pointer;
    grid-area: cart-item-delete;
  }

  // .cart-item__title
  &__title {
    grid-area: cart-item-title;
    //align-self: start;
  }

  // .cart-item__counter

  &__counter {
    grid-area: cart-item-counter;
  }
  // .cart-item__promo
  &__promo {
    grid-area: cart-item-promo;
  }
  &__input {
    background-color: $c-Dark;
    color: $c-Light;
  }

  // .cart-item__price-wrapper

  &__price-wrapper {
    grid-area: cart-item-price;
    // align-self: start;
  }

  // .cart-item__price

  &__price {
    &--old {
      text-decoration: line-through;
    }
  }
  &__left-product {
    grid-area: cart-item-left;
  }
  &__null-product {
    grid-area: cart-item-null;
  }
}
.section-delivery {
  // .section-delivery__select

  &__select {
  }

  // .section-delivery__wrapper

  &__wrapper {
  }

  // .section-delivery__way

  &__way {
  }

  // .section-delivery__date

  &__date {
  }

  // .section-delivery__price

  &__price {
  }
}
.section-payment {
  // .section-payment__select

  &__select {
  }

  // .section-payment__way

  &__way {
  }
}
.user-info {
  // .user-info__card

  &__card {
  }

  // .user-info__label

  &__label {
  }

  // .user-info__input

  &__input {
  }

  // .user-info__warning

  &__warning {
  }
}
.section-total {
  // .section-total__subtitle

  &__subtitle {
  }

  // .section-total__price

  &__price {
  }

  // .section-total__product

  &__product {
  }

  // .section-total__discont

  &__discont {
  }

  // .section-total__delivery

  &__delivery {
  }

  // .section-total__date

  &__date {
  }

  // .section-total__payment

  &__payment {
  }

  // .section-total__btn

  &__btn {
  }
}
.auxiliary {
}
.total-delivery {
  // .total-delivery__name

  &__name {
  }

  // .total-delivery__way

  &__way {
  }
}
.total-date {
  // .total-date__name

  &__name {
  }

  // .total-date__text

  &__text {
  }
}
.total-payment {
  // .total-payment__name

  &__name {
  }

  // .total-payment__way

  &__way {
  }
}

.total-promo {
  &__name {
  }
  &__promo {
    display: inline-block;
    border: 3px solid $c-Dark;

    margin: 0 4px 2px 0;
  }
}
</style>
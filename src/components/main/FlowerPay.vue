

<template>
  <section class="payment">
    <div class="content-width">
      <div class="payment__comment text">
        <p>
          Не настоящая оплата. Сайт учебный. Можно оформить заказ и посмотреть
          его у себя в профиле, если авторизован.
        </p>
        <p>"Неоплаченные" заказы в течении 3-6 минут, возвращаются на склад</p>
      </div>
      <div class="payment__body">
        <div class="payment__card payment__card--front card-front">
          <div class="card-front__number">
            <div class="card-front__label auxiliary">Card number</div>
            <div class="card-front__input">
              <input :disabled="true" type="text" class="input" />
            </div>
          </div>
          <div class="card-front__date">
            <div class="card-front__label auxiliary">Expiration date</div>
            <input :disabled="true" type="text" class="input" />
            <input :disabled="true" type="text" class="input" />
          </div>
          <div class="card-front__holder">
            <div class="card-front__label auxiliary">Cardholder name</div>
            <input :disabled="true" type="text" class="input" />
          </div>
          <div class="card-front__icons">
            <span class="icon-font__visa"></span>
            <span class="icon-font__mastercard"></span>
            <span class="icon-font__mir"></span>
          </div>
        </div>

        <div class="payment__card payment__card--back card-back">
          <div class="card-back__line"></div>
          <div class="card-back__content">
            <div class="card-back__cvc auxiliary">CVC\CVV</div>
            <div class="card-back__input">
              <input :disabled="true" type="text" class="input" />
            </div>
            <div class="card-back__text">
              The last 3 or 4 digits on back of the card
            </div>
          </div>
        </div>
      </div>
      <div class="payment__button">
        <button type="button" class="button button--go" @click="orderProduct">
          Оплатить
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  props: {},

  computed: {
    ...mapGetters("cart", { orderId: "orderId" }),
  },
  methods: {
    ...mapActions("cart", { buy: "buy" }),
    ...mapActions("alerts", { addAlert: "addAlert" }),

    async orderProduct() {
      if (this.orderId) {
        const result = await this.buy(this.orderId);
        console.log(result);
        if (result) {
          this.$router.push({ name: "main" });
        } else {
          this.$router.push({ name: "cart" });
          this.addAlert({
            text: "Заказ не найден, повторите попытку. Товары вернуться на склад в течении 3-6 минут",
            critical: false,
            type: "error",
          });
        }
      }
    },
  },
  mounted() {},
};
</script>


<style lang="scss">
.content-width {
}
.payment {
  // .payment__comment
  color: $c-Light;

  &__comment {
    text-align: center;
    margin: 10px 0px 10px 0px;
  }

  // .payment__body

  &__body {
    /*     position: absolute;
    top: 50%;
    left: 50;
    transform: translate(-50%, -50%); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  // .payment__card

  &__card {
    height: calcSize(180, 300, $minWidth, $maxWidth);
    width: calcSize(285, 500, $minWidth, $maxWidth);
    border-radius: 5px;
    background-color: #6d5656;
    padding: 15px;

    margin-bottom: 10px;
  }

  // .payment__card--front

  &__card--front {
  }

  // .payment__card--back

  &__card--back {
  }

  // .payment__card--front

  .card-front {
    .input {
      width: 100%;
    }
    // .card-front__number
    display: grid;
    grid-template-areas:
      "card-number card-number card-icons"
      "card-date card-date card-icons"
      "card-holder card-holder card-holder";
    &__number {
      grid-area: card-number;
    }

    // .card-front__label

    &__label {
    }

    // .card-front__input

    &__input {
    }

    // .card-front__date

    &__date {
      grid-area: card-date;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: auto auto;
      column-gap: 5px;

      .card-front__label {
        grid-row: 1 / 2;
        grid-column: 1 / 5;
        align-self: start;
      }
      .input:nth-child(2) {
        grid-row: 2 / 3;
        grid-column: 1 / 3;
      }
      .input:nth-child(3) {
        grid-row: 2 / 3;
        grid-column: 3 / 5;
      }
    }

    // .card-front__holder

    &__holder {
      grid-area: card-holder;
    }

    // .card-front__icons
    &__icons {
      grid-area: card-icons;
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      justify-content: center;
      span {
        flex: 0 0 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .icon-font {
      flex-direction: column;
      &__visa {
        color: #1434cb;
      }
      // .icon-font__mastercard
      &__mastercard {
        color: #eb001b;
      }
      // .icon-font__mir
      &__mir {
        color: #0e754ecb;
      }
    }
  }
  &__button {
    display: flex;
    justify-content: right;
  }
}
.text {
}
.card-front {
}
.card-back {
  // .card-back__line
  position: relative;

  &__content {
    max-width: 30%;
    overflow: hidden;
    position: absolute;
    right: 10%;
    top: 40%;
    div:not(:last-child) {
      margin-bottom: 3px;
    }
  }

  &__line {
    height: 15%;
    width: 100%;
    background-color: #000000;
    position: absolute;
    top: 10%;
    left: 0;
  }

  // .card-back__cvc

  &__cvc {
  }

  // .card-back__input

  &__input {
    input {
      width: 100%;
    }
  }

  // .card-back__text

  &__text {
  }
}

.auxiliary {
}
.input {
}
.button {
}
.button--go {
}
</style>
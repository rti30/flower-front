<template>
  <section class="footer">
    <div class="content-width">
      <div class="footer__body">
        <div class="footer__spoiler">
          <spoiler
            :title="'О компании'"
            :titleClass="'footer__subtitle spoiler-title text'"
            :additional="minWidth[minWidthParams.md2]"
          >
            <ul class="footer__links text2">
              <li class="footer__link"><a href="">О нас</a></li>
              <li class="footer__link"><a href="">Контакты</a></li>
              <a href=""></a>
              <li class="footer__link"><a href="">Режим работы</a></li>
            </ul>
          </spoiler>
        </div>
        <div class="footer__spoiler">
          <spoiler
            :title="'Сервис и поддержка'"
            :titleClass="'footer__subtitle spoiler-title text'"
            :additional="minWidth[minWidthParams.md2]"
          >
            <ul class="footer__links text2">
              <li class="footer__link"><a href="">Способы оплаты</a></li>
              <li class="footer__link"><a href="">Доставка</a></li>
              <li class="footer__link"><a href="">Возврат товаров</a></li>
              <li class="footer__link"><a href="">Возврат средств</a></li>
            </ul>
          </spoiler>
        </div>
        <div class="footer__spoiler">
          <spoiler
            :title="'Мы в соц сетях'"
            :titleClass="'footer__subtitle spoiler-title text'"
            :additional="minWidth[minWidthParams.md2]"
          >
            <ul class="footer__links footer__links--row text2">
              <li class="footer__link">
                <a class="icon-font__whatsapp font-icon" href=""></a>
              </li>
              <li class="footer__link">
                <a class="icon-font__insta font-icon" href=""></a>
              </li>
              <li class="footer__link">
                <a class="icon-font__vk font-icon" href=""></a>
              </li>
            </ul>
          </spoiler>
        </div>
      </div>
      <div class="footer__footer">
        <div class="footer__map subtitle icon-font__map">
          <a @click.prevent="" href="">Астрахань</a>
        </div>
        <div class="footer__copyrights auxiliary--white">
          2021 © Защищены ли все права?)
        </div>
        <div class="footer__payment">
          <span class="icon-font__visa footer__icon font-icon"></span>
          <span class="icon-font__mastercard footer__icon font-icon"> </span>
          <span class="icon-font__mir footer__icon font-icon"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Spoiler from "@/components/ui/Spoiler.vue";
import { mapGetters } from "vuex";
export default {
  name: "FlowerFooter",
  /*   data() {
    return {};
  }, */
  components: {
    Spoiler,
  },
  computed: {
    ...mapGetters("anyParams", { minWidthParams: "minWidthParams" }),
    ...mapGetters("anyParams", { minWidth: "minWidth" }),
  },
  methods: {
    toggleSpoiler() {},
  },
  mounted() {},
};
</script>

<style lang="scss">
.footer {
  background-color: $c-Gray;
  padding: calcSize(20, 40, $minWidth, $maxWidth) 0;
  // .footer__body
  a:link {
    cursor: pointer;
    transition: all 0.3s linear;
    color: $c-Dark;
  }

  a:visited {
    color: $c-Dark;
  }
  a:hover {
    color: $c-Light;
    text-decoration: underline;
  }
  a:active {
    // background-color: $c-Light;
  }

  &__body {
    margin-bottom: 15px;
    @media (min-width: $width768+px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 10px;
    }
  }

  // .footer__spoiler
  &__spoiler {
    border-top: $c-Dark 1px solid;
    padding: 10px 0px;
    &:last-child {
      border-bottom: $c-Dark 1px solid;
      @media (min-width: $width768+px) {
        border: none;
      }
    }
    @media (min-width: $width768+px) {
      border: none;
      .spoiler__button:before,
      .spoiler__button:after {
        display: none;
      }
    }
  }
  // .footer__links

  &__links {
    margin: 5px 0px 0px 5px;
    color: $c-Dark;
    &--row {
      display: flex;
      li {
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
    }
  }

  // .footer__link

  &__link {
    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }

  // .footer__footer

  &__footer {
    text-align: center;
  }

  // .footer__map

  &__map {
    cursor: pointer;
    a:link {
      color: $c-Light;
    }
    a:visited {
      color: $c-Light;
    }
    & > a {
      padding-left: 5px;
    }
  }
  &:before {
    font-size: calcSize(20, 28, $minWidth, $maxWidth);
  }

  // .footer__icon

  &__icon {
    &:before {
      font-size: calcSize(25, 32, $minWidth, $maxWidth);
    }
  }

  // .footer__subtitle

  &__subtitle {
  }

  // .footer__copyrights

  &__copyrights {
    margin-bottom: 20px;
  }

  // .footer__payment

  &__payment {
    margin-bottom: 10px;
    span:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>

let resolveCart;
let cartPromise;
import { cartApi } from '@/api/index.js'
export default {
   namespaced: true,
   state: {
      cart: [],
      idProcessing: [],
      adressee: {
         name: "",
         surname: "",
         phone: "",
         adress: "",
         email: "",
         warning: {},
      },
      orderId: null,
   },
   getters: {
      readyCart: () => cartPromise,
      cart: state => state.cart,
      has: state => id => state.cart.some(item => item.id === id),
      productsId: state => state.cart.map(product => product.id),
      productsInfo(state, rootGetters) {
         let cartInfo = [];
         state.cart.forEach((item) => {
            let info = rootGetters['product/product'](item.id);
            if (info) { cartInfo.push({ ...item, ...info }) }
         });
         return cartInfo;
      },
      warningField: state => name => state.adressee.warning[name],
      adressee: state => state.adressee,
      //*======================================
      promoProductActive: (getters) => (id) => getters.cart?.find(item => item.id === id)?.promo?.value,
      promoProductValue: (getters) => (id) => (getters.promoProductActive(id)) ? getters.promoProductActive(id) : 0,
      totalPrice: (getters) => getters.productsInfo?.reduce((t, product) => t + product.price * product.count, 0),
      totalDiscount: (getters) => getters.productsInfo?.reduce((t, product) => t + ((product.price * product.discount) / 100) * product.count + ((product.price * getters.promoProductValue(product.id)) / 100) * product.count, 0),
      total: ({ totalPrice, totalDiscount }) => totalPrice - totalDiscount,
      //*=======================================
      inProcessing: state => id => state.idProcessing.includes(id),
      canOrder: (state, getters) => !Object.values(state.adressee).some(item => item === "") && !Object.values(state.adressee.warning).length
         && !getters.productsInfo.some(item => item.count < 1) && !getters.productsInfo.some(item => item.maxCount === 0),
      orderId: state => state.orderId,
   },
   mutations: {
      add(state, id) {
         state.cart.push({ id, count: 1 });
      },
      remove(state, id) {
         state.cart = state.cart.filter(item => item.id !== id);
      },
      changeCount(state, { i, newCount }) {
         state.cart[i].count = newCount;
      },
      replaceCart(state, cart) {
         state.cart = cart;
      },

      //Данные получателя==========================================================
      changeAdressee(state, { name, value }) {
         state.adressee[name] = value;
      },
      changeWarning(state, { name, value }) {
         state.adressee.warning[name] = value;
      },
      deleteWarning(state, { name }) {
         delete state.adressee.warning[name];
      },
      //=============================================================================

      pushPromo(state, { productId, body }) {
         state.cart.find(item => item.id === productId).promo = body;
      },
      popPromo(state, { productId }) {
         delete state.cart.find(item => item.id === productId).promo;
      },

      pushProcessing(state, id) {
         state.idProcessing.push(id);
      },
      popProcessing(state, popId) {
         state.idProcessing = state.idProcessing.filter(id => id !== popId);
      },
      setOrderId(state, id) {
         state.orderId = id;
      }
   },
   actions: {
      add: async ({ rootGetters, getters, commit, dispatch }, id) => {
         if (!getters.inProcessing(id)) {
            commit('pushProcessing', id);
            if (!getters.has(id) && (id !== null || id !== undefined)) {
               if (rootGetters['user/isLogin']) {
                  const { ok, body } = await cartApi.add(id);
                  if (body && ok) {
                     commit('add', id)
                  }
                  else {
                     dispatch('alerts/add', { text: 'Ошибка при добавлении товара в корзину. Повторите попытку', type: 'error', critical: false }, { root: true })
                  }
               }
               else {
                  commit('add', id)
                  localStorage.setItem("cart", JSON.stringify(getters.cart));
               }
            }
            else if (getters.has(id) && (id !== null || id !== undefined)) {
               commit('popProcessing', id);
               dispatch('remove', id)
            }
            commit('popProcessing', id);
         }
      },
      remove: async ({ commit, rootGetters, getters, dispatch }, id) => {
         if (!getters.inProcessing(id)) {
            console.log("Зашли?");
            commit('pushProcessing', id);
            if (getters.has(id) && (id !== null || id !== undefined)) {
               if (rootGetters['user/isLogin']) {
                  const { ok, body } = await cartApi.remove(id);
                  if (body && ok) {
                     commit('remove', id)
                  }
                  else {
                     dispatch('alerts/add', { text: 'Ошибка при удалении товара из корзины. Повторите попытку', type: 'error', critical: false }, { root: true })
                  }
               }
               else {
                  commit('remove', id)
                  localStorage.setItem("cart", JSON.stringify(getters.cart));
               }
            }
            commit('popProcessing', id);
         }
      },
      changeCount: async ({ commit, getters, rootGetters, dispatch }, { id, op, value, index }) => {
         if (!getters.inProcessing(id)) {
            commit('pushProcessing', id);
            await dispatch('product/getOneProductById', { text: '', type: 'error', critical: false, id }, { root: true })
            value = isNaN(parseInt(value)) ? 1 : value;
            const product = getters.productsInfo[index];
            if (op === 'increase') { value = product.count + value }
            else if (op === 'decrease') { value = product.count - value }
            //   else if (op === 'input') { value = value } //! можно убрать полностью, но для порядка пусть будет
            value = Math.min(Math.max(1, value), product.maxCount);

            if (value === 0) {
               dispatch('alerts/add', { text: 'Товар закончился', type: 'error', critical: false }, { root: true })
               commit('popProcessing', id);
               return;
            }

            let indexInCart;
            getters.cart?.find((item, i) => {
               if (item.id === id) {
                  indexInCart = i
               }
            });
            if (getters.cart?.length && indexInCart !== undefined && product.count !== value && value <= product.maxCount && value >= 1) { //* При обращении к БД, в случае если товар удалили, то и из корзины он удалится и тут может не оказаться товаров
               if (rootGetters['user/isLogin']) {
                  const { ok, body } = await cartApi.change(id, value);
                  if (body && ok) {
                     commit('changeCount', { i: indexInCart, newCount: value });
                  }
                  else {
                     dispatch('alerts/add', { text: 'Ошибка при изменении кол-ва товаров, повторите попытку', type: 'error', critical: false }, { root: true })
                  }
               }
               else {
                  commit('changeCount', { i: indexInCart, newCount: value });
                  localStorage.setItem("cart", JSON.stringify(getters.cart));
               }
            }
            commit('popProcessing', id);
         }
      },
      replaceCart({ commit }, cart) {
         console.log('Замена карты на ', cart);
         commit('replaceCart', cart)
      },
      load: async ({ dispatch, rootGetters }) => {
         cartPromise = new Promise(function (resolve) {
            resolveCart = resolve;
         });
         await rootGetters['user/readyAuth']; //ждём если есть процесс авторизации
         if (rootGetters['user/isLogin']) {
            const { ok, body, status, serverMessege } = await cartApi.load();
            console.log("load cart", { ok, body, status, serverMessege });
            if (ok) {
               //Замена названий ключей
               body.forEach(element => {
                  delete Object.assign(element, { 'id': element.product_id }).product_id;
                  delete Object.assign(element, { 'count': element.count_ }).count_;
               });
               dispatch('replaceCart', body)
            }
         }
         else {
            dispatch('installStorageCart');
         }
         resolveCart();
      },
      getPromoValue: async ({ commit, dispatch }, { productId, promo }) => {
         const { ok, body } = await cartApi.getPromoValue(productId, promo);
         if (ok) {
            if (body === null) {
               dispatch('alerts/add', { text: "промокод не активен", type: 'info', critical: false }, { root: true });
               commit('popPromo', { productId });
               return null;
            }
            else if (body === false) {
               dispatch('alerts/add', { text: "Ошибка обработки промокода", type: 'info', critical: false }, { root: true });
               commit('popPromo', { productId });
               return null;
            }
            else {
               commit('pushPromo', { productId, body });
            }
         }
         else {
            dispatch('alerts/add', { text: "Ошибка при обращении к серверу. Попробуйте снова", type: 'info', critical: false }, { root: true });
            return false
         }
      },
      installStorageCart: ({ dispatch, rootGetters }) => {
         if (!rootGetters['user/isLogin'] && JSON.parse(localStorage.getItem("cart"))?.length) {
            dispatch('replaceCart', JSON.parse(localStorage.getItem("cart")));
         }
      },

      //Данные получателя=======================================================================
      changeAdressee({ commit }, { name, value, validate, warning }) {
         if (name === 'name' || name === 'surname' || name === 'phone' || name === 'adress' || name === 'email') {
            if (validate) {
               commit('changeAdressee', { name, value })
               commit('deleteWarning', { name })
            }
            else {
               warning = (value === '') ? 'Не заполнено' : warning;
               commit('changeAdressee', { name, value: '' })
               commit('changeWarning', { name, value: warning })
            }
         }
      },
      deleteWarning({ commit, getters }, { name }) {
         if (Object.keys(getters.adressee.warning).some(item => item === name)) {
            commit('deleteWarning', { name })
         }
      },
      //===========================================================================================
      checkOrder: async ({ commit, getters, dispatch }) => {
         let products = [];
         getters.cart.forEach((element) => {
            let productId = element.id;
            let promo;
            if (element?.promo) {
               promo = element.promo.name;
               products.push({ ...element, ...{ productId }, ...{ promo } })
            }
            else {
               products.push({ ...element, ...{ productId } })
            }
         });

         if (getters.canOrder) {
            const order = {
               products,
               total: getters.total,
               discount: getters.totalDiscount,
               customerInfo: {
                  name: getters.adressee.name,
                  surname: getters.adressee.surname,
                  telephone: getters.adressee.phone,
                  adress: getters.adressee.adress,
                  email: getters.adressee.email
               },
            }
            const { ok, body } = await cartApi.checkOrder(order);
            console.log("1111111111111111111", ok, body);
            if (!ok && body) {
               if (!body?.messege?.error) {
                  dispatch('alerts/add', { text: 'Заполните все данные!', type: 'error', critical: false }, { root: true })
               }
               else if (body?.messege?.error) {
                  if (body.messege?.total === false) {
                     dispatch('alerts/add', { text: 'Цена товара изменилась! Получаем новые цены...', type: 'error', critical: false }, { root: true })
                     //Запрос на обновление товаров, которые в корзине, либо оптимизированный запрос на обновление товаров у которых в ответе false
                     dispatch('product/getByProductsId', {
                        param: getters.productsId
                     }, { root: true })
                  }
                  if (body.messege?.discount === false) {
                     dispatch('alerts/add', { text: 'Скидки на товар изменились! Получаем новые цены...', type: 'error', critical: false }, { root: true })
                     //Запрос на обновление товаров, которые в корзине, либо оптимизированный запрос на обновление товаров у которых в ответе false
                     dispatch('product/getByProductsId', {
                        param: getters.productsId
                     }, { root: true })
                  }
                  if (body.messege?.checkCount) {
                     dispatch('alerts/add', { text: 'Количество товаров изменилось! Получаем актуальные  данные...', type: 'error', critical: false }, { root: true })
                     //Запрос на обновление товаров, которые в корзине, либо оптимизированный запрос на обновление товаров у которых в ответе false
                     dispatch('product/getByProductsId', {
                        param: getters.productsId
                     }, { root: true })
                  }
                  if (body.messege?.checkPromo) {
                     dispatch('alerts/add', { text: 'Один из промокодов недействителен, проверяем промокоды...', type: 'error', critical: false }, { root: true })
                     body.messege.checkPromo.filer(item => item.promo_value === false).forEach(product => {
                        dispatch('getPromoValue', {
                           productId: product.id,
                           promo: product.promo_name,
                        })
                     })
                     //Запрос на проверку промокода
                  }
               }
            }
            if (ok && body.reservation) {
               commit('setOrderId', body.reservation);
               return true;
            }

         }
      },
      buy: async ({ getters, dispatch, commit }) => {
         const { ok, body } = await cartApi.buy(getters.orderId);
         if (!ok && body.status === false) {
            dispatch('alerts/add', { text: 'Время покупки истекло. Оформите снова', type: 'error', critical: false }, { root: true })
            return false;
         }
         else if (ok && body.status === true) {
            dispatch('alerts/add', { text: 'Заказ офрмлен', type: 'error', critical: false }, { root: true })
            commit('replaceCart', []) // очистить корзину
            return true;
         }
      },
   }
}
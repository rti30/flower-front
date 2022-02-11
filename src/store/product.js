import { productApi } from '@/api/index.js'


export default {
   namespaced: true,
   state: {
      products: null,
   },
   getters: {
      products: state => state.products,
      productsMap(state) {
         let map = {};
         state.products?.forEach((pr, i) => {
            map[pr.id.toString()] = i;
         });

         return map;
      },
      product: (state, getters) => state.products ? id => state.products[getters.productsMap[id]] : () => undefined,
   },
   mutations: {
      addProducts(state, data) {
         state.products = data;
      },
      changeProduct(state, { index, item }) {
         state.products[index] = item;
      },
      pushProduct(state, item) {
         state.products.push(item);
      },
   },
   actions: {
      getProducts: async ({ dispatch, commit }, { critical, messege }) => {
         console.log({ productApi });
         const { ok, body: products, serverMessege } = await productApi.getAll();
         if (ok) {
            //   console.log("Продукты", ok, products, status, serverMessege);
            console.log('Склад, ок, продукты получены');
            commit('addProducts', products);
         }
         else {
            console.log("Ошибка, обработка от api:", { serverMessege });
            dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      },
      getByProductsId: async ({ dispatch }, { critical, messege, param }) => {
         //! массив параметров id не путать с getOneProductById
         const { ok, body: products, serverMessege } = await productApi.getProductsById(param)
         if (ok) {
            let noFind = products.filter((item) => item?.has === false)  //* Ключ has: false есть у товара, если в множетсвенном запросе по id товара на сервере нет
            //! Это не тестировалось, т.к не эмитировалось удаление товаров на сервере. По идее нужно найти товары которые не false и добавить их. 
            //! Вот так:========================================
            //  let activeProduct = products.filter((item) => !(item?.has === false)) 
            //  dispatch('changeProduct', activeProduct);
            // и удалить блок if (!noFind.length && products.length)
            //! ==================================================
            console.log(products);

            if (!noFind.length && products.length) {
               dispatch('changeProduct', products);
               return products;
            }
            else if (noFind.length) {
               noFind.forEach(item => {
                  dispatch('removeProduct', item.id);
               })
            }
            else { return false }
         }
         else {
            console.log("Ошибка, getByProductsId", { serverMessege });
            dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      },
      getOneProductById: async ({ dispatch }, { critical, messege, id }) => {
         const { ok, body: product, serverMessege } = await productApi.getOneProductById(id)
         // приходит один объект, не массив, поэтому на changeProduct пушим в массив
         if (ok && product) {
            console.log(product);
            dispatch('changeProduct', [product]);
         }
         else if (ok && !product) {
            //! Продукт на сервере не найден
            console.log("Товара нет на сревер! Если есть в списках - удалить!");
            dispatch('removeProduct', id);
         }
         else {
            console.log("Ошибка, getByProductsId", { serverMessege });
            dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      },
      getByTagName: async ({ dispatch }, { critical, messege, param }) => {
         console.log('getByTagName', param);
         const { ok, body: products, serverMessege } = await productApi.getByTagName(param);
         if (ok) {
            console.log(products);
            dispatch('changeProduct', products);
         }

         else {
            console.log("Ошибка, getByTagName", { serverMessege });
            dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      },
      /*      getByTagId: async ({ dispatch, commit }, { critical, messege, param }) => {
     
           }, */
      getByCategoryName: async ({ dispatch }, { critical, messege, param }) => {
         console.log('getByCategoryName', param);
         const { ok, body: products, serverMessege } = await productApi.getByCategoryName(param);
         if (ok) {
            console.log("получили продукты по  параметру", param, products);
            dispatch('changeProduct', products);
         }

         else {
            console.log("Ошибка, getByTagName", { serverMessege });
            dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      },
      /*       getByCategoryId: async ({ dispatch, commit }, { critical, messege, param }) => {
      
            }, */
      getByName: async ({ dispatch }, { critical, messege, param }) => {
         console.log('getByName', param);
         const { ok, body: products, serverMessege } = await productApi.getByName(param);
         if (ok) {
            console.log("получили продукты по имени", param, products);
            dispatch('changeProduct', products); // Можно закэшировать в продуктах раз уже получили
            return products;
            //  dispatch('filter/setSearchData', products, { root: true }) //! сохранять будет функция которая вызвала (модуль поиска)
         }

         else {
            console.log("Ошибка, getByTagName", { serverMessege });
            dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      },

      //******************************************************************************************************************** */
      changeProduct: async ({ commit, getters }, products) => {
         if (getters.products === null) {
            commit('addProducts', products);
         }
         else {
            products.forEach(item => {
               if (getters.product(item.id) !== undefined) {
                  commit('changeProduct', { index: getters.productsMap[item.id], item })
               }
               else {
                  console.log("Товара нет в списке. Пуш!!!!!!!!!");
                  commit('pushProduct', item);
               }
            })
         }
      },
      removeProduct({ commit, getters, dispatch }, id) {
         getters.product(id) !== undefined
         {
            const newData = getters.products?.filter(product => product.id !== id);
            commit('addProducts', newData); //удалить из продуктов
         }
         //? Тут тоже можно обратиться к геттеру корзины и проверить наличие
         dispatch('cart/remove', id, { root: true }) //удалить из корзины
      }
   }
}

import { likeApi } from '@/api/index.js'
let resolveLoad;
let loadPromise;

export default {
   namespaced: true,
   state: {
      likes: [],
      idProcessing: [],
      likesProducts: [],
   },
   getters: {
      readyLoad: () => loadPromise,
      likes: state => state.likes,
      has: state => id => state.likes?.some(itemId => itemId === id),
      inProcessing: state => id => state.idProcessing.includes(id),
      likesProducts: state => state.likesProducts,
      likesId: state => Object.values(state?.likes)

   },
   mutations: {
      add(state, id) {
         state.likes.push(id);
      },
      remove(state, id) {
         state.likes = state.likes.filter(itemId => itemId !== id);
         state.likesProducts = state.likesProducts.filter(item => item.id !== id); //! можно сделать зависимость через геттеры
      },
      replaceData(state, data) {
         state.likes = data;
      },
      pushProcessing(state, id) {
         state.idProcessing.push(id);
      },
      popProcessing(state, popId) {
         state.idProcessing = state.idProcessing.filter(id => id !== popId);
      },
      setProducts(state, products) {
         state.likesProducts = products;
      }
   },
   actions: {
      add: async ({ rootGetters, getters, commit, dispatch }, id) => {
         if (!getters.inProcessing(id)) {
            commit('pushProcessing', id);
            if (!getters.has(id) && (id !== null || id !== undefined)) {
               //commit('add', id)
               if (rootGetters['user/isLogin']) {
                  const { ok, body } = await likeApi.add(id);
                  if (body && ok) {
                     commit('add', id)
                  }
                  else {
                     dispatch('alerts/add', { text: 'Ошибка при добавлении товара в избранное. Повторите попытку', type: 'error', critical: false }, { root: true })
                  }
               }
               else {
                  commit('add', id)
                  localStorage.setItem("likes", JSON.stringify(getters.likes));
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
            commit('pushProcessing', id);
            if (getters.has(id) && (id !== null || id !== undefined)) {
               if (rootGetters['user/isLogin']) {
                  const { ok, body } = await likeApi.remove(id);
                  if (body && ok) {
                     commit('remove', id)
                  }
                  else {
                     dispatch('alerts/add', { text: 'Ошибка при удалении товара из избранных. Повторите попытку', type: 'error', critical: false }, { root: true })
                  }
               }
               else {
                  commit('remove', id)
                  localStorage.setItem("likes", JSON.stringify(getters.likes));
               }
            }
            commit('popProcessing', id);
         }
      },
      load: async ({ dispatch }) => {
         loadPromise = new Promise(function (resolve) {
            resolveLoad = resolve;
         });

         const { ok, body, status, serverMessege } = await likeApi.load();
         console.log({ ok, body, status, serverMessege });
         if (ok) {
            //Замена названий ключей
            let data = []
            body.forEach(element => {
               delete Object.assign(element, { 'id': element.product_id }).product_id;
               data.push(element.id)
            });
            dispatch('replaceData', data)
         }
         resolveLoad();
      },

      replaceData({ commit, rootGetters }, data) {
         console.log('Замена избранных на ', data);
         console.log(rootGetters);
         commit('replaceData', data)
      },
      installStorageLikes: ({ dispatch, rootGetters }) => {
         if (!rootGetters['user/isLogin'] && JSON.parse(localStorage.getItem("likes"))?.length) {
            dispatch('replaceData', JSON.parse(localStorage.getItem("likes")))
         }
      },
      getLikesProducts: async ({ commit, dispatch, getters }) => {
         await getters.readyLoad;
         console.log("111111111111", getters.likesId);
         const products = await dispatch('product/getByProductsId', { param: getters.likesId }, { root: true })
         console.log();
         if (products) {
            commit('setProducts', products)
         }
      },


      //*===========================================================================================
      pushProcessing(state, id) {
         state.idProcessing.push(id);
      },
      popProcessing(state, popId) {
         state.idProcessing = state.idProcessing.filter(id => id !== popId);
      }

   }
}
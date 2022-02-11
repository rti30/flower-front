import { userApi } from '@/api/index.js'
let resolveAuth;
let authPromise;
let logoutProcessing = false;

export default {
   namespaced: true,
   state: {
      user: null,
      loginHistory: [],
      ordersHistory: [],
   },

   getters: {
      readyAuth: () => authPromise,
      //readyLogout: state => logoutPromise,
      isLogin: state => state.user != null,
      loginHistory: state => state.loginHistory,
      ordersHistory: state => state.ordersHistory,
   },
   mutations: {
      auth(state, payload) {
         state.user = payload;
      },
      setLoginHistory(state, history) {
         state.loginHistory = history;
      },
      setLikesProducts(state, body) {
         if (body) {
            state.likesProducts = body;
         }
      },
      setOrdersHistory(state, body) {
         if (body) {
            state.ordersHistory = body;
         }
      }
   },
   actions: {
      auth: async ({ commit, dispatch }) => {
         authPromise = new Promise(function (resolve) {
            resolveAuth = resolve;
         });
         console.log('Storage auth!');
         const { ok, body, status, payload, serverMessege } = await userApi.auth();
         console.log(ok, body, status, payload, serverMessege);
         if (ok) {
            commit('auth', payload)
            console.log('Авторизован');
            dispatch('userDataLoad');
         }
         else {
            commit('auth', null)
            console.log('Не авторизован');
            dispatch('logout');
         }
         // }
         console.log('END Storage auth!');
         resolveAuth();
      },
      registration: async ({ commit, dispatch }, { userData, critical, messege }) => {
         console.log(body);
         const { ok, body, payload, status, serverMessege } = await userApi.signUp(userData);
         if (ok) {
            commit('auth', payload)
            dispatch('alerts/add', { text: "Вы зарегистрированы", type: 'info', critical: false }, { root: true })
            dispatch('userDataLoad');
            return true;
         }
         else if (status === "NoConnect") {
            console.log(body);
            dispatch('alerts/add', { text: messege + serverMessege, type: 'error', critical }, { root: true })
            return false;
         }
         else {
            dispatch('alerts/add', { text: body.messege, type: 'error', critical }, { root: true })
            return false;
         }
      },
      login: async ({ commit, dispatch }, { userData, critical, messege }) => {
         const { ok, body, payload, status, serverMessege } = await userApi.signIn(userData);
         console.log(critical, messege)
         if (ok) {
            console.log(body);
            commit('auth', payload)
            dispatch('alerts/add', { text: "Вы авторизованы", type: 'info', critical: false }, { root: true })
            dispatch('userDataLoad');
            return true;
         }
         else if (status === "NoConnect") {
            console.log(body);
            dispatch('alerts/add', { text: serverMessege.messege, type: 'error', critical }, { root: true })
            return false;
         }
         else {
            console.log(body);
            const { messege: messegeAPI } = body;
            dispatch('alerts/add', { text: messege + serverMessege, type: 'error', critical }, { root: true })
            dispatch('alerts/add', { text: messegeAPI, type: 'error', critical }, { root: true })
            return false;
         }
      },

      // logout===================================================================================================
      logout: async ({ commit, dispatch }) => {
         console.log("logout");
         if (!logoutProcessing) {
            logoutProcessing = true
            /*          logoutPromise = new Promise(function (resolve) {
                        resolveLogout = resolve;
                     }); */
            let { body, status } = await userApi.logout();
            if (body && status) {
               commit('auth', null);
               dispatch('cart/installStorageCart', {}, { root: true })
               dispatch('like/installStorageLikes', {}, { root: true })
               commit('setLoginHistory', []);
               commit('setOrdersHistory', []);
               //  resolveLogout();
               logoutProcessing = false;
               return true;
            }
            else {
               dispatch('alerts/add', { text: "Выход не осуществлён. Повторите попытку.", type: 'error', critical: false }, { root: true })
               //resolveLogout();
               logoutProcessing = false;
               return false;
            }
         }
      },

      // /logout======================================================================================================
      // userDataLoad===================================================================================================
      userDataLoad: ({ dispatch }) => {
         console.log("UserDataLoad");
         dispatch('cart/load', {}, { root: true });
         dispatch('like/load', {}, { root: true });
      },

      // /userDataLoad======================================================================================================

      changeUser: ({ commit }, payload) => {
         commit('auth', payload)
      },

      async getLoginHistory({ commit }) {
         const { body } = await userApi.getLoginHistory();
         commit('setLoginHistory', body)
      },
      async getOrderHistory({ commit }) {
         const { body } = await userApi.getOrders();
         commit('setOrdersHistory', body)
      }
   }
}
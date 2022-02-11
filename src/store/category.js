
import { categoryApi } from '@/api/index.js'

export default {
   namespaced: true,
   state: {
      categories: [],

   },
   getters: {
      categories: state => state.categories,
   },
   mutations: {
      addCategories(state, data) {
         state.categories = data;
      },
   },
   actions: {
      getCategories: async ({ dispatch, commit }, { critical, messege = 'При получении категорий от сервера' }) => {
         const { ok, body: categories, serverMessege } = await categoryApi.getAll();
         if (ok) { commit('addCategories', categories); }
         else {
            dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      },
   }
}
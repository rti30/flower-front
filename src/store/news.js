
import { newsApi } from '@/api/index.js'
export default {
   namespaced: true,
   state: {
      news: [],
   },
   getters: {
      news: state => state.news,
   },
   mutations: {
      addNews(state, data) {
         state.news = data;
      },
   },
   actions: {
      getNews: async ({ commit }) => {
         const { ok, body, serverMessege } = await newsApi.getAll();
         if (ok) { commit('addNews', body); }
         else {
            console.log(serverMessege);
            //  dispatch('alerts/add', { type: 'error', text: messege + serverMessege, critical }, { root: true })
         }
      }
   }
}
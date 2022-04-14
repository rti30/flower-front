
let counter = 0;
export default {
   namespaced: true,
   state: {
      messages: [],
   },
   getters: {
      messages: state => state.messages,
   },
   mutations: {
      add(state, msg) {
         state.messages.push(msg);
      },
      remove(state, id) {
         state.messages = state.messages.filter(msg => msg.id !== id);
      },
   },
   actions: {
      add({ commit }, { text, critical, type }) {
         console.log(text, critical, type);
         let id = ++counter;
         commit('add', { id, text, type });
         if (!critical) {
            setTimeout(() => {
               commit('remove', id);
            }, 3000);
         }
      },
   }
}
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
let app = createApp(App).use(store);

store.dispatch('user/auth')
store.dispatch('cart/load');

store.dispatch('category/getCategories', { critical: true }).then(() => {
   store.dispatch('news/getNews', { critical: false });
   store.dispatch('product/getByTagName', { critical: false, param: 'Хит продаж' });
   store.dispatch('product/getByTagName', { critical: false, param: 'Новинка' });
   app.mount('#app');
});


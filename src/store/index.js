import { createStore } from 'vuex'
import news from '@/store/news';

import product from '@/store/product';
import category from '@/store/category';
import anyParams from '@/store/anyParams';
import filter from '@/store/filter';
import cart from '@/store/cart';
import like from '@/store/like';
import alerts from '@/store/alerts';
import user from '@/store/user';

export default createStore({
   modules: {
      news,
      product,
      category,
      anyParams,
      filter,
      cart,
      like,
      alerts,
      user,
   },
   strict: process.env.NODE_ENV !== 'production',
});



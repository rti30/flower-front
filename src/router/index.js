import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const Main = () => import('@/views/Main.vue');
const Catalog = () => import('@/views/Catalog.vue');
const Cart = () => import('@/views/Cart.vue');
const Profile = () => import('@/views/profile/Profile.vue');
const ProfileInfo = () => import('@/views/profile/ProfileInfo.vue');
const ProfileOrders = () => import('@/views/profile/ProfileOrders.vue');
const LoginHistory = () => import('@/views/profile/LoginHistory.vue');
const Product = () => import('@/views/Product.vue');
const Login = () => import('@/views/Login.vue');
const Registration = () => import('@/views/Registration.vue');
const Pay = () => import('@/views/Pay.vue');

const E404 = () => import('@/views/E404.vue');

let routes = [
  {
    name: 'main',
    path: '/',
    component: Main
  },
  {
    name: 'catalog',
    path: '/catalog',
    component: Catalog,
  },
  {
    name: 'category',
    path: '/catalog/category/:category',
    component: Catalog,

  },
  {
    name: 'tag',
    path: '/catalog/tag/:tag',
    component: Catalog
  },
  {
    name: 'likes',
    path: '/catalog/likes/:likes',
    component: Catalog,
    meta: { auth: true },
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
  },
  {
    name: 'search',
    path: '/search/:search',
    component: Catalog,
    beforeEnter(to, from, next) {
      /* (store.getters['filter/search'].trim() === '') ? from() : next() */
      if ((to.params.search.trim() !== "")) {
        store.dispatch('filter/setSearch', to.params.search.trim())
        store.dispatch('filter/goSearch', to.params.search.trim())
        next();
      }
      else {
        from();
      }
    },
  },
  {
    name: 'product',
    path: '/catalog/:id',
    component: Product
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { auth: false, noSSR: true },
  },
  {
    name: 'registration',
    path: '/registration',
    component: Registration,
    meta: { auth: false, noSSR: true },
  },
  {
    path: '/profile',
    component: Profile,
    meta: { auth: true },
    children: [
      {
        name: "profile-info",
        path: '',
        component: ProfileInfo,
      },
      {
        name: "profile-orders",
        path: 'orders',
        component: ProfileOrders,
      },

      {
        name: "login-history",
        path: 'loginHistory',
        component: LoginHistory,
      },
    ],
  },
  {
    name: 'E404',
    path: '/:pathMatch(.*)',
    component: E404,
    meta: { is404: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
});


router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) { //* страницы, с мета auth === true (проверка токена авторизации c последущим доступом)
    await store.getters['user/readyAuth'];
    store.getters['user/isLogin'] ? next() : next({ name: 'login' })
  }
  else if (to.meta.auth === false) { //*страницы, с мета auth === false (проверка токена авторизации (для страниц типа регистрации и логина))
    await store.getters['user/readyAuth'];
    store.getters['user/isLogin'] ? next({ name: "main" }) : next()
  }
  else {
    next();
  }
});

export default router;



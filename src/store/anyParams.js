export default {
   namespaced: true,
   state: {
      apiUrl: 'https://flower-back.herokuapp.com/api',
      serverUrl: 'https://flower-back.herokuapp.com/',
      minWidthParams: {
         md1: '320',
         md2: '768',
         md3: '1024',
      },
      burgerIsActive: false,
      bodyLock: false,
      filterShow: false,
      searchIsActive: false,
      minWidth: { //Наглядно, как будет использоваться:
         // '320': false,
         // '768': false,
         // '1024': false,
      },
      headerIsFixed: true,
      headerHeight: null,
   },
   getters: {
      burgerIsActive: state => state.burgerIsActive,
      bodyLock: state => state.bodyLock,
      filterShow: state => state.filterShow,
      nodeBody: () => document.querySelector('body'),
      searchIsActive: state => state.searchIsActive,
      minWidthParams: state => state.minWidthParams,
      minWidth: state => state.minWidth,
      apiUrl: state => state.apiUrl,
      serverUrl: state => state.serverUrl,
      headerHeight: state => state.headerHeight,
      headerIsFixed: state => state.headerIsFixed,
   },
   mutations: {
      changeBurger(state, status) {
         state.burgerIsActive = status;
      },
      showFilter(state, status) {
         state.filterShow = status;
      },
      changeBodyLock(state, status) {
         state.bodyLock = status;
      },
      changeSearch(state, status) {
         state.searchIsActive = status;
      },
      changeMinWidth(state, { width, status }) {
         state.minWidth[width] = status;
      },
      changeHeaderHeight(state, height) {
         state.headerHeight = height;
      },
      changeHeaderPosition(state, status) {
         state.headerIsFixed = status;
      },
   },
   actions: {
      toggleBurger(store) {
         store.commit('changeBurger', !store.getters.burgerIsActive);
         store.dispatch('toggleBodyLock');
      },
      toggleFilter(store) {
         store.commit('showFilter', !store.getters.filterShow)
         store.dispatch('toggleBodyLock');
      },
      toggleBodyLock(store) {
         store.commit('changeBodyLock', store.getters.burgerIsActive || store.getters.filterShow);   //* body lock, 
         //* может зависеть от нескольких параметров
         (store.getters.bodyLock) ? document.body.classList.add('lock') : document.body.classList.remove('lock')
      },
      toggleSearch(store) {
         store.commit('changeSearch', !store.getters.searchIsActive);
      },
      changeHeaderHeight(store, height) {
         store.getters.headerIsFixed ? store.commit('changeHeaderHeight', height) : store.commit('changeHeaderHeight', 0);
      },
      changeHeaderStatus(store, status) {
         store.commit('changeHeaderPosition', status);
      },

      mediaQuery(store, { op, array, media }) {
         let deleteMathMedia = (media, value) => {
            let mediaQuery = `(${media}: ${value}px)`
            let mql = window.matchMedia(mediaQuery);
            mql.removeEventListener("change", addListener)
         }
         let addMathMedia = (media, value) => {
            let mediaQuery = `(${media}: ${value}px)`
            let mql = window.matchMedia(mediaQuery);
            mql.addEventListener("change", addListener)
            if (mql.matches) {
               store.commit('changeMinWidth', { width: value, status: true });
            }
            else {
               store.commit('changeMinWidth', { width: value, status: false });
            }
         }
         if (op === 'add') {
            array.forEach(el => {
               addMathMedia(media, el)
            });
         }
         else if (op === 'delete') {
            array.forEach(el => {
               deleteMathMedia(media, el)
            });
         }
         function addListener(e) {
            if (e.matches) {
               store.commit('changeMinWidth', { width: e.media.replace(/[^0-9]+/g, ""), status: true });
            }
            else {
               store.commit('changeMinWidth', { width: e.media.replace(/[^0-9]+/g, ""), status: false });
            }
         }
      }
   }
}
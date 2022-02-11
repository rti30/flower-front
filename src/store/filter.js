export default {
    namespaced: true,
    state: {
        filterParams: {
            discount: false,
            categoryId: false,
            range: {
                from: null,
                to: null,
            },
        },
        filterItems: [],
        search: ' ',
        isActive: false,
        products: [],
        awaitSerch: false,
    },
    getters: {
        filterParams: state => state.filterParams,
        search: state => state.search,
        filterItems: state => state.filterItems,
        filterActive: state => state.isActive,
        maxPrice: state => state.products?.reduce((acc, curr) => acc.price > curr.price ? acc : curr, 0).price,
        products: state => state.products,
        awaitSerch: state => state.awaitSerch,
    },
    mutations: {
        changeDiscount(state, value) {
            state.filterParams.discount = value;
        },
        changeCategory(state, value) {
            state.filterParams.categoryId = value;
        },
        changeRange(state, [from, to]) {
            state.filterParams.range.from = from;
            state.filterParams.range.to = to;
        },


        // фильтер по поиску==================================================
        changeSearch(state, string) {
            state.search = string !== "" ? string : ' ';
        },
        setItems(state, items) {
            state.filterItems = items;
        },
        activated(state, status) {
            state.isActive = status;
        },
        setData(state, data) {
            state.products = data;
        },
        changeAwaitSearch(state, status) {
            state.awaitSerch = status;
        }

    },
    actions: {
        changeFilter(store, { name, value }) {
            if (name === 'range') {
                store.commit('changeRange', value)
            }
            else if (name === 'discount') {
                store.commit('changeDiscount', !store.getters.filterParams.discount)
            }
            else {
                store.commit('changeCategory', value)
            }
        },
        setData({ commit }, data) {
            commit('setData', data)
        },

        apply({ commit, getters }) {
            let filter = getters.products;
            if (getters.filterParams.discount) {
                filter = filter.filter(product => product.discount !== 0)
            }
            filter = filter.filter(product => (product.price - product.price * product.discount / 100) >= getters.filterParams.range.from && (product.price - product.price * product.discount / 100) <= getters.filterParams.range.to)
            commit('setItems', filter)
            commit('activated', true)
        },

        cancel({ commit }) {
            commit('activated', false)
        },

        //* Филтер по поиску
        //==================================================
        inputSearch(store, e) {
            if (e) {
                store.commit('changeSearch', e.target.value)
            }
            else {
                store.commit('changeSearch', '')
            }
        },
        setSearch(store, string) {
            console.log("11111111111111111111111111", string);
            if (string) {
                store.commit('changeSearch', string)
            }
            else {
                store.commit('changeSearch', '')
            }
        },
        async goSearch({ commit, getters, dispatch }) {
            if (!getters.awaitSerch && getters.search.trim() !== "") {
                commit('changeAwaitSearch', true)
                const products = await dispatch('product/getByName', { param: getters.search }, { root: true })
                commit('setData', products);
                commit('changeAwaitSearch', false)
            }
        },
    }
}
import {createStore} from 'vuex'

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_LOCAL_DATA = 'SET_LOCAL_DATA';
const fetchProducts = 'fetchProducts';
const getLocalData = 'getLocalData';
const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

export default new createStore({
    state: {
        products: [],
        localData: null,
        favorites: JSON.parse(localStorage.getItem("user")) || [],
    },
    actions: {
        async [fetchProducts]({commit}) {
            await fetch("data/product.json")
                .then(resp => resp.json())
                .then(data => commit(SET_PRODUCTS, data));
        },
        [getLocalData]({commit}) {
            if (localStorage.getItem("user")) {
                let user = localStorage.getItem("user");
                commit(SET_LOCAL_DATA, JSON.parse(user));
            }
        }
    },
    mutations: {
        [SET_PRODUCTS](state, payload) {
            state.products = payload;
        },
        [SET_LOCAL_DATA](state, payload) {
            state.localData = payload;
        },
        [UPDATE_FAVORITES](state, payload) {
            if(state.favorites.includes(payload)){
                let selectedId = '';
                state.favorites.forEach(function callback(selected, id) {
                    if(selected === payload){
                        selectedId = id;
                    }
                })
                state.favorites.splice(selectedId,1)
                localStorage.setItem('user', JSON.stringify(state.favorites));
            }else{
                state.favorites.push(payload)
                localStorage.setItem('user', JSON.stringify(state.favorites));
            }

        },
    },
    modules: {}
})

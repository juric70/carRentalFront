
import Vuex from 'vuex';
import axios from 'axios';


export default new Vuex.Store({
    state: {
        user: null,
        token: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('/login', credentials);
                commit('SET_USER', response.data.user);
                commit('SET_TOKEN', response.data.token);
                // Postavljanje tokena u Axios za buduće zahteve
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            } catch (error) {
                console.error('Failed to login:', error);
                throw error;
            }
        },
        async register({ commit }, credentials) {
            try {
                const response = await axios.post('/register', credentials);
                commit('SET_USER', response.data.user);
                commit('SET_TOKEN', response.data.token);
                // Postavljanje tokena u Axios za buduće zahteve
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            } catch (error) {
                console.error('Failed to register:', error);
                throw error;
            }
        },
        async logout({ commit }) {
            await axios.post('/logout');
            commit('SET_USER', null);
            commit('SET_TOKEN', null);
            delete axios.defaults.headers.common['Authorization'];
        },
        async fetchUser({ commit }) {
            const response = await axios.get('/user');
            commit('SET_USER', response.data);
        }
    },
    getters: {
        isAuthenticated: state => !!state.user,
        getUser: state => state.user
    }
});

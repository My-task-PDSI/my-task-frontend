import { createStore } from 'vuex';
import Api from '../services/api';
const store = createStore({
	state() {
		return {
			loggedIn: false,
			user: null,
		}
	},
	mutations: {
		setloggedIn(state, value) {
			state.loggedIn = value;
			localStorage.setItem('mystask-loggedin', JSON.stringify(value));
		},
		setUser(state, user) {
			state.user = user;
			localStorage.setItem('mystask-user', JSON.stringify(user));
		},
		logout(state){
			state.user = null;
			state.loggedIn = false;
			localStorage.removeItem('mystask-loggedin');
			localStorage.removeItem('mystask-user');
		}
	},
	actions:{
		async checkAuth({commit}){
			try {
				const user = JSON.parse(localStorage.getItem('mystask-user'));
				const response  = await Api.post('user/login',{
					username:'user0',
					password:'pwd0',
				})
				if(response.status === 2 ){
					commit('setUser', user);
					commit('setloggedIn', true);
				}else{
					commit('logout');
				}
			} catch (e) {
				commit('logout');
			}
		}
	}
});

export default store;
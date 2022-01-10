import { createStore } from 'vuex';
import Api from '../services/api';
import * as socketService from '../services/socket';
const store = createStore({
	state() {
		return {
			loggedIn: false,
			socket: socketService.socket,
			user: null,
		}
	},
	mutations: {
		setloggedIn(state, value) {
			state.loggedIn = value;
			sessionStorage.setItem('mystask-loggedin', JSON.stringify(value));
		},
		replaceSocketEvent(state, dataEvent) {
			socketService.replaceEvent(state.socket,dataEvent.name, dataEvent.callback);
		},
		removeAllEvent(state, name) {
			state.socket.removeAllListeners(name);
		},
		setUser(state, user) {
			state.user = {...user};
			localStorage.setItem('mystask-user', JSON.stringify(user));
			state.socket.emit('open', user.id);
		},
		logout(state) {
			state.user = null;
			state.loggedIn = false;
			sessionStorage.removeItem('mystask-loggedin');
			localStorage.removeItem('mystask-user');
		}
	},
	actions: {
		async initCheckAuthenticate({ commit }) {
			try {
				const user = JSON.parse(localStorage.getItem('mystask-user'));
				console.log('user localStorage', user);
				const response = await Api.post('user/login', {
					username: user.username,
					password: user.password,
				})
				if (response.status === 200) {
					const { user: userInfo } = response.data;
					commit('setUser', {
						id: userInfo.id,
						username: user.username,
						password: user.password,
					});
					commit('setloggedIn', true);
				} else {
					commit('setloggedIn', false);
				}
			} catch (e) {
				commit('setloggedIn', false);
			}
		}
	}
});

export default store;
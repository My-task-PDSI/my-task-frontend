import { io } from 'socket.io-client';
import Api from './api';
const socket = io(Api.defaults.baseURL);
socket.on("connect", () => {
  console.log('socket conectado', socket.id);
});
socket.on("disconnect", () => {
	console.log('socket disconectado', socket.id);
});
function replaceEvent(socket, name, callback){
	console.log('iniciado on',name)
	socket.removeAllListeners(name);
	socket.on(name, callback);
}
export {socket, replaceEvent};
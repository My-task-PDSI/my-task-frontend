import axios from 'axios';
const Api = axios.create({
	baseURL: 'https://localhost:3000/',
})
export {Api};
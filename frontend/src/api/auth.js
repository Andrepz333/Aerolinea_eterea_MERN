import axios from './axios.js';

export const createRequest = async (user) => axios.post(`/createCliente`, user);

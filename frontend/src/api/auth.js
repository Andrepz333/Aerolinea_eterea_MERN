import axios from './axios.js';

export const registerRequest = async (user) => axios.post(`/create`, user)
export const loginRequest = async (user) => axios.post(`/login`, user)
export const createRequest = async (user) => axios.post(`/createCliente`, user);

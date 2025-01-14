import axios from 'axios';


const API = 'http://localhost:4000/api'

export const createRequest = user => axios.post(`${API}/createCliente`, user);
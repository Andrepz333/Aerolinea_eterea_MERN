import axios from './axios.js';

export const getClientsRequest = async () => axios.get('/getClientes');

export const searchClientRequest = async (searchParams) => 
    axios.get('/searchClienteByDocumentoOEmail', { params: searchParams });

export const updateClientRequest = async (clientData) => 
    axios.put('/updateCliente', clientData);

export const deleteClientRequest = async (documento) => 
    axios.delete('/deleteCliente', { data: { documento } });
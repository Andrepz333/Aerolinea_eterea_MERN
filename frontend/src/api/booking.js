import axios from './axios.js';

export const createRequest = async (user) => axios.post(`/createReserva`, user);

export const getReservasRequest = async () => axios.get('/getReservas');

export const searchReservaRequest = async (searchParams) => 
    axios.get('/searchReservaByRoute', { params: searchParams });

export const updateReservaRequest = async (reservaData) => 
    axios.put('/updateReserva', {
        from: reservaData.from,
        to: reservaData.to,
        departure: reservaData.departure,
        return: reservaData.return,
        airfare: reservaData.airfare,
        baggage: reservaData.baggage
    });

export const deleteReservaRequest = async ({ from, to }) => 
    axios.delete('/deleteReserva', {
        data: { from, to }
    });
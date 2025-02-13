import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import reservaReducer from '../features/reservaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservas: reservaReducer,
  },
});
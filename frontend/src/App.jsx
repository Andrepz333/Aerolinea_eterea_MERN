import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import CreateClient from './pages/CreateCliente.jsx';
import GetClients from './pages/GetClients.jsx';
import Register from './pages/Register.jsx';
import Reserva from './pages/Reserva.jsx';
import GetReserva from './pages/GetReserva.jsx';
//modificacion
import authReducer from './features/authSlice';
import reservaReducer from './features/reservaSlice';

// Configuración del store de Redux
const store = configureStore({
  reducer: {
    auth: authReducer,
    reservas: reservaReducer,
  },
});


function App () {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/create" element={<Register/>} />
        <Route path='/createCliente' element={<CreateClient />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/getClientes' element={<GetClients />} />
        <Route path='/createReserva' element={<Reserva />} />
        <Route path='/getReservas' element={<GetReserva />} />


      </Routes>
    </BrowserRouter>
    </Provider>
  );

}

export default App;
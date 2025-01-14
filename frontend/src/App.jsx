import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import CreateClient from './pages/createCliente.jsx';
import CreatePasajero from './pages/CreatePasajero.jsx';
import CreateVuelo from './pages/CreateVuelo.jsx';


function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/createCliente' element={<CreateClient />} />
        <Route path='/createPasajero' element={<CreatePasajero />} />
        <Route path='/createVuelo' element={<CreateVuelo />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>

  );

}

export default App;

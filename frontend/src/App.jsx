import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import CreateClient from './pages/CreateCliente.jsx';
import GetClients from './pages/GetClients.jsx';
import Register from './pages/Register.jsx';



function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/createCliente' element={<CreateClient />} />
        <Route path='/home' element={<Home />} />
        <Route path='/getClientes' element={<GetClients />} />
      </Routes>
    </BrowserRouter>

  );

}

export default App;

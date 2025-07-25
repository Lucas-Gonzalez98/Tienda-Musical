// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navegacion/Navbar';
import AdminPanel from './components/PanelAdmin/PanelAdmin';
import Home from './components/Navegacion/Home';
import Productos from './components/Navegacion/Productos';
import Ubicacion from './components/Navegacion/Ubicacion';
import GrillaInstrumentos from './components/Grillas/GrillaInstrumento';
import GlobalStyles from './styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FormularioInstrumento from './components/Formularios/FormularioInstrumento';
import GrillaStock from './components/Grillas/GrillaStock';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Navbar />
        <AdminPanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/instrumentos" element={<GrillaInstrumentos />} />
          <Route path="/stock" element={<GrillaStock />} />
          <Route path="/instrumentos/nuevo" element={<FormularioInstrumento />} />
          <Route path="/instrumentos/editar/:id" element={<FormularioInstrumento />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
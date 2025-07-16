import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navegacion/Navbar';
import Home from './components/Navegacion/Home';
import Productos from './components/Navegacion/Productos';
import Ubicacion from './components/Navegacion/Ubicacion';
import GlobalStyles from './styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
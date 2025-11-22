import React from 'react';
import Navegacion from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Admin from './pages/Admin';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ConditionalNavbar = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/dashboard';

  return (
    !isDashboardRoute && <Navegacion />
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="wrapper">
            <ConditionalNavbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/contacto" element={<Contacto/>} />
                <Route path="/admin" element={<Admin/>} />
                
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

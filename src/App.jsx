import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './contexts/CartContext';  // Import CartProvider
import About from './components/About';
import Footer from './components/Footer'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

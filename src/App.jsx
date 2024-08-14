import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import Products from './components/Products';
import CustomNavbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './contexts/CartContext';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ContactForm from './components/Contact.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <CustomNavbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

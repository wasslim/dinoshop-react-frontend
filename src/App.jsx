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
import CookieBanner from './components/CookieBanner.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';

function App() {
  return (
    <CartProvider>

      <Router>
      <CookieBanner/>
        <div className="flex flex-col min-h-screen">
          <CustomNavbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/over-ons" element={<About />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/assortiment" element={<Products />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

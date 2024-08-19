import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CustomNavbar = () => {
  const { openCart, cartQuantity } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logo = `${process.env.PUBLIC_URL}/images/logo.png`;

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="block md:hidden text-darkgreen focus:outline-none"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="block text-darkgreen font-bold text-lg py-2 md:py-0 no-underline">
            Home
          </Link>
          <Link to="/assortiment" className="block text-darkgreen font-bold text-lg py-2 md:py-0 no-underline">
            Assortiment
          </Link>
          <Link to="/over-ons" className="block text-darkgreen font-bold text-lg py-2 md:py-0 no-underline">
            Over
          </Link>
          <Link to="/contact" className="block text-darkgreen font-bold text-lg py-2 md:py-0 no-underline">
            Contact
          </Link>
        </div>
        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-12 rounded-full shadow-lg transition-transform transform hover:scale-110"
            />
          </Link>
        </div>

        {/* Cart Button on the Right Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg text-darkgreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs transform translate-x-1/4 translate-y-1/4">
              {cartQuantity}
            </span>
          </button>
        </div>

        {/* Dropdown Menu for Small Screens */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 mt-2 w-full bg-white shadow-md z-10 md:hidden`}
        >
          <Link to="/" className="block text-darkgreen font-bold text-md py-2 md:py-0 no-underline text-center" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/assortiment" className="block text-darkgreen font-bold text-md py-2 md:py-0 no-underline text-center" onClick={toggleMenu}>
            Assortiment
          </Link>
          <Link to="/over-ons" className="block text-darkgreen font-bold text-md py-2 md:py-0 no-underline text-center" onClick={toggleMenu}>
            Over
          </Link>
          <Link to="/contact" className="block text-darkgreen font-bold text-md py-2 md:py-0 no-underline text-center" onClick={toggleMenu}>
            Contact
          </Link>
        </div>

        {/* Horizontal Menu for Larger Screens */}
        
      </div>
    </nav>
  );
};

export default CustomNavbar;

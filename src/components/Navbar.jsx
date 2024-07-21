import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const CustomNavbar = () => {
  const [logo, setLogo] = useState("");
  const { openCart, cartQuantity } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    axios
      .get(`${apiUrl}/logo/fetch_logo`)
      .then((response) => {
        if (response.data.error) {
          console.error("Error:", response.data.error);
        } else {
          setLogo(response.data.logo_image_url);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 relative">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-darkgreen font-bold text-lg">Home</Link>
          <Link to="/products" className="text-darkgreen font-bold text-lg">Assortiment</Link>
          <Link to="/about" className="text-darkgreen font-bold text-lg">Over ons</Link>
          {/* <Link to="/contact" className="text-darkgreen font-bold text-lg">Contact</Link> */}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-12 rounded-full shadow-lg transition-transform transform hover:scale-110"
            />
          </Link>
        </div>
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:border-gray-300 focus:border-gray-300"
            >
              <svg fill="#19431e" height="24" width="24" viewBox="0 0 512 512">
                <circle cx="256" cy="114.526" r="114.526"></circle>
                <path d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421 c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z"></path>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
                <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Registreer</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;

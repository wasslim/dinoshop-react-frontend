import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./NavbarStyles.scss"; // Assuming you imported the new SCSS styles

const CustomNavbar = () => {
  const { openCart, cartQuantity } = useCart();

  useEffect(() => {
    const navbarMenu = document.getElementById("menu");
    const burgerMenu = document.getElementById("burger");

    const handleBurgerClick = () => {
      navbarMenu.classList.toggle("is-active");
      burgerMenu.classList.toggle("is-active");
    };

    const dropdown = document.querySelectorAll(".dropdown");

    dropdown.forEach((item) => {
      const dropdownToggle = item.querySelector(".dropdown-toggle");
      dropdownToggle.addEventListener("click", () => {
        const dropdownShow = document.querySelector(".dropdown-show");
        toggleDropdownItem(item);

        if (dropdownShow && dropdownShow !== item) {
          toggleDropdownItem(dropdownShow);
        }
      });
    });

    const toggleDropdownItem = (item) => {
      const dropdownContent = item.querySelector(".dropdown-content");
      if (item.classList.contains("dropdown-show")) {
        dropdownContent.removeAttribute("style");
        item.classList.remove("dropdown-show");
      } else {
        dropdownContent.style.height = dropdownContent.scrollHeight + "px";
        item.classList.add("dropdown-show");
      }
    };

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        document.querySelectorAll(".dropdown-content").forEach((item) => {
          item.removeAttribute("style");
        });
        dropdown.forEach((item) => {
          item.classList.remove("dropdown-show");
        });
        if (navbarMenu.classList.contains("is-active")) {
          navbarMenu.classList.remove("is-active");
          burgerMenu.classList.remove("is-active");
        }
      }
    });

    burgerMenu.addEventListener("click", handleBurgerClick);

    return () => {
      burgerMenu.removeEventListener("click", handleBurgerClick);
    };
  }, []);

  const logo = `${process.env.PUBLIC_URL}/images/logo.png`;

  return (
    <header className="header" id="header">
      <nav className="navbar container">
        <div className="navbar-inner">
          <Link to="/" className="brand">
            <img src={logo} alt="Brand Logo" className="h-8" />
          </Link>
          <div className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
        </div>
        <div className="navbar-block" id="menu">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                Home
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/assortiment" className="menu-link">
                Assortiment
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/over-ons" className="menu-link">
                Over
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/contact" className="menu-link">
                Contact
              </Link>
            </li>
            <li className="menu-item">
              <button onClick={openCart} className="menu-link relative">
                Cart
                {cartQuantity > 0 && (
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs transform translate-x-1/4 translate-y-1/4">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default CustomNavbar;

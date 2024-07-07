import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const CustomNavbar = () => {
  const [logo, setLogo] = useState("");
  const { openCart, cartQuantity } = useCart();

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

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-lg bg-gradient-to-r from-green-400 to-blue-500"
    >
      <Container className="d-flex justify-between items-center">
        <div className="d-flex justify-between align-items-center w-100">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Homepage</Nav.Link>
            <Nav.Link as={Link} to="/products">Assortiment</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Navbar.Brand as={Link} to="/" className="mx-auto">
            <img
              src={logo}
              alt="Logo"
              className="h-16 rounded-full shadow-lg transition-transform transform hover:scale-110"
            />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Button
              onClick={openCart}
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center badge badge-xs badge-primary indicator-item"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            </Button>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

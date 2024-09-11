import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SignInButton from "../../assets/SignInButton.png";
import Logo from "../../assets/Logo.png";
import user from "../../assets/user-round.svg";
import down from "../../assets/chevron-down.svg";

import { Link } from "react-router-dom";

import "../../assets/scss/components/Header.scss";

const Header = () => {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="dark">
        <Container>
          <a href="/" className="navbar-brand">
            <img src={Logo} alt="Middo logo" />
          </a>

          <Nav className="navbar-box">
            <Nav className="navbar-content">
              <Nav.Link as={Link} to="/solution">
                Solution
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link
                onClick={() =>
                  window.open("https://dudaji.vn/#contact", "_blank")
                }
              >
                Contact us
              </Nav.Link>
              <Nav.Link
                onClick={() => window.open("https://docs.middo.app/", "_blank")}
              >
                Docs
              </Nav.Link>
            </Nav>
          </Nav>
          <NavDropdown
            title={<img src={user} alt="User" />}
            className="navbar-auth"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item>Sign In</NavDropdown.Item>
            <NavDropdown.Item>Setting</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

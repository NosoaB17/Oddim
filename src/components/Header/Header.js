import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SignInButton from "../../assets/SignInButton.png";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nav.Link to="/" className="navbar-brand">
            Middo logo
          </Nav.Link>
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
          <NavDropdown
            title={<img src={SignInButton} alt="SignInLogo" />}
            id="basic-nav-dropdown"
            className="navbar-auth"
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

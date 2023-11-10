import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar className="text-white">
      <Container>
        <Navbar.Brand>
          <Link
            to={"/"}
            style={{ textDecoration: "none", color: "white", fontSize: "30px" }}
          >
            <i className="fa-solid fa-video fa-beat text-warning me-3"></i> Video Player
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;

import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import './Usernav.css'

const Usernav = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/userhome">Home</Nav.Link>
            <Nav.Link href="/userhome/bookavaliable">Books</Nav.Link>
            <Nav.Link href="/userhome/regbook">Reg Book</Nav.Link>
            <Nav.Link href="/userhome/tranjection">Tranjection</Nav.Link>
            <Nav.Link href="/userhome/register">Register</Nav.Link>
            <Nav.Link href="/userhome/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Usernav;

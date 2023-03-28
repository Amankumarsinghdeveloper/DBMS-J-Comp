import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import "./AdminNav.css";

const AdminNav = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/adminhome">Home</Nav.Link>
            <Nav.Link href="/adminhome/books">Books</Nav.Link>
            <Nav.Link href="/adminhome/regbook">Reg Book</Nav.Link>
            <Nav.Link href="/adminhome/userlist">Userlist</Nav.Link>
            <Nav.Link href="/adminhome/Issuelist">Issue List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default AdminNav;

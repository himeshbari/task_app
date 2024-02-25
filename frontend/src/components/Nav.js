import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavComponent = ({ isLoggedIn }) => {
  return (
    <Navbar bg="dark" variant="dark" className="container">
      <Navbar.Brand href="/">Task Manager</Navbar.Brand>
      <Nav className="ml-auto">
        {isLoggedIn ? (
          <>
            <NavLink to="/add-page" className="nav-link">
              Add Task
            </NavLink>
            <NavLink to="/get-page" className="nav-link">
              Get Task
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/" className="nav-link">
              Signup
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavComponent;

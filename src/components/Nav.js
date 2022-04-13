import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Nav(props) {
  return (
    <div
      className="container"
      style={{ marginBottom: "3rem", marginTop: "1rem", borderRadius: "5px" }}
    >
      <div className="row">
        <Navbar style={{ borderRadius: "5px" }} bg="dark" variant="dark">
          <Container>
            <Navbar.Collapse className="justify-content-left">
              <NavLink to="/">
                <Navbar.Brand>Startseite</Navbar.Brand>
              </NavLink>

              {props.loginStatus &&
                <NavLink to="/favoriten">
                  <Navbar.Brand>Favoriten</Navbar.Brand>
                </NavLink>
              }
              
              {!props.loginStatus &&
                <NavLink to="/login">
                  <Navbar.Brand>Login</Navbar.Brand>
                </NavLink>
              }

              {props.loginStatus &&
                <NavLink  to="/">
                  <Navbar.Brand onClick={props.logOut}>Logout</Navbar.Brand>
                </NavLink>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Nav;

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
              <NavLink to="/React-My-movie/">
                <Navbar.Brand>Startseite</Navbar.Brand>
              </NavLink>

              {props.loginStatus &&
                <NavLink to="/React-My-movie/favoriten">
                  <Navbar.Brand>Favoriten</Navbar.Brand>
                </NavLink>
              }

              {!props.loginStatus &&
                <NavLink to="/React-My-movie/login">
                  <Navbar.Brand>Login</Navbar.Brand>
                </NavLink>
              }

              {props.loginStatus &&
                <NavLink  to="/React-My-movie/">
                  <Navbar.Brand onClick={props.logOut}>Logout</Navbar.Brand>
                </NavLink>
              }
            </Navbar.Collapse>
              {props.admin.current !== null &&
              <h4 style={{color:"blueviolet"}}>User: {props.admin.current.username}</h4>
              }
          </Container>
          
        </Navbar>
      </div>
    </div>
  );
}

export default Nav;

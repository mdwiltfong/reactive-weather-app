import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
} from "reactstrap";
import UserContext from "../context/UserContext";

function NavigationBar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="d-flex justify-content-start" {...args}>
        <Container className="d-flex justify-content-start mx-0">
          <NavLink data-testid={"WeatherApp"} to={"/"}>
            WeatherApp
          </NavLink>

          <Nav>
            <NavItem className="mx-2">
              {currentUser ? null : <NavLink to={"/login"}>Login</NavLink>}
            </NavItem>
            <NavItem className="mx-2">
              {currentUser ? (
                <NavLink to={"/profile"}>Profile Page</NavLink>
              ) : null}
            </NavItem>
            <NavItem className="mx-2">
              {currentUser ? null : (
                <NavLink to={"/register"}>Register</NavLink>
              )}
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;

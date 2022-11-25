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
} from "reactstrap";
import UserContext from "../context/UserContext";

function NavigationBar(args) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="d-flex justify-content-start" {...args}>
        <NavbarBrand>
          <NavLink data-testid={"WeatherApp"} to={"/"}>
            WeatherApp
          </NavLink>
        </NavbarBrand>
        <Nav>
          <NavItem>
            {currentUser ? null : <NavLink to={"/login"}>Login</NavLink>}
          </NavItem>
          <NavItem>
            {currentUser ? (
              <NavLink to={"/profile"}>Profile Page</NavLink>
            ) : null}
          </NavItem>
          <NavItem>
            <NavLink to={"/register"}>Register</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>Simple Text</NavbarText>
      </Navbar>
    </div>
  );
}

export default NavigationBar;

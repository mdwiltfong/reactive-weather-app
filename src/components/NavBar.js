import React, { useState } from "react";
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

function NavigationBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="d-flex justify-content-start" {...args}>
        <NavbarBrand>
          <NavLink to={"/"}>WeatherApp</NavLink>
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink to={"/login"}>Login</NavLink>
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

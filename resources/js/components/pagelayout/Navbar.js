import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';

const MainNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
        <Nav pills tabs className="p-3 justify-content-end">
            <NavItem>
              <NavLink  to="/"  tag={Link}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup" tag={Link} >Signup</NavLink>
            </NavItem>
        </Nav>
    </div>
  );
}

export default MainNav;
import React, { useState, useContext } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


const HomeNav = (props) => {

  const {handleLogout} = useContext(AuthContext);


  return (
    <div>
        <Nav pills tabs className="p-3 justify-content-end">
            <NavItem>
              <NavLink  to="/home"  tag={Link}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  to="/create/user"  tag={Link}>Add User</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
        </Nav>
    </div>
  );
}

export default HomeNav;
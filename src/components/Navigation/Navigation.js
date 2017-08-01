import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';

import './style.css'

const authNav = (
  <Nav>
    <NavItem>
      Welcome, { localStorage.getItem('username') }
    </NavItem>
    <NavItem>
      <LinkContainer to="/items/new">
        <FontAwesome name="plus"/>
      </LinkContainer>

    </NavItem>
    <NavItem>
      <LinkContainer to="/profile">
        <FontAwesome name="user"/>
      </LinkContainer>
    </NavItem>
  </Nav>
)

const Navigation = ({ auth, history }) => {
    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Swap
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/items">
              <NavItem>Items</NavItem>
            </LinkContainer>

            <LinkContainer to="/trades">
              <NavItem>Trades</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            { auth.isAuthenticated() && authNav }

            <NavItem>
              <FontAwesome onClick={ auth.isAuthenticated() ? () => auth.logout(history) : auth.login } name="sign-in"/>
            </NavItem>
          </Nav>

        </Navbar.Collapse>

      </Navbar>
  )
}

export default Navigation;

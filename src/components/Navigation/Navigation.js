import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
import './style.css'
import swap from '../../assets/swap.png';

import Auth from '../../services/auth';
const auth = new Auth();

const authNav = (
  <Nav>
    <NavItem>
      <LinkContainer to="/inventory/new">
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

const Navigation = ({ history }) => {
    return (
      <div>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img src={ swap }/>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/search">
                <NavItem>Search</NavItem>
              </LinkContainer>

              <LinkContainer to="/inventory">
                <NavItem>Inventory</NavItem>
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
      </div>
  )
}

export default Navigation;

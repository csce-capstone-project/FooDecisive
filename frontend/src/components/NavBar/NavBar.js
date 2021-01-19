import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

export function HomeNavBar() {
      return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">FooDecisive</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/rate">Rate</Nav.Link>
                  <Nav.Link href="/recommendations">Recommendations</Nav.Link>
                  <Nav.Link href="/favs">Favorites</Nav.Link>
                  <Nav.Link href="/bot">Talk to a Bot!</Nav.Link>
                </Nav>
                <Nav.Link href="/login" style={{ color: '#FFF'}}>Login</Nav.Link>
                <Nav.Link href="/register" style={{ color: '#FFF' }}>Register</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
      );
  }
